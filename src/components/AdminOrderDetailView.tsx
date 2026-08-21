import React, { useState } from 'react';
import { ViewMode, Order, OrderStatus, OrderMessage, DeliverableFile } from '../types';
import { BRAND_LOGOS } from '../data/initialData';

interface AdminOrderDetailViewProps {
  orderId: string;
  orders: Order[];
  onNavigate: (view: ViewMode) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, statusLabel: string) => void;
  onSendMessage: (orderId: string, message: OrderMessage) => void;
  onAddDeliverableFile: (orderId: string, file: DeliverableFile) => void;
}

export const AdminOrderDetailView: React.FC<AdminOrderDetailViewProps> = ({
  orderId,
  orders,
  onNavigate,
  onUpdateOrderStatus,
  onSendMessage,
  onAddDeliverableFile
}) => {
  const activeOrder = orders.find((o) => o.id === orderId) || orders[0];

  const [activeTab, setActiveTab] = useState<'client' | 'internal'>('client');
  const [msgInput, setMsgInput] = useState('');
  const [invoiceRequested, setInvoiceRequested] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    const labelMap: Record<OrderStatus, string> = {
      'new': 'New Order',
      'active': 'Active - In Production',
      'in-progress': 'In Progress',
      'draft-ready': 'Draft Ready for Review',
      'review-pending': 'Review Pending',
      'payment-pending': 'Payment Pending',
      'completed': 'Completed & Delivered',
      'revision': 'Revisions In Progress',
      'cancelled': 'Cancelled'
    };
    onUpdateOrderStatus(activeOrder.id, newStatus, labelMap[newStatus] || newStatus);
  };

  const handleSendAdminMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    const newMsg: OrderMessage = {
      id: `msg-${Date.now()}`,
      sender: 'studio',
      authorName: activeTab === 'internal' ? 'Internal Studio Note' : 'Alex K. (AK Studio)',
      avatarText: 'AK',
      content: msgInput.trim(),
      timestamp: 'Just now',
      isInternalNote: activeTab === 'internal'
    };

    onSendMessage(activeOrder.id, newMsg);
    setMsgInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const sizeMb = (f.size / (1024 * 1024)).toFixed(1) + ' MB';
      const newFile: DeliverableFile = {
        id: `f-${Date.now()}`,
        name: f.name,
        type: 'draft',
        size: sizeMb,
        date: 'Today',
        fileFormat: f.type || 'application/octet-stream',
        downloadUrl: '#'
      };
      onAddDeliverableFile(activeOrder.id, newFile);
    }
  };

  const handleRequestFinalPayment = () => {
    setInvoiceRequested(true);
    setTimeout(() => {
      setInvoiceRequested(false);
      alert(`Final 50% invoice (₹${(activeOrder.totalAmount - activeOrder.paidAmount).toLocaleString()} INR) dispatched to ${activeOrder.clientEmail}`);
    }, 1000);
  };

  return (
    <div id="admin-order-detail-view" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header matching Screen 5 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#f2ca50] text-[#d0c5af] hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                  ORDER MANAGEMENT
                </span>
                <span className="text-[10px] text-[#d0c5af]">• Ref {activeOrder.invoiceNumber}</span>
              </div>
              <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-3xl text-white">
                ORDER {activeOrder.orderNumber}
              </h1>
            </div>
          </div>

          {/* Status Changer & Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#141414] border border-white/15 px-3 py-1.5 rounded-lg">
              <span className="text-xs font-['JetBrains_Mono'] text-[#d0c5af]">Status:</span>
              <select
                value={activeOrder.status}
                onChange={handleStatusChange}
                className="bg-transparent font-['JetBrains_Mono'] text-xs font-bold text-[#f2ca50] focus:outline-none cursor-pointer"
              >
                <option value="new" className="bg-[#181818] text-white">New Order</option>
                <option value="active" className="bg-[#181818] text-white">Active - In Production</option>
                <option value="draft-ready" className="bg-[#181818] text-white">Draft Ready for Review</option>
                <option value="review-pending" className="bg-[#181818] text-white">Review Pending</option>
                <option value="payment-pending" className="bg-[#181818] text-white">Payment Pending</option>
                <option value="completed" className="bg-[#181818] text-white">Completed &amp; Delivered</option>
              </select>
            </div>

            <button
              onClick={() => {
                onUpdateOrderStatus(activeOrder.id, 'draft-ready', 'Draft Ready for Review');
                alert('Draft status notification emailed to client!');
              }}
              className="btn-gold px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              Notify Client Draft Ready
            </button>
          </div>
        </div>

        {/* 2-Column Layout matching Screen 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Specifications, Files, Financials (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Project Specs Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-['Montserrat'] font-bold text-base text-white border-b border-white/10 pb-3 flex items-center justify-between">
                <span>Project Specifications</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50]">
                  Assigned: {activeOrder.assignedTo}
                </span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-['JetBrains_Mono']">
                <div>
                  <span className="text-[#d0c5af] block">Client Name:</span>
                  <strong className="text-white">{activeOrder.clientName}</strong>
                </div>
                <div>
                  <span className="text-[#d0c5af] block">Email:</span>
                  <strong className="text-white">{activeOrder.clientEmail}</strong>
                </div>
                <div>
                  <span className="text-[#d0c5af] block">Deliverables:</span>
                  <strong className="text-[#f2ca50]">{activeOrder.deliverablesCount}</strong>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase block mb-1">
                  Creative Brief &amp; Directives:
                </span>
                <p className="text-xs text-[#d0c5af] leading-relaxed bg-[#141414] p-3.5 rounded-lg border border-white/5">
                  {activeOrder.briefSummary}
                </p>
              </div>
            </div>

            {/* Deliverables & Assets File Manager */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-['Montserrat'] font-bold text-base text-white">
                  Deliverable Files ({activeOrder.files.length})
                </h3>

                <label className="btn-gold px-3 py-1.5 rounded text-xs font-['JetBrains_Mono'] font-bold cursor-pointer flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">upload</span>
                  Upload Asset
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                {activeOrder.files.map((f) => (
                  <div
                    key={f.id}
                    className="p-3.5 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-between hover:border-[#f2ca50]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#222] flex items-center justify-center text-[#f2ca50]">
                        <span className="material-symbols-outlined text-lg">
                          {f.fileFormat.includes('video') ? 'video_file' : 'description'}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-['JetBrains_Mono'] font-bold text-white">
                          {f.name}
                        </p>
                        <span className="text-[10px] text-[#d0c5af]">
                          {f.size} • Uploaded {f.date} • <span className="text-[#f2ca50] uppercase">{f.type}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Downloading deliverable: ${f.name}`)}
                        className="btn-outline-silver px-3 py-1.5 rounded-lg text-[11px] font-['JetBrains_Mono'] cursor-pointer flex items-center gap-1.5 hover:border-[#f2ca50] hover:text-[#f2ca50] hover:bg-[#f2ca50]/10 transition-all shadow-sm"
                        title={`Download ${f.name}`}
                      >
                        <span className="material-symbols-outlined text-[15px]">download</span>
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Overview & Invoice Box */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-['Montserrat'] font-bold text-base text-white border-b border-white/10 pb-3">
                Financials &amp; Invoicing
              </h3>

              <div className="grid grid-cols-3 gap-4 text-xs font-['JetBrains_Mono']">
                <div className="p-3 bg-[#141414] rounded-lg border border-white/5">
                  <span className="text-[#d0c5af] block">Total Order Fee</span>
                  <span className="text-lg font-bold text-white">₹{activeOrder.totalAmount.toLocaleString()} INR</span>
                </div>
                <div className="p-3 bg-[#141414] rounded-lg border border-white/5">
                  <span className="text-[#d0c5af] block">Paid (50% Deposit)</span>
                  <span className="text-lg font-bold text-emerald-400">₹{activeOrder.paidAmount.toLocaleString()} INR</span>
                </div>
                <div className="p-3 bg-[#141414] rounded-lg border border-white/5">
                  <span className="text-[#d0c5af] block">Remaining Balance</span>
                  <span className="text-lg font-bold text-[#f2ca50]">
                    ₹{(activeOrder.totalAmount - activeOrder.paidAmount).toLocaleString()} INR
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleRequestFinalPayment}
                  disabled={invoiceRequested}
                  className="btn-gold px-5 py-2 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">receipt_long</span>
                  {invoiceRequested ? 'Sending...' : 'Request Final 50% Payment'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Communications Thread & Studio Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col h-[600px] shadow-2xl">
              {/* Tab Selector: Client vs Internal */}
              <div className="flex border-b border-white/10 pb-3 gap-2">
                <button
                  onClick={() => setActiveTab('client')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] font-bold transition-colors cursor-pointer ${
                    activeTab === 'client'
                      ? 'bg-[#f2ca50] text-[#1a1c1c]'
                      : 'bg-white/5 text-[#d0c5af] hover:text-white'
                  }`}
                >
                  Client Thread
                </button>
                <button
                  onClick={() => setActiveTab('internal')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] font-bold transition-colors cursor-pointer ${
                    activeTab === 'internal'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-white/5 text-[#d0c5af] hover:text-white'
                  }`}
                >
                  Internal Notes (Team Only)
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {activeOrder.messages
                  .filter((m) => (activeTab === 'internal' ? m.isInternalNote : !m.isInternalNote))
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-xl text-xs space-y-1 ${
                        msg.sender === 'client'
                          ? 'bg-[#1a1a1a] text-white border border-white/10'
                          : activeTab === 'internal'
                          ? 'bg-amber-950/30 border border-amber-500/30 text-amber-200'
                          : 'bg-[#f2ca50]/15 text-[#ffe088] border border-[#f2ca50]/30'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-['JetBrains_Mono'] opacity-70">
                        <span>{msg.authorName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="font-['Inter'] leading-relaxed">{msg.content}</p>
                    </div>
                  ))}
              </div>

              {/* Compose Box */}
              <form onSubmit={handleSendAdminMessage} className="pt-3 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  placeholder={
                    activeTab === 'internal'
                      ? 'Add private studio note...'
                      : 'Message client directly...'
                  }
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-[#141414] border border-white/10 text-xs font-['Inter'] text-white focus:outline-none focus:border-[#f2ca50]"
                />
                <button
                  type="submit"
                  disabled={!msgInput.trim()}
                  className="btn-gold p-2.5 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
