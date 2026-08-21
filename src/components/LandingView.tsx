import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewMode, ServiceItem } from '../types';
import { BRAND_LOGOS, INITIAL_SERVICES, PORTFOLIO_ITEMS, INSTAGRAM_LINK, INSTAGRAM_DISPLAY, FOUNDER_NAME, PUBLISHED_BY, CREATED_BY } from '../data/initialData';

interface LandingViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  onSelectServiceForBooking
}) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const handleBookService = (serviceId: string) => {
    onSelectServiceForBooking(serviceId);
    onNavigate('booking');
  };

  return (
    <div id="landing-page-container" className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-[90vh] flex items-center pt-16 md:pt-24 pb-24 px-6 md:px-16 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-[#131313] to-[#050505] opacity-95"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f2ca50]/10 rounded-full blur-[140px] mix-blend-screen"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#d4af37]/8 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="max-w-screen-xl mx-auto w-full relative z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & CTAs with motion entrance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-[#201f1f]/80 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
                  <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#c6c6c6] tracking-wider uppercase">
                    CREATIVE INTELLIGENCE
                  </span>
                </span>

                <span className="inline-flex items-center gap-1.5 bg-[#141414]/90 border border-[#f2ca50]/30 rounded-full px-3 py-1 text-xs font-['JetBrains_Mono'] text-[#f2ca50]">
                  <span className="material-symbols-outlined text-[14px]">person</span>
                  Founder: <strong className="text-white ml-0.5">{FOUNDER_NAME}</strong>
                </span>
              </div>

              <h1 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e5e2e1] leading-[1.15] tracking-tight">
                TURN YOUR IDEAS INTO <br />
                <span className="text-gradient-gold drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                  DIGITAL CREATIONS.
                </span>
              </h1>
            </div>

            <p className="font-['Inter'] text-base md:text-lg text-[#d0c5af] max-w-xl leading-relaxed animate-fade-in-up-delay-1">
              Professional, creative and AI-powered digital solutions designed for students, creators, professionals and businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 items-center animate-fade-in-up-delay-2">
              <button
                id="hero-book-btn"
                onClick={() => onNavigate('booking')}
                className="bg-gradient-to-r from-[#f2ca50] via-[#ffe088] to-[#d4af37] text-[#3c2f00] px-7 py-3.5 rounded-lg font-['JetBrains_Mono'] text-sm font-bold gold-glow-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.35)]"
              >
                BOOK A SERVICE
              </button>

              <button
                id="hero-explore-btn"
                onClick={() => onNavigate('services')}
                className="bg-transparent border-[1.5px] border-[#c6c6c6] text-white px-6 py-3.5 rounded-lg hover:border-[#f2ca50] hover:text-[#f2ca50] hover:bg-white/5 transition-all font-['JetBrains_Mono'] text-sm font-medium cursor-pointer"
              >
                EXPLORE SERVICES
              </button>

              <a
                id="hero-instagram-btn"
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6b9d] font-['JetBrains_Mono'] text-xs uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1.5 py-2.5 px-3 rounded-lg hover:bg-[#e1306c]/15 border border-[#e1306c]/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">photo_camera</span> {INSTAGRAM_DISPLAY}
              </a>

              <a
                id="hero-whatsapp-btn"
                href="https://wa.me/919952625837?text=Hi%20AK%20Modern%20Creating%2C%20I%20would%20like%20to%20inquire%20about%20a%20service%20project!"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-['JetBrains_Mono'] text-xs uppercase tracking-wider hover:text-emerald-300 transition-colors flex items-center gap-1.5 py-2.5 px-3 rounded-lg hover:bg-emerald-500/10 border border-emerald-500/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">chat</span> WA: 9952625837
              </a>
            </div>

            {/* Quick credibility stat pills */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="font-['Montserrat'] font-bold text-2xl text-[#f2ca50]">500+</p>
                <p className="text-xs font-['Inter'] text-[#d0c5af]/70">Projects Delivered</p>
              </div>
              <div>
                <p className="font-['Montserrat'] font-bold text-2xl text-[#e5e2e1]">99.4%</p>
                <p className="text-xs font-['Inter'] text-[#d0c5af]/70">Satisfaction Rate</p>
              </div>
              <div>
                <p className="font-['Montserrat'] font-bold text-2xl text-[#f2ca50]">24/7</p>
                <p className="text-xs font-['Inter'] text-[#d0c5af]/70">Priority Support</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Artwork Artwork Screen with Framer Motion Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] md:h-[580px] rounded-2xl overflow-hidden glass-panel group hidden md:block border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.85)] hover:border-[#f2ca50]/40 transition-colors"
          >
            <div
              className="bg-cover bg-center w-full h-full absolute inset-0 opacity-90 group-hover:scale-105 transition-transform duration-[2.5s]"
              style={{ backgroundImage: `url('${BRAND_LOGOS.heroArtwork}')` }}
            />
            {/* Dark glass gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-transparent"></div>

            {/* Floating Live Badge with Dynamic Bob & Glow Animation */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.6)",
                  "0 20px 40px rgba(212,175,55,0.22)",
                  "0 10px 30px rgba(0,0,0,0.6)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut"
              }}
              className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-xl border border-white/20 flex items-center justify-between backdrop-blur-xl bg-[#0e0e0e]/85"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="w-10 h-10 rounded-full border border-[#f2ca50]/60 p-0.5 shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                >
                  <img
                    src={BRAND_LOGOS.roundEmblem}
                    alt="AK Emblem"
                    className="w-full h-full rounded-full object-cover"
                  />
                </motion.div>
                <div>
                  <h4 className="font-['Montserrat'] font-bold text-sm text-white flex items-center gap-1.5">
                    Cinematic Creative Engine
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  </h4>
                  <p className="text-xs font-['JetBrains_Mono'] text-[#f2ca50]">Now accepting Q4 project briefs</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#1a1c1c] text-xs font-['JetBrains_Mono'] font-bold px-3.5 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                Book Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="expertise-section" className="py-24 px-6 md:px-16 bg-[#131313] relative border-t border-b border-white/5">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#f2ca50] tracking-widest uppercase">
              WHAT WE DO
            </span>
            <h2 className="font-['Montserrat'] font-extrabold text-3xl md:text-4xl text-[#e5e2e1] uppercase tracking-wide">
              OUR EXPERTISE
            </h2>
            <p className="font-['Inter'] text-base text-[#d0c5af]">
              Elevating your digital presence with precision-crafted solutions.
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_SERVICES.map((service, index) => {
              const isHighlight = service.popular || index === 1 || index === 3;
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className={`glass-panel p-6 rounded-xl flex flex-col gap-5 hover:scale-[1.015] transition-all duration-300 group relative overflow-hidden border ${
                    isHighlight ? 'border-[#f2ca50]/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/10'
                  }`}
                >
                  {/* Subtle top-right ambient gold sheen on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f2ca50]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-[#201f1f] flex items-center justify-center text-[#f2ca50] group-hover:bg-[#f2ca50]/15 transition-colors border border-white/5 group-hover:border-[#f2ca50]/30">
                      <span className="material-symbols-outlined text-[26px]">{service.icon}</span>
                    </div>
                    {service.popular && (
                      <span className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/40 px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-grow">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-['Montserrat'] font-bold text-xl text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors">
                        {service.title}
                      </h3>
                      <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#f2ca50] whitespace-nowrap bg-[#f2ca50]/10 border border-[#f2ca50]/20 px-2 py-0.5 rounded">
                        From ₹{service.startingPrice}{service.id === 'ai-powered-solutions' || service.id === 'web-app-creator' ? '+' : ''} INR
                      </span>
                    </div>
                    <p className="font-['Inter'] text-sm text-[#d0c5af] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between mt-auto">
                    <button
                      onClick={() => setSelectedServiceModal(service)}
                      className="font-['JetBrains_Mono'] text-xs font-semibold text-[#f2ca50] uppercase flex items-center gap-1 hover:text-[#ffe088] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                    >
                      Learn More <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>

                    <button
                      onClick={() => handleBookService(service.id)}
                      className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-[#f2ca50] hover:text-[#1a1c1c] text-[#e5e2e1] font-['JetBrains_Mono'] transition-colors border border-white/10 cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Works Showcase Preview */}
      <section className="py-20 px-6 md:px-16 bg-[#050505]">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                FEATURED WORK
              </span>
              <h2 className="font-['Montserrat'] font-bold text-3xl text-white mt-1">
                Recent Masterpieces
              </h2>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="btn-outline-silver px-5 py-2 rounded font-['JetBrains_Mono'] text-xs uppercase flex items-center gap-2 cursor-pointer"
            >
              View Full Gallery <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_ITEMS.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="glass-panel rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#f2ca50]/40 transition-all duration-300"
                onClick={() => onNavigate('portfolio')}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-[#050505]/80 border border-white/15 px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] text-[#f2ca50]">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-['Montserrat'] font-bold text-xl text-white group-hover:text-[#f2ca50] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#d0c5af] line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs font-['JetBrains_Mono'] text-[#c6c6c6]">
                    <span>Client: {item.client}</span>
                    <span className="text-[#f2ca50]">{item.stats}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 text-[#d0c5af] hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#201f1f] flex items-center justify-center text-[#f2ca50] border border-[#f2ca50]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-[32px]">{selectedServiceModal.icon}</span>
              </div>
              <div>
                <h3 className="font-['Montserrat'] font-bold text-2xl text-white">
                  {selectedServiceModal.title}
                </h3>
                <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-wider">
                  Starting from ₹{selectedServiceModal.startingPrice}{selectedServiceModal.id === 'ai-powered-solutions' || selectedServiceModal.id === 'web-app-creator' ? '+' : ''} INR • Turnaround: {selectedServiceModal.turnaroundTime}
                </span>
              </div>
            </div>

            <p className="font-['Inter'] text-sm md:text-base text-[#d0c5af] leading-relaxed">
              {selectedServiceModal.longDescription}
            </p>

            <div className="space-y-3">
              <h4 className="font-['Montserrat'] font-semibold text-sm text-white uppercase tracking-wider">
                What’s Included:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedServiceModal.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#e5e2e1]">
                    <span className="material-symbols-outlined text-[#f2ca50] text-sm mt-0.5">check_circle</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="px-5 py-2.5 rounded-lg border border-white/20 text-white font-['JetBrains_Mono'] text-xs hover:bg-white/5 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sId = selectedServiceModal.id;
                  setSelectedServiceModal(null);
                  handleBookService(sId);
                }}
                className="btn-gold px-6 py-2.5 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Proceed to Book Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
