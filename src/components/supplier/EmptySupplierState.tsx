
import { Building } from 'lucide-react';

interface EmptySupplierStateProps {
  searchTerm: string;
}

export const EmptySupplierState = ({ searchTerm }: EmptySupplierStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Building className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Nenhum fornecedor encontrado</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-1">
        {searchTerm 
          ? `Não encontramos fornecedores com o termo "${searchTerm}".` 
          : 'Você ainda não cadastrou nenhum fornecedor.'}
      </p>
    </div>
  );
};
