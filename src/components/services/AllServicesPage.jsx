import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';
import { gsap } from 'gsap';

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const menuContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = [
    'All',
    'Steamed Crabs',
    'Fried Chicken',
    'Seafood Baskets',
    'Scratch Sides',
    'Smith Island Cakes'
  ];

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (service.featuredDishes && service.featuredDishes.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Steamed Crabs' && service.id.includes('crabs')) return true;
    if (selectedCategory === 'Fried Chicken' && service.id.includes('chicken')) return true;
    if (selectedCategory === 'Seafood Baskets' && service.id.includes('seafood')) return true;
    if (selectedCategory === 'Scratch Sides' && service.id.includes('sides')) return true;
    if (selectedCategory === 'Smith Island Cakes' && service.id.includes('cakes')) return true;
    return true;
  });

  // GSAP animation for smooth entrance of menu items
  useEffect(() => {
    if (menuContainerRef.current) {
      const cards = menuContainerRef.current.querySelectorAll('.dish-showcase-card');
      gsap.fromTo(cards, 
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-4 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex items-center justify-between py-6 border-b border-slate-200">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-sky-900 hover:text-red-600 transition cursor-pointer"
        >
          <span>← Back to Lowry's Crab Shack</span>
        </button>

        <span className="text-xs font-mono font-bold text-sky-800 tracking-widest uppercase">
          420 W Colonial Hwy • Hamilton, VA
        </span>
      </div>

      {/* Hero Header */}
      <div className="py-12 sm:py-16 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 shadow-xs text-xs font-mono font-bold uppercase tracking-widest text-red-700">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>// CHESAPEAKE BAY HARVEST & LOUDOUN'S #1 CHICKEN</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.08]">
          The Full Shack Menu
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
          Every bushel steamed live to order with cider vinegar and Old Bay spice. Paired with 4-time voted #1 fried chicken and scratch-baked Smith Island cakes.
        </p>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href={BUSINESS_INFO.onlineOrderingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Order Online on Talech</span>
            <span>→</span>
          </a>
          <a
            href={`tel:${BUSINESS_INFO.phoneClean}`}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white border-2 border-slate-300 hover:border-sky-900 text-slate-800 font-bold text-xs uppercase tracking-wider transition shadow-xs"
          >
            <span>Call to Order: {BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="mb-14 space-y-6">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search blue crabs, fried chicken, shrimp, hush puppies, cake..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-2 border-slate-200 bg-white px-6 py-3.5 pl-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md -translate-y-0.5'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services and Big Image Dishes Listing */}
      <div ref={menuContainerRef} className="space-y-20">
        {filteredServices.map((service) => (
          <div 
            key={service.id}
            className="space-y-8"
          >
            {/* Category Header Banner */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                    {service.badge}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                  {service.name}
                </h2>
                <p className="text-sm text-slate-600 font-light max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <a
                  href={BUSINESS_INFO.onlineOrderingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 text-xs uppercase tracking-wider transition shadow-md active:scale-95 cursor-pointer"
                >
                  Order via Talech
                </a>
                <button
                  onClick={() => onOpenWizard(service.name)}
                  className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-3 text-xs uppercase tracking-wider transition active:scale-95 cursor-pointer"
                >
                  Picnic Booking
                </button>
              </div>
            </div>

            {/* BIG IMAGE-FIRST DISH CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.featuredDishes.map((dish, i) => (
                <div 
                  key={i}
                  className="dish-showcase-card card-thick-hover overflow-hidden flex flex-col justify-between group cursor-pointer bg-white"
                  onClick={() => onOpenWizard(dish.name)}
                >
                  {/* BIG PROMINENT FOOD IMAGE - THE MAIN THING ON THE CARD */}
                  <div className="relative w-full h-64 sm:h-76 md:h-80 overflow-hidden bg-slate-100">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Vignette for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Price Pill Tag on the Image */}
                    <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-serif font-bold text-sm shadow-md">
                      {dish.price}
                    </div>

                    {/* Category / Badge Pill on the Image */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      {service.badge}
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg">
                        <span>Select for Reservation / Order</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                  {/* Editorial Details Section Below the Big Image */}
                  <div className="p-6 sm:p-7 text-left space-y-3 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-red-600 transition-colors">
                          {dish.name}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-slate-600 font-light leading-relaxed mt-2">
                        {dish.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider">
                        {service.sidesIncluded.split('.')[0]}
                      </span>
                      <div className="flex items-center space-x-2">
                        <a
                          href={BUSINESS_INFO.onlineOrderingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 hover:underline"
                        >
                          Order Online →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
