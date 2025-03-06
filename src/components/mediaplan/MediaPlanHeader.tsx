
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import MediaPlanFilters from './MediaPlanFilters';

interface MediaPlanHeaderProps {
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
  onOpenCreateForm: () => void;
}

const MediaPlanHeader = ({
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
  resetFilters,
  onOpenCreateForm
}: MediaPlanHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Planos de Mídia</h2>
      <div className="flex space-x-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <MediaPlanFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterSeiNumber={filterSeiNumber}
            setFilterSeiNumber={setFilterSeiNumber}
            filterCommitmentNumber={filterCommitmentNumber}
            setFilterCommitmentNumber={setFilterCommitmentNumber}
            seiNumbers={seiNumbers}
            commitmentNumbers={commitmentNumbers}
            resetFilters={resetFilters}
          />
        </div>
        
        <Button onClick={onOpenCreateForm}>
          <Plus className="mr-1 h-4 w-4" /> Novo Plano
        </Button>
      </div>
    </div>
  );
};

export default MediaPlanHeader;
