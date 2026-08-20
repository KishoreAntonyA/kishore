import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ViewMode, Order, ServiceItem } from '../types';
import { BRAND_LOGOS, INITIAL_SERVICES } from '../data/initialData';

interface ServiceBookingViewProps {
  initialServiceId?: string;
  onNavigate: (view: ViewMode) => void;
  onCreateOrder: (order: Order) => void;
}

export const ServiceBookingView: React.FC<ServiceBookingViewProps> = ({
  initialServiceId = 'content-creator',
  onNavigate,
  onCreateOrder
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);

  // Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [rushDelivery, setRushDelivery] = useState(false);
  const [referenceLinks, setReferenceLinks] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string }>>([
    { name: 'Brand_Assets_Reference.zip', size: '14.2 MB' }
  ]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessOrder, setBookingSuccessOrder] = useState<Order | null>(null);

  const selectedService = INITIAL_SERVICES.find((s) => s.id === selectedServiceId) || INITIAL_SERVICES[1];

  const basePrice = selectedService.startingPrice;
  const rushFee = rushDelivery ? Math.round(basePrice * 0.3) : 0;
  const totalAmount = basePrice + rushFee;
  const depositAmount = Math.round(totalAmount * 0.5);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setUploadedFiles((prev) => [...prev, { name: file.name, size: sizeMb }]);
    }
  };

  const handleSubmitOrder = () => {
    if (!agreedToTerms) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newOrderNum = `#ORD-2024-${randomId}`;

      const newOrder: Order = {
        id: `ord-${randomId}`,
        orderNumber: newOrderNum,
        clientName: clientName || 'Verified Client',
        clientInitials: (clientName || 'VC').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        clientEmail: clientEmail || 'client@example.com',
        clientCompany: clientCompany || 'Enterprise Client',
        serviceTitle: selectedService.title,
        serviceCategory: selectedService.category,
        status: 'active',
        statusLabel: 'Active - In Progress',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        estimatedDelivery: '5 - 7 Days',
        totalAmount: totalAmount,
        paidAmount: depositAmount,
        invoiceNumber: `INV-0${randomId}`,
        assignedTo: 'Lead Creative Producer',
        deliverablesCount: '1x Master Deliverable Suite',
        briefSummary: projectBrief || `${projectTitle} - Tailored project for ${clientCompany || 'Client'}.`,
        progressPercentage: 20,
        timeline: [
          {
            id: 't-1',
            title: 'Booking & 50% Deposit Received',
            description: `Payment of ₹${depositAmount} INR received successfully.`,
            status: 'completed',
            date: 'Today'
          },
          {
            id: 't-2',
            title: 'Creative Brief Finalized',
            description: 'Lead designer is reviewing submitted assets and script.',
            status: 'active',
            date: 'In Progress'
          },
          {
            id: 't-3',
            title: 'First Draft Generation',
            description: 'Asset pipeline initialization.',
            status: 'pending'
          },
          {
            id: 't-4',
            title: 'Client Review & Revisions',
            description: 'Feedback session & adjustments.',
            status: 'pending'
          },
          {
            id: 't-5',
            title: 'Final Delivery & Master Transfer',
            description: 'Master 4K/Vector file package.',
            status: 'pending'
          }
        ],
        files: uploadedFiles.map((f, i) => ({
          id: `f-${i}`,
          name: f.name,
          type: 'reference',
          size: f.size,
          date: 'Today',
          fileFormat: 'application/octet-stream'
        })),
        messages: [
          {
            id: 'm-init',
            sender: 'studio',
            authorName: 'Alex K. (AK Studio)',
            avatarText: 'AK',
            content: `Welcome to AK Modern Creating! We have received your deposit for "${projectTitle || selectedService.title}". Our team is initializing the creative pipeline. Feel free to leave any further notes here.`,
            timestamp: 'Just now'
          }
        ]
      };

      onCreateOrder(newOrder);
      setBookingSuccessOrder(newOrder);
      setIsSubmitting(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f2ca50', '#d4af37', '#ffffff', '#ffe088']
        });
      } catch (err) {
        // ignore fallback
      }
    }, 900);
  };

  return (
    <div id="service-booking-view" className="min-h-screen bg-[#050505] text-[#e5e2e1] py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <img
              src={BRAND_LOGOS.roundEmblem}
              alt="AK Emblem"
              className="w-12 h-12 rounded-full border border-[#f2ca50]/50"
            />
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                AK MODERN CREATING
              </span>
              <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-3xl text-white">
                SERVICE BOOKING
              </h1>
            </div>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-['JetBrains_Mono'] text-[#d0c5af] hover:text-[#f2ca50] flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Home
          </button>
        </div>

        {/* Success Modal Confirmation */}
        {bookingSuccessOrder ? (
          <div className="glass-panel p-8 md:p-12 rounded-2xl border border-[#f2ca50]/40 text-center space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.2)] animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#f2ca50]/20 border border-[#f2ca50] text-[#f2ca50] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <div className="space-y-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase tracking-widest">
                ORDER SUCCESSFULLY SECURED
              </span>
              <h2 className="font-['Montserrat'] font-bold text-3xl text-white">
                Thank You, {bookingSuccessOrder.clientName}!
              </h2>
              <p className="text-sm text-[#d0c5af] max-w-lg mx-auto">
                Your order <span className="font-['JetBrains_Mono'] font-bold text-[#f2ca50]">{bookingSuccessOrder.orderNumber}</span> has been confirmed. 50% deposit (₹{depositAmount} INR) logged.
              </p>
            </div>

            <div className="glass-card max-w-md mx-auto p-4 rounded-xl text-left text-xs font-['JetBrains_Mono'] space-y-2 border border-white/10">
              <div className="flex justify-between">
                <span className="text-[#d0c5af]">Service:</span>
                <span className="text-white font-bold">{bookingSuccessOrder.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d0c5af]">Invoice Ref:</span>
                <span className="text-[#f2ca50]">{bookingSuccessOrder.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d0c5af]">Estimated Delivery:</span>
                <span className="text-white">{bookingSuccessOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('track')}
                className="btn-gold px-8 py-3 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer"
              >
                Track Live Order
              </button>
              <button
                onClick={() => onNavigate('client-dashboard')}
                className="btn-outline-silver px-6 py-3 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer"
              >
                View Client Portal
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stepper Wizard Bar */}
            <div className="glass-panel p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between relative">
                {[
                  { step: 1, label: '1. Select Service' },
                  { step: 2, label: '2. Project Details' },
                  { step: 3, label: '3. Asset Files' },
                  { step: 4, label: '4. Confirm & Deposit' }
                ].map((s) => {
                  const isActive = currentStep === s.step;
                  const isDone = currentStep > s.step;
                  return (
                    <button
                      key={s.step}
                      onClick={() => setCurrentStep(s.step)}
                      className={`flex flex-col items-center gap-1.5 z-10 transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#f2ca50]'
                          : isDone
                          ? 'text-[#e5e2e1]'
                          : 'text-[#d0c5af]/50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold border transition-all ${
                          isActive
                            ? 'bg-[#f2ca50] text-[#1a1c1c] border-[#f2ca50] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                            : isDone
                            ? 'bg-[#f2ca50]/20 text-[#f2ca50] border-[#f2ca50]/60'
                            : 'bg-[#131313] text-[#d0c5af] border-white/10'
                        }`}
                      >
                        {isDone ? '✓' : s.step}
                      </div>
                      <span className="font-['JetBrains_Mono'] text-[11px] hidden sm:block">
                        {s.label}
                      </span>
                    </button>
                  );
                })}
                {/* Horizontal connector line */}
                <div className="absolute top-4 left-6 right-6 h-[1px] bg-white/10 -z-0"></div>
              </div>
            </div>

            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <div className="glass-panel p-6 md:p-8 rounded-xl border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-['Montserrat'] font-bold text-xl text-white">
                    Step 1: Choose Your Creative Service
                  </h2>
                  <p className="text-xs text-[#d0c5af]">
                    Select the domain that best aligns with your upcoming vision.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INITIAL_SERVICES.map((serv) => {
                    const isSelected = selectedServiceId === serv.id;
                    return (
                      <div
                        key={serv.id}
                        onClick={() => setSelectedServiceId(serv.id)}
                        className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#f2ca50]/10 border-[#f2ca50] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                            : 'bg-[#181818]/60 border-white/10 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-[#f2ca50] text-[#1a1c1c]' : 'bg-[#222] text-[#f2ca50]'
                            }`}>
                              <span className="material-symbols-outlined">{serv.icon}</span>
                            </div>
                            <div>
                              <h3 className="font-['Montserrat'] font-bold text-base text-white">
                                {serv.title}
                              </h3>
                              <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50]">
                                From ₹{serv.startingPrice}{serv.id === 'ai-powered-solutions' || serv.id === 'web-app-creator' ? '+' : ''} INR
                              </span>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#f2ca50] bg-[#f2ca50]' : 'border-white/20'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-[#1a1c1c]"></div>}
                          </div>
                        </div>

                        <p className="text-xs text-[#d0c5af] leading-relaxed">
                          {serv.description}
                        </p>

                        <div className="text-[11px] font-['JetBrains_Mono'] text-[#c6c6c6] pt-2 border-t border-white/5 flex justify-between">
                          <span>Delivery: {serv.turnaroundTime}</span>
                          <span className="text-[#f2ca50]">50% Deposit Model</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-gold px-8 py-3 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer flex items-center gap-2"
                  >
                    Continue to Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Project Specifications */}
            {currentStep === 2 && (
              <div className="glass-panel p-6 md:p-8 rounded-xl border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-['Montserrat'] font-bold text-xl text-white">
                    Step 2: Project Brief &amp; Contact
                  </h2>
                  <p className="text-xs text-[#d0c5af]">
                    Provide key details so our team can accurately structure the creative pipeline.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-white font-['Inter'] text-sm focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="alex@company.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-white font-['Inter'] text-sm focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nexus AI Ventures"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-white font-['Inter'] text-sm focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                      Project Title / Campaign Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Q4 AI SAAS Launch Teaser"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-white font-['Inter'] text-sm focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                    Project Brief &amp; Key Goals *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the aesthetic, message, visual references, target metrics, or specific deliverable format requirements..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-white font-['Inter'] text-sm focus:outline-none focus:border-[#f2ca50]"
                  />
                </div>

                {/* Turnaround Options */}
                <div className="p-4 rounded-lg bg-[#181818]/80 border border-white/10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f2ca50] text-lg">bolt</span>
                      <span className="font-['Montserrat'] font-bold text-sm text-white">
                        Priority Rush Turnaround (24-48 Hours)
                      </span>
                    </div>
                    <p className="text-xs text-[#d0c5af]">
                      Accelerates creative pipeline rendering &amp; prioritized queue (+30% fee).
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="w-5 h-5 accent-[#f2ca50] cursor-pointer"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn-outline-silver px-6 py-2.5 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn-gold px-8 py-3 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer flex items-center gap-2"
                  >
                    Continue to Files <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Reference Files & Assets */}
            {currentStep === 3 && (
              <div className="glass-panel p-6 md:p-8 rounded-xl border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-['Montserrat'] font-bold text-xl text-white">
                    Step 3: Reference Assets &amp; Brand Files
                  </h2>
                  <p className="text-xs text-[#d0c5af]">
                    Upload existing brand kits, raw clips, scripts, or paste shared drive URLs.
                  </p>
                </div>

                {/* Drag and Drop Zone */}
                <label className="border-2 border-dashed border-white/20 hover:border-[#f2ca50]/60 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#141414]/50 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-[#f2ca50]">cloud_upload</span>
                  <div className="text-center">
                    <p className="font-['Montserrat'] font-semibold text-sm text-white">
                      Drag &amp; drop reference files here, or <span className="text-[#f2ca50] underline">browse files</span>
                    </p>
                    <p className="text-[11px] font-['JetBrains_Mono'] text-[#d0c5af]/60 mt-1">
                      Supports ZIP, PDF, MP4, MOV, Figma, PNG up to 250MB
                    </p>
                  </div>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>

                {/* Uploaded File List */}
                <div className="space-y-2">
                  <span className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                    Attached Files ({uploadedFiles.length})
                  </span>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="p-3 bg-[#181818] rounded-lg border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#f2ca50] text-sm">attachment</span>
                        <span className="text-xs font-['JetBrains_Mono'] text-white">{file.name}</span>
                        <span className="text-[10px] text-[#d0c5af]">({file.size})</span>
                      </div>
                      <button
                        onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                        className="text-[#d0c5af] hover:text-red-400 text-xs"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* External Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase">
                    Shared Cloud URL (Google Drive / Figma / Dropbox)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/drive/folders/..."
                    value={referenceLinks}
                    onChange={(e) => setReferenceLinks(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-white font-['Inter'] text-sm focus:outline-none focus:border-[#f2ca50]"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-outline-silver px-6 py-2.5 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="btn-gold px-8 py-3 rounded-lg font-['JetBrains_Mono'] text-xs font-bold cursor-pointer flex items-center gap-2"
                  >
                    Review Order <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirm & Deposit */}
            {currentStep === 4 && (
              <div className="glass-panel p-6 md:p-8 rounded-xl border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-['Montserrat'] font-bold text-xl text-white">
                    Step 4: Order Summary &amp; 50% Deposit
                  </h2>
                  <p className="text-xs text-[#d0c5af]">
                    Review invoice breakdown and authorize deposit to start production.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="glass-card p-5 rounded-xl border border-white/15 space-y-4">
                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <div>
                      <span className="font-['JetBrains_Mono'] text-xs text-[#f2ca50] uppercase">Selected Service</span>
                      <h3 className="font-['Montserrat'] font-bold text-lg text-white">
                        {selectedService.title}
                      </h3>
                      <p className="text-xs text-[#d0c5af]">
                        {projectTitle ? `"${projectTitle}"` : 'Standard Project Suite'}
                      </p>
                    </div>
                    <span className="font-['JetBrains_Mono'] font-bold text-lg text-[#f2ca50]">
                      ₹{totalAmount} INR
                    </span>
                  </div>

                  <div className="text-xs font-['JetBrains_Mono'] space-y-2 text-[#d0c5af]">
                    <div className="flex justify-between">
                      <span>Base Service Fee:</span>
                      <span className="text-white">₹{basePrice} INR</span>
                    </div>
                    {rushDelivery && (
                      <div className="flex justify-between text-[#f2ca50]">
                        <span>Priority 24h Rush:</span>
                        <span>+₹{rushFee} INR</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-sm text-white">
                      <span>50% Upfront Deposit (Due Today):</span>
                      <span className="text-[#f2ca50]">₹{depositAmount} INR</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#d0c5af]/80">
                      <span>Remaining 50% Balance:</span>
                      <span>₹{totalAmount - depositAmount} INR (Upon Final Master Delivery)</span>
                    </div>
                  </div>
                </div>

                {/* Policy Checkbox */}
                <div className="p-4 bg-[#141414] rounded-lg border border-[#f2ca50]/30 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 accent-[#f2ca50] mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="terms-check" className="text-xs text-[#d0c5af] leading-relaxed cursor-pointer">
                    <strong className="text-white">AK Studio Payment Policy:</strong> I authorize a 50% upfront deposit to initiate development. The remaining 50% is billed only upon draft review and before transfer of final master source assets. Includes up to 2 rounds of creative revisions.
                  </label>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn-outline-silver px-6 py-2.5 rounded-lg font-['JetBrains_Mono'] text-xs cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    disabled={!agreedToTerms || isSubmitting}
                    onClick={handleSubmitOrder}
                    className={`btn-gold px-8 py-3.5 rounded-lg font-['JetBrains_Mono'] text-xs font-bold flex items-center gap-2 cursor-pointer ${
                      !agreedToTerms ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        Authorizing Deposit...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-sm">lock</span>
                        Confirm &amp; Pay ₹{depositAmount} INR Deposit
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
