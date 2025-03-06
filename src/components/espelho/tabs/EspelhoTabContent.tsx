
import React from 'react';
import { EspelhoTable } from '../EspelhoTable';

interface EspelhoTabContentProps {
  espelhoEmpenhoState: any; // Using any for brevity, should be properly typed
}

export const EspelhoTabContent: React.FC<EspelhoTabContentProps> = ({ espelhoEmpenhoState }) => {
  return (
    <EspelhoTable 
      espelhos={espelhoEmpenhoState.filteredEspelhos}
      selectedItems={espelhoEmpenhoState.selectedItems}
      handleSelectItem={espelhoEmpenhoState.handleSelectItem}
      handleSelectAll={espelhoEmpenhoState.handleSelectAll}
      handleViewEspelho={espelhoEmpenhoState.handleViewEspelho}
      handleApproveEspelho={espelhoEmpenhoState.handleApproveEspelho}
      handleOpenRejectDialog={espelhoEmpenhoState.handleOpenRejectDialog}
    />
  );
};
