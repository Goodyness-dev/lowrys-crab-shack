import React, { useState, useEffect, useRef } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';

export default function GallerySection({ onOpenWizard }) {
  const { openCustomizer } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalImage, setActiveModalImage] = useState(null);
  const galleryRef = useRef(null);

  const categories = ['All', 'Crabs', 'Chicken', 'Seafood', 'Ambiance', 'Heritage'];

  const filteredItems = imageManifest.gallery.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // GSAP subtle stagger on filter change
  useEffect(() => {
    if (galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll('.gallery-item-card');
      gsap.fromTo(cards, 
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative">
      
      {/* Editorial Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div className="text-left space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-crab-50 border border-crab-200 text-crab-800 text-xs font-mono font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-crab-600 animate-pulse" />
            <span>// 04 VISUAL ARCHIVE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.1]">
            The Shack Experience
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Live steamed Chesapeake Bay blue crabs, 4-time #1 fried chicken in Loudoun County, dog-friendly outdoor picnic tables, and Rudy Williams' cherished family heritage since 1970.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-crab-600 text-white shadow-md -translate-y-0.5'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-crab-400 hover:bg-crab-50'
              }`}
            >
              {cat === 'All' ? `All (${imageManifest.gallery.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Premium Masonry / Bento Grid */}
      <div 
        ref={galleryRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {filteredItems.map((item, idx) => {
          const isFeaturedLarge = idx % 5 === 0;

          return (
            <div
              key={item.id}
              onClick={() => setActiveModalImage(item)}
              className={`gallery-item-card group cursor-pointer card-thick-hover overflow-hidden flex flex-col justify-between ${
                isFeaturedLarge ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image Frame with Zoom Effect */}
              <div className={`relative overflow-hidden bg-slate-100 ${isFeaturedLarge ? 'h-72 sm:h-96' : 'h-64 sm:h-72'}`}>
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                    {item.tag}
                  </span>
                </div>

                {/* Index Monospace Tag */}
                <div className="absolute top-4 right-4 z-10 text-white/90 font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
                  #{String(item.id).padStart(2, '0')}
                </div>

                {/* Bottom Quick Look Overlay */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white text-crab-700 text-xs font-bold shadow-lg">
                    <span>Expand</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 sm:p-6 text-left space-y-2 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-crab-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-crab-600 font-semibold">
                    Hamilton, VA • Est. 2007
                  </span>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCustomizer({
                        name: item.title,
                        price: '$18.99',
                        image: item.src,
                        badge: item.tag
                      });
                    }}
                    className="font-bold text-crab-600 hover:text-crab-800 hover:underline cursor-pointer"
                  >
                    Order Now →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Lightbox */}
      {activeModalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveModalImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative max-h-[70vh] bg-slate-950 overflow-hidden">
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                className="w-full h-full object-contain mx-auto"
              />
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close image modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Info */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50">
              <div className="text-left space-y-1">
                <span className="text-xs uppercase tracking-widest text-crab-600 font-mono font-bold">
                  {activeModalImage.tag} • #{String(activeModalImage.id).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {activeModalImage.title}
                </h3>
                <p className="text-sm text-slate-600 font-normal max-w-xl">
                  {activeModalImage.description}
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const img = activeModalImage;
                    setActiveModalImage(null);
                    openCustomizer({
                      name: img.title,
                      price: '$18.99',
                      image: img.src,
                      badge: img.tag
                    });
                  }}
                  className="rounded-full bg-crab-600 hover:bg-crab-700 text-white font-bold px-6 py-3 text-xs uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer"
                >
                  Order This Dish (0% Fees)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
