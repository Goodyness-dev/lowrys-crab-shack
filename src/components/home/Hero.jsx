import React, { useRef, useEffect } from 'react';
import { ArrowRightIcon, MapPinIcon, CoffeeIcon, PhoneIcon } from '../common/Icons';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function Hero({ onOpenMenu, onOpenOrder }) {
  const videoRef = useRef(null);
  const openStatus = isOpenNow();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden bg-restaurant-ink">
      
      {/* Background Cinematic Video & Poster Layer */}
      <div className="absolute inset-0 z-0">
        
        {/* Native Responsive Video Player & Poster */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/blue-crabs-steamed.jpg"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.88]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/images/hero-video.mp4" type="video/mp4" />
          <img 
            src="/images/blue-crabs-steamed.jpg" 
            alt="Lowry's Crab Shack freshly steamed Chesapeake blue crabs with Old Bay" 
            className="w-full h-full object-cover object-center"
          />
        </video>

        {/* Ambient Film Grain & Atmospheric Sunlight Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-restaurant-ink via-transparent to-black/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent pointer-events-none z-10" />

        {/* Atmospheric Rising Steam Particles */}
        <div className="hidden md:block absolute right-[22%] bottom-[28%] z-15 pointer-events-none">
          <div className="relative w-16 h-28">
            <div className="absolute bottom-0 left-3 w-4 h-16 rounded-full bg-white/30 blur-md animate-steam-1" />
            <div className="absolute bottom-2 left-6 w-3 h-20 rounded-full bg-cream-50/25 blur-lg animate-steam-2" />
            <div className="absolute bottom-1 left-4 w-5 h-24 rounded-full bg-amber-100/20 blur-xl animate-steam-3" />
          </div>
        </div>
      </div>

      {/* Floating Header Tag & Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Editorial Category Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cream-50/15 backdrop-blur-md border border-cream-50/25 text-cream-100 text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-restaurant-red animate-pulse" />
            <span>// 01 HAMILTON, VIRGINIA • EST. 2007</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-cream-50 leading-[0.98] mb-6 drop-shadow-md">
            PULL UP A CHAIR. <br />
            <span className="italic font-light text-cream-200">CRACK A CRAB.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="font-sans text-lg sm:text-2xl text-cream-100/90 font-normal leading-relaxed mb-10 max-w-xl">
            Live Chesapeake Bay blue crabs steamed fresh with Old Bay, 4x Voted #1 Fried Chicken in Loudoun, and Donald's legendary seafood feasts spread across butcher paper.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a 
              href="#menu" 
              className="btn-primary text-base !py-4 !px-8 shadow-thick group"
            >
              <span>EXPLORE SEAFOOD MENU</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button 
              onClick={() => onOpenOrder && onOpenOrder(null)} 
              className="btn-secondary text-base !py-4 !px-8 shadow-sm backdrop-blur-md bg-white/10 hover:bg-white/20 text-cream-50 border-cream-50/30"
            >
              <PhoneIcon className="w-5 h-5 text-restaurant-gold" />
              <span>ORDER TAKEOUT / TABLE</span>
            </button>
          </div>

          {/* Trust Footnote & Operating Status */}
          <div className="mt-12 pt-8 border-t border-cream-50/15 flex flex-wrap items-center gap-6 text-xs text-cream-200 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-restaurant-gold font-bold">420 W COLONIAL HWY</span>
              <span>• HAMILTON, VA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-restaurant-gold font-bold">CALL (540) 338-2348</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>STEAMING FRESH TO ORDER</span>
            </div>
          </div>

        </div>
      </div>

      {/* Downward Section Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-cream-200/60 flex flex-col items-center gap-1 animate-bounce pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </section>
  );
}
