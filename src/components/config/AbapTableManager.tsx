
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbapTableSearch } from './abap-table/AbapTableSearch';
import { AbapTableList } from './abap-table/AbapTableList';
import { useAbapTable } from './abap-table/useAbapTable';
import { AbapItemDialog } from './abap-table/AbapItemDialog';
import { DeleteConfirmDialog } from './abap-table/DeleteConfirmDialog';

const AbapTableManager: React.FC = () => {
  const {
    items,
    filteredItems,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    types,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    newItem,
    setNewItem,
    currentItem,
    setCurrentItem,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    formatCurrency
  } = useAbapTable();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tabela ABAP</CardTitle>
          <CardDescription>
            Gerencie os itens da tabela ABAP para precificação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AbapTableSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            types={types}
            setIsAddDialogOpen={setIsAddDialogOpen}
          />
          
          <AbapTableList 
            filteredItems={filteredItems}
            formatCurrency={formatCurrency}
            setCurrentItem={setCurrentItem}
            setIsEditDialogOpen={setIsEditDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          />
        </CardContent>
      </Card>
      
      {/* Add Dialog */}
      <AbapItemDialog 
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        title="Adicionar Novo Item"
        description="Preencha os detalhes para adicionar um novo item à tabela."
        item={newItem}
        setItem={setNewItem as React.Dispatch<React.SetStateAction<any>>}
        handleAction={handleAddItem}
        actionButtonText="Adicionar"
        types={types}
      />
      
      {/* Edit Dialog */}
      <AbapItemDialog 
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        title="Editar Item"
        description="Edite os detalhes do item selecionado."
        item={currentItem}
        setItem={setCurrentItem as React.Dispatch<React.SetStateAction<any>>}
        handleAction={handleUpdateItem}
        actionButtonText="Salvar Alterações"
        types={types}
      />
      
      {/* Delete Dialog */}
      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        currentItem={currentItem}
        handleDeleteItem={handleDeleteItem}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default AbapTableManager;
