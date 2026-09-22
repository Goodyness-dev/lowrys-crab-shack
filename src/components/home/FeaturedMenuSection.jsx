import React, { useState } from 'react';
import { SERVICES } from '../../data/servicesData';
import { ArrowRightIcon, SpoonForkIcon } from '../common/Icons';

export default function FeaturedMenuSection({ onOpenMenu, onOpenOrder }) {
  const [filter, setFilter] = useState('All');

  const categories = [
    'All',
    'Chesapeake Crabs & Boils',
    'Award-Winning Fried Chicken',
    'Shrimp, Oysters & Clams',
    'Fresh Fish & Po\'boys',
    'Sides, Bites & Desserts'
  ];

  const filteredDishes = filter === 'All' 
    ? SERVICES.filter(d => d.popular) 
    : SERVICES.filter(d => d.category === filter);

  return (
    <section id="menu" className="py-24 sm:py-32 bg-cream-100 dark:bg-midnight-pure border-t border-restaurant-brown/10 dark:border-midnight-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-restaurant-red/10 border border-restaurant-red/20 text-restaurant-red text-xs font-mono font-semibold tracking-wider uppercase mb-4">
              <SpoonForkIcon className="w-4 h-4" />
              <span>// 05 SHACK SPECIALTIES</span>
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-restaurant-brown dark:text-cream-50 tracking-tight leading-tight">
              FEATURED FEASTS & <br />
              <span className="italic font-light text-restaurant-red">SIGNATURE PLATTERS.</span>
            </h2>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wide transition-all ${
                  filter === cat
                    ? 'bg-restaurant-red text-cream-50 shadow-sm'
                    : 'bg-cream-50 dark:bg-midnight-card text-restaurant-brown dark:text-cream-200 hover:bg-cream-200 border border-restaurant-brown/10 dark:border-midnight-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <div 
              key={dish.id}
              className="card-thick-hover overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-300 dark:bg-midnight-card">
                  <img 
                    src={dish.image} 
                    alt={dish.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-restaurant-red text-cream-50 font-mono font-bold text-sm px-3 py-1 rounded-full shadow-md">
                    {dish.price}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-cream-100 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {dish.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-mono text-restaurant-red dark:text-restaurant-gold font-semibold uppercase tracking-wider mb-1">
                    {dish.subType}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-restaurant-brown dark:text-cream-50 group-hover:text-restaurant-red transition-colors">
                    {dish.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-restaurant-ink/70 dark:text-cream-300 font-sans leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-restaurant-brown/5 dark:border-midnight-border mt-4 flex items-center justify-between">
                <button 
                  onClick={() => onOpenOrder(dish)}
                  className="text-xs font-mono font-bold text-restaurant-red hover:text-restaurant-redHover uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Order Takeout</span>
                  <span>→</span>
                </button>
                <span className="text-[11px] font-mono text-restaurant-ink/50 dark:text-cream-400">
                  Cooked Fresh Daily
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Footer Banner */}
        <div className="mt-16 text-center">
          <button 
            onClick={onOpenMenu}
            className="btn-primary text-base !py-4 !px-10 shadow-thick group inline-flex items-center gap-3"
          >
            <span className="tracking-wider uppercase font-bold">VIEW COMPLETE RESTAURANT MENU</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <p className="mt-3 text-xs font-mono text-restaurant-brown/60 dark:text-cream-400">
            Daily breakfast, lunch melts, homestyle dinners, desserts & beverages
          </p>
        </div>

      </div>
    </section>
  );
}
