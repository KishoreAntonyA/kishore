import React from 'react';
import { ViewMode } from '../types';
import { BRAND_LOGOS, FOUNDER_NAME, FOUNDER_ROLE, PUBLISHED_BY, CREATED_BY, INSTAGRAM_HANDLE, INSTAGRAM_LINK, WHATSAPP_DISPLAY, WHATSAPP_LINK } from '../data/initialData';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div id="about-view" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#f2ca50] tracking-widest uppercase">
            CREATIVE INTELLIGENCE AGENCY
          </span>
          <h1 className="font-['Montserrat'] font-extrabold text-3xl md:text-5xl text-white">
            ABOUT AK MODERN CREATING
          </h1>
          <p className="font-['Inter'] text-sm md:text-base text-[#d0c5af] leading-relaxed">
            Bridging hyper-refined visual aesthetics with next-generation generative AI pipelines to deliver sovereign brand assets.
          </p>
        </div>

        {/* Founder & Studio Ownership Banner */}
        <div className="glass-panel p-8 rounded-2xl border border-[#f2ca50]/40 bg-gradient-to-r from-[#17140d] via-[#221a0d] to-[#17140d] shadow-[0_0_35px_rgba(212,175,55,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f2ca50] to-[#b38d1b] p-1 flex-shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <img
                src={BRAND_LOGOS.adminAvatar}
                alt={FOUNDER_NAME}
                className="w-full h-full object-cover rounded-xl bg-black"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['JetBrains_Mono'] font-bold bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/40 uppercase tracking-wider">
                  {FOUNDER_ROLE}
                </span>
                <span className="text-xs text-[#d0c5af] font-['JetBrains_Mono']">• Founder Lead</span>
              </div>
              <h2 className="font-['Montserrat'] font-extrabold text-2xl text-white tracking-wide">
                {FOUNDER_NAME}
              </h2>
              <p className="text-xs text-[#d0c5af] font-['Inter']">
                Created by <strong className="text-white">{CREATED_BY}</strong> • Published by <strong className="text-[#f2ca50]">{PUBLISHED_BY}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e1306c]/15 hover:bg-[#e1306c]/25 border border-[#e1306c]/40 text-[#ff6b9d] font-['JetBrains_Mono'] text-xs font-semibold transition-all hover:scale-105"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              Instagram @{INSTAGRAM_HANDLE}
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-['JetBrains_Mono'] text-xs font-semibold transition-all hover:scale-105"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>

        {/* 2-Column Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-white">
              Your Vision, Engineered Into Digital Reality.
            </h2>
            <p className="font-['Inter'] text-sm text-[#d0c5af] leading-relaxed">
              Founded by <strong className="text-white">{FOUNDER_NAME}</strong> at the intersection of cinematic filmmaking, high-performance web engineering, and artificial intelligence, AK MODERN CREATING empowers visionary startups, elite professionals, and digital creators worldwide.
            </p>
            <p className="font-['Inter'] text-sm text-[#d0c5af] leading-relaxed">
              We operate on an uncompromising craftsmanship standard: 50% upfront deposit to initiate development, iterative transparent reviews with timestamp annotations, and master source file delivery only upon 100% satisfaction.
            </p>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="btn-gold px-6 py-3 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer"
              >
                Start A Project
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="btn-outline-silver px-6 py-3 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer"
              >
                View Services
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden glass-panel p-4 border border-[#f2ca50]/30 shadow-2xl">
            <img
              src={BRAND_LOGOS.heroArtwork}
              alt="AK Studio Vision"
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="font-['Montserrat'] font-bold text-sm text-white">AK Modern Headquarters</p>
                <p className="font-['JetBrains_Mono'] text-xs text-[#f2ca50]">Published by @{PUBLISHED_BY}</p>
              </div>
              <span className="material-symbols-outlined text-[#f2ca50] text-2xl">verified</span>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
            <span className="material-symbols-outlined text-3xl text-[#f2ca50]">auto_awesome</span>
            <h3 className="font-['Montserrat'] font-bold text-lg text-white">AI-Accelerated Precision</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              We utilize proprietary multimodal pipelines to accelerate drafting while retaining human directorial perfection.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
            <span className="material-symbols-outlined text-3xl text-[#f2ca50]">shield</span>
            <h3 className="font-['Montserrat'] font-bold text-lg text-white">Direct Producer Trust</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Every client receives a dedicated creative lead, real-time live milestone tracking, and direct WhatsApp studio access.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
            <span className="material-symbols-outlined text-3xl text-[#f2ca50]">diamond</span>
            <h3 className="font-['Montserrat'] font-bold text-lg text-white">Dark Luxury Aesthetic</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Signature obsidian blacks, brushed gold typography, and glassmorphic clarity designed to command high authority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
