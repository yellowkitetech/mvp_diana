
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
}

interface FilterPopoverProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterCampaign: string;
  setFilterCampaign: (campaign: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  filterSeiNumber: string;
  setFilterSeiNumber: (seiNumber: string) => void;
  filterCommitmentNumber: string;
  setFilterCommitmentNumber: (commitmentNumber: string) => void;
  resetFilters: () => void;
  campaigns: Campaign[];
  seiNumbers: string[];
  commitmentNumbers: string[];
}

const FilterPopover = ({
  isFilterOpen,
  setIsFilterOpen,
  filterStatus,
  setFilterStatus,
  filterCampaign,
  setFilterCampaign,
  filterType,
  setFilterType,
  filterSeiNumber,
  setFilterSeiNumber,
  filterCommitmentNumber,
  setFilterCommitmentNumber,
  resetFilters,
  campaigns,
  seiNumbers,
  commitmentNumbers
}: FilterPopoverProps) => {
  return (
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
            <Label htmlFor="filterCampaign">Campanha</Label>
            <Select value={filterCampaign} onValueChange={setFilterCampaign}>
              <SelectTrigger id="filterCampaign">
                <SelectValue placeholder="Selecione a campanha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Campanhas</SelectItem>
                {campaigns.map(campaign => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="filterType">Tipo</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger id="filterType">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="image">Imagem</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
                <SelectItem value="audio">Áudio</SelectItem>
                <SelectItem value="document">Documento</SelectItem>
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
  );
};

export default FilterPopover;
