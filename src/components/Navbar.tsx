import React, { useState } from 'react';
import { ViewMode, UserRole } from '../types';
import { BRAND_LOGOS, INSTAGRAM_LINK, INSTAGRAM_DISPLAY } from '../data/initialData';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  userRole,
  onRoleChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const isPublicNavActive = ['home', 'services', 'portfolio', 'about'].includes(currentView);

  return (
    <>
      {/* Desktop Navigation */}
      <nav id="main-desktop-navbar" className="bg-[#131313]/85 backdrop-blur-xl docked full-width top-0 sticky z-50 border-b border-white/10 shadow-2xl hidden md:flex">
        <div className="flex justify-between items-center px-8 lg:px-16 py-4 w-full max-w-screen-2xl mx-auto">
          {/* Brand Logo & Name */}
          <button 
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-4 group cursor-pointer text-left transition-transform duration-200 hover:scale-[1.01]"
          >
            <img
              src={BRAND_LOGOS.mainLogo}
              alt="AK MODERN CREATING Logo"
              className="h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-['Montserrat'] font-extrabold text-[#f2ca50] text-lg lg:text-xl tracking-widest hidden lg:block uppercase">
              AK MODERN CREATING
            </span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 lg:gap-10">
            <button
              id="nav-home-btn"
              onClick={() => onNavigate('home')}
              className={`font-['JetBrains_Mono'] text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#f2ca50] font-bold border-b-2 border-[#f2ca50] pb-1'
                  : 'text-[#d0c5af] hover:text-[#f2ca50] hover:scale-105'
              }`}
            >
              Home
            </button>
            <button
              id="nav-services-btn"
              onClick={() => onNavigate('services')}
              className={`font-['JetBrains_Mono'] text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                currentView === 'services'
                  ? 'text-[#f2ca50] font-bold border-b-2 border-[#f2ca50] pb-1'
                  : 'text-[#d0c5af] hover:text-[#f2ca50] hover:scale-105'
              }`}
            >
              Services
            </button>
            <button
              id="nav-portfolio-btn"
              onClick={() => onNavigate('portfolio')}
              className={`font-['JetBrains_Mono'] text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                currentView === 'portfolio'
                  ? 'text-[#f2ca50] font-bold border-b-2 border-[#f2ca50] pb-1'
                  : 'text-[#d0c5af] hover:text-[#f2ca50] hover:scale-105'
              }`}
            >
              Portfolio
            </button>
            <button
              id="nav-about-btn"
              onClick={() => onNavigate('about')}
              className={`font-['JetBrains_Mono'] text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                currentView === 'about'
                  ? 'text-[#f2ca50] font-bold border-b-2 border-[#f2ca50] pb-1'
                  : 'text-[#d0c5af] hover:text-[#f2ca50] hover:scale-105'
              }`}
            >
              About
            </button>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex items-center gap-3 lg:gap-4 relative">
            {/* Instagram Direct Header Link */}
            <a
              id="nav-instagram-direct"
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e1306c]/10 border border-[#e1306c]/30 text-[#ff6b9d] font-['JetBrains_Mono'] text-xs font-semibold hover:bg-[#e1306c]/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              {INSTAGRAM_DISPLAY}
            </a>

            {/* WhatsApp Direct Header Link */}
            <a
              id="nav-whatsapp-direct"
              href="https://wa.me/919952625837?text=Hello%20AK%20Modern%20Creating%2C%20I%20would%20like%20to%20inquire%20about%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-['JetBrains_Mono'] text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              WA: 9952625837
            </a>

            <button
              id="nav-track-order-btn"
              onClick={() => onNavigate('track')}
              className={`bg-transparent border-[1.5px] px-5 py-2 rounded font-['JetBrains_Mono'] text-sm font-medium transition-all duration-200 cursor-pointer ${
                currentView === 'track'
                  ? 'border-[#f2ca50] text-[#f2ca50] bg-[#f2ca50]/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'border-[#c6c6c6] text-white hover:border-[#f2ca50] hover:text-[#f2ca50] hover:bg-white/5'
              }`}
            >
              Track Order
            </button>

            <button
              id="nav-get-started-btn"
              onClick={() => onNavigate('booking')}
              className="bg-gradient-to-r from-[#f2ca50] via-[#ffe088] to-[#d4af37] text-[#3c2f00] font-['JetBrains_Mono'] text-sm font-bold px-6 py-2 rounded gold-glow-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              Get Started
            </button>

            {/* Portal & Role Switcher */}
            <div className="relative">
              <button
                id="user-portal-menu-btn"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors p-2 rounded-full hover:bg-white/5 flex items-center justify-center cursor-pointer border border-transparent hover:border-white/10"
                title="Switch Portal Views"
              >
                <span className="material-symbols-outlined text-[26px]">account_circle</span>
              </button>

              {roleMenuOpen && (
                <div 
                  id="role-switch-dropdown"
                  className="absolute right-0 top-12 w-64 glass-panel rounded-xl p-3 shadow-2xl border border-white/15 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-2">
                    <p className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase tracking-wider font-semibold">
                      Portal &amp; View Switcher
                    </p>
                    <p className="text-[11px] text-[#d0c5af] mt-0.5">Explore all client &amp; admin screens</p>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onRoleChange('visitor');
                        onNavigate('home');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentView === 'home' || currentView === 'services' || currentView === 'portfolio'
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] font-bold'
                          : 'text-[#e5e2e1] hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">public</span>
                        Public Website
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        onRoleChange('client');
                        onNavigate('client-dashboard');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentView === 'client-dashboard'
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] font-bold'
                          : 'text-[#e5e2e1] hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">person</span>
                        Client Portal Dashboard
                      </span>
                      <span className="text-[10px] bg-[#f2ca50]/20 text-[#f2ca50] px-1.5 py-0.5 rounded">Screen 3</span>
                    </button>

                    <button
                      onClick={() => {
                        onRoleChange('admin');
                        onNavigate('admin-dashboard');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentView === 'admin-dashboard'
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] font-bold'
                          : 'text-[#e5e2e1] hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                        Admin Dashboard
                      </span>
                      <span className="text-[10px] bg-[#f2ca50]/20 text-[#f2ca50] px-1.5 py-0.5 rounded">Screen 2</span>
                    </button>

                    <button
                      onClick={() => {
                        onRoleChange('admin');
                        onNavigate('admin-order-detail');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentView === 'admin-order-detail'
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] font-bold'
                          : 'text-[#e5e2e1] hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">assignment</span>
                        Order Management #8991
                      </span>
                      <span className="text-[10px] bg-[#f2ca50]/20 text-[#f2ca50] px-1.5 py-0.5 rounded">Screen 5</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('track');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentView === 'track'
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] font-bold'
                          : 'text-[#e5e2e1] hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">timelapse</span>
                        Live Track Order
                      </span>
                      <span className="text-[10px] bg-[#f2ca50]/20 text-[#f2ca50] px-1.5 py-0.5 rounded">Screen 4</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('booking');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentView === 'booking'
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] font-bold'
                          : 'text-[#e5e2e1] hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        Service Booking (4 Steps)
                      </span>
                      <span className="text-[10px] bg-[#f2ca50]/20 text-[#f2ca50] px-1.5 py-0.5 rounded">Screen 6</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Header */}
      <header id="main-mobile-header" className="bg-[#131313]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 p-4 flex justify-between items-center md:hidden">
        <button 
          id="mobile-logo-btn"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2"
        >
          <img
            src={BRAND_LOGOS.mobileLogo}
            alt="AK MODERN CREATING Logo"
            className="h-9 w-auto object-contain"
          />
          <span className="font-['Montserrat'] font-bold text-[#f2ca50] text-sm tracking-wider uppercase">
            AK MODERN
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button
            id="mobile-track-btn"
            onClick={() => onNavigate('track')}
            className="text-xs px-2.5 py-1 rounded bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] font-['JetBrains_Mono']"
          >
            Track
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#e5e2e1] p-1.5 rounded hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-menu" className="fixed inset-x-0 top-[65px] bg-[#0d0d0d]/95 backdrop-blur-2xl border-b border-white/15 p-6 z-40 md:hidden flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-[#e5e2e1] hover:text-[#f2ca50] font-['Montserrat'] font-semibold text-lg border-b border-white/5"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('services');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-[#e5e2e1] hover:text-[#f2ca50] font-['Montserrat'] font-semibold text-lg border-b border-white/5"
          >
            Services Catalog
          </button>
          <button
            onClick={() => {
              onNavigate('portfolio');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-[#e5e2e1] hover:text-[#f2ca50] font-['Montserrat'] font-semibold text-lg border-b border-white/5"
          >
            Portfolio
          </button>
          <button
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-[#e5e2e1] hover:text-[#f2ca50] font-['Montserrat'] font-semibold text-lg border-b border-white/5"
          >
            About AK Modern
          </button>

          <div className="pt-2 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 bg-[#e1306c]/15 border border-[#e1306c]/40 text-[#ff6b9d] rounded-lg text-xs font-['JetBrains_Mono'] font-bold text-center flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                Instagram
              </a>
              <a
                href="https://wa.me/919952625837?text=Hello%20AK%20Modern%20Creating%2C%20I%20would%20like%20to%20inquire%20about%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 rounded-lg text-xs font-['JetBrains_Mono'] font-bold text-center flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => {
                onNavigate('booking');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] py-3 rounded-lg font-['JetBrains_Mono'] font-bold text-center text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Book A Service
            </button>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => {
                  onNavigate('client-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-2 bg-white/5 border border-white/10 rounded-lg text-xs font-['JetBrains_Mono'] text-white hover:border-[#f2ca50]"
              >
                Client Portal
              </button>
              <button
                onClick={() => {
                  onNavigate('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-2 bg-white/5 border border-white/10 rounded-lg text-xs font-['JetBrains_Mono'] text-white hover:border-[#f2ca50]"
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
