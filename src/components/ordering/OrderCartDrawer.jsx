import React from 'react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_INFO } from '../../data/businessData';

export default function OrderCartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    fulfillmentType,
    setFulfillmentType,
    tipPercent,
    setTipPercent,
    subtotal,
    tax,
    tip,
    total,
    itemCount,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l-2 border-slate-200 shadow-2xl flex flex-col justify-between text-left animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-serif font-bold text-xs">
                LC
              </span>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Your Shack Order
                </h3>
                <span className="text-[11px] font-mono text-red-600 font-bold uppercase">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in basket
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition cursor-pointer"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Fulfillment Toggle Banner */}
          <div className="p-4 bg-slate-100 border-b border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-600 tracking-wider block">
              Fulfillment Method:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFulfillmentType('curbside_pickup')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer ${
                  fulfillmentType === 'curbside_pickup'
                    ? 'border-red-600 bg-white text-red-600 shadow-xs'
                    : 'border-transparent bg-slate-200/70 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>🚗 Curbside Pickup</span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillmentType('picnic_dine_in')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer ${
                  fulfillmentType === 'picnic_dine_in'
                    ? 'border-red-600 bg-white text-red-600 shadow-xs'
                    : 'border-transparent bg-slate-200/70 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>🧺 Picnic Pavilion</span>
              </button>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-mono pt-1">
              <span>⏱️ Estimated:</span>
              <span className="font-bold text-slate-800">Ready in 25–35 mins</span>
              <span>• 420 W Colonial Hwy</span>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto text-slate-400">
                  🦀
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900">
                  Your Shack Basket is Empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add fresh steamed blue crabs, award-winning fried chicken, or hot spiced shrimp to begin!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                      )}
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-sm text-slate-900 leading-snug truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-red-600 block">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 text-xs cursor-pointer transition"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Selected Options Pills */}
                  {item.selectedOptions && item.selectedOptions.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100">
                      {item.selectedOptions.map((opt, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-700 font-mono"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-slate-500 hover:text-slate-800 font-bold text-xs px-1 cursor-pointer"
                      >
                        –
                      </button>
                      <span className="text-xs font-mono font-bold w-4 text-center text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-slate-500 hover:text-slate-800 font-bold text-xs px-1 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculations & Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3.5">
              
              {/* Tip Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-600 uppercase tracking-wider text-[11px] font-bold">
                    Tip Shack Crew:
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-800">
                    ${tip.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[15, 18, 20, 0].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTipPercent(p)}
                      className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition cursor-pointer ${
                        tipPercent === p
                          ? 'border-red-600 bg-red-600 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {p === 0 ? 'No Tip' : `${p}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-200 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VA Meals Tax (6%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Crew Tip ({tipPercent}%):</span>
                    <span>${tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due:</span>
                  <span className="text-red-600 font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md active:scale-95 flex items-center justify-between px-6 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <span className="font-mono text-sm">${total.toFixed(2)} →</span>
                </button>

                <div className="flex items-center justify-between px-2 text-[11px]">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-slate-400 hover:text-red-600 transition cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  <span className="text-slate-400 font-mono">
                    Zero 3rd-Party App Fees (0%)
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
