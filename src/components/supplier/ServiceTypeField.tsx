
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ServiceType } from '@/lib/types';
import { serviceTypes } from './utils/formUtils';

interface ServiceTypeFieldProps {
  selectedServiceTypes: ServiceType[];
  onServiceTypeChange: (type: ServiceType, checked: boolean) => void;
}

export const ServiceTypeField = ({ 
  selectedServiceTypes, 
  onServiceTypeChange 
}: ServiceTypeFieldProps) => {
  return (
    <div>
      <Label className="text-base">Tipo de Serviço <span className="text-red-500">*</span></Label>
      <p className="text-sm text-muted-foreground mb-3">
        Selecione os tipos de serviço prestados pelo fornecedor
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`type-${type.id}`} 
              checked={selectedServiceTypes.includes(type.id)}
              onCheckedChange={(checked) => 
                onServiceTypeChange(type.id, checked as boolean)
              }
            />
            <Label 
              htmlFor={`type-${type.id}`}
              className="font-normal cursor-pointer"
            >
              {type.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
