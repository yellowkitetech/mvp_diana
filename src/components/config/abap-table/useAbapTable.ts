
import { useState, useEffect } from 'react';
import { AbapTableItem } from "@/lib/types";
import { sampleAbapTableItems, addAbapTableItem, updateAbapTableItem, deleteAbapTableItem, getUniqueAbapTableTypes } from "@/lib/data";
import { toast } from "sonner";

export const useAbapTable = () => {
  const [items, setItems] = useState<AbapTableItem[]>(sampleAbapTableItems);
  const [filteredItems, setFilteredItems] = useState<AbapTableItem[]>(sampleAbapTableItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [types, setTypes] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [newItem, setNewItem] = useState<Omit<AbapTableItem, 'id'>>({
    number: items.length + 1,
    name: "",
    type: "",
    description: "",
    value: 0
  });
  
  const [currentItem, setCurrentItem] = useState<AbapTableItem | null>(null);
  
  useEffect(() => {
    // Get unique types
    setTypes(getUniqueAbapTableTypes());
    
    // Apply filters
    filterItems();
  }, [searchQuery, selectedType, items]);
  
  const filterItems = () => {
    let filtered = [...items];
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.number.toString().includes(query)
      );
    }
    
    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    
    setFilteredItems(filtered);
  };
  
  const handleAddItem = () => {
    try {
      const item = addAbapTableItem(newItem);
      setItems([...sampleAbapTableItems]);
      setIsAddDialogOpen(false);
      setNewItem({
        number: items.length + 2,
        name: "",
        type: "",
        description: "",
        value: 0
      });
      toast.success("Item adicionado com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar item!");
      console.error(error);
    }
  };
  
  const handleUpdateItem = () => {
    try {
      if (currentItem) {
        updateAbapTableItem(currentItem);
        setItems([...sampleAbapTableItems]);
        setIsEditDialogOpen(false);
        setCurrentItem(null);
        toast.success("Item atualizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar item!");
      console.error(error);
    }
  };
  
  const handleDeleteItem = () => {
    try {
      if (currentItem) {
        deleteAbapTableItem(currentItem.id);
        setItems([...sampleAbapTableItems]);
        setIsDeleteDialogOpen(false);
        setCurrentItem(null);
        toast.success("Item excluído com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao excluir item!");
      console.error(error);
    }
  };
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return {
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
  };
};
