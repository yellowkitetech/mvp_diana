
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ServiceType, ServiceSubtype } from '@/lib/types';
import { serviceSubtypes } from './utils/formUtils';

interface ServiceSubtypeFieldProps {
  selectedServiceTypes: ServiceType[];
  selectedServiceSubtypes: ServiceSubtype[];
  onServiceSubtypeChange: (subtype: ServiceSubtype, checked: boolean) => void;
}

export const ServiceSubtypeField = ({ 
  selectedServiceTypes, 
  selectedServiceSubtypes, 
  onServiceSubtypeChange 
}: ServiceSubtypeFieldProps) => {
  return (
    <div>
      <Label className="text-base">Subtipo de Serviço <span className="text-red-500">*</span></Label>
      <p className="text-sm text-muted-foreground mb-3">
        Selecione os subtipos específicos de serviço
      </p>
      
      {selectedServiceTypes.includes('criacao') && (
        <div className="mb-4">
          <Label className="text-sm font-medium">Criação</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            {serviceSubtypes['criacao'].map((subtype) => (
              <div key={subtype.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`subtype-${subtype.id}`} 
                  checked={selectedServiceSubtypes.includes(subtype.id)}
                  onCheckedChange={(checked) => 
                    onServiceSubtypeChange(subtype.id, checked as boolean)
                  }
                  // Se o tipo for 'criação', o checkbox 'agencia' é obrigatório e não pode ser desmarcado
                  disabled={subtype.id === 'agencia'}
                />
                <Label 
                  htmlFor={`subtype-${subtype.id}`}
                  className="font-normal cursor-pointer"
                >
                  {subtype.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedServiceTypes.includes('veiculacao') && (
        <div className="mb-4">
          <Label className="text-sm font-medium">Veiculação</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            {serviceSubtypes['veiculacao'].map((subtype) => (
              <div key={subtype.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`subtype-${subtype.id}`} 
                  checked={selectedServiceSubtypes.includes(subtype.id)}
                  onCheckedChange={(checked) => 
                    onServiceSubtypeChange(subtype.id, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`subtype-${subtype.id}`}
                  className="font-normal cursor-pointer"
                >
                  {subtype.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedServiceTypes.includes('producao') && (
        <div className="mb-4">
          <Label className="text-sm font-medium">Produção</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            {serviceSubtypes['producao'].map((subtype) => (
              <div key={subtype.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`subtype-${subtype.id}`} 
                  checked={selectedServiceSubtypes.includes(subtype.id)}
                  onCheckedChange={(checked) => 
                    onServiceSubtypeChange(subtype.id, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`subtype-${subtype.id}`}
                  className="font-normal cursor-pointer"
                >
                  {subtype.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
