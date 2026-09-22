import React, { useState } from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const [copied, setCopied] = useState(false);
  const shopOpen = isOpenNow();

  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const googleMapsPlaceUrl = "https://www.google.com/maps/place/Lowry's+Crab+Shack/@39.1365999,-77.6747929,17z/data=!3m1!4b1!4m6!3m5!1s0x89b617b07c244799:0xe54d2e5a40a5a4fa!8m2!3d39.1365958!4d-77.6726042";

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#fdfbf7] border-t border-slate-200 relative overflow-hidden" aria-labelledby="location-heading">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-crab-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-mono font-bold uppercase tracking-widest text-crab-700">
            <span className="w-2 h-2 rounded-full bg-crab-600" />
            <span>// 05 LOCATION & OPERATING HOURS</span>
          </div>

          <h2 id="location-heading" className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight">
            Find Us in Hamilton, VA
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Located along historic W Colonial Highway. Open year-round with cozy wood-paneled indoor seating and shaded pet-friendly outdoor picnic tables.
          </p>
        </div>

        {/* TOP STATUS & QUICK ACTIONS BAR */}
        <div className="card-thick p-5 sm:p-6 mb-10 flex flex-wrap items-center justify-between gap-4">
          {/* Status Indicator */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center">
              <span className={`w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className={`absolute w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-emerald-500 animate-ping opacity-75' : 'bg-amber-500'}`} />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-base sm:text-lg text-slate-900">
                  {shopOpen ? 'Open for Steamed Crabs & Dining' : 'Currently Closed'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-mono font-semibold">
                  Today is {currentDayName}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {currentDayName === 'Monday' || currentDayName === 'Tuesday'
                  ? 'Closed Mondays & Tuesdays for fresh fleet catch sourcing & prep.'
                  : currentDayName === 'Saturday' || currentDayName === 'Sunday'
                  ? 'Weekend All-Day Hours: 12:00 PM – 8:00 PM'
                  : 'Wednesday – Friday Hours: 4:00 PM – 8:00 PM'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyAddress}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 transition active:scale-95 cursor-pointer"
            >
              {copied ? 'Address Copied!' : 'Copy Address'}
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 transition active:scale-95"
            >
              Call: {BUSINESS_INFO.phone}
            </a>

            <a
              href={BUSINESS_INFO.onlineOrderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-crab-600 hover:bg-crab-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer"
            >
              Order Online (Talech)
            </a>
          </div>
        </div>

        {/* GIGANTIC INTERACTIVE GOOGLE MAP CONTAINER */}
        <div className="card-thick overflow-hidden shadow-2xl transition">
          {/* Map Top Bar */}
          <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <img 
                src="/images/outdoor-picnic.jpg" 
                alt="Lowrys Crab Shack Picnic Grounds" 
                className="w-11 h-11 rounded-2xl object-cover border-2 border-crab-500 shadow-xs"
              />
              <div className="text-left">
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  Lowry's Crab Shack
                </h3>
                <p className="text-xs text-slate-600 font-mono">
                  420 W Colonial Highway, Hamilton, VA 20158 (Free Parking On-Site)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-crab-600 hover:bg-crab-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
              >
                <span>Open in Google Maps</span>
                <span>↗</span>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Lowry's+Crab+Shack+420+W+Colonial+Hwy+Hamilton+VA+20158"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition flex items-center space-x-1.5"
              >
                <span>GPS Directions</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Huge Map Frame */}
          <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] bg-slate-100">
            <iframe
              title="Lowry's Crab Shack Google Map Location in Hamilton, VA"
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Floating Bottom Info Pill inside the Map */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto z-10 bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-2xl p-4 shadow-xl max-w-md text-left">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-crab-600 text-white flex items-center justify-center shrink-0 font-serif font-bold text-xs">
                  LC
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-slate-900 block">
                    Lowry's Crab Shack Grounds
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Dog-friendly picnic tables, child play area, pet water bowls, outdoor sink & motorcycle parking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
