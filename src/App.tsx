import React, { useState } from 'react';
import { ViewMode, UserRole, Order, OrderStatus, OrderMessage, DeliverableFile } from './types';
import { INITIAL_ORDERS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { ServiceBookingView } from './components/ServiceBookingView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { ClientDashboardView } from './components/ClientDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AdminOrderDetailView } from './components/AdminOrderDetailView';
import { ServicesCatalogView } from './components/ServicesCatalogView';
import { PortfolioView } from './components/PortfolioView';
import { AboutView } from './components/AboutView';
import { GeminiChatbot } from './components/GeminiChatbot';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedServiceIdForBooking, setSelectedServiceIdForBooking] = useState<string>('content-creator');
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>('ord-2024-8991');
  const [activeDetailOrderId, setActiveDetailOrderId] = useState<string>('ord-2024-8991');

  // Navigation Helper
  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order Handlers
  const handleCreateOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrder.id);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus, statusLabel: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              statusLabel,
              progressPercentage:
                status === 'completed'
                  ? 100
                  : status === 'draft-ready'
                  ? 80
                  : status === 'active'
                  ? 45
                  : order.progressPercentage
            }
          : order
      )
    );
  };

  const handleSendMessage = (orderId: string, message: OrderMessage) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              messages: [...order.messages, message]
            }
          : order
      )
    );
  };

  const handleAddDeliverableFile = (orderId: string, file: DeliverableFile) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              files: [file, ...order.files]
            }
          : order
      )
    );
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceIdForBooking(serviceId);
  };

  const handleSelectOrderToTrack = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
  };

  const handleSelectOrderForDetail = (orderId: string) => {
    setActiveDetailOrderId(orderId);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] flex flex-col font-['Inter'] selection:bg-[#f2ca50]/30 selection:text-[#ffe088]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        userRole={userRole}
        onRoleChange={setUserRole}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <LandingView
            onNavigate={handleNavigate}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentView === 'services' && (
          <ServicesCatalogView
            onNavigate={handleNavigate}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentView === 'portfolio' && (
          <PortfolioView
            onNavigate={handleNavigate}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentView === 'booking' && (
          <ServiceBookingView
            initialServiceId={selectedServiceIdForBooking}
            onNavigate={handleNavigate}
            onCreateOrder={handleCreateOrder}
          />
        )}

        {currentView === 'track' && (
          <OrderTrackingView
            orders={orders}
            currentOrderId={activeTrackingOrderId}
            onNavigate={handleNavigate}
            onSendMessage={handleSendMessage}
          />
        )}

        {currentView === 'client-dashboard' && (
          <ClientDashboardView
            orders={orders}
            onNavigate={handleNavigate}
            onSelectOrderToTrack={handleSelectOrderToTrack}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboardView
            orders={orders}
            onNavigate={handleNavigate}
            onSelectOrderForDetail={handleSelectOrderForDetail}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {currentView === 'admin-order-detail' && (
          <AdminOrderDetailView
            orderId={activeDetailOrderId}
            orders={orders}
            onNavigate={handleNavigate}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSendMessage={handleSendMessage}
            onAddDeliverableFile={handleAddDeliverableFile}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Persistent Gemini AI Studio Consultant Chatbot */}
      <GeminiChatbot onNavigate={handleNavigate} />
    </div>
  );
}
