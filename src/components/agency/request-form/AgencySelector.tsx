
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building } from 'lucide-react';

interface Agency {
  id: string;
  name: string;
}

const mockAgencies: Agency[] = [
  { id: '1', name: 'Agência Criativa' },
  { id: '2', name: 'Publicidade Total' },
  { id: '3', name: 'Mídia Express' },
  { id: '4', name: 'Comunicação Integrada' },
];

interface AgencySelectorProps {
  agencyId: string;
  setAgencyId: (value: string) => void;
}

const AgencySelector = ({ agencyId, setAgencyId }: AgencySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="agency">Agência <span className="text-destructive">*</span></Label>
      <Select value={agencyId} onValueChange={setAgencyId}>
        <SelectTrigger id="agency" className="w-full">
          <SelectValue placeholder="Selecione a agência" />
        </SelectTrigger>
        <SelectContent>
          {mockAgencies.map((agency) => (
            <SelectItem key={agency.id} value={agency.id}>
              {agency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AgencySelector;
