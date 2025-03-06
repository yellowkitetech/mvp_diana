
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MediaPlanFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  filterSeiNumber: string;
  setFilterSeiNumber: (value: string) => void;
  filterCommitmentNumber: string;
  setFilterCommitmentNumber: (value: string) => void;
  seiNumbers: string[];
  commitmentNumbers: string[];
  resetFilters: () => void;
}

const MediaPlanFilters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterSeiNumber,
  setFilterSeiNumber,
  filterCommitmentNumber,
  setFilterCommitmentNumber,
  seiNumbers,
  commitmentNumbers,
  resetFilters
}: MediaPlanFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex space-x-2">
      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar planos..."
          className="pl-8 w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Filtros Avançados</h4>
            
            <div className="space-y-2">
              <Label htmlFor="filterStatus">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="filterStatus">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="rejected">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filterSeiNumber">Processo SEI</Label>
              <Select value={filterSeiNumber} onValueChange={setFilterSeiNumber}>
                <SelectTrigger id="filterSeiNumber">
                  <SelectValue placeholder="Filtrar por Processo SEI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="filled">Com Processo SEI</SelectItem>
                  <SelectItem value="empty">Sem Processo SEI</SelectItem>
                  {seiNumbers.map((numero, index) => (
                    <SelectItem key={index} value={numero}>
                      {numero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filterCommitmentNumber">Nº de Empenho</Label>
              <Select value={filterCommitmentNumber} onValueChange={setFilterCommitmentNumber}>
                <SelectTrigger id="filterCommitmentNumber">
                  <SelectValue placeholder="Filtrar por Nº de Empenho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="filled">Com Nº de Empenho</SelectItem>
                  <SelectItem value="empty">Sem Nº de Empenho</SelectItem>
                  {commitmentNumbers.map((numero, index) => (
                    <SelectItem key={index} value={numero}>
                      {numero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default MediaPlanFilters;
