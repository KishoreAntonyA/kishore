import React from 'react';
import { motion } from 'motion/react';
import { ViewMode } from '../types';
import { INITIAL_SERVICES } from '../data/initialData';

interface ServicesCatalogViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectServiceForBooking: (serviceId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut'
    }
  }
};

export const ServicesCatalogView: React.FC<ServicesCatalogViewProps> = ({
  onNavigate,
  onSelectServiceForBooking
}) => {
  const handleBook = (id: string) => {
    onSelectServiceForBooking(id);
    onNavigate('booking');
  };

  return (
    <div id="services-catalog-view" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#f2ca50] tracking-widest uppercase">
            COMPREHENSIVE CAPABILITIES
          </span>
          <h1 className="font-['Montserrat'] font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            EXPLORE OUR SERVICES
          </h1>
          <p className="font-['Inter'] text-sm md:text-base text-[#d0c5af] leading-relaxed">
            From Hollywood-grade AI video production and bespoke web applications to ATS resume engineering and undergraduate research mentorship.
          </p>
        </motion.div>

        {/* Services List with Staggered Motion Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {INITIAL_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="glass-panel rounded-2xl p-7 flex flex-col justify-between gap-6 border border-white/10 hover:border-[#f2ca50]/50 transition-colors duration-300 group shadow-2xl relative overflow-hidden"
            >
              {/* Subtle Ambient Gold Glow on Hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f2ca50]/10 rounded-full blur-3xl group-hover:bg-[#f2ca50]/20 transition-all pointer-events-none duration-500" />

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-xl bg-[#1e1e1e] flex items-center justify-center text-[#f2ca50] border border-[#f2ca50]/20 group-hover:border-[#f2ca50]/50 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <span className="material-symbols-outlined text-[30px]">{service.icon}</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#f2ca50] bg-[#f2ca50]/10 px-3 py-1 rounded-full border border-[#f2ca50]/30 shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                    From ₹{service.startingPrice}{service.id === 'ai-powered-solutions' || service.id === 'web-app-creator' ? '+' : ''} INR
                  </span>
                </div>

                <h3 className="font-['Montserrat'] font-bold text-2xl text-white group-hover:text-[#f2ca50] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-[#d0c5af] leading-relaxed">
                  {service.longDescription}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-['JetBrains_Mono'] text-xs text-white font-semibold block uppercase">
                    Deliverables &amp; Features:
                  </span>
                  <ul className="space-y-1.5">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#d0c5af]">
                        <span className="material-symbols-outlined text-[#f2ca50] text-sm">check_circle</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-['JetBrains_Mono'] text-[#d0c5af]">
                  ETA: <strong className="text-white">{service.turnaroundTime}</strong>
                </span>

                <button
                  onClick={() => handleBook(service.id)}
                  className="btn-gold px-5 py-2 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-shadow"
                >
                  Book Service
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp & Custom Request Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel p-8 rounded-2xl border border-[#f2ca50]/30 bg-gradient-to-r from-[#14120b] via-[#1f190e] to-[#14120b] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] font-semibold tracking-wider uppercase">
              NEED A CUSTOM BUNDLE OR URGENT TURNAROUND?
            </span>
            <h3 className="font-['Montserrat'] font-bold text-2xl text-white">
              Direct Producer WhatsApp: +91 9952625837
            </h3>
            <p className="text-xs md:text-sm text-[#d0c5af]">
              Connect directly with our senior production team for custom scope breakdowns, institutional pricing, or rapid delivery.
            </p>
          </div>

          <a
            href="https://wa.me/919952625837?text=Hi%20AK%20Modern%20Creating%2C%20I%20would%20like%20to%20discuss%20a%20custom%20service%20bundle!"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-[#051f12] font-['JetBrains_Mono'] text-xs font-bold px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Chat On WhatsApp (9952625837)
          </a>
        </motion.div>
      </div>
    </div>
  );
};
