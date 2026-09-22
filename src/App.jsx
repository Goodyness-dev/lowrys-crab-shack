import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import MainShowcaseSection from './components/home/MainShowcaseSection';
import BentoFeatureCards from './components/home/BentoFeatureCards';
import GallerySection from './components/home/GallerySection';
import LocationHoursSection from './components/home/LocationHoursSection';
import Footer from './components/layout/Footer';
import AllServicesPage from './components/services/AllServicesPage';
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';
import { CartProvider, useCart } from './context/CartContext';
import ItemCustomizerModal from './components/ordering/ItemCustomizerModal';
import OrderCartDrawer from './components/ordering/OrderCartDrawer';
import ShackCheckoutModal from './components/ordering/ShackCheckoutModal';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'services' | 'admin'
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState(null);

  const { itemCount, setIsCartOpen, openCustomizer } = useCart();

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Check stored auth token on mount
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

  // Sync with browser URL hash for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (
        hash === '#/menu' || 
        hash === '#menu' || 
        hash.startsWith('#/menu') ||
        hash === '#/services' || 
        hash === '#services' ||
        hash.startsWith('#/services')
      ) {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    if (page === 'services') {
      if (window.location.hash !== '#/menu') {
        window.location.hash = '#/menu';
      }
      setCurrentPage('services');
    } else if (page === 'admin') {
      if (window.location.hash !== '#/admin') {
        window.location.hash = '#/admin';
      }
      setCurrentPage('admin');
    } else {
      if (window.location.hash && (window.location.hash.includes('menu') || window.location.hash.includes('admin') || window.location.hash.includes('services'))) {
        window.history.pushState(null, '', window.location.pathname);
      }
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWizard = (category = null) => {
    setWizardCategory(category);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setWizardCategory(null);
  };

  // If on Admin route, render Admin portal
  if (currentPage === 'admin') {
    return isAdminAuthenticated ? (
      <AdminLayout
        user={adminUser}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    ) : (
      <AdminLogin
        onLoginSuccess={(user) => {
          setIsAdminAuthenticated(true);
          setAdminUser(user);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-200 selection:bg-red-600 selection:text-white">
      {/* Global Navbar */}
      <Navbar 
        onOpenWizard={() => handleOpenWizard()} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main View: Landing Page OR Full Menu Page */}
      <main className="flex-grow">
        {currentPage === 'services' ? (
          <AllServicesPage 
            onOpenWizard={handleOpenWizard}
            onBackToHome={() => handleNavigate('home')}
          />
        ) : (
          <>
            {/* Top Showcase Banner */}
            <Hero onOpenWizard={handleOpenWizard} />

            {/* Middle Main Showcase: Our Menu (Big Food Cards) + Executive Chef & Reviews */}
            <MainShowcaseSection 
              onOpenWizard={handleOpenWizard} 
              onViewAllServices={() => handleNavigate('services')}
            />

            {/* Bottom Bento Feature Cards */}
            <BentoFeatureCards 
              onOpenWizard={handleOpenWizard} 
              onViewAllServices={() => handleNavigate('services')}
            />

            {/* Visual Archive Gallery: 15 Premium Authentic Photos with Filtering & Lightbox */}
            <GallerySection onOpenWizard={handleOpenWizard} />

            {/* Shack Location & Interactive Google Map */}
            <LocationHoursSection onOpenWizard={handleOpenWizard} />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onOpenWizard={() => handleOpenWizard()} 
        onNavigate={handleNavigate}
      />

      {/* Table & Bushel Reservation Modal */}
      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        initialCategory={wizardCategory}
      />

      {/* Custom 0% Commission Online Ordering Modals */}
      <ItemCustomizerModal />
      <OrderCartDrawer />
      <ShackCheckoutModal />

      {/* Sticky Mobile Bottom Order & Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phoneClean}`}
          className="py-2.5 px-3 rounded-full bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs flex items-center justify-center space-x-1 active:scale-95 shadow-xs"
        >
          <span>Call</span>
        </a>
        <button
          onClick={() => {
            if (currentPage !== 'services') {
              handleNavigate('services');
            } else {
              openCustomizer({
                name: 'Steamed Chesapeake Blue Crabs',
                price: '$42.00',
                image: '/images/crab-bushel.jpg',
                badge: 'Live Steamed Crabs'
              });
            }
          }}
          className="flex-1 py-2.5 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 shadow-md active:scale-95 cursor-pointer"
        >
          <span>Order Online</span>
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative py-2.5 px-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-md active:scale-95 cursor-pointer"
          aria-label="View Order Basket"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="ml-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
