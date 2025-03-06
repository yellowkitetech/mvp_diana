
import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  sidebarOpen: boolean;
  sidebarMinimized: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  title,
  description,
  sidebarOpen,
  sidebarMinimized
}) => {
  return (
    <main className={`flex-1 transition-all duration-300 p-4 md:p-6 ${
      sidebarOpen ? 'md:ml-64' : ''
    } ${
      sidebarMinimized ? 'md:ml-16' : 'md:ml-64'
    }`}>
      <div className="mb-6">
        <h1 className="diana-title text-2xl font-bold text-primary">
          {title}
        </h1>
        {description && (
          <p className="diana-text text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children}
    </main>
  );
};
