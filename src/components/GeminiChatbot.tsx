import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_LINK, WHATSAPP_DISPLAY, INSTAGRAM_LINK, INSTAGRAM_DISPLAY, FOUNDER_NAME, FOUNDER_ROLE, PUBLISHED_BY, CREATED_BY } from '../data/initialData';
import { ViewMode } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatbotProps {
  onNavigate?: (view: ViewMode) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export type TaskModelType = 'general' | 'complex' | 'fast';

const MODEL_INFO: Record<TaskModelType, { name: string; modelId: string; description: string; badge: string; icon: string }> = {
  general: {
    name: 'General Creative (Gemini 3.5 Flash)',
    modelId: 'gemini-3.5-flash',
    description: 'Balanced for creative brainstorming, service advisory, and project planning.',
    badge: 'Standard',
    icon: 'auto_awesome'
  },
  complex: {
    name: 'Deep Technical (Gemini 3.1 Pro)',
    modelId: 'gemini-3.1-pro-preview',
    description: 'High-reasoning model for UG engineering projects, system architecture & code logic.',
    badge: 'Pro Reasoning',
    icon: 'psychology'
  },
  fast: {
    name: 'Instant Quick (Gemini 3.1 Flash Lite)',
    modelId: 'gemini-3.1-flash-lite',
    description: 'Ultra low-latency responses for quick price checks and rapid FAQs.',
    badge: 'Ultra Fast',
    icon: 'bolt'
  }
};

const INITIAL_GREETING: Message = {
  id: 'msg-welcome',
  role: 'model',
  content: `👋 **Welcome to AK MODERN CREATING AI Studio Advisor!**
*Published by ${PUBLISHED_BY} • Created by ${CREATED_BY} • ${FOUNDER_ROLE}: ${FOUNDER_NAME}*

I am your dedicated creative intelligence consultant. How can I assist your vision today?

🏷️ **Official Service Pricing (Indian Rupees - INR):**
• **Resume Creating:** From **₹100 INR** (ATS 95+, LaTeX/PDF, Cover Letter)
• **Content Creator:** From **₹150 INR** (4K Reels, YouTube, AI Motion)
• **Presentation Creator:** From **₹70 INR** (Keynote, Pitch Decks, Charts)
• **AI-Powered Solutions:** From **₹150+ INR** (Gemini Workflows, Agents)
• **Web-App Creator:** From **₹270+ INR** (Full-Stack React/Tailwind Apps)
• **UG Degree Project Idea:** From **₹250 INR** (IEEE Synopsis, UML & Code)

📸 **Instagram:** [${INSTAGRAM_DISPLAY}](${INSTAGRAM_LINK})
💬 **Direct WhatsApp Studio:** [${WHATSAPP_DISPLAY}](${WHATSAPP_LINK})
Feel free to ask for project advice, custom quotes, or capstone mentorship!`,
  timestamp: 'Just now',
  modelUsed: 'gemini-3.5-flash'
};

const QUICK_PROMPTS = [
  { label: '📄 Resume Quote (₹100)', prompt: 'Tell me about the Resume Creating service (from ₹100 INR). What is included in the ATS package?' },
  { label: '🎓 UG Project Ideas (₹250)', prompt: 'I need an innovative UG Computer Science capstone project idea in AI/FullStack for ₹250 INR.' },
  { label: '💻 Web-App Dev (₹270+)', prompt: 'What tech stack do you use for Web-App Creator starting from ₹270 INR?' },
  { label: '🎬 Content Creator (₹150)', prompt: 'How does the Content Creator service (from ₹150 INR) handle 4K video editing and reels?' },
  { label: '👑 Founder & Studio Info', prompt: 'Who is the founder and owner of AK Modern Creating, and where can I follow them on Instagram?' },
  { label: '⚡ Fast Price List', prompt: 'List all AK Modern Creating services with their exact starting prices in Indian Rupees (INR).' }
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  onNavigate,
  isOpenExternal,
  onCloseExternal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskType, setTaskType] = useState<TaskModelType>('general');
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeOpen = isOpenExternal !== undefined ? isOpenExternal : isOpen;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [activeOpen, messages]);

  const handleToggle = () => {
    if (onCloseExternal && isOpenExternal !== undefined) {
      onCloseExternal();
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      // Build conversation payload excluding initial welcome formatting if desired
      const apiMessages = [...messages.filter(m => m.id !== 'msg-welcome'), userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          taskType: taskType,
          modelOverride: MODEL_INFO[taskType].modelId
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server error generating response');
      }

      const modelMsg: Message = {
        id: `mod-${Date.now()}`,
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || MODEL_INFO[taskType].modelId
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `⚠️ We encountered an issue connecting to Gemini. However, our studio directors are standing by directly on WhatsApp: **[${WHATSAPP_DISPLAY}](${WHATSAPP_LINK})**.\n\n*Error: ${err.message || 'Network error'}*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'Offline Fallback'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_GREETING]);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!activeOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-[#141414]/95 border border-[#f2ca50]/40 text-[#ffe088] px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-md flex items-center gap-2 cursor-pointer hover:border-[#f2ca50] transition-colors"
              onClick={handleToggle}
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="font-semibold">AI Studio Consultant</span>
              <span className="text-[10px] text-[#d0c5af]">• Online</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="gemini-chatbot-launcher-btn"
          onClick={handleToggle}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-[#1a160d] via-[#2a2211] to-[#3c2f00] border-2 border-[#f2ca50]/60 hover:border-[#f2ca50] text-[#f2ca50] shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Open Gemini AI Assistant"
        >
          <span className="material-symbols-outlined text-[28px] transition-transform duration-300 group-hover:rotate-12">
            {activeOpen ? 'close' : 'smart_toy'}
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2ca50] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#f2ca50]"></span>
          </span>
        </button>
      </div>

      {/* Main Chatbot Window */}
      <AnimatePresence>
        {activeOpen && (
          <motion.div
            id="gemini-chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[440px] h-[600px] max-h-[82vh] bg-[#0c0c0c]/98 border border-[#f2ca50]/30 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.2)] backdrop-blur-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-[#17140e] via-[#231b0c] to-[#17140e] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f2ca50] to-[#d4af37] flex items-center justify-center text-[#2a2000] shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                  <span className="material-symbols-outlined text-[20px] font-bold">auto_awesome</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Montserrat'] font-bold text-sm text-white tracking-wide">
                      AK Modern AI Consultant
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] bg-[#f2ca50]/20 text-[#f2ca50] font-semibold border border-[#f2ca50]/30">
                      Gemini Powered
                    </span>
                  </div>
                  <p className="text-[11px] text-[#d0c5af] flex items-center gap-1.5 font-['JetBrains_Mono']">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Instant INR Quotes &amp; Ideation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg text-[#d0c5af] hover:text-[#f2ca50] hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear conversation history"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
                <button
                  onClick={handleToggle}
                  className="p-1.5 rounded-lg text-[#d0c5af] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close chat"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Model & Task Selector Bar */}
            <div className="px-3 py-2 bg-[#141414] border-b border-white/5 flex items-center justify-between gap-2 text-xs">
              <span className="text-[11px] font-['JetBrains_Mono'] text-[#d0c5af] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">tune</span>
                Reasoning Mode:
              </span>

              <div className="flex gap-1">
                {(['fast', 'general', 'complex'] as TaskModelType[]).map((type) => {
                  const info = MODEL_INFO[type];
                  const isSelected = taskType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setTaskType(type)}
                      className={`px-2 py-1 rounded text-[10px] font-['JetBrains_Mono'] transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/50 font-bold shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                          : 'bg-white/5 text-[#a89f91] hover:text-white hover:bg-white/10 border border-transparent'
                      }`}
                      title={info.description}
                    >
                      <span className="material-symbols-outlined text-[12px]">{info.icon}</span>
                      {info.badge}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Conversation Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-['Inter'] text-sm scrollbar-thin">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-[#f2ca50]/20 border border-[#f2ca50]/30 flex-shrink-0 flex items-center justify-center text-[#f2ca50] text-xs">
                        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                      </div>
                    )}

                    <div className={`max-w-[85%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`p-3.5 rounded-2xl leading-relaxed text-xs sm:text-[13px] ${
                          isUser
                            ? 'bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#241a00] font-medium rounded-tr-none shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                            : 'glass-panel bg-[#151515]/90 text-[#e5e2e1] border border-white/10 rounded-tl-none'
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed space-y-1">
                          {msg.content.split('\n').map((line, idx) => {
                            if (line.includes('**') || line.includes('[') || line.startsWith('•') || line.startsWith('#')) {
                              // Basic Markdown formatted rendering
                              const formatted = line
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-[#f2ca50] underline font-bold hover:text-white">$1</a>');
                              return <p key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
                            }
                            return <p key={idx}>{line}</p>;
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-1 text-[10px] font-['JetBrains_Mono'] text-[#a89f91]">
                        <span>{msg.timestamp}</span>
                        {!isUser && msg.modelUsed && (
                          <span className="text-[#f2ca50]/70">• {msg.modelUsed}</span>
                        )}
                        {!isUser && (
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="hover:text-[#f2ca50] transition-colors ml-1 cursor-pointer"
                            title="Copy message"
                          >
                            <span className="material-symbols-outlined text-[12px]">
                              {copySuccess === msg.id ? 'check' : 'content_copy'}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex-shrink-0 flex items-center justify-center text-white text-xs font-['JetBrains_Mono'] font-bold">
                        U
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-[#f2ca50]/20 border border-[#f2ca50]/30 flex-shrink-0 flex items-center justify-center text-[#f2ca50]">
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  </div>
                  <div className="glass-panel p-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2 text-xs text-[#d0c5af]">
                    <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
                    <span className="font-['JetBrains_Mono'] text-[11px]">
                      Consulting {MODEL_INFO[taskType].name.split(' ')[0]}...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-3 py-2 bg-[#111] border-t border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {QUICK_PROMPTS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#f2ca50]/15 border border-white/10 hover:border-[#f2ca50]/40 text-[11px] font-['JetBrains_Mono'] text-[#d0c5af] hover:text-[#f2ca50] transition-all cursor-pointer flex-shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Direct WhatsApp & Booking Banner */}
            <div className="px-3 py-1.5 bg-[#17140e] border-t border-white/5 flex items-center justify-between text-[11px] font-['JetBrains_Mono']">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">chat</span>
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>

              {onNavigate && (
                <button
                  onClick={() => {
                    onNavigate('booking');
                    setIsOpen(false);
                    if (onCloseExternal) onCloseExternal();
                  }}
                  className="text-[#f2ca50] hover:text-white font-bold underline flex items-center gap-0.5 cursor-pointer"
                >
                  Book Service <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#0a0a0a] border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about pricing in INR, projects, or services..."
                disabled={isLoading}
                className="flex-1 bg-[#161616] border border-white/15 focus:border-[#f2ca50] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#80776b] focus:outline-none transition-colors"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#2b1f00] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all font-bold cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.3)] flex items-center justify-center"
                title="Send message"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
