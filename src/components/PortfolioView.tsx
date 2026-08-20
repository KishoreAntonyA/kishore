import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode, PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data/initialData';

interface PortfolioViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectServiceForBooking: (serviceId: string) => void;
}

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

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 }
  }
};

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItemModal, setActiveItemModal] = useState<PortfolioItem | null>(null);

  const categories = ['all', 'AI Video & 3D Motion', 'Brand Identity', 'Web-App Development', 'Resume & Career Suite'];

  const filteredItems = PORTFOLIO_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category.toLowerCase().includes(activeCategory.toLowerCase())
  );

  return (
    <div id="portfolio-view" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#f2ca50] tracking-widest uppercase">
            PROVEN TRACK RECORD
          </span>
          <h1 className="font-['Montserrat'] font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            SELECTED MASTERPIECES
          </h1>
          <p className="font-['Inter'] text-sm md:text-base text-[#d0c5af]">
            Explore our curated gallery of high-impact AI promos, sovereign brand identities, and modern software architectures.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#f2ca50] text-[#1a1c1c] font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105'
                  : 'bg-white/5 text-[#d0c5af] hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Cards Grid with Stagger & Layout Transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                onClick={() => setActiveItemModal(item)}
                className="glass-panel rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#f2ca50]/50 transition-colors duration-300 shadow-2xl flex flex-col relative"
              >
                <div className="relative h-72 md:h-80 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-[#050505]/85 border border-[#f2ca50]/30 px-3.5 py-1 rounded-full text-xs font-['JetBrains_Mono'] text-[#f2ca50] backdrop-blur-md shadow-lg">
                    {item.category}
                  </span>
                  {item.award && (
                    <span className="absolute top-4 right-4 bg-[#f2ca50] text-[#1a1c1c] font-['JetBrains_Mono'] font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                      ★ {item.award}
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between relative z-10">
                  <div className="space-y-2">
                    <h3 className="font-['Montserrat'] font-bold text-2xl text-white group-hover:text-[#f2ca50] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-['Inter'] text-sm text-[#d0c5af] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/10 text-[#d0c5af] text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs font-['JetBrains_Mono'] text-[#c6c6c6] pt-1">
                      <span>Client: <strong className="text-white">{item.client}</strong></span>
                      <span className="text-[#f2ca50] font-bold">{item.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="glass-panel p-8 rounded-2xl border border-[#f2ca50]/30 text-center space-y-4 max-w-2xl mx-auto shadow-[0_0_35px_rgba(212,175,55,0.15)] bg-gradient-to-b from-[#14120b] to-[#0c0c0c]"
        >
          <h3 className="font-['Montserrat'] font-bold text-2xl text-white">
            Ready to Create Your Masterpiece?
          </h3>
          <p className="text-sm text-[#d0c5af]">
            Secure your production slot today with a 50% advance deposit.
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="btn-gold px-8 py-3 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            Start Project Brief
          </button>
        </motion.div>
      </div>

      {/* Portfolio Item Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {activeItemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItemModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-3xl w-full rounded-2xl overflow-hidden border border-[#f2ca50]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.25)] space-y-6"
            >
              <div className="relative h-72 md:h-96">
                <img
                  src={activeItemModal.image}
                  alt={activeItemModal.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveItemModal(null)}
                  className="absolute top-4 right-4 bg-black/70 text-white hover:bg-[#f2ca50] hover:text-black p-2 rounded-full cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-4 pt-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-wider">
                      {activeItemModal.category} • Client: {activeItemModal.client}
                    </span>
                    <h3 className="font-['Montserrat'] font-bold text-2xl text-white mt-1">
                      {activeItemModal.title}
                    </h3>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-sm text-[#f2ca50] font-bold">
                    {activeItemModal.stats}
                  </span>
                </div>

                <p className="font-['Inter'] text-sm text-[#d0c5af] leading-relaxed">
                  {activeItemModal.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveItemModal(null)}
                    className="btn-outline-silver px-5 py-2 rounded text-xs font-['JetBrains_Mono'] cursor-pointer"
                  >
                    Back to Gallery
                  </button>
                  <button
                    onClick={() => {
                      setActiveItemModal(null);
                      onNavigate('booking');
                    }}
                    className="btn-gold px-6 py-2.5 rounded text-xs font-['JetBrains_Mono'] font-bold cursor-pointer"
                  >
                    Commission Similar Project
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
