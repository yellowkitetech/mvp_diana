
import React from 'react';
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MenuItem, MenuCategory } from './settingsMenuItems';

interface SettingsMenuCategoryProps {
  category: MenuCategory;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsMenuCategory: React.FC<SettingsMenuCategoryProps> = ({ 
  category, 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <div key={category.category} className="space-y-2">
      <h3 className="text-sm uppercase text-muted-foreground font-semibold tracking-wider">
        {category.category}
      </h3>
      
      <div className="space-y-1">
        {category.items.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors ${
              activeTab === item.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </button>
        ))}
      </div>
      
      <Separator className="my-4" />
    </div>
  );
};

export default SettingsMenuCategory;
