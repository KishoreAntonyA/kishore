import React, { useState } from 'react';
import { ViewMode, Order, OrderMessage } from '../types';
import { BRAND_LOGOS } from '../data/initialData';

interface OrderTrackingViewProps {
  orders: Order[];
  currentOrderId?: string;
  onNavigate: (view: ViewMode) => void;
  onSendMessage: (orderId: string, message: OrderMessage) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  currentOrderId,
  onNavigate,
  onSendMessage
}) => {
  const [searchQuery, setSearchQuery] = useState(currentOrderId || 'AK-24-0891');
  const [activeOrderId, setActiveOrderId] = useState<string>(
    currentOrderId || orders[0]?.id || 'ord-2024-8991'
  );
  const [chatInput, setChatInput] = useState('');

  // Find order matching active ID or search query
  const activeOrder = orders.find(
    (o) =>
      o.id === activeOrderId ||
      o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase() ||
      o.clientEmail.toLowerCase() === searchQuery.trim().toLowerCase()
  ) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        o.clientEmail.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    if (found) {
      setActiveOrderId(found.id);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeOrder) return;

    const newMessage: OrderMessage = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      authorName: activeOrder.clientName || 'You (Client)',
      avatarText: activeOrder.clientInitials || 'ME',
      content: chatInput.trim(),
      timestamp: 'Just now'
    };

    onSendMessage(activeOrder.id, newMessage);
    setChatInput('');

    // Simulate smart studio automated acknowledgement after 1.5s
    setTimeout(() => {
      const studioReply: OrderMessage = {
        id: `msg-studio-${Date.now()}`,
        sender: 'studio',
        authorName: 'Alex K. (AK Studio)',
        avatarText: 'AK',
        content: `Got your note regarding "${chatInput.substring(0, 30)}...". Our motion designers are applying this directly to the active render queue.`,
        timestamp: 'Just now'
      };
      onSendMessage(activeOrder.id, studioReply);
    }, 1500);
  };

  return (
    <div id="order-tracking-view" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
              REAL-TIME PRODUCTION PIPELINE
            </span>
            <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-3xl text-white">
              LIVE ORDER TRACKING
            </h1>
          </div>

          {/* Quick Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#d0c5af] text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search Order ID (e.g. AK-24-0891)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#141414] border border-white/15 text-xs font-['JetBrains_Mono'] text-white focus:outline-none focus:border-[#f2ca50]"
              />
            </div>
            <button
              type="submit"
              className="btn-gold px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>

        {/* Available Order Pills for Quick Switching */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-['JetBrains_Mono'] text-[#d0c5af] whitespace-nowrap">Switch Order:</span>
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setActiveOrderId(o.id);
                setSearchQuery(o.orderNumber);
              }}
              className={`px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] transition-all cursor-pointer whitespace-nowrap ${
                activeOrder.id === o.id
                  ? 'bg-[#f2ca50] text-[#1a1c1c] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#181818] text-[#d0c5af] hover:text-white border border-white/10'
              }`}
            >
              {o.orderNumber} ({o.serviceTitle})
            </button>
          ))}
        </div>

        {/* Main Tracking Overview Card (Matching Screen 4) */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/15 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-['JetBrains_Mono'] font-extrabold text-xl md:text-2xl text-white">
                  ORDER ID {activeOrder.orderNumber}
                </span>
                <span className="bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/40 px-3 py-0.5 rounded-full text-xs font-['JetBrains_Mono'] font-bold uppercase">
                  {activeOrder.statusLabel}
                </span>
              </div>
              <p className="text-sm font-['Montserrat'] text-[#d0c5af] mt-1">
                {activeOrder.serviceTitle} • Client: <strong className="text-white">{activeOrder.clientName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('booking')}
                className="btn-outline-silver px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                New Order
              </button>
              <a
                href={`https://wa.me/?text=Inquiry%20regarding%20Order%20${activeOrder.orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs font-bold hover:bg-[#25D366]/30 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                WhatsApp Studio
              </a>
            </div>
          </div>

          {/* Progress Bar & Key Indicators */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-['JetBrains_Mono']">
              <span className="text-[#d0c5af]">
                Overall Production Progress: <strong className="text-[#f2ca50]">{activeOrder.progressPercentage}%</strong>
              </span>
              <span className="text-[#d0c5af]">
                Target Master Delivery: <strong className="text-white">{activeOrder.estimatedDelivery}</strong>
              </span>
            </div>
            <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden border border-white/10 p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#ffe088] rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                style={{ width: `${activeOrder.progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Left Timeline & Right Comms Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Timeline Phases (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-['Montserrat'] font-bold text-lg text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f2ca50]">timeline</span>
                  Production Milestones
                </h3>
                <span className="text-xs font-['JetBrains_Mono'] text-[#d0c5af]">
                  Assigned Producer: <strong className="text-white">{activeOrder.assignedTo}</strong>
                </span>
              </div>

              {/* Milestones List */}
              <div className="space-y-6 relative pl-6 border-l-2 border-white/10 ml-3">
                {activeOrder.timeline.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isActive = step.status === 'active';

                  return (
                    <div key={step.id || idx} className="relative group">
                      {/* Node circle */}
                      <div
                        className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-[11px] font-bold border transition-all ${
                          isDone
                            ? 'bg-[#f2ca50] text-[#1a1c1c] border-[#f2ca50] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                            : isActive
                            ? 'bg-[#050505] text-[#f2ca50] border-[#f2ca50] animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                            : 'bg-[#181818] text-[#d0c5af]/50 border-white/10'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-['Montserrat'] font-bold text-sm ${
                              isActive
                                ? 'text-[#f2ca50]'
                                : isDone
                                ? 'text-white'
                                : 'text-[#d0c5af]/60'
                            }`}
                          >
                            {step.title}
                          </h4>
                          {step.date && (
                            <span className="text-[11px] font-['JetBrains_Mono'] text-[#d0c5af]/80">
                              {step.date}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-['Inter'] text-[#d0c5af] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Deliverable Assets List for this order */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="font-['Montserrat'] font-bold text-sm text-white uppercase tracking-wider">
                  Associated Deliverables &amp; Drafts ({activeOrder.files.length})
                </h4>

                <div className="space-y-2">
                  {activeOrder.files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-between hover:border-[#f2ca50]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#f2ca50]">
                          {file.fileFormat.includes('video') ? 'movie' : 'draft'}
                        </span>
                        <div>
                          <p className="text-xs font-['JetBrains_Mono'] font-bold text-white">
                            {file.name}
                          </p>
                          <span className="text-[10px] text-[#d0c5af]">
                            {file.type.toUpperCase()} • {file.size} • {file.date}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Downloading draft asset: ${file.name}`)}
                        className="btn-outline-silver px-3 py-1 rounded text-xs font-['JetBrains_Mono'] flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">download</span>
                        Get File
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Chat (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col h-[520px] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#f2ca50]/20 border border-[#f2ca50] flex items-center justify-center text-[#f2ca50] font-['JetBrains_Mono'] font-bold text-xs">
                    AK
                  </div>
                  <div>
                    <h4 className="font-['Montserrat'] font-bold text-sm text-white">
                      Creative Studio Thread
                    </h4>
                    <span className="text-[10px] text-[#25D366] font-['JetBrains_Mono'] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span> Direct Producer Channel
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {activeOrder.messages.length === 0 ? (
                  <div className="text-center py-12 text-xs text-[#d0c5af]">
                    No messages yet. Send a note to the creative lead below.
                  </div>
                ) : (
                  activeOrder.messages.map((msg) => {
                    const isClient = msg.sender === 'client';
                    const isSystem = msg.sender === 'system';

                    if (isSystem) {
                      return (
                        <div key={msg.id} className="text-center my-2">
                          <span className="text-[10px] font-['JetBrains_Mono'] bg-white/5 border border-white/10 text-[#d0c5af] px-3 py-1 rounded-full">
                            {msg.content} • {msg.timestamp}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} space-y-1`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-['JetBrains_Mono'] text-[#d0c5af]">
                          <span>{msg.authorName}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <div
                          className={`p-3.5 rounded-2xl max-w-[85%] text-xs font-['Inter'] leading-relaxed ${
                            isClient
                              ? 'bg-[#f2ca50]/20 text-[#ffe088] border border-[#f2ca50]/30 rounded-tr-none'
                              : 'bg-[#181818] text-[#e5e2e1] border border-white/10 rounded-tl-none'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSendChat} className="pt-3 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a note or adjustment..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-[#141414] border border-white/10 text-xs font-['Inter'] text-white focus:outline-none focus:border-[#f2ca50]"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="btn-gold p-2.5 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer disabled:opacity-40"
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
