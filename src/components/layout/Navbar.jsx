import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'HOME', target: '#' },
    { name: 'MENU', target: 'services' },
    { name: 'OUR STORY', target: '#about' },
    { name: 'GALLERY', target: '#gallery' },
    { name: 'LOCATION & HOURS', target: '#location' },
    { name: 'ORDER / INQUIRE', action: 'wizard' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200' 
          : 'bg-white border-b border-slate-200'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Brand Mark */}
        <a 
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center space-x-3.5 group text-left"
          aria-label="Lowry's Crab Shack Home"
        >
          <div className="w-12 h-12 rounded-full border-2 border-crab-600 flex items-center justify-center p-1 relative bg-crab-50 group-hover:border-crab-700 transition-colors shadow-xs">
            <span className="font-serif font-black text-base text-crab-700 tracking-tighter">
              LC
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-tight">
              Lowry's Crab Shack
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.16em] uppercase text-crab-700 font-mono font-bold">
              Hamilton, VA • Chesapeake Blue Crabs
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isMenu = link.target === 'services' && currentPage === 'services';
            return (
              <button
                key={link.name}
                type="button"
                onClick={(e) => {
                  if (link.action === 'wizard') {
                    onOpenWizard();
                  } else {
                    handleNavClick(e, link.target);
                  }
                }}
                className={`text-[12px] font-bold tracking-[0.14em] transition-all duration-200 cursor-pointer touch-manipulation ${
                  isMenu 
                    ? 'text-crab-700 border-b-2 border-crab-600 pb-0.5' 
                    : 'text-slate-800 hover:text-crab-600'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="text-xs font-bold tracking-wider text-slate-800 hover:text-crab-600 transition flex items-center space-x-1.5 font-mono"
            title="Call Restaurant"
          >
            <svg className="w-3.5 h-3.5 text-crab-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <a
            href={BUSINESS_INFO.onlineOrderingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-crab-600 hover:bg-crab-700 text-white font-bold px-6 py-2.5 text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-sm active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Order Online from Lowry's Crab Shack"
          >
            ORDER ONLINE
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            type="button"
            onClick={() => onOpenWizard()}
            className="rounded-full bg-crab-600 text-white font-bold px-4 py-1.5 text-[11px] uppercase tracking-wider active:scale-95 touch-manipulation"
          >
            Order
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 text-slate-800 hover:text-crab-600 focus:outline-none touch-manipulation"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={(e) => {
                  if (link.action === 'wizard') {
                    setMobileMenuOpen(false);
                    onOpenWizard();
                  } else {
                    handleNavClick(e, link.target);
                  }
                }}
                className="block w-full text-left py-2 text-sm font-bold tracking-widest text-slate-800 border-b border-slate-100 touch-manipulation hover:text-crab-600"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border border-slate-300 text-xs font-bold tracking-wider text-slate-900"
            >
              <span>CALL {BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.onlineOrderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-3 rounded-full bg-crab-600 hover:bg-crab-700 text-white text-xs font-bold uppercase tracking-widest shadow-md"
            >
              ORDER ONLINE (TALECH)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWizard();
              }}
              className="w-full py-3 rounded-full border-2 border-crab-600 text-crab-700 text-xs font-bold uppercase tracking-widest shadow-xs"
            >
              PARTY / CATERING INQUIRY
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
