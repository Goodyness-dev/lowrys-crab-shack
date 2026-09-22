import React from 'react';
import { AMENITIES } from '../../data/amenitiesData';
import { BUSINESS_INFO } from '../../data/businessData';
import { useCart } from '../../context/CartContext';

export default function AmenitiesSection({ onOpenWizard }) {
  const { openCustomizer } = useCart();
  return (
    <section id="amenities" className="py-20 sm:py-24 bg-white border-t border-slate-200" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Authentic Outdoor Picnic Grounds Image */}
          <div className="space-y-5">
            <div className="rounded-3xl overflow-hidden shadow-thick border-2 border-slate-200 group">
              <img
                src="/images/outdoor-picnic.jpg"
                alt="Dog-friendly outdoor picnic patio at Lowry's Crab Shack in Hamilton, VA"
                loading="lazy"
                decoding="async"
                width="640"
                height="400"
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="text-left space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-crab-600">
                <span>// PICNIC GROUNDS & PATIO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Dog-Friendly Outdoor Pavilion
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Relaxed shaded picnic tables with fresh water bowls for your pups, dedicated outdoor handwash sinks for post-crab cleaning, child play areas, and dedicated motorcycle parking.
              </p>
            </div>
          </div>

          {/* Right: Numbered Amenities Grid */}
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-crab-600 mb-2">
              <span>// 06 THE LOWRY DIFFERENCE</span>
            </div>
            <h2 id="amenities-heading" className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-3">
              Why Loudoun Chooses Lowry's
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mb-8 font-light">
              Family hospitality, live-steamed Chesapeake blue crabs, and Virginia culinary traditions since 2007.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {AMENITIES.map((amenity, idx) => {
                return (
                  <div 
                    key={idx} 
                    className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 hover:border-crab-400 hover:shadow-thick transition-all bg-[#fdfbf7] flex flex-col justify-between text-left"
                  >
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="w-8 h-8 rounded-full bg-crab-600 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5 font-serif">
                        {amenity.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openCustomizer({
                  name: 'Steamed Chesapeake Blue Crabs',
                  price: '$42.00',
                  image: '/images/outdoor-picnic.jpg',
                  badge: 'Picnic & Carryout'
                })}
                className="px-8 py-3.5 rounded-full bg-crab-600 hover:bg-crab-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Order Online (0% Fees)
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="px-6 py-3.5 rounded-full border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs uppercase tracking-widest transition-all active:scale-95"
              >
                Call: {BUSINESS_INFO.phone}
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
