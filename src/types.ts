export type ViewMode = 
  | 'home' 
  | 'services' 
  | 'portfolio' 
  | 'about' 
  | 'booking' 
  | 'track' 
  | 'client-dashboard' 
  | 'admin-dashboard' 
  | 'admin-order-detail';

export type UserRole = 'visitor' | 'client' | 'admin';

export type OrderStatus = 
  | 'new'
  | 'active'
  | 'in-progress'
  | 'review-pending'
  | 'payment-pending'
  | 'completed'
  | 'draft-ready'
  | 'revision'
  | 'cancelled';

export interface DeliverableFile {
  id: string;
  name: string;
  type: 'draft' | 'reference' | 'final' | 'asset';
  size: string;
  date: string;
  fileFormat: string;
  downloadUrl?: string;
  previewUrl?: string;
}

export interface OrderMessage {
  id: string;
  sender: 'client' | 'studio' | 'system';
  authorName: string;
  avatarText?: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  isInternalNote?: boolean;
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  date?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  clientInitials: string;
  clientEmail: string;
  clientCompany?: string;
  serviceTitle: string;
  serviceCategory: 'video' | 'design' | 'web' | 'ai' | 'resume' | 'project';
  status: OrderStatus;
  statusLabel: string;
  date: string;
  estimatedDelivery: string;
  totalAmount: number;
  paidAmount: number;
  invoiceNumber: string;
  assignedTo: string;
  deliverablesCount: string;
  briefSummary: string;
  progressPercentage: number;
  timeline: TimelineStep[];
  files: DeliverableFile[];
  messages: OrderMessage[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'video' | 'design' | 'web' | 'ai' | 'resume' | 'project';
  icon: string;
  description: string;
  longDescription: string;
  startingPrice: number;
  turnaroundTime: string;
  features: string[];
  sampleDeliverables: string[];
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
  stats: string;
  award?: string;
}

export interface ActivityItem {
  id: string;
  type: 'upload' | 'comment' | 'status' | 'payment';
  title: string;
  subtitle: string;
  timeAgo: string;
  icon: string;
  highlightedWord?: string;
  orderId?: string;
}
