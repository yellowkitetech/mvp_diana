
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header/Header';
import { Sidebar } from './layout/Sidebar';
import { MainContent } from './layout/MainContent';
import { Footer } from './layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title = "DIANA", description }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMinimize = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1 pt-16">
        <Sidebar 
          sidebarOpen={sidebarOpen}
          sidebarMinimized={sidebarMinimized}
          toggleMinimize={toggleMinimize}
          handleLogout={handleLogout}
        />
        
        <MainContent 
          title={title}
          description={description}
          sidebarOpen={sidebarOpen}
          sidebarMinimized={sidebarMinimized}
        >
          {children}
        </MainContent>
      </div>
      
      <Footer sidebarOpen={sidebarOpen} sidebarMinimized={sidebarMinimized} />
      
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
