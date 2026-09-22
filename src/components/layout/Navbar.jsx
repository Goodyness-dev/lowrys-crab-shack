import React, { useState, useEffect } from 'react';
import { PhoneIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon, CoffeeIcon } from '../common/Icons';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function Navbar({ onOpenOrder, onOpenMenu, darkMode, onToggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openStatus = isOpenNow();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cream-100/95 dark:bg-midnight-pure/95 backdrop-blur-md shadow-thick border-b border-restaurant-brown/10 dark:border-midnight-border py-3' 
        : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-cream-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-restaurant-red text-cream-50 flex items-center justify-center font-serif font-bold text-lg shadow-md border-2 border-cream-50/40 group-hover:scale-105 transition-transform">
            LCS
          </div>
          <div>
            <div className={`font-serif font-bold text-lg sm:text-xl tracking-tight leading-none transition-colors ${
              scrolled ? 'text-restaurant-brown dark:text-cream-50' : 'text-cream-50'
            }`}>
              Lowry's Crab Shack
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-medium tracking-wider uppercase text-restaurant-red dark:text-restaurant-gold font-mono">
                Est. 2007 • Hamilton, VA
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-restaurant-brown/30 dark:bg-cream-100/30"></span>
              <span className={`text-[11px] font-medium ${openStatus ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                {openStatus ? '● Open Today' : '○ Opens Wed 4PM'}
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <a 
            href="#menu" 
            className={`text-sm font-semibold tracking-wide hover:text-restaurant-red transition-colors ${
              scrolled ? 'text-restaurant-brown dark:text-cream-200' : 'text-cream-100'
            }`}
          >
            Menu
          </a>
          <a 
            href="#the-table" 
            className={`text-sm font-semibold tracking-wide hover:text-restaurant-red transition-colors ${
              scrolled ? 'text-restaurant-brown dark:text-cream-200' : 'text-cream-100'
            }`}
          >
            The Table Spread
          </a>
          <a 
            href="#story" 
            className={`text-sm font-semibold tracking-wide hover:text-restaurant-red transition-colors ${
              scrolled ? 'text-restaurant-brown dark:text-cream-200' : 'text-cream-100'
            }`}
          >
            Our Story
          </a>
          <a 
            href="#visit" 
            className={`text-sm font-semibold tracking-wide hover:text-restaurant-red transition-colors ${
              scrolled ? 'text-restaurant-brown dark:text-cream-200' : 'text-cream-100'
            }`}
          >
            Location & Hours
          </a>
          <a 
            href="#/admin" 
            className="text-xs font-mono px-2.5 py-1 rounded-full border border-restaurant-brown/20 dark:border-midnight-border text-restaurant-brown/70 dark:text-cream-300 hover:text-restaurant-red transition-colors"
          >
            // Kitchen Admin
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleDarkMode}
            aria-label="Toggle Theme"
            className={`p-2.5 rounded-full transition-colors ${
              scrolled 
                ? 'bg-cream-200 dark:bg-midnight-card text-restaurant-brown dark:text-cream-100 hover:bg-cream-300' 
                : 'bg-black/40 text-cream-50 hover:bg-black/60'
            }`}
          >
            {darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>

          {/* Quick Call */}
          <a 
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              scrolled
                ? 'bg-cream-200 dark:bg-midnight-card text-restaurant-brown dark:text-cream-100 hover:bg-cream-300'
                : 'bg-white/20 text-cream-50 hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            <PhoneIcon className="w-3.5 h-3.5" />
            <span>(540) 338-2348</span>
          </a>

          {/* Table / Order CTA */}
          <button 
            onClick={() => onOpenOrder(null)}
            className="btn-primary text-xs !py-2.5 !px-5"
          >
            <span>Order Takeout</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={onToggleDarkMode}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full ${scrolled ? 'text-restaurant-brown dark:text-cream-100' : 'text-cream-50'}`}
          >
            {darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl ${scrolled ? 'text-restaurant-brown dark:text-cream-50' : 'text-cream-50'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100 dark:bg-midnight-card border-b-2 border-restaurant-brown/10 dark:border-midnight-border px-6 py-6 space-y-4 shadow-thick animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif font-semibold text-restaurant-brown dark:text-cream-100 hover:text-restaurant-red py-1"
            >
              Menu & Food Categories
            </a>
            <a 
              href="#the-table" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif font-semibold text-restaurant-brown dark:text-cream-100 hover:text-restaurant-red py-1"
            >
              The Table Spread
            </a>
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif font-semibold text-restaurant-brown dark:text-cream-100 hover:text-restaurant-red py-1"
            >
              Our Story & People
            </a>
            <a 
              href="#visit" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif font-semibold text-restaurant-brown dark:text-cream-100 hover:text-restaurant-red py-1"
            >
              Visit & Operating Hours
            </a>
            <a 
              href="#/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono text-restaurant-red py-1"
            >
              → Access Admin Portal
            </a>
          </div>

          <div className="pt-4 border-t border-restaurant-brown/10 dark:border-midnight-border flex flex-col gap-3">
            <a 
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="btn-secondary w-full justify-center text-sm"
            >
              <PhoneIcon className="w-4 h-4 text-restaurant-red" />
              <span>Call Us: (540) 338-2348</span>
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenOrder(); }}
              className="btn-primary w-full justify-center text-sm"
            >
              <span>Order Takeout / Crabs</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
