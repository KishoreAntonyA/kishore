import React from 'react';
import { BRAND_LOGOS, INSTAGRAM_LINK, INSTAGRAM_DISPLAY, FOUNDER_NAME, FOUNDER_ROLE, PUBLISHED_BY, CREATED_BY } from '../data/initialData';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate?: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="app-footer" className="bg-[#0e0e0e] text-[#f2ca50] full-width border-t border-white/10 flex flex-col items-center gap-6 py-16 px-6 md:px-16 w-full mt-auto">
      <div className="flex flex-col items-center gap-3">
        <img
          src={BRAND_LOGOS.footerLogo}
          alt="AK MODERN CREATING Logo"
          className="h-16 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          onClick={() => onNavigate && onNavigate('home')}
        />
        <span className="font-['Montserrat'] font-extrabold text-[#f2ca50] text-lg tracking-widest uppercase">
          AK MODERN CREATING
        </span>
        <p className="text-xs font-['JetBrains_Mono'] text-[#d0c5af]/80 tracking-widest uppercase">
          YOUR VISION, OUR CREATION
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 font-['Inter'] text-sm text-[#d0c5af] mt-2">
        <button 
          onClick={() => onNavigate && onNavigate('about')}
          className="hover:text-[#f2ca50] transition-colors cursor-pointer"
        >
          About Us
        </button>
        <span className="text-white/20">|</span>
        <button 
          onClick={() => onNavigate && onNavigate('services')}
          className="hover:text-[#f2ca50] transition-colors cursor-pointer"
        >
          Expertise Catalog
        </button>
        <span className="text-white/20">|</span>
        <button 
          onClick={() => onNavigate && onNavigate('portfolio')}
          className="hover:text-[#f2ca50] transition-colors cursor-pointer"
        >
          Portfolio Gallery
        </button>
        <span className="text-white/20">|</span>
        <a 
          href={INSTAGRAM_LINK}
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#e1306c] hover:text-[#ff6599] font-medium transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">photo_camera</span> Instagram: {INSTAGRAM_DISPLAY}
        </a>
        <span className="text-white/20">|</span>
        <a 
          href="https://wa.me/919952625837?text=Hello%20AK%20Modern%20Creating%2C%20I%20would%20like%20to%20inquire%20about%20a%20project" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span> WhatsApp: +91 9952625837
        </a>
      </div>

      {/* Production & Ownership Attribution Badge */}
      <div className="glass-panel px-6 py-3 rounded-full border border-white/10 flex flex-wrap justify-center items-center gap-3 text-xs font-['JetBrains_Mono'] text-[#d0c5af] shadow-md">
        <span className="flex items-center gap-1 text-[#f2ca50]">
          <span className="material-symbols-outlined text-[15px]">badge</span>
          {FOUNDER_ROLE}: <strong className="text-white ml-1">{FOUNDER_NAME}</strong>
        </span>
        <span className="text-white/20 hidden sm:inline">•</span>
        <span>
          Created by: <strong className="text-white">{CREATED_BY}</strong>
        </span>
        <span className="text-white/20 hidden sm:inline">•</span>
        <span>
          Published by: <strong className="text-[#f2ca50]">{PUBLISHED_BY}</strong>
        </span>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-['Inter'] text-[#d0c5af]/60 mt-1">
        <span className="hover:text-[#f2ca50] cursor-pointer">Privacy Policy</span>
        <span className="text-white/20">|</span>
        <span className="hover:text-[#f2ca50] cursor-pointer">Terms of Service</span>
        <span className="text-white/20">|</span>
        <span className="hover:text-[#f2ca50] cursor-pointer">Cookie Policy</span>
      </div>

      <p className="font-['Inter'] text-xs text-[#d0c5af]/50 mt-1">
        © 2024 AK MODERN CREATING • All Rights Reserved
      </p>
    </footer>
  );
};
