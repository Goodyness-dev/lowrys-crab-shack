import React from 'react';
import { ArrowRightIcon, CoffeeIcon, PhoneIcon } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ClosingScene({ onOpenOrder }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-start overflow-hidden bg-restaurant-ink">
      
      {/* Background Post-Meal Visual (Rhyming with Hero) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/crab-shack-patio.jpg" 
          alt="Lowry's Crab Shack picnic tables with butcher paper, mallets, and crab feast after a great meal" 
          className="w-full h-full object-cover object-center animate-ken-burns scale-105 filter brightness-[0.88]"
          loading="lazy"
        />
        
        {/* Soft Ambient Shadow Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-restaurant-ink via-transparent to-black/40 z-10 pointer-events-none" />

        {/* Faint Rising Steam from the Steamer Pot */}
        <div className="hidden md:block absolute right-[18%] bottom-[35%] z-15 pointer-events-none">
          <div className="relative w-12 h-20">
            <div className="absolute bottom-0 left-2 w-3 h-12 rounded-full bg-white/20 blur-md animate-steam-1" />
            <div className="absolute bottom-1 left-4 w-2 h-14 rounded-full bg-cream-50/15 blur-lg animate-steam-2" />
          </div>
        </div>
      </div>

      {/* Content Overlay in Intentional Negative Space */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-xl text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50/15 backdrop-blur-md border border-cream-50/25 text-cream-100 text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-restaurant-red animate-pulse" />
            <span>// 09 CRACK THE NEXT BUSHEL</span>
          </div>

          <h2 className="font-serif font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-cream-50 leading-[0.98] mb-6">
            SEE YOU <br />
            <span className="italic font-light text-cream-200">ON THE PATIO.</span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-cream-100/90 font-normal leading-relaxed mb-10">
            Crab shells piled high, Old Bay on your fingers, and cold drinks with the folks who matter most. When you're craving authentic Chesapeake seafood, our picnic tables are waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={() => onOpenOrder(null)}
              className="btn-primary text-base !py-4 !px-8 shadow-thick"
            >
              <span>Order Takeout / Crabs</span>
            </button>

            <a 
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="btn-secondary text-base !py-4 !px-8 shadow-sm backdrop-blur-md bg-white/10 hover:bg-white/20 text-cream-50 border-cream-50/30"
            >
              <PhoneIcon className="w-5 h-5 text-restaurant-gold" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>

          <div className="mt-12 text-xs font-mono text-cream-300">
            420 W Colonial Hwy, Hamilton, VA • Wed–Fri 4–8 PM • Sat–Sun 12–8 PM
          </div>

        </div>
      </div>

    </section>
  );
}
