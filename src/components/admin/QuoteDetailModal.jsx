import React, { useState } from 'react';
import { 
  X, Phone, Mail, Clock, CheckCircle2, Send, 
  AlertCircle, Loader2, DollarSign, Trash2, ArrowUpRight, 
  UtensilsCrossed, Users, ChefHat, BellRing
} from 'lucide-react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function QuoteDetailModal({ quote, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('ticket_dispatch'); // 'ticket_dispatch' | 'ticket_items'
  const [status, setStatus] = useState(quote?.status || 'pending');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Dispatch / Guest Alert State
  const initialPrice = quote?.totalPrice || quote?.quoted_price || (quote?.quotedPrice ? `$${quote.quotedPrice}` : '$24.50');
  const [price, setPrice] = useState(initialPrice.replace('$', ''));
  const [readyTime, setReadyTime] = useState(quote?.time || 'Hot & Ready in 15–20 Mins');
  const isTakeout = quote?.orderType === 'takeout' || (!quote?.orderType && !quote?.guests);

  const [message, setMessage] = useState(
    quote?.adminMessage || 
    (isTakeout
      ? `Hi ${quote?.customer_name || quote?.name || 'Guest'}, your takeout order at ${BUSINESS_INFO.name} is now cooking! It will be boxed and ready for pickup at our front counter in about 15 minutes. Call ${BUSINESS_INFO.phone} when pulling up if you need curb delivery.`
      : `Hi ${quote?.customer_name || quote?.name || 'Guest'}, your table reservation at ${BUSINESS_INFO.name} for ${quote?.guests || '2'} guests at ${quote?.time || 'today'} has been confirmed! We look forward to hosting you at 110 W Main St.`)
  );
  
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!quote) return null;

  const handleStatusChange = async (newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const updated = await quotesApi.updateStatus(quote.id, newStatus);
      setStatus(newStatus);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      alert('Failed to update kitchen status: ' + err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendAlert = async (e) => {
    e.preventDefault();
    setIsSendingAlert(true);
    setSendError('');
    setSendSuccess(false);

    try {
      const result = await quotesApi.sendQuote(quote.id, {
        price: price ? `$${price}` : initialPrice,
        turnaround: readyTime,
        warranty: 'Freshly Prepared Guarantee',
        message
      });

      setSendSuccess(true);
      setStatus('quoted');
      if (onUpdate && result.quote) {
        onUpdate(result.quote);
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to dispatch guest notification.');
    } finally {
      setIsSendingAlert(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to remove Ticket #${quote.id}?`)) return;
    setIsDeleting(true);
    try {
      await quotesApi.deleteQuote(quote.id);
      if (onUpdate) onUpdate({ ...quote, _deleted: true });
      onClose();
    } catch (err) {
      alert('Error deleting order ticket: ' + err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  #{quote.id}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  isTakeout ? 'bg-amber-100 text-amber-900' : 'bg-orange-100 text-orange-950'
                }`}>
                  {isTakeout ? '🥡 Takeout Pickup' : '🍽️ Table Reservation'}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(quote.createdAt || quote.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 mt-0.5">
                {quote.customer_name || quote.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Kitchen Status Selector */}
            <select
              value={status}
              disabled={isUpdatingStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition outline-none cursor-pointer ${
                status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <option value="pending">⏳ Prep Queue (Incoming)</option>
              <option value="quoted">🍳 Cooking on the Grill</option>
              <option value="completed">✅ Ready / Handed to Guest</option>
              <option value="archived">📦 Archived Ticket</option>
            </select>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Contact & Order Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          {(quote.customer_phone || quote.phone) && (
            <a 
              href={`tel:${(quote.customer_phone || quote.phone).replace(/[^0-9]/g, '')}`}
              className="flex items-center space-x-1.5 hover:text-slate-900 text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-semibold">{quote.customer_phone || quote.phone}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          )}

          {(quote.customer_email || quote.email) && (
            <a 
              href={`mailto:${quote.customer_email || quote.email}`}
              className="flex items-center space-x-1.5 hover:text-slate-900 text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition"
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-semibold">{quote.customer_email || quote.email}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          )}

          <div className="flex items-center space-x-1.5 text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-semibold">{quote.time || 'ASAP (20 Mins)'}</span>
          </div>

          {quote.guests && (
            <div className="flex items-center space-x-1.5 text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Users className="w-3.5 h-3.5 text-orange-600" />
              <span className="font-semibold">{quote.guests} Guests</span>
            </div>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 px-6 bg-white">
          <button
            onClick={() => setActiveTab('ticket_dispatch')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'ticket_dispatch'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BellRing className="w-4 h-4 text-amber-600" />
            <span>Kitchen Pass & Guest SMS</span>
          </button>
          <button
            onClick={() => setActiveTab('ticket_items')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'ticket_items'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ChefHat className="w-4 h-4 text-slate-400" />
            <span>Ordered Dishes & Kitchen Notes</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/40">
          {activeTab === 'ticket_dispatch' ? (
            /* TAB 1: Kitchen Dispatch & Guest Alert */
            <div className="space-y-6">
              {/* Status Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleStatusChange('quoted')}
                  className={`p-3 rounded-2xl border text-left transition ${
                    status === 'quoted' 
                      ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs' 
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span>🍳</span>
                    <span>1. Cooking on Grill</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Ticket placed in active fryer & flat-top queue.</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange('completed')}
                  className={`p-3 rounded-2xl border text-left transition ${
                    status === 'completed' 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs' 
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-700">
                    <span>✅</span>
                    <span>2. Ready at Counter</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Boxed hot, bagged with sauces & receipt.</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange('archived')}
                  className={`p-3 rounded-2xl border text-left transition ${
                    status === 'archived' 
                      ? 'bg-slate-100 border-slate-300 text-slate-900' 
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 text-slate-600">
                    <span>📦</span>
                    <span>3. Picked Up / Settled</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Guest has picked up or table finished meal.</div>
                </button>
              </div>

              {/* Success Banner */}
              {sendSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-3 shadow-xs animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block text-emerald-900 font-bold">Alert Sent to {quote.customer_name || quote.name}!</strong>
                    <span>Guest received instant SMS/email notification with pickup timing.</span>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {sendError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{sendError}</span>
                </div>
              )}

              <form onSubmit={handleSendAlert} className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                {/* Total & Pickup Timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Order Subtotal / Total ($ USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="24.50"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-600 focus:bg-white rounded-xl pl-10 pr-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none font-bold font-mono transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Estimated Ready / Pickup Time
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={readyTime}
                        onChange={(e) => setReadyTime(e.target.value)}
                        placeholder="e.g. Hot & Ready in 15–20 Mins"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-600 focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Alert Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    SMS / Email Notification Message to Guest
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message or pickup instruction..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-600 focus:bg-white rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 outline-none leading-relaxed transition"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Sent directly to the guest's phone or email to prevent counter waiting lines.
                  </span>
                </div>

                {/* Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Recipient: <strong className="text-slate-800">{quote.customer_phone || quote.phone || quote.customer_email || quote.email}</strong>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingAlert}
                    className="w-full sm:w-auto py-3 px-6 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-amber-600/20 flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
                  >
                    {isSendingAlert ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Alert to Guest...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Guest Ready Alert</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* TAB 2: Ordered Items & Kitchen Prep Notes */
            <div className="space-y-6">
              {/* Ordered Dishes Breakdown */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Ordered Dishes & Items
                </span>

                {quote.items && quote.items.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {quote.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                            {item.count}x
                          </span>
                          <span className="font-semibold text-slate-900 text-sm">{item.title}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-700">{item.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl text-sm font-semibold text-slate-800">
                    {quote.itemsSummary || quote.detailedService || quote.serviceCategory || 'Standard Order'}
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-500">Order Total:</span>
                  <span className="font-mono font-black text-emerald-700 text-base">
                    {quote.totalPrice || quote.quoted_price || (quote.quotedPrice ? `$${quote.quotedPrice}` : '$24.50')}
                  </span>
                </div>
              </div>

              {/* Special Instructions / Notes */}
              {quote.details && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Special Kitchen Notes & Preferences
                  </span>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-medium">
                    "{quote.details}"
                  </p>
                </div>
              )}

              {/* Ticket Meta */}
              <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-500 flex flex-wrap justify-between gap-2">
                <span>Received: {new Date(quote.createdAt || quote.created_at || Date.now()).toLocaleString()}</span>
                <span>Source: Website Online Order & Diner Portal</span>
              </div>

              {/* Delete Button */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition flex items-center space-x-1.5 border border-red-200 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeleting ? 'Deleting...' : 'Cancel / Remove Ticket'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
