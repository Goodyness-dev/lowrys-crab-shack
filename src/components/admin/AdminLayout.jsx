import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });

  useEffect(() => {
    quotesApi.getStats().then(setStats).catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Management Overview', badge: null },
    { id: 'orders', label: 'Table Reservations', badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox', label: 'Guest Messages', badge: stats.pending > 0 ? stats.pending : null },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex antialiased">
      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xl ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Header & Logo */}
        <div>
          <div className="h-20 flex items-center px-5 border-b border-slate-800 space-x-3">
            <img 
              src="/images/shack-exterior.jpg" 
              alt="Lowry's Crab Shack" 
              className="w-10 h-10 rounded-xl object-cover border-2 border-red-600 shadow-sm"
            />
            <div className="overflow-hidden text-left">
              <span className="font-serif font-bold text-white text-sm tracking-tight block truncate">
                Lowry's Crab Shack
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 block font-mono font-semibold">
                Owner & Staff Suite
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-900">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2.5">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition cursor-pointer"
          >
            <span>← View Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 transition font-medium cursor-pointer"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3 overflow-hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs cursor-pointer shrink-0"
              aria-label="Open Navigation Menu"
            >
              Menu
            </button>
            <h1 className="font-serif text-base sm:text-xl lg:text-2xl font-bold text-slate-900 capitalize truncate">
              {activeTab === 'dashboard' ? "Management Overview" :
               activeTab === 'orders' ? "Table & Bushel Reservations" :
               "Guest Inbox"}
            </h1>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-4 sm:px-6 py-2.5 text-xs uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
            >
              + Reservation
            </button>

            <img 
              src="/images/shack-exterior.jpg" 
              alt="Management" 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-red-600 shadow-xs"
            />
          </div>
        </header>

        {/* View Component Render */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              stats={stats}
              onViewAllOrders={() => setActiveTab('orders')}
              onOpenQuoteDetail={(q) => setModalQuote(q)}
              onNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView 
              onOpenQuoteDetail={(q) => setModalQuote(q)}
              onNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'inbox' && (
            <InboxView 
              onOpenQuoteDetail={(q) => setModalQuote(q)}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings />
          )}
        </main>
      </div>

      {/* Quote Detail Modal */}
      {modalQuote && (
        <QuoteDetailModal 
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdated={() => {
            quotesApi.getStats().then(setStats).catch(() => {});
          }}
        />
      )}

      {/* New Order Modal */}
      {isNewOrderOpen && (
        <NewOrderModal 
          isOpen={isNewOrderOpen}
          onClose={() => setIsNewOrderOpen(false)}
          onCreated={() => {
            setIsNewOrderOpen(false);
            quotesApi.getStats().then(setStats).catch(() => {});
            setActiveTab('orders');
          }}
        />
      )}
    </div>
  );
}
