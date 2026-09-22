import React, { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, Plus, Clock, CheckCircle2, 
  Send, AlertCircle, Phone, Mail, ArrowUpRight, 
  Filter, ChevronRight, UtensilsCrossed, Coffee, Loader2
} from 'lucide-react';
import { quotesApi } from '../../services/api';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';

export default function OrdersView() {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ status: statusFilter, search: searchTerm }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Orders load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleQuoteUpdated = (updatedQuote) => {
    if (updatedQuote._deleted) {
      setQuotes(prev => prev.filter(q => q.id !== updatedQuote.id));
    } else {
      setQuotes(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
    }
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const handleNewOrderCreated = (newQuote) => {
    setQuotes(prev => [newQuote, ...prev]);
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const filteredQuotes = quotes.filter(q => {
    // Check type filter if selected
    if (statusFilter === 'takeout' && q.orderType !== 'takeout') return false;
    if (statusFilter === 'table' && q.orderType !== 'table') return false;

    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (q.name && q.name.toLowerCase().includes(term)) ||
      (q.customer_name && q.customer_name.toLowerCase().includes(term)) ||
      (q.phone && q.phone.includes(term)) ||
      (q.orderType && q.orderType.toLowerCase().includes(term)) ||
      (q.itemsSummary && q.itemsSummary.toLowerCase().includes(term)) ||
      (q.detailedService && q.detailedService.toLowerCase().includes(term)) ||
      (q.id && q.id.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6 pb-16">
      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Orders */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Guest Orders</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900">{stats.total}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Takeout & dining room tickets</span>
        </div>

        {/* Pending Kitchen Prep */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Kitchen</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-600">{stats.pending}</div>
          <span className="text-[11px] text-amber-600/80 mt-1 block font-medium">Awaiting prep on grill/pass</span>
        </div>

        {/* Confirmed Tables & Pickups */}
        <div className="bg-white border border-blue-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Reserved / Confirmed</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Coffee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-blue-600">{stats.quoted}</div>
          <span className="text-[11px] text-blue-600/80 mt-1 block font-medium">Tables held & confirmed</span>
        </div>

        {/* Completed */}
        <div className="bg-white border border-emerald-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed / Picked Up</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-600">{stats.completed}</div>
          <span className="text-[11px] text-emerald-600/80 mt-1 block font-medium">Order served & finalized</span>
        </div>
      </div>

      {/* Control Bar: Search, Filter Tabs, Action CTAs */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer, dish, phone, or ticket #..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-red-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition"
            />
          </form>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setIsLoading(true); loadData(); }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition"
              title="Refresh Tickets"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-red-600' : ''}`} />
            </button>

            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-red-600/20 flex items-center space-x-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Record Walk-In / Phone Ticket</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {[
            { id: 'all', label: 'All Tickets', count: stats.total },
            { id: 'takeout', label: '🥡 Takeout Pickup' },
            { id: 'table', label: '🍽️ Table Reservations' },
            { id: 'pending', label: '⏳ Pending Kitchen', count: stats.pending },
            { id: 'quoted', label: '🍳 Confirmed / Ready', count: stats.quoted },
            { id: 'completed', label: '✅ Picked Up', count: stats.completed },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1.5 ${
                statusFilter === tab.id
                  ? 'bg-red-600 text-white shadow-sm shadow-red-600/25'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  statusFilter === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200/80 rounded-2xl text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
          <span className="text-sm font-medium">Retrieving kitchen tickets and table reservations...</span>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white border border-slate-200/80 rounded-2xl text-slate-500 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Orders or Reservations Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm ? 'No results matched your search term.' : 'When diners place takeout orders or book tables online, tickets appear here in real-time.'}
          </p>
          <button
            onClick={() => setIsNewOrderOpen(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 pt-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create a manual phone or walk-in ticket</span>
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Ticket # / Date</th>
                  <th className="py-3.5 px-4">Guest & Contact</th>
                  <th className="py-3.5 px-4">Order Type & Time</th>
                  <th className="py-3.5 px-4">Ordered Dishes & Notes</th>
                  <th className="py-3.5 px-4">Kitchen Status</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotes.map((q) => {
                  const status = q.status || 'pending';
                  const isTakeout = q.orderType === 'takeout' || (!q.orderType && !q.guests);
                  const displayTotal = q.totalPrice || q.quoted_price || (q.quotedPrice ? `$${q.quotedPrice}` : null);
                  return (
                    <tr 
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className="hover:bg-slate-50/80 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-amber-600 text-xs block">#{q.id}</span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(q.createdAt || q.created_at || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric' })} • {new Date(q.createdAt || q.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{q.customer_name || q.name}</div>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                          {(q.customer_phone || q.phone) && <span>{q.customer_phone || q.phone}</span>}
                          {(q.customer_phone || q.phone) && (q.customer_email || q.email) && <span>•</span>}
                          <span className="truncate max-w-[140px]">{q.customer_email || q.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            isTakeout 
                              ? 'bg-amber-100 text-amber-900 border border-amber-300/60' 
                              : 'bg-orange-100 text-orange-950 border border-orange-300/60'
                          }`}>
                            {isTakeout ? '🥡 Takeout' : '🍽️ Table'}
                          </span>
                          {q.guests && (
                            <span className="text-[11px] font-semibold text-slate-600">
                              {q.guests} {Number(q.guests) === 1 ? 'Guest' : 'Guests'}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium mt-1">
                          ⏰ {q.time || 'ASAP (20 Mins)'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="text-slate-900 font-medium line-clamp-1">
                          {q.itemsSummary || q.detailedService || q.serviceCategory || 'Standard Order'}
                        </div>
                        {q.details && (
                          <div className="text-[11px] text-slate-400 truncate italic mt-0.5">
                            "{q.details}"
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {status === 'pending' ? '⏳ Prep Queue' :
                           status === 'quoted' ? '🍳 On the Grill' :
                           status === 'completed' ? '✅ Ready / Served' : '📦 Archived'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-sm">
                        {displayTotal ? (
                          <span className="text-emerald-700 font-bold">{displayTotal}</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuote(q);
                          }}
                          className="py-1.5 px-3.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 border border-slate-200 text-xs font-bold transition text-slate-700"
                        >
                          Review Ticket
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="block md:hidden divide-y divide-slate-100">
            {filteredQuotes.map((q) => {
              const status = q.status || 'pending';
              const isTakeout = q.orderType === 'takeout' || (!q.orderType && !q.guests);
              const displayTotal = q.totalPrice || q.quoted_price || (q.quotedPrice ? `$${q.quotedPrice}` : null);
              return (
                <div 
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className="p-4 active:bg-slate-50 transition cursor-pointer space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-amber-600 text-xs">#{q.id}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isTakeout ? 'bg-amber-100 text-amber-900' : 'bg-orange-100 text-orange-950'
                        }`}>
                          {isTakeout ? '🥡 Takeout' : '🍽️ Table'}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mt-0.5">{q.customer_name || q.name}</h4>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {status === 'pending' ? 'Prep Queue' : status === 'quoted' ? 'Cooking' : 'Ready'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 font-medium">
                    {q.itemsSummary || q.detailedService || q.serviceCategory}
                  </div>

                  <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span>⏰ {q.time || 'ASAP'} {q.guests ? `(${q.guests} Guests)` : ''}</span>
                    {displayTotal ? (
                      <span className="font-mono font-bold text-emerald-700">{displayTotal}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onUpdate={handleQuoteUpdated}
        />
      )}

      {/* New Manual Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={handleNewOrderCreated}
      />
    </div>
  );
}
