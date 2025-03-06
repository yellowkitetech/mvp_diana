
import React from 'react';
import { getSettingsMenuItems } from './sidebar/settingsMenuItems';
import SettingsMenuCategory from './sidebar/SettingsMenuCategory';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsSidebar = ({ activeTab, setActiveTab }: SettingsSidebarProps) => {
  const menuItems = getSettingsMenuItems();

  return (
    <div className="w-64 bg-card border-r shadow-sm p-4 space-y-6">
      <h2 className="text-xl font-bold mb-2">Configurações</h2>
      
      {menuItems.map((category) => (
        <SettingsMenuCategory 
          key={category.category}
          category={category}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

export default SettingsSidebar;
