import React, { useState, useEffect, useRef } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';

export default function Hero({ onOpenWizard }) {
  const { openCustomizer } = useCart();
  const [slideIndex, setSlideIndex] = useState(0);
  const heroTextRef = useRef(null);

  const heroSlides = [
    {
      image: imageManifest.hero.banner,
      headlineTop: "Fresh Chesapeake",
      headlineBottom: "Steamed Blue Crabs",
      subtitle: "Hamilton, VA • Historic W Colonial Hwy",
      tagline: "Live blue crabs steamed piping hot to order with apple cider vinegar, beer & heavy Old Bay.",
      alt: "Piping hot steamed blue crabs at Lowrys Crab Shack"
    },
    {
      image: imageManifest.features.chicken,
      headlineTop: "4x Voted #1",
      headlineBottom: "Fried Chicken",
      subtitle: "Loudoun Times-Mirror Winner 2021-2024",
      tagline: "Fresh-to-order hand-breaded golden fried chicken, family buckets & Southern scratch sides.",
      alt: "Award-winning fried chicken at Lowrys Crab Shack"
    },
    {
      image: imageManifest.features.patio,
      headlineTop: "Casual & Dog-Friendly",
      headlineBottom: "Outdoor Picnic Patio",
      subtitle: "Hamilton Roadside Tradition Since 2007",
      tagline: "Shaded outdoor tables, outdoor crab wash sink, child play area & dedicated biker parking.",
      alt: "Pet-friendly outdoor picnic pavilion at Lowrys Crab Shack"
    }
  ];

  const currentSlide = heroSlides[slideIndex];

  // GSAP animation on slide change
  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(heroTextRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [slideIndex]);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative pt-2 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Outer Banner Wrapper with Flanking Arrows */}
      <div className="relative flex items-center justify-center">
        
        {/* Left Carousel Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:-left-3 lg:-left-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 border border-slate-300 cursor-pointer"
          aria-label="Previous Showcase Slide"
        >
          <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* The Large Rounded Hero Frame */}
        <div className="w-full relative h-[460px] sm:h-[540px] md:h-[620px] lg:h-[660px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-950 border-2 border-slate-200/80 group">
          
          {/* Background Image */}
          <img
            src={currentSlide.image}
            alt={currentSlide.alt}
            fetchPriority="high"
            className="w-full h-full object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105"
          />

          {/* Heavy Coastal Shading Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-black/45 to-slate-950/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(15,23,42,0.6)_100%)] pointer-events-none" />

          {/* Centered Editorial Typography Overlay */}
          <div ref={heroTextRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 z-10">
            
            {/* Subtitle Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-amber-300 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-mono font-bold mb-4 sm:mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-crab-500 animate-pulse" />
              <span>{currentSlide.subtitle}</span>
            </div>

            {/* High-Contrast Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] drop-shadow-xl max-w-4xl">
              <span className="italic font-normal opacity-95 block sm:inline font-serif text-slate-100">
                {currentSlide.headlineTop}{' '}
              </span>
              <span className="font-extrabold text-crab-400 font-serif">
                {currentSlide.headlineBottom}
              </span>
            </h1>

            {/* Tagline */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-200 font-light max-w-2xl tracking-wide leading-relaxed drop-shadow">
              {currentSlide.tagline}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openCustomizer({
                  name: 'Steamed Chesapeake Blue Crabs',
                  price: '$42.00',
                  image: '/images/crab-bushel.jpg',
                  badge: 'Live Steamed Crabs'
                })}
                className="rounded-full bg-crab-600 hover:bg-crab-700 text-white font-bold px-8 py-3.5 text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-300 shadow-xl active:scale-95 cursor-pointer border-2 border-crab-600"
              >
                ORDER ONLINE (0% FEES)
              </button>

              <button
                onClick={() => onOpenWizard()}
                className="rounded-full bg-white/90 hover:bg-white text-slate-900 border border-white backdrop-blur-md px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
              >
                PARTY / CRAB INQUIRY
              </button>
            </div>

          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  slideIndex === idx ? 'w-8 h-2 bg-crab-500' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Right Carousel Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:-right-3 lg:-right-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 border border-slate-300 cursor-pointer"
          aria-label="Next Showcase Slide"
        >
          <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

    </section>
  );
}
