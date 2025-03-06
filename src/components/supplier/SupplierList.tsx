
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Supplier } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import SupplierForm from './SupplierForm';
import { EmptySupplierState } from './EmptySupplierState';
import { SupplierSearch } from './SupplierSearch';
import { SupplierTable } from './SupplierTable';
import { mockSuppliers, filterSuppliers } from './utils/supplierHelpers';

interface SupplierListProps {
  onAddSuccess?: () => void;
}

const SupplierList = ({ onAddSuccess }: SupplierListProps) => {
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | undefined>(undefined);
  
  const filteredSuppliers = filterSuppliers(suppliers, searchTerm);
  
  const handleAddNew = () => {
    setCurrentSupplier(undefined);
    setIsFormOpen(true);
  };
  
  const handleEdit = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsFormOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
      setSuppliers(suppliers.filter(s => s.id !== id));
      
      toast({
        title: "Fornecedor excluído",
        description: "O fornecedor foi excluído com sucesso."
      });
    }
  };
  
  const handleSave = (supplier: Partial<Supplier>) => {
    if (supplier.id) {
      // Atualização
      setSuppliers(suppliers.map(s => 
        s.id === supplier.id ? { ...s, ...supplier } as Supplier : s
      ));
    } else {
      // Novo fornecedor
      const newSupplier = {
        ...supplier,
        id: `${Date.now()}`, // Gerar ID temporário
        active: true,
      } as Supplier;
      
      setSuppliers([...suppliers, newSupplier]);
      
      if (onAddSuccess) {
        onAddSuccess();
      }
    }
    
    setIsFormOpen(false);
  };
  
  return (
    <div className="space-y-4">
      <SupplierSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Lista de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSuppliers.length > 0 ? (
            <SupplierTable 
              suppliers={filteredSuppliers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <EmptySupplierState searchTerm={searchTerm} />
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-5xl">
          <SupplierForm
            supplier={currentSupplier}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupplierList;
