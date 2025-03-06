import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, PlusCircle } from "lucide-react";
import FilterPopover from "./FilterPopover";
import { CreateCreativeRequestForm } from "./form";

interface Campaign {
  id: string;
  title: string;
}

interface CreativePageHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  isRequestDialogOpen: boolean;
  setIsRequestDialogOpen: (open: boolean) => void;
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
  handleSubmitRequest: (formData: any) => void;
  campaigns: Campaign[];
  seiNumbers: string[];
  commitmentNumbers: string[];
  availableCommitmentNumbers: string[];
  isSecomUser: boolean;
}

const CreativePageHeader = ({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  setIsFilterOpen,
  isRequestDialogOpen,
  setIsRequestDialogOpen,
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
  handleSubmitRequest,
  campaigns,
  seiNumbers,
  commitmentNumbers,
  availableCommitmentNumbers,
  isSecomUser
}: CreativePageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Materiais Criativos</h2>
      <div className="flex gap-2">
        {/* Barra de busca */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar materiais..."
            className="w-[200px] pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filtros avançados */}
        <FilterPopover
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterCampaign={filterCampaign}
          setFilterCampaign={setFilterCampaign}
          filterType={filterType}
          setFilterType={setFilterType}
          filterSeiNumber={filterSeiNumber}
          setFilterSeiNumber={setFilterSeiNumber}
          filterCommitmentNumber={filterCommitmentNumber}
          setFilterCommitmentNumber={setFilterCommitmentNumber}
          resetFilters={resetFilters}
          campaigns={campaigns}
          seiNumbers={seiNumbers}
          commitmentNumbers={commitmentNumbers}
        />
        
        {isSecomUser && (
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Criação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nova Solicitação de Criação</DialogTitle>
              </DialogHeader>
              
              <CreateCreativeRequestForm 
                onClose={() => setIsRequestDialogOpen(false)}
                onSubmit={handleSubmitRequest}
                campaigns={campaigns}
                seiNumbers={seiNumbers}
                commitmentNumbers={commitmentNumbers}
                availableCommitmentNumbers={availableCommitmentNumbers}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CreativePageHeader;
