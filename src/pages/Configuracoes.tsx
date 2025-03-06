
import React, { useState } from 'react';
import Layout from "@/components/Layout";
import AbapTableManager from "@/components/config/AbapTableManager";
import DepartmentManager from "@/components/config/DepartmentManager";
import SupplierList from "@/components/supplier/SupplierList";
import UserSettings from "@/components/config/UserSettings";
import SystemSettings from "@/components/config/SystemSettings";
import PlaceholderSettings from "@/components/config/PlaceholderSettings";
import SettingsSidebar from "@/components/config/SettingsSidebar";
import SEIProcessManager from "@/components/config/SEIProcessManager";
import ProfileSettings from "@/components/config/profile/ProfileSettings";
import NotificationSettings from "@/components/config/notifications/NotificationSettings";
import AgencyManager from "@/components/config/agency/AgencyManager";

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState("secretarias");
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    port: "587",
    username: "notifications@agencia.gov.br",
    password: "••••••••••",
    defaultSender: "Sistema de Gestão <noreply@agencia.gov.br>"
  });

  const [systemSettings, setSystemSettings] = useState({
    maxFileSize: "10",
    allowedFileTypes: ".pdf,.jpg,.png,.doc,.docx,.xls,.xlsx",
    sessionTimeout: "60",
    theme: "light"
  });

  const [userSettings, setUserSettings] = useState({
    defaultRole: "analyst",
    passwordPolicy: "medium",
    mfaEnabled: true
  });

  const handleEmailSettingsChange = (field: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSystemSettingsChange = (field: string, value: string) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const getSettingsTitle = (tab: string): string => {
    switch (tab) {
      case "secretarias": return "Configuração de Secretarias";
      case "usuarios": return "Configuração de Usuários";
      case "sistema": return "Configuração do Sistema";
      case "perfil": return "Configuração de Perfil";
      case "seguranca": return "Configuração de Segurança";
      case "notificacoes": return "Configuração de Notificações";
      case "administracao": return "Configuração de Administração";
      case "agencias": return "Configuração de Agências";
      case "fornecedores": return "Configuração de Fornecedores";
      case "processosSEI": return "Configuração de Processos SEI";
      case "tabelaABAP": return "Tabela ABAP";
      default: return "Configurações do Sistema";
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        {/* Sidebar Menu */}
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">
            {getSettingsTitle(activeTab)}
          </h1>

          {activeTab === "secretarias" && (
            <DepartmentManager />
          )}
          
          {activeTab === "tabelaABAP" && (
            <AbapTableManager />
          )}
          
          {activeTab === "fornecedores" && (
            <SupplierList />
          )}

          {activeTab === "usuarios" && (
            <UserSettings 
              userSettings={userSettings} 
              setUserSettings={setUserSettings} 
            />
          )}

          {activeTab === "sistema" && (
            <SystemSettings 
              systemSettings={systemSettings} 
              handleSystemSettingsChange={handleSystemSettingsChange} 
            />
          )}
          
          {activeTab === "processosSEI" && (
            <SEIProcessManager />
          )}
          
          {activeTab === "perfil" && (
            <ProfileSettings />
          )}
          
          {activeTab === "notificacoes" && (
            <NotificationSettings />
          )}
          
          {activeTab === "agencias" && (
            <AgencyManager />
          )}

          {(activeTab === "seguranca" || 
            activeTab === "administracao") && (
            <PlaceholderSettings 
              title={getSettingsTitle(activeTab)} 
              description={activeTab} 
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Configuracoes;
