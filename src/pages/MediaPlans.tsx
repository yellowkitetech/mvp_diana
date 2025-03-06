
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BulkActionDialog from '@/components/mediaplan/BulkActionDialog';
import CreateMediaPlanForm from '@/components/mediaplan/CreateMediaPlanForm';
import MediaPlanHeader from '@/components/mediaplan/MediaPlanHeader';
import MediaPlanTable from '@/components/mediaplan/MediaPlanTable';
import SelectedItemsBar from '@/components/mediaplan/SelectedItemsBar';
import { useMediaPlans } from '@/hooks/useMediaPlans';

const MediaPlansPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterSeiNumber,
    setFilterSeiNumber,
    filterCommitmentNumber,
    setFilterCommitmentNumber,
    selectedItems,
    setSelectedItems,
    isBulkActionDialogOpen,
    setIsBulkActionDialogOpen,
    bulkStatus,
    setBulkStatus,
    isCreateFormOpen,
    setIsCreateFormOpen,
    filteredMediaPlans,
    seiNumbers,
    commitmentNumbers,
    resetFilters,
    handleSelectItem,
    handleSelectAll,
    handleBulkStatusChange,
    getSelectedItemCount
  } = useMediaPlans();

  // Função para abrir o formulário de criação
  const handleOpenCreateForm = () => {
    setIsCreateFormOpen(true);
  };
  
  // Função para fechar o formulário de criação
  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
  };

  return (
    <Layout title="Planos de Mídia (PIs)" description="Gerenciamento de planos de mídia para campanhas publicitárias">
      <Card>
        <CardHeader className="pb-3">
          <MediaPlanHeader
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
            onOpenCreateForm={handleOpenCreateForm}
          />
        </CardHeader>
        <CardContent>
          <SelectedItemsBar 
            selectedItemCount={getSelectedItemCount()}
            onClearSelection={() => setSelectedItems([])}
            onOpenBulkActionDialog={() => setIsBulkActionDialogOpen(true)}
          />
          <MediaPlanTable 
            mediaPlans={filteredMediaPlans}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
          />
        </CardContent>
      </Card>
      
      {/* Modal de Ação em Massa */}
      <BulkActionDialog 
        isOpen={isBulkActionDialogOpen}
        onOpenChange={setIsBulkActionDialogOpen}
        selectedItemCount={getSelectedItemCount()}
        onStatusChange={handleBulkStatusChange}
        bulkStatus={bulkStatus}
        setBulkStatus={setBulkStatus}
      />
      
      {/* Formulário de criação de plano de mídia */}
      <CreateMediaPlanForm 
        isOpen={isCreateFormOpen} 
        onClose={handleCloseCreateForm} 
      />
    </Layout>
  );
};

export default MediaPlansPage;
