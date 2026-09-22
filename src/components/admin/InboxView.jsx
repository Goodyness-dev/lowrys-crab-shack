import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Send, Phone, Mail, Clock, CheckCircle2, 
  UtensilsCrossed, Users, DollarSign, ArrowUpRight, 
  Loader2, MessageSquare, AlertCircle, ChefHat, BellRing
} from 'lucide-react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function InboxView({ onOpenFullQuote }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Reply Composer State
  const [replyText, setReplyText] = useState('');
  const [attachPrice, setAttachPrice] = useState(false);
  const [quotePrice, setQuotePrice] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadThreads();
    const interval = setInterval(loadThreads, 10000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadThreads = async () => {
    try {
      const res = await quotesApi.getInbox({ status: statusFilter, search: searchTerm });
      const threadList = res.threads || [];
      setThreads(threadList);

      if (!selectedThread && threadList.length > 0) {
        selectThread(threadList[0]);
      } else if (selectedThread) {
        const updated = threadList.find(t => t.id === selectedThread.id);
        if (updated) setSelectedThread(updated);
      }
    } catch (err) {
      console.warn('Error loading inbox threads:', err);
    } finally {
      setIsLoadingThreads(false);
    }
  };

  const selectThread = async (thread) => {
    setSelectedThread(thread);
    setIsLoadingMessages(true);
    setSendError('');
    try {
      const res = await quotesApi.getMessages(thread.id);
      setMessages(res.messages || []);
      scrollToBottom();
    } catch (err) {
      console.error('Error loading messages for thread:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSendReply = async (e) => {
    e?.preventDefault();
    if (!replyText.trim() && !quotePrice.trim()) return;

    setIsSending(true);
    setSendError('');

    try {
      const res = await quotesApi.sendMessage(selectedThread.id, {
        message: replyText.trim(),
        quotePrice: attachPrice && quotePrice ? quotePrice.trim() : null
      });

      if (res.message) {
        setMessages(prev => [...prev, res.message]);
        setReplyText('');
        if (attachPrice) {
          setQuotePrice('');
          setAttachPrice(false);
        }
        scrollToBottom();
        loadThreads();
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedThread) return;
    try {
      await quotesApi.updateStatus(selectedThread.id, newStatus);
      setSelectedThread(prev => ({ ...prev, status: newStatus }));
      setThreads(prev => prev.map(t => t.id === selectedThread.id ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert('Failed to update kitchen status: ' + err.message);
    }
  };

  const handleQuickTemplate = (text) => {
    setReplyText(text);
  };

  const filteredThreads = threads.filter(t => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return (
      t.name?.toLowerCase().includes(s) ||
      t.customer_name?.toLowerCase().includes(s) ||
      t.email?.toLowerCase().includes(s) ||
      t.itemsSummary?.toLowerCase().includes(s) ||
      t.detailedService?.toLowerCase().includes(s) ||
      t.id?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs flex flex-col md:flex-row h-[80vh] min-h-[580px]">
      {/* ------------------------------------------------------------- */}
      {/* LEFT PANE: CONVERSATION LIST                                  */}
      {/* ------------------------------------------------------------- */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white ${selectedThread ? 'hidden md:flex' : 'flex'}`}>
        {/* Search & Header */}
        <div className="p-4 border-b border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <h2 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
                Guest Orders & SMS
              </h2>
            </div>
            <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {threads.length} active
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guest name, dishes, or ticket #..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-amber-600 focus:bg-white rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px]">
            {['all', 'pending', 'quoted', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 rounded-lg font-bold transition capitalize ${
                  statusFilter === f
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                {f === 'pending' ? 'Prep Queue' : f === 'quoted' ? 'Cooking' : f === 'completed' ? 'Served' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {isLoadingThreads ? (
            <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center space-y-2">
              <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
              <span>Loading kitchen messages...</span>
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No orders found in inbox.
            </div>
          ) : (
            filteredThreads.map(thread => {
              const isSelected = selectedThread?.id === thread.id;
              const status = thread.status || 'pending';
              const isTakeout = thread.orderType === 'takeout' || (!thread.orderType && !thread.guests);
              const initials = (thread.customer_name || thread.name || 'G')
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={thread.id}
                  onClick={() => selectThread(thread)}
                  className={`p-3.5 cursor-pointer transition flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-amber-50/70 border-l-4 border-l-amber-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Initials Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
                        {thread.customer_name || thread.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                        {new Date(thread.createdAt || thread.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isTakeout ? 'bg-amber-100 text-amber-900' : 'bg-orange-100 text-orange-950'
                      }`}>
                        {isTakeout ? '🥡 Takeout' : '🍽️ Table'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium truncate">
                        {thread.time || 'ASAP'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 truncate mt-1">
                      {thread.itemsSummary || thread.detailedService || thread.serviceCategory}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {status === 'pending' ? 'Prep Queue' : status === 'quoted' ? 'Cooking' : 'Ready'}
                      </span>

                      {(thread.totalPrice || thread.quoted_price || thread.quotedPrice) && (
                        <span className="font-mono text-[11px] font-bold text-emerald-700">
                          {thread.totalPrice || thread.quoted_price || `$${thread.quotedPrice}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT PANE: ACTIVE THREAD & COMPOSER                          */}
      {/* ------------------------------------------------------------- */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col bg-slate-50/60">
          {/* Thread Header */}
          <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
            <button
              onClick={() => setSelectedThread(null)}
              className="md:hidden text-xs text-slate-500 hover:text-slate-900 flex items-center space-x-1"
            >
              <span>← Back</span>
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-black text-base sm:text-lg text-slate-900">
                  {selectedThread.customer_name || selectedThread.name}
                </h3>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  #{selectedThread.id}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="font-medium text-slate-700">
                  {selectedThread.orderType === 'takeout' ? '🥡 Takeout Pickup' : '🍽️ Table Reservation'} • {selectedThread.time || 'ASAP'}
                </span>
                <span>•</span>
                {(selectedThread.customer_phone || selectedThread.phone) && (
                  <a href={`tel:${(selectedThread.customer_phone || selectedThread.phone).replace(/[^0-9]/g, '')}`} className="text-amber-700 hover:underline flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{selectedThread.customer_phone || selectedThread.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Status Control */}
            <div className="flex items-center space-x-2">
              <select
                value={selectedThread.status || 'pending'}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 text-slate-800 outline-none cursor-pointer hover:border-slate-300 transition"
              >
                <option value="pending">⏳ Prep Queue</option>
                <option value="quoted">🍳 Cooking</option>
                <option value="completed">✅ Ready / Picked Up</option>
                <option value="archived">📦 Archived</option>
              </select>

              {onOpenFullQuote && (
                <button
                  onClick={() => onOpenFullQuote(selectedThread)}
                  className="py-2 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
                >
                  Kitchen Ticket
                </button>
              )}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Order Summary Banner Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-700 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-100 pb-2">
                <div className="flex items-center space-x-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                  <span>Ticket Summary & Dietary Preferences</span>
                </div>
                <span className="text-[11px] text-slate-400 font-normal">
                  {new Date(selectedThread.createdAt || selectedThread.created_at || Date.now()).toLocaleTimeString()}
                </span>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-slate-900 text-sm">
                  {selectedThread.itemsSummary || selectedThread.detailedService || selectedThread.serviceCategory}
                </div>
                {selectedThread.details && (
                  <p className="text-slate-600 italic">
                    Special notes: "{selectedThread.details}"
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">
                  Target Timing: <strong className="text-slate-800">{selectedThread.time || 'ASAP (20 Mins)'}</strong>
                </span>
                <span className="font-mono font-bold text-emerald-700 text-sm">
                  Total: {selectedThread.totalPrice || selectedThread.quoted_price || (selectedThread.quotedPrice ? `$${selectedThread.quotedPrice}` : '$24.50')}
                </span>
              </div>
            </div>

            {/* Conversation Messages */}
            {isLoadingMessages ? (
              <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center space-y-2">
                <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                <span>Loading messages...</span>
              </div>
            ) : (
              messages.map(msg => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 px-1 text-[11px] text-slate-400">
                      <span className="font-bold text-slate-700">{isAdmin ? 'Kitchen Staff' : (selectedThread.customer_name || selectedThread.name)}</span>
                      <span>•</span>
                      <span>{new Date(msg.createdAt || msg.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isAdmin
                        ? 'bg-amber-600 text-white rounded-tr-xs shadow-md shadow-amber-600/15'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}>
                      <p>{msg.message}</p>
                    </div>

                    <span className="text-[10px] text-slate-400 px-1 mt-1">
                      {isAdmin ? `Delivered via SMS & Email to ${selectedThread.phone || selectedThread.email}` : 'Received from diner web app'}
                    </span>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Reply Composer Bar */}
          <div className="p-4 border-t border-slate-200 bg-white space-y-3">
            {sendError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{sendError}</span>
              </div>
            )}

            {/* Quick Kitchen Alert Shortcuts */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px]">
              <span className="text-slate-400 text-[10px] font-bold shrink-0">1-TAP ALERTS:</span>
              <button
                type="button"
                onClick={() => handleQuickTemplate(`Hi! Your order is now sizzling on the flat-top grill. Should be ready in about 12 minutes.`)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 shrink-0 font-medium text-slate-700 transition"
              >
                🍳 Cooking (12 Mins)
              </button>
              <button
                type="button"
                onClick={() => handleQuickTemplate(`Your takeout order is hot, boxed, and waiting for you at the front counter at 110 W Main St! See you shortly.`)}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 font-medium transition"
              >
                🔔 Order Ready for Pickup!
              </button>
              <button
                type="button"
                onClick={() => handleQuickTemplate(`Your table is set and ready! Welcome to Lowry's Crab Shack.`)}
                className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-900 border border-orange-200 shrink-0 font-medium transition"
              >
                🍽️ Table is Ready!
              </button>
            </div>

            {/* Composer Input Form */}
            <form onSubmit={handleSendReply} className="flex items-end space-x-2">
              <textarea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSendReply(e);
                  }
                }}
                placeholder={`Reply to ${selectedThread.customer_name || selectedThread.name}... (Press Ctrl+Enter to send)`}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-amber-600 focus:bg-white rounded-2xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none resize-none leading-relaxed transition"
              />

              <button
                type="submit"
                disabled={isSending || (!replyText.trim() && !quotePrice.trim())}
                className="py-3 px-5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-2xl transition shadow-md shadow-amber-600/20 flex items-center space-x-2 shrink-0 active:scale-95 cursor-pointer"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Send SMS</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Guest receives SMS / email alert directly to their phone.</span>
              <span className="hidden sm:inline font-mono">Ctrl + Enter to send</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 space-y-2 bg-slate-50/50">
          <MessageSquare className="w-10 h-10 text-slate-300" />
          <h4 className="text-sm font-bold text-slate-800">No Ticket Selected</h4>
          <p className="text-xs max-w-xs text-center text-slate-500">
            Pick a guest order from the list on the left to read order details and send kitchen updates.
          </p>
        </div>
      )}
    </div>
  );
}
