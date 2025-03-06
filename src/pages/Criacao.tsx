
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useCreativeWorksFilter } from '@/hooks/useCreativeWorksFilter';
import { useCreativePageState, mockCampaigns } from '@/hooks/useCreativePageState';

// Import components
import CreativeWorkTable from '@/components/creative/CreativeWorkTable';
import EmptyCreativeState from '@/components/creative/EmptyCreativeState';
import CreativeWorkPreview from '@/components/creative/CreativeWorkPreview';
import CreativePageHeader from '@/components/creative/CreativePageHeader';
import SelectedItemsBar from '@/components/creative/SelectedItemsBar';

const CriacaoPage = () => {
  const { user } = useAuth();
  const isSecomUser = user?.role === 'admin' || user?.role === 'analyst';
  
  const {
    creativeWorks,
    filterStatus,
    setFilterStatus,
    selectedWork,
    setSelectedWork,
    isPreviewOpen,
    setIsPreviewOpen,
    isRequestDialogOpen,
    setIsRequestDialogOpen,
    isFilterOpen,
    setIsFilterOpen,
    searchTerm,
    setSearchTerm,
    selectedItems,
    setSelectedItems,
    bulkActionOpen,
    setBulkActionOpen,
    bulkStatus,
    setBulkStatus,
    filterCampaign,
    setFilterCampaign,
    filterType,
    setFilterType,
    filterSeiNumber,
    setFilterSeiNumber,
    filterCommitmentNumber,
    setFilterCommitmentNumber,
    seiNumbers,
    commitmentNumbers,
    availableCommitmentNumbers,
    handleStatusChange,
    handleBulkStatusChange,
    handleSubmitRequest,
    toggleSelectAll,
    toggleSelectItem,
    resetFilters
  } = useCreativePageState(isSecomUser);
  
  // Use the filter hook
  const filteredWorks = useCreativeWorksFilter({
    creativeWorks,
    filterStatus,
    filterCampaign,
    filterType,
    filterSeiNumber,
    filterCommitmentNumber,
    searchTerm
  });
  
  return (
    <Layout title="Criação" description="Visualize e aprove materiais criativos para campanhas">
      <div className="space-y-6">
        <CreativePageHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          isRequestDialogOpen={isRequestDialogOpen}
          setIsRequestDialogOpen={setIsRequestDialogOpen}
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
          handleSubmitRequest={handleSubmitRequest}
          campaigns={mockCampaigns}
          seiNumbers={seiNumbers}
          commitmentNumbers={commitmentNumbers}
          availableCommitmentNumbers={availableCommitmentNumbers}
          isSecomUser={isSecomUser}
        />
        
        <SelectedItemsBar
          selectedItems={selectedItems}
          bulkActionOpen={bulkActionOpen}
          setBulkActionOpen={setBulkActionOpen}
          bulkStatus={bulkStatus}
          setBulkStatus={setBulkStatus}
          handleBulkStatusChange={handleBulkStatusChange}
          clearSelection={() => setSelectedItems([])}
        />
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Materiais para Avaliação</CardTitle>
            <CardDescription>
              Visualize e aprove ou rejeite materiais criativos enviados pelas agências
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredWorks.length > 0 ? (
              <CreativeWorkTable
                filteredWorks={filteredWorks}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
                toggleSelectAll={toggleSelectAll}
                handleStatusChange={handleStatusChange}
                setSelectedWork={setSelectedWork}
                setIsPreviewOpen={setIsPreviewOpen}
                isSecomUser={isSecomUser}
              />
            ) : (
              <EmptyCreativeState />
            )}
          </CardContent>
        </Card>
        
        <CreativeWorkPreview
          selectedWork={selectedWork}
          isPreviewOpen={isPreviewOpen}
          setIsPreviewOpen={setIsPreviewOpen}
          handleStatusChange={handleStatusChange}
          isSecomUser={isSecomUser}
        />
      </div>
    </Layout>
  );
};

export default CriacaoPage;
