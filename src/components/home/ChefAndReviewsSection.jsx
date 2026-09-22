import React, { useState } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ChefAndReviewsSection({ onOpenWizard }) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const reviews = BUSINESS_INFO.reviews;
  const currentReview = reviews[activeReviewIdx];

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-8 flex flex-col justify-between h-full">
      
      {/* 1. About Us: Big Heritage & Founders Photo Card */}
      <div id="about" className="card-thick-hover overflow-hidden flex flex-col justify-between group">
        
        {/* BIG PHOTO - THE MAIN FOCAL POINT */}
        <div className="relative w-full h-72 sm:h-80 lg:h-96 overflow-hidden bg-slate-100">
          <img
            src={imageManifest.chef.portrait}
            alt={imageManifest.chef.alt}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            Hamilton Heritage Since 1970s
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-5 left-5 right-5 z-10 text-left text-white space-y-1">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Donald & Leslie Lowry
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-light line-clamp-2">
              "{BUSINESS_INFO.executiveChef.quote}"
            </p>
          </div>
        </div>

        {/* Narrative & Action Bar */}
        <div className="p-6 text-left space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900 font-serif">
                {BUSINESS_INFO.executiveChef.name}
              </p>
              <p className="text-xs text-crab-600 font-semibold font-mono">
                {BUSINESS_INFO.executiveChef.credentials}
              </p>
            </div>

            <a
              href={BUSINESS_INFO.onlineOrderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-crab-600 hover:bg-crab-700 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer"
            >
              Order Online
            </a>
          </div>
        </div>

      </div>

      {/* 2. Customer Reviews Card */}
      <div className="card-thick p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-crab-600">
              Verified 4.5★ Reputation
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Customer Love
            </h4>
          </div>

          {/* 5 Stars Gold */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Current Review Quote */}
        <p className="text-sm sm:text-base text-slate-700 font-normal italic leading-relaxed text-left min-h-[72px]">
          "{currentReview.comment}"
        </p>

        {/* Reviewer Information and Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-left">
          <div>
            <p className="text-sm font-bold text-slate-900 font-serif">
              {currentReview.author}
            </p>
            <p className="text-xs text-slate-500">
              {currentReview.location} • <span className="text-crab-600 font-semibold">{currentReview.source}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevReview}
              className="w-8 h-8 rounded-full border border-slate-300 hover:border-crab-500 flex items-center justify-center text-slate-700 hover:text-crab-600 transition cursor-pointer"
              aria-label="Previous Review"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextReview}
              className="w-8 h-8 rounded-full border border-slate-300 hover:border-crab-500 flex items-center justify-center text-slate-700 hover:text-crab-600 transition cursor-pointer"
              aria-label="Next Review"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
