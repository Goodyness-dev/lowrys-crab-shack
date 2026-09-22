import React, { useState, useEffect } from 'react';
import { CloseIcon, PhoneIcon, SpoonForkIcon, CheckIcon, CoffeeIcon } from '../common/Icons';
import { SERVICES, CATEGORIES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';
import { quotesApi } from '../../services/api';

export default function TableOrderModal({ isOpen, onClose, preselectedItem }) {
  const [orderType, setOrderType] = useState('takeout'); // 'takeout' | 'table'
  const [activeCategory, setActiveCategory] = useState('All Plates');
  const [selectedItems, setSelectedItems] = useState({}); // { [id]: { item, count } }
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    time: 'In 20 Minutes (ASAP)',
    guests: '2',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // If opened with a preselected item from a card
  useEffect(() => {
    if (preselectedItem && preselectedItem.id && typeof preselectedItem !== 'function') {
      const validItem = {
        ...preselectedItem,
        title: preselectedItem.title || preselectedItem.name || 'Selected Dish',
        price: preselectedItem.price || (preselectedItem.numericPrice ? `$${Number(preselectedItem.numericPrice).toFixed(2)}` : '$12.95'),
        numericPrice: preselectedItem.numericPrice != null 
          ? Number(preselectedItem.numericPrice) 
          : (preselectedItem.price ? parseFloat(String(preselectedItem.price).replace(/[^0-9.]/g, '')) || 0 : 0)
      };

      setSelectedItems(prev => ({
        ...prev,
        [validItem.id]: {
          item: validItem,
          count: (prev[validItem.id]?.count || 0) + 1
        }
      }));
    }
  }, [preselectedItem]);

  if (!isOpen) return null;

  const addItem = (item) => {
    if (!item || !item.id) return;
    const validItem = {
      ...item,
      title: item.title || item.name || 'Selected Dish',
      price: item.price || (item.numericPrice ? `$${Number(item.numericPrice).toFixed(2)}` : '$12.95'),
      numericPrice: item.numericPrice != null 
        ? Number(item.numericPrice) 
        : (item.price ? parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0 : 0)
    };

    setSelectedItems(prev => {
      const current = prev[validItem.id]?.count || 0;
      return {
        ...prev,
        [validItem.id]: { item: validItem, count: current + 1 }
      };
    });
  };

  const removeItem = (itemId) => {
    if (!itemId) return;
    setSelectedItems(prev => {
      const current = prev[itemId]?.count || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: { ...prev[itemId], count: current - 1 }
      };
    });
  };

  const totalCount = Object.values(selectedItems).reduce((sum, entry) => sum + (entry?.count || 0), 0);
  const subtotal = Object.values(selectedItems).reduce((sum, entry) => {
    if (!entry || !entry.item) return sum;
    const priceNum = entry.item.numericPrice != null
      ? Number(entry.item.numericPrice)
      : (entry.item.price ? parseFloat(String(entry.item.price).replace(/[^0-9.]/g, '')) || 0 : 0);
    return sum + (priceNum * (entry.count || 1));
  }, 0);

  const filteredServices = activeCategory === 'All Plates'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderItems = Object.values(selectedItems).map(({ item, count }) => ({
      title: item.title || item.name || 'Custom Plate',
      count,
      price: item.price || `$${((item.numericPrice || 12.95) * count).toFixed(2)}`
    }));

    const orderPayload = {
      customer_name: formData.name,
      name: formData.name,
      customer_phone: formData.phone,
      phone: formData.phone,
      orderType: orderType,
      serviceCategory: orderType === 'takeout' ? 'Takeout Pickup' : 'Dine-In Table Reservation',
      detailedService: orderType === 'takeout' 
        ? `Takeout Order (${totalCount} items • ${formData.time})`
        : `Dine-In Table (Party of ${formData.guests} • ${formData.time})`,
      items: orderItems,
      itemsSummary: orderItems.map(i => `${i.count}x ${i.title}`).join(', ') || (orderType === 'takeout' ? 'Kitchen Takeout Order' : 'Table Reservation'),
      time: formData.time,
      guests: orderType === 'table' ? formData.guests : null,
      details: formData.notes || 'Submitted via customer online order.',
      quoted_price: `$${subtotal.toFixed(2)}`,
      totalPrice: `$${subtotal.toFixed(2)}`,
      status: 'pending'
    };

    quotesApi.submitPublicQuote(orderPayload).catch(err => console.warn('Submit note:', err));
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-cream-100 dark:bg-midnight-card w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl border-2 border-restaurant-brown/15 dark:border-midnight-border animate-scaleUp overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-cream-50 dark:bg-midnight border-b border-restaurant-brown/10 dark:border-midnight-border flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-restaurant-red animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-restaurant-red">
                Lowry's Crab Shack • 420 W Colonial Hwy, Hamilton, VA
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-restaurant-brown dark:text-cream-50 mt-0.5">
              {orderType === 'takeout' ? 'Order Takeout for Pickup' : 'Reserve a Table'}
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-cream-200 dark:bg-midnight-pure text-restaurant-brown dark:text-cream-100 hover:bg-restaurant-red hover:text-cream-50 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Menu Item Selector */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Order Mode Toggle */}
              <div className="flex bg-cream-200 dark:bg-midnight p-1 rounded-2xl border border-restaurant-brown/10">
                <button
                  type="button"
                  onClick={() => setOrderType('takeout')}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    orderType === 'takeout'
                      ? 'bg-restaurant-red text-cream-50 shadow-sm'
                      : 'text-restaurant-brown dark:text-cream-200 hover:text-restaurant-red'
                  }`}
                >
                  🥡 Takeout Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('table')}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    orderType === 'table'
                      ? 'bg-restaurant-red text-cream-50 shadow-sm'
                      : 'text-restaurant-brown dark:text-cream-200 hover:text-restaurant-red'
                  }`}
                >
                  🍽️ Dine-In Table
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                      activeCategory === cat
                        ? 'bg-restaurant-brown text-cream-50 font-bold'
                        : 'bg-cream-50 dark:bg-midnight text-restaurant-brown/80 dark:text-cream-300 border border-restaurant-brown/10 hover:bg-cream-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dish Selection Grid */}
              <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                {filteredServices.map(item => {
                  const qty = selectedItems[item.id]?.count || 0;
                  return (
                    <div 
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        qty > 0 
                          ? 'bg-cream-50 dark:bg-midnight border-restaurant-red/50 shadow-sm' 
                          : 'bg-cream-50/70 dark:bg-midnight/70 border-restaurant-brown/10 hover:border-restaurant-brown/30'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm text-restaurant-brown dark:text-cream-50 truncate">
                            {item.title}
                          </h4>
                          {item.popular && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold shrink-0">
                              ★ Top Pick
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-sans text-restaurant-ink/65 dark:text-cream-300 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                        <span className="font-mono font-bold text-xs text-restaurant-red mt-1 inline-block">
                          {item.price}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="shrink-0 flex items-center gap-2">
                        {qty > 0 ? (
                          <div className="flex items-center bg-cream-200 dark:bg-midnight-pure rounded-xl p-1 border border-restaurant-brown/20">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 rounded-lg bg-cream-100 dark:bg-midnight flex items-center justify-center font-bold text-xs text-restaurant-brown hover:bg-restaurant-red hover:text-white"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-bold text-restaurant-brown dark:text-cream-100">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => addItem(item)}
                              className="w-6 h-6 rounded-lg bg-restaurant-red text-cream-50 flex items-center justify-center font-bold text-xs hover:bg-restaurant-redHover"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addItem(item)}
                            className="px-3 py-1.5 rounded-xl bg-cream-200 hover:bg-restaurant-red hover:text-cream-50 text-restaurant-brown dark:bg-midnight dark:text-cream-100 text-xs font-mono font-semibold border border-restaurant-brown/15 transition-colors"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Order Summary & Customer Info */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Receipt / Selected Dish Tray */}
              <div className="p-5 rounded-2xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/10 dark:border-midnight-border">
                <div className="flex items-center justify-between pb-3 border-b border-restaurant-brown/10 text-xs font-mono font-bold uppercase text-restaurant-brown dark:text-cream-200">
                  <span>Selected Dishes ({totalCount})</span>
                  <span>Price</span>
                </div>

                <div className="max-h-36 overflow-y-auto divide-y divide-restaurant-brown/5 my-2">
                  {totalCount === 0 ? (
                    <div className="py-6 text-center text-xs text-restaurant-ink/50 dark:text-cream-400 font-sans">
                      {orderType === 'takeout' 
                        ? 'Click "+ Add" on any menu items on the left to build your order.'
                        : 'No dishes selected yet. You can pre-order favorites or just reserve a table below.'}
                    </div>
                  ) : (
                    Object.values(selectedItems).map(({ item, count }) => {
                      if (!item) return null;
                      const title = item.title || item.name || 'Dish';
                      const numPrice = item.numericPrice != null
                        ? Number(item.numericPrice)
                        : (item.price ? parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0 : 0);
                      return (
                        <div key={item.id || title} className="py-2 flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-1.5 truncate pr-2">
                            <span className="font-bold text-restaurant-red">{count}x</span>
                            <span className="truncate text-restaurant-brown dark:text-cream-100">{title}</span>
                          </div>
                          <span className="font-bold text-restaurant-brown dark:text-cream-100 shrink-0">
                            ${(numPrice * count).toFixed(2)}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                {totalCount > 0 && (
                  <div className="pt-3 border-t border-restaurant-brown/10 flex items-center justify-between font-mono">
                    <span className="text-xs font-bold uppercase text-restaurant-brown dark:text-cream-200">Subtotal:</span>
                    <span className="text-base font-extrabold text-restaurant-red">${subtotal.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Customer Contact & Time Form */}
              <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
                <div>
                  <label className="block text-restaurant-brown dark:text-cream-200 font-semibold mb-1">
                    Your Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/20 dark:border-midnight-border text-restaurant-brown dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-restaurant-red text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-restaurant-brown dark:text-cream-200 font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(540) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/20 dark:border-midnight-border text-restaurant-brown dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-restaurant-red text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-restaurant-brown dark:text-cream-200 font-semibold mb-1">
                      {orderType === 'takeout' ? 'Pickup Time' : 'Seating Time'}
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/20 dark:border-midnight-border text-restaurant-brown dark:text-cream-100 text-xs"
                    >
                      <option value="ASAP (In 20 Mins)">ASAP (15–20 Mins)</option>
                      <option value="In 30 Mins">In 30 Minutes</option>
                      <option value="In 45 Mins">In 45 Minutes</option>
                      <option value="In 1 Hour">In 1 Hour</option>
                      <option value="Scheduled Later Today">Scheduled Later Today</option>
                    </select>
                  </div>
                </div>

                {orderType === 'table' && (
                  <div>
                    <label className="block text-restaurant-brown dark:text-cream-200 font-semibold mb-1">
                      Party Size
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/20 dark:border-midnight-border text-restaurant-brown dark:text-cream-100 text-xs"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3-4">3 – 4 People</option>
                      <option value="5-8">5 – 8 People</option>
                      <option value="9+">9+ Large Family Group</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-restaurant-brown dark:text-cream-200 font-semibold mb-1">
                    Special Kitchen Notes
                  </label>
                  <input 
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. extra crispy bacon, salad dressing on side"
                    className="w-full px-3.5 py-2 rounded-xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/20 dark:border-midnight-border text-restaurant-brown dark:text-cream-100 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="btn-primary w-full justify-center !py-3.5 text-xs font-bold tracking-wider uppercase"
                  >
                    <span>
                      {orderType === 'takeout' 
                        ? (totalCount > 0 ? `Send Order to Kitchen (${totalCount} Items • $${subtotal.toFixed(2)})` : 'Submit Takeout Request')
                        : 'Confirm Table Reservation'}
                    </span>
                  </button>
                </div>

                <div className="text-center pt-1 text-[11px] text-restaurant-ink/60 dark:text-cream-400 font-sans">
                  Pay at register upon arrival • Cash or Card accepted
                </div>
              </form>

            </div>

          </div>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckIcon className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-restaurant-red">
                Order Received by Lowry's Crab Shack Kitchen
              </span>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-restaurant-brown dark:text-cream-50 mt-1">
                We're Cooking for You, {formData.name}!
              </h3>
              <p className="mt-2 text-sm text-restaurant-ink/80 dark:text-cream-200 font-sans">
                Your {orderType === 'takeout' ? 'takeout order' : 'table reservation'} has been confirmed for <strong>{formData.time}</strong>.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-5 rounded-2xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/15 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between font-bold border-b border-restaurant-brown/10 pb-2">
                <span>Summary:</span>
                <span>{formData.name} • {formData.phone}</span>
              </div>
              {Object.values(selectedItems).map(({ item, count }) => {
                if (!item) return null;
                const title = item.title || item.name || 'Dish';
                const numPrice = item.numericPrice != null
                  ? Number(item.numericPrice)
                  : (item.price ? parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0 : 0);
                return (
                  <div key={item.id || title} className="flex justify-between text-restaurant-brown/80 dark:text-cream-200">
                    <span>{count}x {title}</span>
                    <span>${(numPrice * count).toFixed(2)}</span>
                  </div>
                );
              })}
              {totalCount > 0 && (
                <div className="flex justify-between font-extrabold text-restaurant-red pt-2 border-t border-restaurant-brown/10">
                  <span>Estimated Total (Pay at Register / Pickup):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              )}
              <div className="text-[11px] text-restaurant-brown/60 dark:text-cream-400 pt-1">
                📍 420 W Colonial Hwy, Hamilton, VA 20158 • (540) 338-2348
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button 
                onClick={() => { setSubmitted(false); setSelectedItems({}); onClose(); }}
                className="btn-primary !px-8 text-xs"
              >
                Close & Return to Menu
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
