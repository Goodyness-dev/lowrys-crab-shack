import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Plus, Clock, CheckCircle2, 
  UtensilsCrossed, Send, Coffee, Calendar, 
  Play, Pause, RotateCcw, ChevronRight, Phone, Mail, User, Flame, Sparkles
} from 'lucide-react';
import { quotesApi } from '../../services/api';

export default function DashboardOverview({ onNavigateTab, onSelectQuote, onOpenNewOrder }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Kitchen Service Shift Clock
  const [timerSeconds, setTimerSeconds] = useState(4820); // 01:20:20 initial
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ limit: 10 }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Dashboard load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const urgentOrder = quotes.find(q => q.status === 'pending') || quotes[0];

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER: Title & Quick Actions                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900">
            Kitchen & Dining Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Manage live takeout tickets, steamed crab pre-orders, and kitchen volume in Hamilton, VA.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenNewOrder}
            className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-red-600/20 flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Order Ticket</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm rounded-xl transition shadow-sm active:scale-95"
          >
            All Orders Board
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 STAT CARDS (Card 1: Solid Red Hero, Cards 2-4: Clean White)  */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Solid Brand Red Fill */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-6 shadow-lg shadow-red-600/20 cursor-pointer transition hover:scale-[1.01] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-red-100">Today's Guest Orders</span>
            <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading tracking-tight">{stats.total}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-red-100 bg-white/15 px-2.5 py-1 rounded-full w-max font-medium">
            <span>↑ 18%</span>
            <span>daily dining volume</span>
          </div>
        </div>

        {/* Card 2: Completed Food Orders (White Card) */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dishes Cooked & Picked Up</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
              <ArrowUpRight className="w-4 h-4 text-slate-700" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-slate-900">{stats.completed}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max font-medium">
            <span>✓ 100%</span>
            <span>kitchen order accuracy</span>
          </div>
        </div>

        {/* Card 3: Table Reservations & Confirmed Pickups (White Card) */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Confirmed Tables</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
              <ArrowUpRight className="w-4 h-4 text-slate-700" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-slate-900">{stats.quoted}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full w-max font-medium">
            <span>🍽️ Reserved</span>
            <span>dining room tables</span>
          </div>
        </div>

        {/* Card 4: Active Kitchen Tickets (White Card with Red Accent) */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white border border-red-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Active Kitchen Tickets</span>
            <div className="w-8 h-8 rounded-full border border-red-200 bg-red-50 flex items-center justify-center hover:opacity-80 transition">
              <ArrowUpRight className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-red-600">{stats.pending}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full w-max font-medium">
            <span>🔥 On the Pass</span>
            <span>awaiting pickup / prep</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECOND ROW: Weekly Analytics + Hot on the Pass + Active Orders */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Dining Volume (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
              Kitchen Service Volume
            </h3>
            <span className="text-xs text-slate-400 font-bold">This Week</span>
          </div>

          {/* Bar Chart Visual (Matching reference pill bar graph) */}
          <div className="flex items-end justify-between gap-3 h-40 pt-4 px-2">
            {[
              { day: 'Sun', height: '65%', count: 8, solid: false },
              { day: 'Mon', height: '80%', count: 12, solid: true },
              { day: 'Tue', height: '60%', count: 9, solid: true },
              { day: 'Wed', height: '75%', count: 11, solid: true, highlight: 'Peak Rush' },
              { day: 'Thu', height: '70%', count: 10, solid: true },
              { day: 'Fri', height: '95%', count: 16, solid: false },
              { day: 'Sat', height: '90%', count: 15, solid: false }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {bar.highlight && (
                  <span className="absolute -top-7 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    {bar.highlight}
                  </span>
                )}
                <div 
                  className={`w-full max-w-[36px] rounded-full transition-all duration-300 ${
                    bar.solid 
                      ? 'bg-gradient-to-t from-red-700 to-red-500 shadow-sm' 
                      : 'bg-slate-100 border border-slate-200/80'
                  }`}
                  style={{ height: bar.height }}
                />
                <span className="text-[11px] font-bold text-slate-400 mt-2">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-100 mt-2 text-xs">
            <span className="flex items-center space-x-2 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span>Completed Pickups</span>
            </span>
            <span className="flex items-center space-x-2 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span>In Kitchen Queue</span>
            </span>
          </div>
        </div>

        {/* Middle: Hot on the Pass / Urgent Kitchen Ticket (3 Cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-red-600 uppercase tracking-wider mb-3">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>Hot on the Pass</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>

            {urgentOrder ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black font-heading text-slate-900 leading-tight">
                    {urgentOrder.name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {urgentOrder.orderType === 'takeout' ? '🥡 Takeout' : '🍽️ Table'}
                  </span>
                </div>
                <div className="text-xs text-red-600 font-bold">
                  {urgentOrder.itemsSummary || urgentOrder.detailedService || 'Takeout Order'}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {urgentOrder.details || 'Customer requested takeout pickup.'}
                </p>
                <div className="text-[11px] text-slate-400 flex items-center space-x-1 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Ready Time: {urgentOrder.time || 'ASAP (20 Mins)'}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-6">No kitchen orders waiting right now.</div>
            )}
          </div>

          <button
            onClick={() => urgentOrder && onSelectQuote(urgentOrder)}
            className="w-full mt-4 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl transition shadow-md shadow-red-600/20 flex items-center justify-center space-x-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Open Kitchen Ticket</span>
          </button>
        </div>

        {/* Right: Quick Recent Orders List (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
              Recent Tickets
            </h3>
            <button
              onClick={onOpenNewOrder}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-lg"
            >
              <Plus className="w-3 h-3" />
              <span>New</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {quotes.slice(0, 4).map(q => (
              <div 
                key={q.id}
                onClick={() => onSelectQuote(q)}
                className="py-2.5 flex items-center justify-between hover:bg-slate-50 rounded-xl px-2 -mx-2 transition cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-xs text-slate-900 truncate flex items-center gap-1.5">
                    <span>{q.name}</span>
                    <span className="text-[10px] font-normal text-slate-400">
                      ({q.orderType === 'takeout' ? '🥡' : '🍽️'})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {q.itemsSummary || q.detailedService || 'Dine-In / Takeout'}
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  q.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  q.status === 'quoted' || q.status === 'in-kitchen' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  q.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {q.status === 'pending' ? 'Pending Prep' : q.status === 'in-kitchen' ? 'Cooking' : q.status === 'quoted' ? 'Reserved' : 'Picked Up'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="w-full text-center text-xs font-bold text-red-600 hover:text-red-700 pt-3 border-t border-slate-100 mt-2 flex items-center justify-center space-x-1"
          >
            <span>View all {quotes.length} dining tickets</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* THIRD ROW: Customer Inquiries + Prep Gauge + Kitchen Shift Clock */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
              Guest Orders & Messages
            </h3>
            <button
              onClick={() => onNavigateTab('inbox')}
              className="text-xs font-bold text-slate-600 hover:text-red-600 flex items-center space-x-1 border border-slate-200 px-2.5 py-1 rounded-xl"
            >
              <span>Open Messages</span>
            </button>
          </div>

          <div className="space-y-3">
            {quotes.slice(0, 4).map(q => {
              const initials = (q.name || 'Guest').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div 
                  key={q.id}
                  onClick={() => onSelectQuote(q)}
                  className="p-3 bg-slate-50/70 hover:bg-slate-100/80 border border-slate-100 rounded-2xl flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-slate-900 truncate">{q.name}</h5>
                      <span className="text-[11px] text-slate-500 truncate block">
                        {q.orderType === 'takeout' ? '🥡 Takeout' : '🍽️ Table'} • {q.time || 'ASAP'}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    q.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    q.status === 'quoted' || q.status === 'in-kitchen' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {q.status === 'completed' ? 'Picked Up' : q.status === 'in-kitchen' ? 'Cooking' : q.status === 'quoted' ? 'Reserved' : 'Pending Prep'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle: Kitchen Prep Gauge (3 Cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900 mb-2">
            Kitchen Speed
          </h3>

          <div className="relative flex flex-col items-center justify-center py-2">
            {/* SVG Arc Gauge */}
            <svg className="w-36 h-20" viewBox="0 0 100 50">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 10 50 A 40 40 0 0 1 80 18"
                fill="none"
                stroke="#dc2626"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center -mt-6">
              <div className="text-3xl font-black font-heading text-slate-900">94%</div>
              <span className="text-[11px] font-bold text-slate-400">Ready in &lt;20 Mins</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Served Fresh</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span>On Time</span>
            </span>
          </div>
        </div>

        {/* Right: Live Kitchen Service Shift Clock (4 Cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-black text-white border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Kitchen Service Clock</span>
            <span className="text-emerald-400 font-mono text-[11px]">● ACTIVE SERVICE</span>
          </div>

          <div className="my-4 text-center">
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-widest text-white">
              {formatTimer(timerSeconds)}
            </div>
            <span className="text-xs text-slate-400 mt-1 block">Main St. Shift Prep & Grill Timer</span>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="w-10 h-10 rounded-2xl bg-white text-slate-900 flex items-center justify-center hover:bg-slate-200 transition active:scale-95"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setTimerSeconds(0)}
              className="w-10 h-10 rounded-2xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center hover:bg-slate-700 transition active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
