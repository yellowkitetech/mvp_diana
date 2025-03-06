
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type RequestType = 'espelho' | 'criacao' | 'midia' | 'producao';

interface RequestTypeSelectorProps {
  requestType: RequestType | '';
  setRequestType: (value: RequestType) => void;
}

export const requestTypes = [
  { value: 'espelho', label: 'Espelho de Empenho' },
  { value: 'criacao', label: 'Criação' },
  { value: 'midia', label: 'Plano de Mídia' },
  { value: 'producao', label: 'Plano de Produção' },
];

const RequestTypeSelector = ({ requestType, setRequestType }: RequestTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="requestType">Tipo de Solicitação <span className="text-destructive">*</span></Label>
      <Select value={requestType} onValueChange={(value) => setRequestType(value as RequestType)}>
        <SelectTrigger id="requestType" className="w-full">
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          {requestTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RequestTypeSelector;
