
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, SlidersHorizontal } from 'lucide-react';
import { InvoiceFilters } from '@/lib/types/invoice';

interface InvoiceFiltersProps {
  filters: InvoiceFilters;
  onFilterChange: (filters: InvoiceFilters) => void;
  suppliers: string[];
  campaigns: string[];
}

const InvoiceFilterPanel = ({ 
  filters, 
  onFilterChange, 
  suppliers, 
  campaigns 
}: InvoiceFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, searchTerm: value });
  };
  
  const resetFilters = () => {
    onFilterChange({
      status: 'all',
      supplier: 'all',
      campaign: 'all',
      minValue: '',
      maxValue: '',
      searchTerm: ''
    });
    setIsFilterOpen(false);
  };
  
  return (
    <div className="flex space-x-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar faturas..."
          className="pl-8 w-[200px]"
          value={filters.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Filtros Avançados</h4>
            
            <div className="space-y-2">
              <Label htmlFor="filterStatus">Status</Label>
              <Select 
                value={filters.status} 
                onValueChange={(value) => onFilterChange({ ...filters, status: value })}
              >
                <SelectTrigger id="filterStatus">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="verified">Verificada</SelectItem>
                  <SelectItem value="paid">Paga</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filterSupplier">Fornecedor</Label>
              <Select 
                value={filters.supplier} 
                onValueChange={(value) => onFilterChange({ ...filters, supplier: value })}
              >
                <SelectTrigger id="filterSupplier">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Fornecedores</SelectItem>
                  {suppliers.map((supplier, index) => (
                    <SelectItem key={index} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filterCampaign">Campanha</Label>
              <Select 
                value={filters.campaign} 
                onValueChange={(value) => onFilterChange({ ...filters, campaign: value })}
              >
                <SelectTrigger id="filterCampaign">
                  <SelectValue placeholder="Selecione a campanha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Campanhas</SelectItem>
                  {campaigns.map((campaign, index) => (
                    <SelectItem key={index} value={campaign}>
                      {campaign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minValue">Valor Mínimo</Label>
                <Input
                  id="minValue"
                  type="number"
                  placeholder="R$"
                  value={filters.minValue}
                  onChange={(e) => onFilterChange({ ...filters, minValue: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxValue">Valor Máximo</Label>
                <Input
                  id="maxValue"
                  type="number"
                  placeholder="R$"
                  value={filters.maxValue}
                  onChange={(e) => onFilterChange({ ...filters, maxValue: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Limpar Filtros
              </Button>
              <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InvoiceFilterPanel;
