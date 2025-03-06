
import React from 'react';
import { EmpenhoTable } from '../EmpenhoTable';

interface EmpenhoTabContentProps {
  espelhoEmpenhoState: any; // Using any for brevity, should be properly typed
}

export const EmpenhoTabContent: React.FC<EmpenhoTabContentProps> = ({ espelhoEmpenhoState }) => {
  return (
    <EmpenhoTable 
      empenhos={espelhoEmpenhoState.filteredEmpenhos}
      selectedItems={espelhoEmpenhoState.selectedItems}
      handleSelectItem={espelhoEmpenhoState.handleSelectItem}
      handleSelectAll={espelhoEmpenhoState.handleSelectAll}
    />
  );
};
