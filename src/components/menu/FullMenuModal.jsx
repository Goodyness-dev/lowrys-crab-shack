import React, { useState } from 'react';
import { CloseIcon, SpoonForkIcon } from '../common/Icons';
import { SERVICES, CATEGORIES } from '../../data/servicesData';

export default function FullMenuModal({ isOpen, onClose, onSelectOrder }) {
  const [selectedCategory, setSelectedCategory] = useState('All Plates');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = SERVICES.filter((item) => {
    const matchesCategory = selectedCategory === 'All Plates' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-cream-100 dark:bg-midnight-card w-full max-w-2xl min-h-screen p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-l-2 border-restaurant-brown/10 dark:border-midnight-border animate-slideLeft">
        
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-restaurant-brown/10 dark:border-midnight-border">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-restaurant-red/10 text-restaurant-red text-[11px] font-mono font-bold uppercase mb-2">
                <SpoonForkIcon className="w-3.5 h-3.5" />
                <span>Full Kitchen Menu</span>
              </div>
              <h2 className="font-serif font-bold text-3xl text-restaurant-brown dark:text-cream-50">
                Lowry's Crab Shack Menu
              </h2>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2.5 rounded-full bg-cream-200 dark:bg-midnight-pure text-restaurant-brown dark:text-cream-100 hover:bg-restaurant-red hover:text-cream-50 transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Search & Category Pills */}
          <div className="py-4 space-y-4">
            <input 
              type="text" 
              placeholder="Search seafood & chicken (e.g. crabs, fried chicken, boil, oysters)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-cream-50 dark:bg-midnight border border-restaurant-brown/20 dark:border-midnight-border text-sm text-restaurant-brown dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-restaurant-red"
            />

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-restaurant-red text-cream-50'
                      : 'bg-cream-50 dark:bg-midnight text-restaurant-brown dark:text-cream-200 hover:bg-cream-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 divide-y divide-restaurant-brown/5 dark:divide-midnight-border">
            {filteredItems.map((item) => (
              <div key={item.id} className="pt-4 flex items-start justify-between gap-4 group">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cream-200 dark:bg-midnight text-restaurant-red font-bold">
                      {item.category}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold">
                        ★ Popular
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-restaurant-brown dark:text-cream-50 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-restaurant-ink/70 dark:text-cream-300 font-sans mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-lg text-restaurant-red block">
                    {item.price}
                  </span>
                  <button 
                    onClick={() => { onClose(); onSelectOrder(item); }}
                    className="mt-2 text-xs font-mono font-semibold text-restaurant-brown dark:text-cream-200 underline hover:text-restaurant-red"
                  >
                    Select →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="pt-6 border-t border-restaurant-brown/10 dark:border-midnight-border mt-6">
          <div className="text-xs font-mono text-restaurant-brown/60 dark:text-cream-400 mb-3">
            Prices and availability subject to change. Scratch-cooked daily on Main St.
          </div>
          <button 
            onClick={() => { onClose(); onSelectOrder(null); }}
            className="btn-primary w-full justify-center !py-3.5 text-sm"
          >
            <span>Proceed to Takeout / Table Reservation</span>
          </button>
        </div>

      </div>
    </div>
  );
}
