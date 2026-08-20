import React, { useState } from 'react';
import { ViewMode, Order, OrderStatus } from '../types';
import { BRAND_LOGOS } from '../data/initialData';

interface AdminDashboardViewProps {
  orders: Order[];
  onNavigate: (view: ViewMode) => void;
  onSelectOrderForDetail: (orderId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, statusLabel: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  orders,
  onNavigate,
  onSelectOrderForDetail,
  onUpdateOrderStatus
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      statusFilter === 'all' ||
      (statusFilter === 'new' && order.status === 'new') ||
      (statusFilter === 'active' && ['active', 'in-progress'].includes(order.status)) ||
      (statusFilter === 'review' && ['draft-ready', 'review-pending'].includes(order.status)) ||
      (statusFilter === 'payment' && (order.status === 'payment-pending' || order.paidAmount < order.totalAmount)) ||
      (statusFilter === 'completed' && order.status === 'completed');

    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalStudioRevenue = orders.reduce((sum, o) => sum + o.paidAmount, 0) + 112000;
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;

  return (
    <div id="admin-dashboard-view" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header matching Screen 2 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={BRAND_LOGOS.adminAvatar}
              alt="Admin Master Avatar"
              className="w-12 h-12 rounded-full border-2 border-[#f2ca50] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                  STUDIO CONTROL TOWER
                </span>
                <span className="bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] px-2 py-0.5 rounded font-['JetBrains_Mono'] font-bold">
                  Super Admin
                </span>
              </div>
              <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-3xl text-white">
                AK Studio Executive Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('booking')}
              className="btn-gold px-5 py-2.5 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Manual Order Entry
            </button>
            <button
              onClick={() => onNavigate('client-dashboard')}
              className="btn-outline-silver px-4 py-2.5 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer"
            >
              Switch to Client View
            </button>
          </div>
        </div>

        {/* 3 Large KPI Summary Cards matching Screen 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2 relative overflow-hidden">
            <div className="flex justify-between items-center text-[#d0c5af]">
              <span className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider">Total Studio Revenue</span>
              <span className="material-symbols-outlined text-[#f2ca50]">trending_up</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-['Montserrat'] font-extrabold text-3xl md:text-4xl text-white">
                ${totalStudioRevenue.toLocaleString()}
              </span>
              <span className="text-emerald-400 font-['JetBrains_Mono'] text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                +12.5% this mo
              </span>
            </div>
            <p className="text-xs font-['Inter'] text-[#d0c5af]/70">50% Advance Deposits + Master Settlement Transfers</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#f2ca50]/30 shadow-[0_0_25px_rgba(212,175,55,0.15)] space-y-2 relative overflow-hidden">
            <div className="flex justify-between items-center text-[#d0c5af]">
              <span className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider">New Inbound Orders</span>
              <span className="material-symbols-outlined text-[#f2ca50]">notifications_active</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-['Montserrat'] font-extrabold text-3xl md:text-4xl text-[#f2ca50]">
                {48 + newOrdersCount}
              </span>
              <span className="text-[#f2ca50] font-['JetBrains_Mono'] text-xs font-bold bg-[#f2ca50]/20 px-2 py-0.5 rounded">
                +8 Today
              </span>
            </div>
            <p className="text-xs font-['Inter'] text-[#d0c5af]/70">Requires brief review &amp; producer assignment</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2 relative overflow-hidden">
            <div className="flex justify-between items-center text-[#d0c5af]">
              <span className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider">Lead Conversion Rate</span>
              <span className="material-symbols-outlined text-[#f2ca50]">query_stats</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-['Montserrat'] font-extrabold text-3xl md:text-4xl text-white">
                18.2%
              </span>
              <span className="text-emerald-400 font-['JetBrains_Mono'] text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                +2.4% vs avg
              </span>
            </div>
            <p className="text-xs font-['Inter'] text-[#d0c5af]/70">Direct website visitors to deposit booking</p>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'all', label: 'All Orders' },
              { key: 'new', label: 'New' },
              { key: 'active', label: 'Active Pipeline' },
              { key: 'review', label: 'Drafts in Review' },
              { key: 'payment', label: 'Payment Pending' },
              { key: 'completed', label: 'Completed' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] transition-all cursor-pointer ${
                  statusFilter === tab.key
                    ? 'bg-[#f2ca50] text-[#1a1c1c] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-white/5 text-[#d0c5af] hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2 text-[#d0c5af] text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search ID, client, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#141414] border border-white/15 text-xs font-['JetBrains_Mono'] text-white focus:outline-none focus:border-[#f2ca50]"
            />
          </div>
        </div>

        {/* Orders Table matching Screen 2 */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <h3 className="font-['Montserrat'] font-bold text-lg text-white">
              Studio Production Queue
            </h3>
            <span className="text-xs font-['JetBrains_Mono'] text-[#d0c5af]">
              {filteredOrders.length} records matching criteria
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-['JetBrains_Mono']">
              <thead>
                <tr className="border-b border-white/10 text-[#d0c5af] uppercase">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Financials</th>
                  <th className="py-3 px-3">Assigned</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.map((order) => {
                  const isNew = order.status === 'new';
                  const isDraftReady = order.status === 'draft-ready';

                  return (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-3 font-bold text-white whitespace-nowrap">
                        <button
                          onClick={() => {
                            onSelectOrderForDetail(order.id);
                            onNavigate('admin-order-detail');
                          }}
                          className="hover:text-[#f2ca50] transition-colors underline decoration-[#f2ca50]/50"
                        >
                          {order.orderNumber}
                        </button>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="font-bold text-white">{order.clientName}</div>
                        <span className="text-[10px] text-[#d0c5af]/70">{order.clientCompany || order.clientEmail}</span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="text-white font-['Montserrat'] font-semibold">{order.serviceTitle}</div>
                        <span className="text-[10px] text-[#d0c5af]">{order.deliverablesCount}</span>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            order.status === 'new'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                              : order.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : order.status === 'payment-pending'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/40'
                          }`}
                        >
                          {order.statusLabel}
                        </span>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className="text-white font-bold">${order.totalAmount}</span>
                        <span className="text-[10px] text-[#f2ca50] block">
                          Paid: ${order.paidAmount} ({Math.round((order.paidAmount / order.totalAmount) * 100)}%)
                        </span>
                      </td>
                      <td className="py-4 px-3 text-[#d0c5af] whitespace-nowrap">
                        {order.assignedTo}
                      </td>
                      <td className="py-4 px-3 text-right whitespace-nowrap space-x-2">
                        {isNew && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'active', 'Active - In Production')}
                            className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold hover:bg-emerald-500/30 cursor-pointer"
                          >
                            Accept Brief
                          </button>
                        )}
                        <button
                          onClick={() => {
                            onSelectOrderForDetail(order.id);
                            onNavigate('admin-order-detail');
                          }}
                          className="btn-gold px-3 py-1 rounded text-[11px] font-bold cursor-pointer"
                        >
                          Manage
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
    </div>
  );
};
