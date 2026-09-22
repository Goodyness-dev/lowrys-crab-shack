import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import IntroSection from './components/home/IntroSection';
import CategoriesSection from './components/home/CategoriesSection';
import TheTableSection from './components/home/TheTableSection';
import FeaturedMenuSection from './components/home/FeaturedMenuSection';
import BrandInterruption from './components/home/BrandInterruption';
import PeopleStorySection from './components/home/PeopleStorySection';
import LocationHoursSection from './components/home/LocationHoursSection';
import ClosingScene from './components/home/ClosingScene';
import Footer from './components/layout/Footer';
import FullMenuModal from './components/menu/FullMenuModal';
import TableOrderModal from './components/booking/TableOrderModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { PhoneIcon, SpoonForkIcon } from './components/common/Icons';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'admin'
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [preselectedItem, setPreselectedItem] = useState(null);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Warm theme state (Light by default for warm diner feel, Dark supported)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('pfr_theme');
      if (saved) return saved === 'dark';
      return false;
    } catch {
      return false;
    }
  });

  // Verify admin session on mount
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.verify()
        .then(res => {
          if (res.authenticated) {
            setIsAdminAuthenticated(true);
            setAdminUser(res.user);
          }
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, []);

  // Sync dark mode class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode || currentPage === 'admin') {
      root.classList.add('dark');
      document.body.classList.add('dark');
      if (currentPage !== 'admin') {
        localStorage.setItem('pfr_theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('pfr_theme', 'light');
    }
  }, [darkMode, currentPage]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      return next;
    });
  };

  // URL Hash routing for #/admin
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenOrder = (item = null) => {
    if (item && item.id && !item.nativeEvent && typeof item.preventDefault !== 'function') {
      setPreselectedItem(item);
    } else {
      setPreselectedItem(null);
    }
    setOrderModalOpen(true);
  };

  // If in admin view
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin 
          onLoginSuccess={(user) => {
            setIsAdminAuthenticated(true);
            setAdminUser(user);
          }}
          onBackToSite={() => {
            window.location.hash = '';
            setCurrentPage('home');
          }}
        />
      );
    }
    return (
      <AdminLayout 
        user={adminUser}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }}
        onBackToSite={() => {
          window.location.hash = '';
          setCurrentPage('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream-200 dark:bg-midnight text-restaurant-ink dark:text-cream-50 font-sans selection:bg-restaurant-red selection:text-cream-50">
      
      {/* Navigation */}
      <Navbar 
        onOpenOrder={() => handleOpenOrder(null)}
        onOpenMenu={() => setMenuModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Experience: 9 Story Sections */}
      <main>
        {/* Section 01: Cinematic Hero */}
        <Hero 
          onOpenMenu={() => setMenuModalOpen(true)}
          onOpenOrder={() => handleOpenOrder(null)}
        />

        {/* Section 02: Introduction */}
        <IntroSection />

        {/* Section 03: Food Categories */}
        <CategoriesSection 
          onOpenMenu={() => setMenuModalOpen(true)}
        />

        {/* Section 04: The Table */}
        <TheTableSection 
          onOpenOrder={handleOpenOrder}
        />

        {/* Section 05: Featured Menu Gallery */}
        <FeaturedMenuSection 
          onOpenMenu={() => setMenuModalOpen(true)}
          onOpenOrder={handleOpenOrder}
        />

        {/* Section 06: Brand Interruption */}
        <BrandInterruption />

        {/* Section 07: People & Restaurant */}
        <PeopleStorySection />

        {/* Section 08: Visit / Main Street */}
        <LocationHoursSection />

        {/* Section 09: Closing Scene */}
        <ClosingScene 
          onOpenOrder={() => handleOpenOrder(null)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenMenu={() => setMenuModalOpen(true)}
        onOpenOrder={() => handleOpenOrder(null)}
      />

      {/* Full Menu Drawer Modal */}
      <FullMenuModal 
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        onSelectOrder={handleOpenOrder}
      />

      {/* Table Reservation & Takeout Order Modal */}
      <TableOrderModal 
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        preselectedItem={preselectedItem}
      />

      {/* Mobile Floating Sticky Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
        <div className="bg-cream-100/95 dark:bg-midnight-card/95 backdrop-blur-md p-2.5 rounded-full border-2 border-restaurant-brown/15 dark:border-midnight-border shadow-2xl flex items-center gap-2">
          <a 
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="flex-1 btn-secondary !py-2.5 text-xs justify-center"
          >
            <PhoneIcon className="w-4 h-4 text-restaurant-red" />
            <span>Call Diner</span>
          </a>
          <button 
            onClick={() => handleOpenOrder(null)}
            className="flex-1 btn-primary !py-2.5 text-xs justify-center"
          >
            <SpoonForkIcon className="w-4 h-4" />
            <span>Order / Table</span>
          </button>
        </div>
      </div>

    </div>
  );
}
