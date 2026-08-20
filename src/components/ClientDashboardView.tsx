import React, { useState } from 'react';
import { ViewMode, Order, ActivityItem } from '../types';
import { BRAND_LOGOS, INITIAL_ACTIVITIES } from '../data/initialData';

interface ClientDashboardViewProps {
  orders: Order[];
  onNavigate: (view: ViewMode) => void;
  onSelectOrderToTrack: (orderId: string) => void;
}

export const ClientDashboardView: React.FC<ClientDashboardViewProps> = ({
  orders,
  onNavigate,
  onSelectOrderToTrack
}) => {
  const [selectedDraftOrder, setSelectedDraftOrder] = useState<Order | null>(null);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Derive Client metrics
  const totalOrders = orders.length;
  const activeOrdersCount = orders.filter((o) => ['active', 'in-progress', 'draft-ready', 'new'].includes(o.status)).length;
  const completedOrdersCount = orders.filter((o) => o.status === 'completed').length;
  const pendingPaymentOrders = orders.filter((o) => o.status === 'payment-pending' || o.paidAmount < o.totalAmount);
  const totalBalanceDue = orders.reduce((sum, o) => sum + (o.totalAmount - o.paidAmount), 0);

  const handleTrackClick = (orderId: string) => {
    onSelectOrderToTrack(orderId);
    onNavigate('track');
  };

  const handleSendDraftFeedback = () => {
    if (!feedbackNote.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackNote('');
      setSelectedDraftOrder(null);
    }, 1200);
  };

  return (
    <div id="client-portal-dashboard" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Portal Header matching Screen 3 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={BRAND_LOGOS.roundEmblem}
              alt="Client Profile"
              className="w-12 h-12 rounded-full border border-[#f2ca50]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                  CLIENT PORTAL
                </span>
                <span className="bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] px-2 py-0.5 rounded font-['JetBrains_Mono'] font-bold">
                  Verified Client
                </span>
              </div>
              <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-3xl text-white">
                Nexus AI Solutions Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('track')}
              className="btn-outline-silver px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">timelapse</span>
              Track Active Order
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className="btn-gold px-5 py-2 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Book New Service
            </button>
          </div>
        </div>

        {/* 4 Stat KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-[#d0c5af]">
              <span className="text-xs font-['JetBrains_Mono'] uppercase">Total Orders</span>
              <span className="material-symbols-outlined text-lg text-[#f2ca50]">inventory_2</span>
            </div>
            <p className="font-['Montserrat'] font-extrabold text-3xl text-white">
              {totalOrders}
            </p>
            <span className="text-[11px] text-[#d0c5af]/70">Lifetime studio engagements</span>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-[#f2ca50]/30 shadow-[0_0_20px_rgba(212,175,55,0.1)] space-y-2">
            <div className="flex justify-between items-center text-[#d0c5af]">
              <span className="text-xs font-['JetBrains_Mono'] uppercase">Active in Pipeline</span>
              <span className="material-symbols-outlined text-lg text-[#f2ca50]">motion_photos_active</span>
            </div>
            <p className="font-['Montserrat'] font-extrabold text-3xl text-[#f2ca50]">
              {activeOrdersCount}
            </p>
            <span className="text-[11px] text-[#f2ca50]/80">Rendering &amp; drafting stages</span>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-[#d0c5af]">
              <span className="text-xs font-['JetBrains_Mono'] uppercase">Completed Orders</span>
              <span className="material-symbols-outlined text-lg text-emerald-400">check_circle</span>
            </div>
            <p className="font-['Montserrat'] font-extrabold text-3xl text-white">
              {completedOrdersCount}
            </p>
            <span className="text-[11px] text-emerald-400/80">Delivered &amp; archived</span>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-[#d0c5af]">
              <span className="text-xs font-['JetBrains_Mono'] uppercase">Pending Balance</span>
              <span className="material-symbols-outlined text-lg text-[#f2ca50]">payments</span>
            </div>
            <p className="font-['Montserrat'] font-extrabold text-3xl text-white">
              ₹{totalBalanceDue.toLocaleString()} INR
            </p>
            <span className="text-[11px] text-[#d0c5af]/70">Due on final master transfer</span>
          </div>
        </div>

        {/* 2-Column Layout: Table of Orders (Left 8) + Activity Log (Right 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Orders Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="font-['Montserrat'] font-bold text-lg text-white">
                  Recent Orders &amp; Deliverables
                </h3>
                <span className="text-xs font-['JetBrains_Mono'] text-[#d0c5af]">
                  Showing {orders.length} Active Records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-['JetBrains_Mono']">
                  <thead>
                    <tr className="border-b border-white/10 text-[#d0c5af] uppercase">
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Target Delivery</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((order) => {
                      const isDraftReady = order.status === 'draft-ready' || order.status === 'review-pending';
                      return (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-3 font-bold text-white whitespace-nowrap">
                            {order.orderNumber}
                          </td>
                          <td className="py-4 px-3 text-[#d0c5af]">
                            <div className="font-bold text-white font-['Montserrat'] text-xs">
                              {order.serviceTitle}
                            </div>
                            <span className="text-[10px] text-[#d0c5af]/70">{order.deliverablesCount}</span>
                          </td>
                          <td className="py-4 px-3 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                order.status === 'completed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : order.status === 'draft-ready' || order.status === 'review-pending'
                                  ? 'bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/40 animate-pulse'
                                  : 'bg-white/10 text-[#d0c5af] border border-white/10'
                              }`}
                            >
                              {order.statusLabel}
                            </span>
                          </td>
                          <td className="py-4 px-3 text-[#d0c5af] whitespace-nowrap">
                            {order.estimatedDelivery}
                          </td>
                          <td className="py-4 px-3 text-right whitespace-nowrap space-x-2">
                            {isDraftReady && (
                              <button
                                onClick={() => setSelectedDraftOrder(order)}
                                className="px-2.5 py-1 rounded bg-[#f2ca50] text-[#1a1c1c] font-bold text-[11px] hover:bg-[#ffe088] transition-colors cursor-pointer"
                              >
                                View Draft
                              </button>
                            )}
                            <button
                              onClick={() => handleTrackClick(order.id)}
                              className="px-2.5 py-1 rounded border border-white/20 text-white text-[11px] hover:border-[#f2ca50] hover:text-[#f2ca50] transition-colors cursor-pointer"
                            >
                              Track
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Log (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-['Montserrat'] font-bold text-base text-white">
                  Activity Feed
                </h3>
                <span className="material-symbols-outlined text-[#f2ca50] text-sm">notifications</span>
              </div>

              <div className="space-y-4">
                {INITIAL_ACTIVITIES.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#f2ca50] shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-sm">{act.icon}</span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-white leading-snug">
                        {act.highlightedWord && <strong className="text-[#f2ca50]">{act.highlightedWord} </strong>}
                        {act.title} <strong className="text-white">{act.subtitle}</strong>
                      </p>
                      <span className="text-[10px] font-['JetBrains_Mono'] text-[#d0c5af]/60 block">
                        {act.timeAgo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Support Hotline Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#1b1912] to-[#121212] border border-[#f2ca50]/30 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f2ca50] text-base">support_agent</span>
                  <h4 className="font-['Montserrat'] font-bold text-xs text-white">
                    Need Direct Producer Support?
                  </h4>
                </div>
                <p className="text-[11px] text-[#d0c5af] leading-relaxed">
                  Your dedicated project manager is available for live audio/video syncs.
                </p>
                <a
                  href="https://wa.me/919952625837?text=Hello%20AK%20Support%2C%20I%20need%20assistance%20with%20my%20client%20portal%20orders."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold block text-center py-2 rounded font-['JetBrains_Mono'] text-xs font-bold text-[#1a1c1c]"
                >
                  WhatsApp Support (9952625837)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draft Review Modal */}
      {selectedDraftOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full rounded-2xl p-6 md:p-8 border border-[#f2ca50]/50 shadow-2xl space-y-5">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase">
                  DRAFT PREVIEW REVIEWER
                </span>
                <h3 className="font-['Montserrat'] font-bold text-xl text-white">
                  {selectedDraftOrder.serviceTitle} ({selectedDraftOrder.orderNumber})
                </h3>
              </div>
              <button
                onClick={() => setSelectedDraftOrder(null)}
                className="text-[#d0c5af] hover:text-white p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Video Draft Preview Player */}
            <div className="relative aspect-video bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/15 flex items-center justify-center group">
              <img
                src={selectedDraftOrder.files[0]?.previewUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                alt="Draft Preview"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#f2ca50] text-[#1a1c1c] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] cursor-pointer hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">play_arrow</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-white font-bold bg-black/60 px-3 py-1 rounded-full border border-white/15">
                  Click to Stream 4K Master Render (Watermarked Draft)
                </span>
              </div>
            </div>

            {/* Feedback Input */}
            <div className="space-y-2">
              <label className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                Submit Revisions or Approve Draft
              </label>
              <textarea
                rows={3}
                placeholder="Specify timestamp markers (e.g. 0:14 - brighten logo rim lighting) or enter 'Approved as Final'..."
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-xs font-['Inter'] text-white focus:outline-none focus:border-[#f2ca50]"
              />
            </div>

            {feedbackSent && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Feedback dispatched to studio queue successfully!
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setSelectedDraftOrder(null)}
                className="btn-outline-silver px-4 py-2 rounded text-xs font-['JetBrains_Mono'] cursor-pointer"
              >
                Close
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleSendDraftFeedback}
                  className="btn-outline-silver px-4 py-2 rounded text-xs font-['JetBrains_Mono'] text-[#f2ca50] border-[#f2ca50]/50 hover:bg-[#f2ca50]/10 cursor-pointer"
                >
                  Request Adjustments
                </button>
                <button
                  onClick={() => {
                    alert('Draft approved! Remaining 50% invoice generated. Final master transfer initiated.');
                    setSelectedDraftOrder(null);
                  }}
                  className="btn-gold px-5 py-2 rounded text-xs font-['JetBrains_Mono'] font-bold cursor-pointer"
                >
                  Approve Draft &amp; Finalize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
