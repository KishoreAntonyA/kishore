import { Order, ServiceItem, PortfolioItem, ActivityItem } from '../types';

export const WHATSAPP_NUMBER = '9952625837';
export const WHATSAPP_DISPLAY = '+91 9952625837';
export const WHATSAPP_LINK = 'https://wa.me/919952625837';

export const INSTAGRAM_HANDLE = 'ak_modern_creating';
export const INSTAGRAM_DISPLAY = '@ak_modern_creating';
export const INSTAGRAM_LINK = 'https://instagram.com/ak_modern_creating';

export const FOUNDER_NAME = 'Kishore Antony';
export const FOUNDER_ROLE = 'Owner & Founder';
export const PUBLISHED_BY = 'ak_modern_creating';
export const CREATED_BY = 'Kishore Antony';

export const BRAND_LOGOS = {
  mainLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaM5LYK5MZsGtCOxk3xMttxOM9Rpx3zCzRB1FdtwW8XRNAhYV9h3h__RhE46vBRJGj0B04hM45ehDDVoMKAovsVsAmREseXO8WtI2w4U0Wo6LhKGPJHBRqDkXBdfs8p3mHbXgzzjtsLr5qOPJxug78O1d_Fgvq6t3lusIYxFH_TrvMsi0YZjFb8wlz3yTyCEf7kwIjkx1onYYtfwOnNAuTdCUlMyoRD5r08HqzTDsBIYHAtLN7UIzHzczuL9sHp7XeNg',
  mobileLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8kkWFYwUocH_tjNvTprVYJMROwfKdTz0NP6KQnv5FdJIo5oGJxYTZjYfJwYDFuVbt6csABTSNXmUXKvXmGHZy0TbE-C1wJb6qIWDTHiohQKJEfygdBg7Cv3_8TMcSsL_CggTjF0cdeGrYDh8Ffb0Nef2CsvT82DOpejGwmlKne6GTKL-H359PFeoyxR0awNI3loaYRVJn_EWLDNsUydREEuVZXW4np5u03Dz7kdFPf8jpHlusfWCEba4hoB1kXszHlw',
  footerLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPK3V-0fcN8xeXqUj5Zxo2ule50edu1kK42B-F2FwzEQf_U52kUrhF0cFMzHNfM5h6ntDXB9ibxt8uGcUUICOILjxUXKCqog-Thik_MdtPoAdJvEnT0eBUQPAlOHpEEBoIu-oxRwgbJRFE_o7rhYP6IisY1Ee8cMV98vi8tkXH37_4WFCqHdTAHIXaFx4deh94y3TOfhy-Is9wYkhW263JXaEsiUAnuiIsNcbSWrSObhMOhsmaH0tDovbYGtQe-T5XCw',
  adminAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxbCIS9-bNdmULccVmNDvVcCtP_E3wsYYnG95l9iHshzRTZ1otNeftXcGKdg99mCJPXZFjSPK8JUaMqFzzWA5enP3GZl6lYgcoOmY59V1JJA3WbaVkZG6GCjbzD3voASBFHI-gEXNrT-NZhKND6T037s0Uk5xno2Uh1q-Lejv5m3FrCedHuNnXNMwRoB2K609cfL8QApzjPde8BNh8aachT5dtUEDsYPs0y52EBWPAZ1dqqzmMKn06MFfZLAf1pVn9qQ',
  clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqugXg8vM7iz2WwjzaojfPUHtOkW9SqdJBf87S3MNz2mmft-tqmDKeYVffeIIyDWgn_J3ZmkPLOjOU5y0OxBTdlV-KT9BlcoOEOL7Z90KLveMlbu6kVqDyi7g25X_mqQZBeXZ3qnnPlgYYWzlq8gLC3srscrgsverFY22S4nLDeemWwygswxQulPL_d-J5KG1hiKLI18sV0RvbfG7Bf4Z5jxmplEnszyWT-6if4Oik24Y_shv76zyaSpjDL6GLKx3_lw',
  roundEmblem: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcdXMLnyNP5bXTW6q56_0RXobhqS46CmMCKpd4klQl4Eil80NQIDSEjvDmAi7UW5Z6fyXiQk6UMfKrw1atjZcKpkP6jxPS1RJZz8WcWTL4WSDdvg00Hk3ZmCswJO0Exd1ebs_i5MzoDWIMzAfufdabZ1Inc3_3gW9fLrnX-n5YVe6PhObYC70y9s5kuZ5eJ2TcNvGxZuG7fnYvjOPZfNYVz3DBkoY5sX_wdTm9H8SAUFEIqy3CQ8xbt-odI7Q4MXxT7A',
  heroArtwork: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUflLko31GYgMtz_A_Bvd5wKrRT3lMQrMstiHkdTogn7xcHPSTLKlDSyVB2YDvTl6hKerKFSieiAkTOk9Zn55HNkHdrvicN-xJ1X2ZPPVf9UrH2nkoITcdL9Ph2j6VsShFnkcTARl1oYBJ-CgODI1_bfeAm56is2FwXnUBCL0hpk64Cc-GrmgNZnQDCEZ6gpv-FIJ7uVspcut830oAScBYHHYfae2CWG5dynfEoxXKzUY8ozrR3qN6'
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'resume-creating',
    title: 'Resume Creating',
    category: 'resume',
    icon: 'description',
    description: 'Stand out to recruiters with ATS-optimized, beautifully designed professional resumes.',
    longDescription: 'Engineered for Silicon Valley, Fortune 500, tech firms, and academic placements. Includes dual ATS score optimization, executive typography, tailored keyword clustering, and multi-format exports (PDF, editable Word, LaTeX).',
    startingPrice: 100,
    turnaroundTime: '24 - 48 Hours',
    features: ['ATS Keyword Matrix Optimization', 'Executive Typographic Layout', 'Cover Letter & LinkedIn Rewrite', '2 Rounds of Revisions', 'Editable Source Files'],
    sampleDeliverables: ['Senior_FullStack_Resume_ATS.pdf', 'LinkedIn_Profile_Strategy.docx', 'Executive_Cover_Letter.pdf']
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    category: 'video',
    icon: 'videocam',
    description: "Engaging, high-quality content tailored for your brand's unique voice across platforms.",
    longDescription: 'Cinematic social media reels, YouTube long-form editing, AI motion graphics, color grading, sound design, and viral narrative hooks engineered to captivate audiences.',
    startingPrice: 150,
    turnaroundTime: '2 - 4 Days',
    features: ['4K HDR Color Grading', 'AI Voice & Subtitle Syncing', 'Dynamic 3D Typography Hooks', 'Licensed Soundtracks & SFX', 'Multi-Platform Aspect Ratio Cuts'],
    sampleDeliverables: ['Viral_Reel_1080x1920.mp4', 'YouTube_Master_4K.mov', 'Motion_Intro_AudioTrack.wav'],
    popular: true
  },
  {
    id: 'presentation-creator',
    title: 'Presentation Creator',
    category: 'design',
    icon: 'present_to_all',
    description: 'Impactful, visually stunning pitch decks and presentations that command attention.',
    longDescription: 'High-stakes venture capital pitch decks, keynote presentations, and enterprise sales decks designed with dark-mode elegance, 3D data visualizations, and persuasive narrative flow.',
    startingPrice: 70,
    turnaroundTime: '3 - 5 Days',
    features: ['Custom Visual Data Charts', 'Interactive Slide Animations', 'Executive Deck Copywriting', 'Speaker Notes & Timing Guide', 'Figma & PowerPoint Masters'],
    sampleDeliverables: ['Series_A_Pitch_Deck_Master.pptx', 'Interactive_Keynote_Deck.pdf', 'Vector_Asset_Library.fig']
  },
  {
    id: 'ai-powered-solutions',
    title: 'AI-Powered Solutions',
    category: 'ai',
    icon: 'memory',
    description: 'Leverage the latest AI tools to optimize workflows and generate cutting-edge assets.',
    longDescription: 'Custom generative AI pipelines, automated multimodal content engines, LLM agent integrations, custom voice clones, and synthetic 3D media generation built specifically for your team.',
    startingPrice: 150,
    turnaroundTime: '5 - 7 Days',
    features: ['Custom Gemini AI Integration', 'Automated Multimodal Generation', 'Smart Prompt Engineering Systems', 'API Webhook Automation', 'Dedicated Architecture Briefing'],
    sampleDeliverables: ['AI_Workflow_Pipeline.json', 'Custom_Agent_Deployment.ts', 'Documentation_Architecture.pdf'],
    popular: true
  },
  {
    id: 'web-app-creator',
    title: 'Web-App Creator',
    category: 'web',
    icon: 'web',
    description: 'Responsive, sleek, and functional web applications built for modern user experiences.',
    longDescription: 'Ultra-fast, responsive web applications crafted with modern React, Tailwind CSS, TypeScript, and high-performance server architectures featuring dark-mode luxury and fluid transitions.',
    startingPrice: 270,
    turnaroundTime: '7 - 14 Days',
    features: ['Full Responsive Mobile-to-Desktop', 'Tailwind & Motion Transitions', 'Full-Stack Server & API Integration', 'SEO & Performance Optimized 95+', 'Deployment & Hosting Setup'],
    sampleDeliverables: ['Production_Repository_Access', 'Figma_UI_Kit_Master.fig', 'REST_API_Documentation.json']
  },
  {
    id: 'ug-degree-project',
    title: 'UG Degree Project Idea',
    category: 'project',
    icon: 'lightbulb',
    description: 'Innovative ideation and structural planning for standout undergraduate final projects.',
    longDescription: 'End-to-end undergraduate computer science, engineering, and data science capstone project mentorship. Includes problem statement formulation, system architecture diagrams, tech stack selection, and research synopsis.',
    startingPrice: 250,
    turnaroundTime: '3 - 5 Days',
    features: ['Novel Research Problem Statement', 'Complete System Architecture Diagram', 'IEEE Format Project Synopsis', 'Step-by-Step Implementation Roadmap', 'Viva Voce Q&A Preparation'],
    sampleDeliverables: ['Capstone_Synopsis_IEEE.pdf', 'Architecture_Diagram_UML.png', 'Implementation_Guide.md']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-2024-8991',
    orderNumber: 'AK-24-0891',
    clientName: 'Nexus AI Solutions',
    clientInitials: 'NX',
    clientEmail: 'client@example.com',
    clientCompany: 'Nexus AI Labs Inc.',
    serviceTitle: 'AI Video Production',
    serviceCategory: 'video',
    status: 'draft-ready',
    statusLabel: 'Draft Ready for Review',
    date: 'Oct 28, 2024',
    estimatedDelivery: 'Nov 15, 2024',
    totalAmount: 4500,
    paidAmount: 2250,
    invoiceNumber: 'INV-0089',
    assignedTo: 'Alex K.',
    deliverablesCount: '1x 60s, 3x 15s',
    briefSummary: 'High-energy promotional video for upcoming AI SAAS platform launch. Needs to incorporate cinematic 3D elements, sleek typography, and a driving electronic soundtrack. Focus on features: predictive analytics and automated workflows. Reference files provided in initial brief.',
    progressPercentage: 65,
    timeline: [
      {
        id: 't-1',
        title: 'Booking Received',
        description: 'Oct 28, 2024 - Initial requirements captured.',
        status: 'completed',
        date: 'Oct 28, 2024'
      },
      {
        id: 't-2',
        title: 'Advance Payment Confirmed',
        description: 'Oct 29, 2024 - 50% deposit secured.',
        status: 'completed',
        date: 'Oct 29, 2024'
      },
      {
        id: 't-3',
        title: 'Creative Brief Finalized',
        description: 'Oct 31, 2024 - Storyboard and moodboard approved.',
        status: 'completed',
        date: 'Oct 31, 2024'
      },
      {
        id: 't-4',
        title: 'Asset Generation & Rendering',
        description: 'Nov 02, 2024 - AI models generating base visuals based on prompt engineering.',
        status: 'active',
        date: 'Nov 02, 2024'
      },
      {
        id: 't-5',
        title: 'First Draft Review',
        description: 'Pending client feedback.',
        status: 'pending'
      },
      {
        id: 't-6',
        title: 'Revisions (If applicable)',
        description: 'Fine-tuning lighting, tempo, and audio mix.',
        status: 'pending'
      },
      {
        id: 't-7',
        title: 'Final Delivery Preparation',
        description: 'Rendering master 4K ProRes & social cuts.',
        status: 'pending'
      }
    ],
    files: [
      {
        id: 'f-1',
        name: 'v1_Nexus_Promo_Draft.mp4',
        type: 'draft',
        size: '124 MB',
        date: 'Oct 15',
        fileFormat: 'video/mp4',
        downloadUrl: '#',
        previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'f-2',
        name: 'Client_Brief_v2.pdf',
        type: 'reference',
        size: '2.4 MB',
        date: 'Oct 10',
        fileFormat: 'application/pdf',
        downloadUrl: '#'
      },
      {
        id: 'f-3',
        name: 'Nexus_Brand_Kit_3D_Gold.zip',
        type: 'asset',
        size: '48.5 MB',
        date: 'Oct 12',
        fileFormat: 'application/zip',
        downloadUrl: '#'
      }
    ],
    messages: [
      {
        id: 'm-1',
        sender: 'client',
        authorName: 'Nexus Team',
        avatarText: 'NX',
        content: 'Can we make sure the lighting in scene 3 is a bit more dramatic? Like a cinematic rim light.',
        timestamp: 'Yesterday, 2:30 PM'
      },
      {
        id: 'm-2',
        sender: 'studio',
        authorName: 'Alex K. (AK Studio)',
        avatarText: 'AK',
        content: "Absolutely. We've adjusted the prompt to emphasize a strong silver rim light against the dark background. It should match the brand aesthetic perfectly. We'll include it in the next render batch.",
        timestamp: 'Yesterday, 3:15 PM'
      },
      {
        id: 'm-3',
        sender: 'system',
        authorName: 'System Update',
        content: 'Phase updated: Rendering Initial Drafts (65% Completed)',
        timestamp: 'Today, 9:00 AM'
      }
    ]
  },
  {
    id: 'ord-9921',
    orderNumber: '#ORD-9921',
    clientName: 'John Doe',
    clientInitials: 'JD',
    clientEmail: 'john.doe@creatives.io',
    clientCompany: 'Aura Media',
    serviceTitle: 'AI Video Editing',
    serviceCategory: 'video',
    status: 'new',
    statusLabel: 'New',
    date: 'Oct 24, 2024',
    estimatedDelivery: 'Nov 04, 2024',
    totalAmount: 1800,
    paidAmount: 900,
    invoiceNumber: 'INV-0091',
    assignedTo: 'Unassigned',
    deliverablesCount: '3x 30s TikTok/Reel Edits',
    briefSummary: 'Fashion tech launch campaign with dynamic beat cuts, neon rim lighting, and AI generated virtual runway models.',
    progressPercentage: 15,
    timeline: [
      { id: 't-1', title: 'Booking Received', description: 'Oct 24, 2024 - Order confirmed', status: 'completed', date: 'Oct 24' },
      { id: 't-2', title: 'Advance Payment', description: '50% secured', status: 'completed', date: 'Oct 24' },
      { id: 't-3', title: 'Creative Brief Finalized', description: 'In review by studio lead', status: 'active', date: 'Oct 25' }
    ],
    files: [
      { id: 'f-10', name: 'Raw_Footage_Batch_01.zip', type: 'reference', size: '340 MB', date: 'Oct 24', fileFormat: 'application/zip' }
    ],
    messages: [
      { id: 'm-10', sender: 'client', authorName: 'John Doe', avatarText: 'JD', content: 'Looking forward to the first batch of cutdowns!', timestamp: 'Oct 24, 4:10 PM' }
    ]
  },
  {
    id: 'ord-9920',
    orderNumber: '#ORD-9920',
    clientName: 'Sarah Adams',
    clientInitials: 'SA',
    clientEmail: 'sarah@luminate.design',
    clientCompany: 'Luminate Studio',
    serviceTitle: 'Brand Identity',
    serviceCategory: 'design',
    status: 'active',
    statusLabel: 'Active',
    date: 'Oct 22, 2024',
    estimatedDelivery: 'Nov 01, 2024',
    totalAmount: 3200,
    paidAmount: 1600,
    invoiceNumber: 'INV-0090',
    assignedTo: 'Elena M.',
    deliverablesCount: 'Full Brand Book + 3D Logo Suite',
    briefSummary: 'Luxury dark-mode visual brand identity with gold metallic typography, 3D stationery assets, and social media brand templates.',
    progressPercentage: 50,
    timeline: [
      { id: 't-20', title: 'Booking Received', description: 'Oct 22, 2024', status: 'completed' },
      { id: 't-21', title: 'Moodboard Approved', description: 'Oct 24, 2024', status: 'completed' },
      { id: 't-22', title: 'Logo System Exploration', description: 'Developing 3 bespoke emblem directions', status: 'active' }
    ],
    files: [
      { id: 'f-20', name: 'Brand_Identity_Concept_V1.pdf', type: 'draft', size: '18 MB', date: 'Oct 23', fileFormat: 'application/pdf' }
    ],
    messages: [
      { id: 'm-20', sender: 'studio', authorName: 'Elena M.', avatarText: 'EM', content: 'We uploaded the 3 primary concept directions for your review.', timestamp: 'Oct 23, 11:20 AM' }
    ]
  },
  {
    id: 'ord-9919',
    orderNumber: '#ORD-9919',
    clientName: 'Mike Chen',
    clientInitials: 'MC',
    clientEmail: 'mike@techfrontier.co',
    clientCompany: 'Tech Frontier',
    serviceTitle: 'Web Development',
    serviceCategory: 'web',
    status: 'payment-pending',
    statusLabel: 'Payment Pending',
    date: 'Oct 20, 2024',
    estimatedDelivery: 'Nov 10, 2024',
    totalAmount: 2800,
    paidAmount: 0,
    invoiceNumber: 'INV-0088',
    assignedTo: 'Dev Team',
    deliverablesCount: 'Next.js Web App with Tailwind',
    briefSummary: 'High-performance portfolio platform for venture fund with interactive dealflow dashboard and custom CMS integration.',
    progressPercentage: 10,
    timeline: [
      { id: 't-30', title: 'Booking Received', description: 'Oct 20, 2024', status: 'completed' },
      { id: 't-31', title: 'Awaiting 50% Deposit', description: 'Invoice sent to accounting', status: 'active' }
    ],
    files: [],
    messages: [
      { id: 'm-30', sender: 'system', authorName: 'Billing System', content: 'Invoice INV-0088 dispatched for payment.', timestamp: 'Oct 20, 2:00 PM' }
    ]
  },
  {
    id: 'ord-2024-089',
    orderNumber: 'ORD-2024-089',
    clientName: 'Corporate Client',
    clientInitials: 'CC',
    clientEmail: 'client@example.com',
    serviceTitle: 'Corporate Brand Identity',
    serviceCategory: 'design',
    status: 'in-progress',
    statusLabel: 'In Progress',
    date: 'Oct 18, 2024',
    estimatedDelivery: 'Nov 02, 2024',
    totalAmount: 2400,
    paidAmount: 1200,
    invoiceNumber: 'INV-0087',
    assignedTo: 'Alex K.',
    deliverablesCount: 'Full Brand Guidelines + Vector Assets',
    briefSummary: 'Complete executive identity system with corporate stationary, email signatures, and pitch deck masters.',
    progressPercentage: 70,
    timeline: [
      { id: 't-40', title: 'Booking Received', description: 'Oct 18', status: 'completed' },
      { id: 't-41', title: 'Style Guide Drafting', description: 'Typography & Color Tokens', status: 'completed' },
      { id: 't-42', title: 'Final Review Batch', description: 'Awaiting client signoff', status: 'active' }
    ],
    files: [
      { id: 'f-40', name: 'Brand_Guidelines_Draft_v2.pdf', type: 'draft', size: '14.2 MB', date: 'Oct 20', fileFormat: 'application/pdf' }
    ],
    messages: []
  },
  {
    id: 'ord-2024-088',
    orderNumber: 'ORD-2024-088',
    clientName: 'Corporate Client',
    clientInitials: 'CC',
    clientEmail: 'client@example.com',
    serviceTitle: 'Q3 Marketing Video',
    serviceCategory: 'video',
    status: 'review-pending',
    statusLabel: 'Review Pending',
    date: 'Oct 14, 2024',
    estimatedDelivery: 'Oct 28, 2024',
    totalAmount: 3800,
    paidAmount: 1900,
    invoiceNumber: 'INV-0086',
    assignedTo: 'Motion Crew',
    deliverablesCount: '60s 4K Promotional Spot',
    briefSummary: 'Quarterly product reel spotlighting AI acceleration features with dynamic 3D gold render elements.',
    progressPercentage: 85,
    timeline: [
      { id: 't-50', title: 'Rendering Complete', description: '4K Draft Uploaded', status: 'completed' },
      { id: 't-51', title: 'Client Review Pending', description: 'Review draft files before final master render', status: 'active' }
    ],
    files: [
      { id: 'f-50', name: 'Q3_Marketing_Promo_Cut_4K.mp4', type: 'draft', size: '210 MB', date: 'Oct 22', fileFormat: 'video/mp4' }
    ],
    messages: []
  },
  {
    id: 'ord-2024-075',
    orderNumber: 'ORD-2024-075',
    clientName: 'Corporate Client',
    clientInitials: 'CC',
    clientEmail: 'client@example.com',
    serviceTitle: 'AI Web Integration',
    serviceCategory: 'web',
    status: 'completed',
    statusLabel: 'Completed',
    date: 'Oct 02, 2024',
    estimatedDelivery: 'Oct 16, 2024',
    totalAmount: 5200,
    paidAmount: 5200,
    invoiceNumber: 'INV-0075',
    assignedTo: 'Lead Architect',
    deliverablesCount: 'Production Deployment + API Hooks',
    briefSummary: 'Full production integration of multimodal Gemini models into existing customer portal with realtime streaming responses.',
    progressPercentage: 100,
    timeline: [
      { id: 't-60', title: 'Project Kickoff', description: 'Completed', status: 'completed' },
      { id: 't-61', title: 'Production Live Deploy', description: 'Completed & Certified', status: 'completed' }
    ],
    files: [
      { id: 'f-60', name: 'Deployment_Release_v1.0.tar.gz', type: 'final', size: '82 MB', date: 'Oct 16', fileFormat: 'application/gzip' },
      { id: 'f-61', name: 'API_Documentation_Certified.pdf', type: 'final', size: '3.1 MB', date: 'Oct 16', fileFormat: 'application/pdf' }
    ],
    messages: []
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'upload',
    title: 'uploaded draft files for',
    subtitle: 'Q3 Marketing Video',
    timeAgo: '2 hours ago',
    icon: 'upload_file',
    highlightedWord: 'AK Team',
    orderId: 'ord-2024-088'
  },
  {
    id: 'act-2',
    type: 'comment',
    title: 'New comment on',
    subtitle: 'Corporate Brand Identity',
    timeAgo: '5 hours ago',
    icon: 'chat',
    orderId: 'ord-2024-089'
  },
  {
    id: 'act-3',
    type: 'status',
    title: 'Order marked as completed:',
    subtitle: 'AI Web Integration',
    timeAgo: 'Yesterday',
    icon: 'check_circle',
    orderId: 'ord-2024-075'
  },
  {
    id: 'act-4',
    type: 'payment',
    title: '50% deposit received for',
    subtitle: 'AI Video Production (#AK-24-0891)',
    timeAgo: '2 days ago',
    icon: 'payments',
    orderId: 'ord-2024-8991'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p-1',
    title: 'Nexus AI Core Cinematic Launch',
    category: 'AI Video & 3D Motion',
    client: 'Nexus AI Labs',
    description: 'A 60-second high-energy 3D commercial featuring floating geometric glass shards and hyper-refined gold lighting effects.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUflLko31GYgMtz_A_Bvd5wKrRT3lMQrMstiHkdTogn7xcHPSTLKlDSyVB2YDvTl6hKerKFSieiAkTOk9Zn55HNkHdrvicN-xJ1X2ZPPVf9UrH2nkoITcdL9Ph2j6VsShFnkcTARl1oYBJ-CgODI1_bfeAm56is2FwXnUBCL0hpk64Cc-GrmgNZnQDCEZ6gpv-FIJ7uVspcut830oAScBYHHYfae2CWG5dynfEoxXKzUY8ozrR3qN6',
    tags: ['4K Render', '3D Cinema 4D', 'Sound Engineering', 'Gold FX'],
    stats: '2.4M+ Impressions',
    award: 'Selected Best Tech Teaser 2024'
  },
  {
    id: 'p-2',
    title: 'Aura Luxury Sovereign Identity',
    category: 'Brand Identity',
    client: 'Aura Capital',
    description: 'Complete brand architecture for a $200M venture firm combining deep obsidian matte black and brushed gold insignia.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Brand Guidelines', '3D Monogram', 'Keynote Deck', 'Gold Foil'],
    stats: '$45M Series A Raised'
  },
  {
    id: 'p-3',
    title: 'QuantumEdge LLM Intelligence Portal',
    category: 'Web-App Development',
    client: 'QuantumEdge Inc.',
    description: 'A lightning-fast modern dashboard with streaming AI generation, glassmorphic analytics cards, and dark-mode precision.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['React 19', 'Tailwind CSS', 'Gemini SDK', 'Real-Time Charts'],
    stats: '99.9% Uptime'
  },
  {
    id: 'p-4',
    title: 'Executive Silicon Valley Resume Suite',
    category: 'Resume & Career Suite',
    client: 'VP of Product Engineering',
    description: 'Precision ATS-optimized resume, customized executive pitch bio, and interactive digital portfolio.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
    tags: ['ATS 98/100', 'FAANG Placement', 'Executive Bio'],
    stats: '3 FAANG Offers'
  }
];
