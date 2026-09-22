import React, { useState, useEffect, useRef } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';

export default function PedestalMenuSection({ onOpenWizard, onViewAllServices }) {
  const { openCustomizer } = useCart();
  const [activeItem, setActiveItem] = useState(0);
  const cardsContainerRef = useRef(null);

  const pedestalPlates = [
    {
      id: 0,
      name: "Steamed Chesapeake Bay Blue Crabs",
      course: "Chesapeake Daily Catch",
      technique: "Live Steamed with Old Bay & Beer",
      description: "Live blue crabs steamed piping hot to order with apple cider vinegar, beer, and heavy shack crab seasoning. Sold by dozen or bushel.",
      image: imageManifest.pedestals[0].image,
      price: "Market Price",
      notes: "Steamed Live On-Site Daily"
    },
    {
      id: 1,
      name: "4x Voted #1 Fried Chicken in Loudoun",
      course: "Award-Winning Icon",
      technique: "Secret Double-Breaded Recipe",
      description: "Fresh to order crispy chicken dinners and family buckets. Voted #1 Fried Chicken by Loudoun Times-Mirror readers 2021 through 2024.",
      image: imageManifest.pedestals[1].image,
      price: "$27.99 (8-Pc Family)",
      notes: "Voted #1 in Loudoun 4 Yrs Running"
    },
    {
      id: 2,
      name: "Old Bay Spiced Steamed Shrimp Basket",
      course: "Coastal Steamer Feast",
      technique: "Steamed with Sweet Onions",
      description: "Plump wild gulf shrimp dusted generously in Old Bay, steamed with sweet onions, and served with house cocktail sauce & hushpuppies.",
      image: imageManifest.pedestals[2].image,
      price: "$16.99 / lb",
      notes: "Sweet, Tender & Heavily Spiced"
    },
    {
      id: 3,
      name: "Maryland Multi-Layer Smith Island Cake",
      course: "Official State Dessert",
      technique: "Handcrafted 8-10 Layers",
      description: "Traditional Maryland state dessert made with thin sponge layers and rich cooked fudge icing. Chocolate, Caramel, Red Velvet, & Coconut.",
      image: imageManifest.pedestals[3].image,
      price: "$7.50 / slice",
      notes: "Whole Cakes Available with Notice"
    }
  ];

  // GSAP animation for pedestal cards entrance
  useEffect(() => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.pedestal-card-item');
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col text-left space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-crab-600">
          <span className="w-2 h-2 rounded-full bg-crab-600" />
          <span>// 01 SIGNATURE FEASTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Featured House Specialties
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-md">
          Steamed live to order and fried crispy from scratch. Savor authentic Chesapeake traditions on our pet-friendly picnic patio.
        </p>
      </div>

      {/* Big-Image Cards Grid */}
      <div ref={cardsContainerRef} className="space-y-6 sm:space-y-8">
        {pedestalPlates.map((plate) => {
          const isSelected = activeItem === plate.id;
          
          return (
            <div 
              key={plate.id}
              onClick={() => setActiveItem(plate.id)}
              className="pedestal-card-item group cursor-pointer"
            >
              {/* Card Container: Crisp White with Thick Shadow */}
              <div 
                className={`relative rounded-3xl bg-white border-2 p-5 sm:p-7 transition-all duration-500 flex flex-col ${
                  isSelected 
                    ? 'border-crab-500 shadow-thick-hover ring-2 ring-crab-500/30 -translate-y-1' 
                    : 'border-slate-200 shadow-thick hover:border-crab-400 hover:-translate-y-1'
                }`}
              >
                {/* BIG FOOD IMAGE - THE MAIN THING ON EACH CARD */}
                <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                  <img 
                    src={plate.image} 
                    alt={plate.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider text-slate-900 font-bold shadow-xs">
                    {plate.course}
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full bg-crab-600 backdrop-blur-md text-white font-serif font-bold text-xs sm:text-sm shadow-md">
                    {plate.price}
                  </div>

                  {/* Preparation Technique Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/65 backdrop-blur-sm text-[10px] text-amber-300 font-mono">
                    {plate.technique}
                  </div>
                </div>

                {/* Dish Details Below the Image */}
                <div className="pt-5 text-left space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-crab-700 transition-colors">
                      {plate.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {plate.description}
                  </p>

                  {/* Bottom Strip */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                    <span className="font-mono text-[11px] text-crab-600 font-semibold">
                      {plate.notes}
                    </span>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCustomizer({
                          name: plate.name,
                          price: plate.price === 'Market Price' ? '$42.00' : plate.price,
                          image: plate.image,
                          badge: plate.course
                        });
                      }}
                      className="text-crab-600 font-bold hover:text-crab-800 hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Customize & Order</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={onViewAllServices}
          className="rounded-full bg-white border-2 border-crab-600 text-crab-700 hover:bg-crab-600 hover:text-white px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW FULL SHACK MENU
        </button>

        <button
          type="button"
          onClick={() => openCustomizer({
            name: 'Steamed Chesapeake Bay Blue Crabs',
            price: '$42.00',
            image: imageManifest.pedestals[0].image,
            badge: 'Chesapeake Daily Catch'
          })}
          className="rounded-full bg-crab-600 hover:bg-crab-700 text-white font-bold px-7 py-3 text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
        >
          ORDER CARRYOUT ONLINE (0% FEES)
        </button>
      </div>

    </div>
  );
}
