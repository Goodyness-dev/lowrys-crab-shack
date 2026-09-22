import React from 'react';
import { CoffeeIcon } from '../common/Icons';

export default function BrandInterruption() {
  return (
    <section className="py-24 sm:py-36 bg-restaurant-red text-cream-50 relative overflow-hidden">
      
      {/* Background Graphic Watermark */}
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 pointer-events-none">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="46" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Subtle Motif */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-50/15 border border-cream-50/30 mb-8 backdrop-blur-sm">
          <CoffeeIcon className="w-6 h-6 text-cream-50" />
        </div>

        {/* Large Typography Callout */}
        <div className="space-y-4">
          <h2 className="font-serif font-extrabold text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-none text-cream-50">
            CRACK CRABS.
          </h2>
          <div className="font-serif italic font-light text-4xl sm:text-6xl lg:text-8xl text-cream-200">
            MAKE A MESS.
          </div>
        </div>

        <p className="mt-8 text-base sm:text-xl font-sans text-cream-100/90 max-w-xl mx-auto leading-relaxed">
          No dress codes. No silverware needed. Just butcher paper, hot Old Bay, wooden mallets, cold drinks, and good friends on the patio.
        </p>

        {/* Established Badge */}
        <div className="mt-12 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-cream-50/15 border border-cream-50/25 text-xs font-mono tracking-widest uppercase">
          <span>Hamilton, VA</span>
          <span>•</span>
          <span>Est. 2007 • 4x Voted #1 Fried Chicken in Loudoun</span>
        </div>

      </div>
    </section>
  );
}
