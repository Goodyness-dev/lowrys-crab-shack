import React, { useState } from 'react';
import { SpoonForkIcon, CoffeeIcon, ArrowRightIcon } from '../common/Icons';

const TABLE_PLATES = [
  {
    id: 'blue-crabs',
    name: 'Steamed Chesapeake Blue Crabs',
    title: 'Steamed Chesapeake Blue Crabs',
    price: 'Market Price',
    numericPrice: 38.00,
    badge: 'House Signature',
    image: '/images/blue-crabs-steamed.jpg',
    description: 'Fresh hard shell blue crabs steamed live on-site with cider vinegar, beer, and generous Old Bay. Served with wooden mallets and melted butter.'
  },
  {
    id: 'fried-chicken',
    name: '4x Voted #1 Fried Chicken Platter',
    title: '4x Voted #1 Fried Chicken Platter',
    price: '$16.99',
    numericPrice: 16.99,
    badge: 'Award-Winning Icon',
    image: '/images/award-winning-fried-chicken.png',
    description: 'Hand-breaded fresh chicken fried golden-crisp to order. Voted #1 Best Fried Chicken in Loudoun County 4 years in a row (2021-2024).'
  },
  {
    id: 'cajun-boil',
    name: 'Family Bayou Low Country Boil',
    title: 'Family Bayou Low Country Boil',
    price: '$38.99',
    numericPrice: 38.99,
    badge: 'Low Country Feast',
    image: '/images/dish-cajun-bayou-boil.jpg',
    description: 'Crawfish, wild Gulf shrimp, smoked andouille sausage, sweet corn cobettes, red bliss potatoes, and hot hushpuppies simmered in Cajun spices.'
  },
  {
    id: 'lump-crabcake',
    name: 'Jumbo Lump Crab Cake Platter',
    title: 'Jumbo Lump Crab Cake Platter',
    price: '$27.99',
    numericPrice: 27.99,
    badge: 'Crab Specialty',
    image: '/images/dish-lump-crabcake-platter.jpg',
    description: 'Hand-formed colossal lump Chesapeake crab meat with zero filler, pan-seared golden and served with house remoulade, hushpuppies, and fries.'
  }
];

export default function TheTableSection({ onOpenOrder }) {
  const [activePlate, setActivePlate] = useState(TABLE_PLATES[0]);

  return (
    <section id="the-table" className="py-24 sm:py-32 bg-cream-200 dark:bg-midnight relative overflow-hidden transition-colors">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#A92E26_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-restaurant-red/10 border border-restaurant-red/20 text-restaurant-red text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <SpoonForkIcon className="w-4 h-4" />
            <span>// 04 THE GATHERING TABLE</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-restaurant-brown dark:text-cream-50 tracking-tight leading-[1.04]">
            SPREAD ACROSS <br />
            <span className="italic font-light text-restaurant-red">BUTCHER PAPER.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-restaurant-ink/80 dark:text-cream-200/80 font-sans leading-relaxed max-w-2xl">
            Seafood is best enjoyed with two hands, wooden mallets, and great friends around the table. Click any dish to explore our signature feasts or order for takeout.
          </p>
        </div>

        {/* 4-Plate Interactive Table Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TABLE_PLATES.map((plate) => {
            const isSelected = activePlate.id === plate.id;
            return (
              <div
                key={plate.id}
                onClick={() => setActivePlate(plate)}
                className={`card-thick cursor-pointer overflow-hidden group transition-all duration-300 ${
                  isSelected 
                    ? 'ring-4 ring-restaurant-red scale-[1.02] shadow-thick-hover' 
                    : 'hover:-translate-y-1'
                }`}
              >
                <div className="relative aspect-square overflow-hidden bg-cream-300 dark:bg-midnight-pure">
                  <img 
                    src={plate.image} 
                    alt={plate.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-restaurant-ink/85 backdrop-blur-sm text-cream-50 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-cream-50/20">
                    {plate.badge}
                  </div>
                  <div className="absolute top-3 right-3 bg-restaurant-red text-cream-50 text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-md">
                    {plate.price}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg text-restaurant-brown dark:text-cream-100 group-hover:text-restaurant-red transition-colors leading-snug">
                    {plate.name}
                  </h3>
                  <p className="text-xs text-restaurant-ink/70 dark:text-cream-300 font-sans mt-2 line-clamp-2">
                    {plate.description}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-restaurant-brown/10 dark:border-midnight-border flex items-center justify-between text-xs font-mono">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1.5 text-restaurant-red font-bold text-xs">
                        <span className="w-2 h-2 rounded-full bg-restaurant-red animate-pulse" />
                        <span>Active Plate</span>
                      </span>
                    ) : (
                      <span className="text-xs text-restaurant-brown/60 dark:text-cream-400 group-hover:text-restaurant-brown dark:group-hover:text-cream-100 transition-colors">
                        Explore Table
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenOrder(plate);
                      }}
                      className="px-3 py-1 rounded-full bg-restaurant-red/10 hover:bg-restaurant-red text-restaurant-red hover:text-cream-50 font-bold transition-all flex items-center gap-1 active:scale-95"
                      title={`Order ${plate.name} for takeout`}
                    >
                      <span>Order</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Plate Featured Detail Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-cream-100 dark:bg-midnight-card border-2 border-restaurant-brown/10 dark:border-midnight-border shadow-thick flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-restaurant-red">
              SELECTED PLATE • {activePlate.badge}
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-restaurant-brown dark:text-cream-50 mt-1">
              {activePlate.name}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-restaurant-ink/80 dark:text-cream-200/80 font-sans leading-relaxed">
              {activePlate.description}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => onOpenOrder(activePlate)}
              className="btn-primary text-sm !py-3.5 !px-7 shadow-thick"
            >
              <span>Order This Plate</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
