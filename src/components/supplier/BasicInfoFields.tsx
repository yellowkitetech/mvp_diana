
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCNPJ } from './utils/formUtils';

interface BasicInfoFieldsProps {
  name: string;
  setName: (value: string) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  group: string;
  setGroup: (value: string) => void;
  cnpj: string;
  setCnpj: (value: string) => void;
}

export const BasicInfoFields = ({
  name,
  setName,
  companyName,
  setCompanyName,
  group,
  setGroup,
  cnpj,
  setCnpj
}: BasicInfoFieldsProps) => {
  
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    
    if (rawValue.length <= 14) {
      setCnpj(formatCNPJ(rawValue));
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nome comercial" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Razão Social <span className="text-red-500">*</span></Label>
          <Input 
            id="companyName" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)} 
            placeholder="Razão social completa" 
            required 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="group">Grupo</Label>
          <Input 
            id="group" 
            value={group} 
            onChange={(e) => setGroup(e.target.value)} 
            placeholder="Grupo empresarial" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ <span className="text-red-500">*</span></Label>
          <Input 
            id="cnpj" 
            value={cnpj} 
            onChange={handleCNPJChange} 
            placeholder="00.000.000/0000-00" 
            required 
          />
        </div>
      </div>
    </>
  );
};
