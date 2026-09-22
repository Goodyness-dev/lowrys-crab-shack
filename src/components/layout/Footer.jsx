import React from 'react';
import { PhoneIcon, MapPinIcon, CoffeeIcon, SpoonForkIcon } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenMenu, onOpenOrder }) {
  return (
    <footer className="bg-restaurant-ink text-cream-100 border-t-2 border-restaurant-brown/20 relative overflow-hidden">
      
      {/* Decorative Top Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-restaurant-red via-restaurant-gold to-restaurant-turquoise" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-restaurant-red text-cream-50 flex items-center justify-center font-serif font-bold text-lg border-2 border-cream-50/20">
                LCS
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-cream-50">
                  Lowry's Crab Shack
                </h3>
                <span className="text-[11px] font-mono text-restaurant-gold uppercase tracking-wider">
                  Hamilton Seafood Shack • Est. 2007
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-200/75 leading-relaxed font-sans pt-2">
              Pull up a chair. Fresh live Chesapeake Bay blue crabs, 4x Voted #1 Fried Chicken in Loudoun, Low Country boils, and ice-cold drinks served on butcher paper.
            </p>

            <div className="pt-2 text-xs font-mono text-cream-300">
              Virginia Health Department Certified • 4x Best of Loudoun Winner
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-cream-50">
              Explore The Shack
            </h4>
            <ul className="space-y-2 text-xs font-mono text-cream-200/80">
              <li>
                <a href="#menu" className="hover:text-restaurant-red transition-colors">
                  → Full Seafood & Chicken Menu
                </a>
              </li>
              <li>
                <a href="#the-table" className="hover:text-restaurant-red transition-colors">
                  → The Crab Feast Table
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-restaurant-red transition-colors">
                  → Donald & Leslie's Story
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-restaurant-red transition-colors">
                  → Patio Location & Hours
                </a>
              </li>
              <li>
                <a href="#/admin" className="text-restaurant-gold hover:underline">
                  → Kitchen Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Hours At A Glance */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-cream-50">
              Operating Hours & Contact
            </h4>
            <div className="text-xs font-mono space-y-1.5 text-cream-200/80">
              <div className="flex justify-between py-1 border-b border-cream-50/10">
                <span>Monday & Tuesday:</span>
                <span className="text-cream-50/60 font-medium">Closed (Fresh Sourcing)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cream-50/10">
                <span>Wednesday – Friday:</span>
                <span className="text-cream-50 font-bold">4:00 PM – 8:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cream-50/10">
                <span>Saturday & Sunday:</span>
                <span className="text-cream-50 font-bold">12:00 PM – 8:00 PM</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-4 text-xs font-mono">
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-1.5 text-cream-50 hover:text-restaurant-red transition-colors"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-restaurant-red" />
                <span>(540) 338-2348</span>
              </a>
              <span className="text-cream-50/30">•</span>
              <span className="text-cream-300">420 W Colonial Hwy, Hamilton, VA</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream-50/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cream-300">
          <div>
            © {new Date().getFullYear()} Lowry's Crab Shack LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="/llms.txt" className="hover:text-cream-50 transition-colors">llms.txt</a>
            <span>•</span>
            <a href="/robots.txt" className="hover:text-cream-50 transition-colors">robots.txt</a>
            <span>•</span>
            <a href="#/admin" className="text-restaurant-gold hover:underline">Kitchen Admin</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
