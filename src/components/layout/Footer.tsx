
import React from 'react';

interface FooterProps {
  sidebarOpen: boolean;
  sidebarMinimized: boolean;
}

export const Footer: React.FC<FooterProps> = ({ sidebarOpen, sidebarMinimized }) => {
  return (
    <footer className={`bg-sidebar text-white py-3 px-4 text-center text-sm border-t border-sidebar-border mt-auto ${
      sidebarOpen ? 'md:ml-64' : ''
    } ${
      sidebarMinimized ? 'md:ml-16' : 'md:ml-64'
    }`}>
      <div className="container mx-auto">
        <p>Desenvolvido por: <span className="font-semibold">Adspect Ltda.</span> © {new Date().getFullYear()}</p>
        <p className="text-xs mt-1 text-white/70">DIANA - Sistema de Dados e Informações Analisadas para Gestão de Comunicação</p>
      </div>
    </footer>
  );
};
