import React, { useState } from 'react';
import { X, Plus, UtensilsCrossed, Loader2, Check, Clock, Users, DollarSign } from 'lucide-react';
import { quotesApi } from '../../services/api';
import { SERVICES } from '../../data/servicesData';

export default function NewOrderModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orderType: 'takeout', // 'takeout' or 'table'
    time: 'ASAP (15-20 Mins)',
    guests: '2',
    selectedDishId: SERVICES[0]?.id || '',
    itemsSummary: '',
    price: '',
    details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDishSelect = (e) => {
    const dishId = e.target.value;
    const dish = SERVICES.find(s => s.id === dishId);
    if (dish) {
      setFormData(prev => ({
        ...prev,
        selectedDishId: dishId,
        itemsSummary: prev.itemsSummary ? `${prev.itemsSummary}, 1x ${dish.title}` : `1x ${dish.title}`,
        price: prev.price ? (parseFloat(prev.price.replace('$', '')) + (dish.numericPrice || 12.95)).toFixed(2) : (dish.numericPrice || 12.95).toFixed(2)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Please provide the guest name.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const isTakeout = formData.orderType === 'takeout';
      const orderId = `PFR-WLK-${Date.now().toString().slice(-4)}`;
      const payload = {
        id: orderId,
        name: formData.name,
        customer_name: formData.name,
        phone: formData.phone || '(540) 338-0400',
        customer_phone: formData.phone || '(540) 338-0400',
        email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@guest.local`,
        customer_email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@guest.local`,
        orderType: formData.orderType,
        serviceCategory: isTakeout ? 'Takeout Pickup' : 'Dine-In Table Reservation',
        detailedService: isTakeout 
          ? `Takeout (${formData.time})` 
          : `Table Reservation (${formData.guests} Guests • ${formData.time})`,
        itemsSummary: formData.itemsSummary || (isTakeout ? 'Homestyle Takeout Order' : 'Table Reservation'),
        time: formData.time,
        guests: isTakeout ? null : formData.guests,
        details: formData.details || (isTakeout ? 'Walk-in / Phone order' : 'Table reservation'),
        totalPrice: formData.price ? (formData.price.startsWith('$') ? formData.price : `$${formData.price}`) : '$18.50',
        quoted_price: formData.price ? (formData.price.startsWith('$') ? formData.price : `$${formData.price}`) : '$18.50',
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const res = await quotesApi.submitPublicQuote(payload);
      if (onCreated) onCreated(res.quote || payload);
      onClose();
    } catch (err) {
      setError(err.data?.error || err.message || 'Failed to create restaurant ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black font-heading text-slate-900">New Kitchen Ticket / Reservation</h2>
              <p className="text-xs text-slate-500">Record phone takeout, walk-in orders, or dining room tables</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Type Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, orderType: 'takeout' }))}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                formData.orderType === 'takeout' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🥡 Takeout Pickup</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, orderType: 'table' }))}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                formData.orderType === 'table' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🍽️ Table Reservation</span>
            </button>
          </div>

          {/* Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Guest / Family Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Miller Family or Dave S."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(540) 338-0000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Time & Party Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{formData.orderType === 'takeout' ? 'Pickup Timing' : 'Seating Time'}</span>
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
              >
                {formData.orderType === 'takeout' ? (
                  <>
                    <option value="ASAP (15-20 Mins)">ASAP (15–20 Mins)</option>
                    <option value="In 30 Minutes">In 30 Minutes</option>
                    <option value="In 45 Minutes">In 45 Minutes</option>
                    <option value="12:00 PM (Lunch Rush)">12:00 PM (Lunch Rush)</option>
                    <option value="5:30 PM (Dinner)">5:30 PM (Dinner)</option>
                    <option value="6:30 PM (Dinner)">6:30 PM (Dinner)</option>
                  </>
                ) : (
                  <>
                    <option value="Tonight 5:30 PM">Tonight 5:30 PM</option>
                    <option value="Tonight 6:00 PM">Tonight 6:00 PM</option>
                    <option value="Tonight 6:30 PM">Tonight 6:30 PM</option>
                    <option value="Tonight 7:00 PM">Tonight 7:00 PM</option>
                    <option value="Tomorrow Morning 9:00 AM">Tomorrow 9:00 AM (Breakfast)</option>
                    <option value="Tomorrow 12:30 PM">Tomorrow 12:30 PM (Lunch)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              {formData.orderType === 'table' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Party Size</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
                  >
                    <option value="1">1 Person (Counter)</option>
                    <option value="2">2 Guests (Table/Booth)</option>
                    <option value="3">3 Guests (Booth)</option>
                    <option value="4">4 Guests (Family Table)</option>
                    <option value="6">6 Guests (Large Table)</option>
                    <option value="8+">8+ Guests (Group Banquet)</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Total Estimate ($)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$24.50"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Dish Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Add Popular Dish to Order
            </label>
            <div className="flex gap-2">
              <select
                onChange={handleDishSelect}
                defaultValue=""
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
              >
                <option value="" disabled>-- Select a dish to append --</option>
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.price})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Order Items & Summary</label>
            <input
              type="text"
              value={formData.itemsSummary}
              onChange={(e) => setFormData({ ...formData, itemsSummary: e.target.value })}
              placeholder="e.g. 2x Buttermilk Pancakes, 1x Sausage Platter, 1x Coffee"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
            />
          </div>

          {/* Kitchen Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kitchen Prep Instructions & Notes</label>
            <textarea
              rows={2}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="e.g. Extra butter on pancakes, dressing on side, booth requested, high chair needed..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-amber-600/20 active:scale-95 cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              <span>Send to Kitchen Pass</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
