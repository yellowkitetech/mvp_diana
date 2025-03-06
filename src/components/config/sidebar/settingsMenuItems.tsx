
import React from 'react';
import { Users, Building, Briefcase, FileText, Settings, User, Shield, Bell, ShieldCheck, Table, FolderOpen } from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export const getSettingsMenuItems = (): MenuCategory[] => {
  return [
    {
      category: "Usuário",
      items: [
        { id: "perfil", label: "Perfil", icon: <User className="h-4 w-4" /> },
        { id: "seguranca", label: "Segurança", icon: <Shield className="h-4 w-4" /> },
        { id: "notificacoes", label: "Notificações", icon: <Bell className="h-4 w-4" /> },
        { id: "administracao", label: "Administração", icon: <ShieldCheck className="h-4 w-4" /> },
      ]
    },
    {
      category: "Sistema",
      items: [
        { id: "usuarios", label: "Usuários", icon: <Users className="h-4 w-4" /> },
        { id: "agencias", label: "Agências", icon: <Building className="h-4 w-4" /> },
        { id: "fornecedores", label: "Fornecedores", icon: <Briefcase className="h-4 w-4" /> },
        { id: "processosSEI", label: "Processos SEI", icon: <FileText className="h-4 w-4" /> },
        { id: "secretarias", label: "Secretarias", icon: <FolderOpen className="h-4 w-4" /> },
        { id: "tabelaABAP", label: "Tabela ABAP", icon: <Table className="h-4 w-4" /> },
        { id: "sistema", label: "Sistema", icon: <Settings className="h-4 w-4" /> },
      ]
    }
  ];
};
