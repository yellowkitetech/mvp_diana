
import { FileText } from 'lucide-react';

const EmptyCreativeState = () => {
  return (
    <div className="py-12 text-center">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">Nenhum material encontrado</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Não há materiais criativos com os filtros selecionados.
      </p>
    </div>
  );
};

export default EmptyCreativeState;
