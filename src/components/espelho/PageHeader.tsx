
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PageHeaderProps {
  title?: string;
  // Add these props to fix the build error
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  setIsFilterDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title = 'Espelho e Empenho',
  searchTerm = '',
  setSearchTerm,
  setIsFilterDialogOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between items-start sm:items-center pb-4 border-b">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerenciamento de pedidos de espelho e empenho
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
        <div className="relative w-full sm:w-[300px]">
          <Input
            type="search"
            placeholder="Buscar espelhos..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm?.(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsFilterDialogOpen?.(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          
          <Button onClick={() => navigate('/novo-espelho')}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Espelho
          </Button>
        </div>
      </div>
    </div>
  );
};
