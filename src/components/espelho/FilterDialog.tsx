
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterAgencia: string;
  setFilterAgencia: (agencia: string) => void;
  filterValorMin: string;
  setFilterValorMin: (valor: string) => void;
  filterValorMax: string;
  setFilterValorMax: (valor: string) => void;
  agenciasUnicas: string[];
  activeTab: string;
  handleApplyFilters: () => void;
  clearFilters: () => void;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  setIsOpen,
  filterStatus,
  setFilterStatus,
  filterAgencia,
  setFilterAgencia,
  filterValorMin,
  setFilterValorMin,
  filterValorMax,
  setFilterValorMax,
  agenciasUnicas,
  activeTab,
  handleApplyFilters,
  clearFilters
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar Resultados</DialogTitle>
          <DialogDescription>
            Selecione os critérios de filtro abaixo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="draft">Em Elaboração</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="rejected">Reprovado</SelectItem>
                <SelectItem value="committed">Empenhado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {activeTab === 'espelhos' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Agência</label>
              <Select value={filterAgencia} onValueChange={setFilterAgencia}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as agências" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as agências</SelectItem>
                  {agenciasUnicas.map((agencia, index) => (
                    <SelectItem key={index} value={agencia}>{agencia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor Mínimo (R$)</label>
              <Input 
                type="number" 
                placeholder="0" 
                value={filterValorMin}
                onChange={(e) => setFilterValorMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor Máximo (R$)</label>
              <Input 
                type="number" 
                placeholder="999999" 
                value={filterValorMax}
                onChange={(e) => setFilterValorMax(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
          <Button onClick={handleApplyFilters}>
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
