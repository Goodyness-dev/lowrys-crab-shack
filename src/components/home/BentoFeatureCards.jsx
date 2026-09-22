import React from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';
import { useCart } from '../../context/CartContext';

export default function BentoFeatureCards({ onOpenWizard, onViewAllServices }) {
  const { openCustomizer } = useCart();
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        
        {/* Left Bento Card: Steamed Chesapeake Blue Crabs */}
        <div className="card-thick-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* BIG IMAGE - THE DOMINANT VISUAL ANCHOR */}
            <div className="w-full sm:w-56 h-56 sm:h-52 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 relative shadow-sm">
              <img
                src={imageManifest.features.crabs}
                alt="Fresh steamed Chesapeake blue crabs at Lowrys Crab Shack"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-crab-600 text-[10px] font-mono uppercase tracking-wider text-white font-bold shadow-xs">
                Live Steamed
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold uppercase tracking-wider text-crab-600">
                <span>// 02 CHESAPEAKE HERITAGE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
                Live Steamed Blue Crabs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Sourced fresh from Chesapeake Bay watermen, seasoned heavily with Old Bay and beer, and served piping hot with mallets by the dozen or bushel.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 tracking-wider">
              Males & Females • Dozen & Bushel
            </span>
            <button
              type="button"
              onClick={() => openCustomizer({
                name: 'Steamed Chesapeake Blue Crabs',
                price: '$42.00',
                image: imageManifest.features.crabs,
                badge: 'Live Steamed'
              })}
              className="rounded-full bg-crab-600 hover:bg-crab-700 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer"
            >
              Order Crabs (0% Fees)
            </button>
          </div>
        </div>

        {/* Right Bento Card: 4x Voted #1 Fried Chicken */}
        <div className="card-thick-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* BIG IMAGE - THE DOMINANT VISUAL ANCHOR */}
            <div className="w-full sm:w-56 h-56 sm:h-52 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 relative shadow-sm">
              <img
                src={imageManifest.features.chicken}
                alt="Award winning golden fried chicken at Lowrys Crab Shack"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-[10px] font-mono uppercase tracking-wider text-slate-950 font-black shadow-xs">
                4x #1 Winner
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold uppercase tracking-wider text-crab-600">
                <span>// 03 LOUDOUN'S FAVORITE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
                Voted #1 Fried Chicken
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Voted #1 Fried Chicken by Loudoun Times-Mirror readers 2021 through 2024. Hand-breaded and cooked fresh to order with crisp golden skin and juicy tenderness.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 tracking-wider">
              Family Meals • Scratch Sides • Hushpuppies
            </span>
            <button
              onClick={onViewAllServices}
              className="rounded-full bg-white border-2 border-crab-600 text-crab-700 hover:bg-crab-600 hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer"
            >
              Explore Menu
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
