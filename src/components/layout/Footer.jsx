import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-sm border-t border-slate-800 pt-16 pb-12" role="contentinfo" id="contact">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1 (4 cols): Brand & Info */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-red-600 bg-red-950/40 flex items-center justify-center font-serif font-bold text-red-500 text-sm">
                LC
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white leading-tight">
                  Lowry's Crab Shack
                </h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-mono font-medium">
                  Hamilton, VA • Est. 1970s
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Loudoun County's beloved roadside seafood haven. Live Chesapeake Bay blue crabs steamed to order, 4-time voted #1 fried chicken, spiced peel-and-eat shrimp, and family hospitality in our open-air picnic pavilion.
            </p>

            {/* Contact Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="px-4 py-2 rounded-full border border-slate-700 hover:border-red-500 text-white hover:text-red-400 text-xs font-mono font-bold transition flex items-center space-x-1.5"
              >
                <span>Call: {BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={BUSINESS_INFO.onlineOrderingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Order Online
              </a>
            </div>
          </div>

          {/* Column 2 (2 cols): Menu Shortcuts */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
              Shack Specialties
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-red-400 transition">
                  Steamed Blue Crabs
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-red-400 transition">
                  #1 Fried Chicken
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-red-400 transition">
                  Spiced Steamed Shrimp
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-red-400 transition">
                  Jumbo Lump Crab Cakes
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-red-400 transition">
                  Smith Island Cakes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (3 cols): Dining Hours */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
              Shack Hours
            </h5>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="font-medium">Wed – Fri:</span>
                <span>4:00 PM – 8:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="font-medium">Sat & Sun:</span>
                <span>12:00 PM – 8:00 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-red-400 font-semibold">Mon & Tue:</span>
                <span className="italic text-slate-500">Closed (Watermen Rest)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-mono pt-1">
              Live crabs steamed fresh to order. Call ahead for bushel reservations!
            </p>
          </div>

          {/* Column 4 (3 cols): Stylized Map Card */}
          <div className="lg:col-span-3 space-y-2.5 text-left">
            <div className="flex items-center justify-between">
              <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
                Location
              </h5>
              <button
                onClick={(e) => handleLinkClick(e, '#location')}
                className="text-[11px] text-red-400 hover:underline font-bold"
              >
                Full Map ↓
              </button>
            </div>

            {/* Map Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-800/60 p-2 shadow-xs group">
              <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-800">
                <iframe
                  title="Lowry's Crab Shack Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3090.812328731086!2d-77.6747929!3d39.1365958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b617bc93f0b2f1%3A0xb304b77f88417dc4!2sLowry&#39;s%20Crab%20Shack!5e0!3m2!1sen!2sus!4v1755720986076!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
                <a 
                  href="#location"
                  onClick={(e) => handleLinkClick(e, '#location')}
                  className="absolute inset-0 bg-transparent hover:bg-black/10 transition"
                  aria-label="View interactive map"
                />
              </div>

              <div className="pt-2 px-1 flex items-center justify-between text-[11px]">
                <span className="font-serif font-bold text-white truncate">
                  420 W Colonial Hwy, Hamilton
                </span>
                <a
                  href={BUSINESS_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 font-semibold hover:underline flex-shrink-0 ml-1"
                >
                  Directions →
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName} • Hamilton, VA. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-red-400 transition underline underline-offset-4 cursor-pointer font-semibold"
            >
              Shack Staff & Management Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
