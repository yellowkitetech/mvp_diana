
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';

interface SupplierSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddNew: () => void;
}

export const SupplierSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  onAddNew 
}: SupplierSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, razão social ou CNPJ"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button onClick={onAddNew}>
        <Plus className="mr-2 h-4 w-4" /> Novo Fornecedor
      </Button>
    </div>
  );
};
