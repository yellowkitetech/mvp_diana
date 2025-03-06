
import React from 'react';
import { FilterDialog } from '../FilterDialog';
import { BulkActionDialog } from '../BulkActionDialog';
import { ViewEspelhoDialog } from '../ViewEspelhoDialog';
import { RejectDialog } from '../RejectDialog';

interface EspelhoDialogsProps {
  espelhoEmpenhoState: any; // Using any for brevity, should be properly typed
}

export const EspelhoDialogs: React.FC<EspelhoDialogsProps> = ({ espelhoEmpenhoState }) => {
  return (
    <>
      <FilterDialog 
        isOpen={espelhoEmpenhoState.isFilterDialogOpen}
        setIsOpen={espelhoEmpenhoState.setIsFilterDialogOpen}
        filterStatus={espelhoEmpenhoState.filterStatus}
        setFilterStatus={espelhoEmpenhoState.setFilterStatus}
        filterAgencia={espelhoEmpenhoState.filterAgencia}
        setFilterAgencia={espelhoEmpenhoState.setFilterAgencia}
        filterValorMin={espelhoEmpenhoState.filterValorMin}
        setFilterValorMin={espelhoEmpenhoState.setFilterValorMin}
        filterValorMax={espelhoEmpenhoState.filterValorMax}
        setFilterValorMax={espelhoEmpenhoState.setFilterValorMax}
        agenciasUnicas={espelhoEmpenhoState.agenciasUnicas}
        activeTab={espelhoEmpenhoState.activeTab}
        handleApplyFilters={espelhoEmpenhoState.handleApplyFilters}
        clearFilters={espelhoEmpenhoState.clearFilters}
      />
      
      <BulkActionDialog 
        isOpen={espelhoEmpenhoState.isBulkActionDialogOpen}
        setIsOpen={espelhoEmpenhoState.setIsBulkActionDialogOpen}
        bulkStatus={espelhoEmpenhoState.bulkStatus}
        setBulkStatus={espelhoEmpenhoState.setBulkStatus}
        selectedItems={espelhoEmpenhoState.selectedItems}
        activeTab={espelhoEmpenhoState.activeTab}
        handleBulkStatusChange={espelhoEmpenhoState.handleBulkStatusChange}
      />
      
      <ViewEspelhoDialog 
        isOpen={espelhoEmpenhoState.isViewDialogOpen}
        onClose={() => espelhoEmpenhoState.setIsViewDialogOpen(false)}
        espelho={espelhoEmpenhoState.selectedEspelho}
        onApprove={espelhoEmpenhoState.handleApproveEspelho}
        onReject={espelhoEmpenhoState.handleOpenRejectDialog}
      />
      
      <RejectDialog 
        isOpen={espelhoEmpenhoState.isRejectDialogOpen}
        setIsOpen={espelhoEmpenhoState.setIsRejectDialogOpen}
        selectedEspelho={espelhoEmpenhoState.selectedEspelho}
        feedback={espelhoEmpenhoState.feedback}
        setFeedback={espelhoEmpenhoState.setFeedback}
        handleRejectEspelho={espelhoEmpenhoState.handleRejectEspelho}
      />
    </>
  );
};
