
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Department } from '@/lib/types/department';

const mockDepartments: Department[] = [
  { id: '1', name: 'Secretaria de Saúde', description: 'Responsável pela saúde pública', contactEmail: 'saude@gov.br', contactPhone: '(61) 3333-4444', active: true },
  { id: '2', name: 'Secretaria de Educação', description: 'Responsável pela educação pública', contactEmail: 'educacao@gov.br', contactPhone: '(61) 3333-5555', active: true },
  { id: '3', name: 'Secretaria de Transporte', description: 'Responsável pelo transporte público', contactEmail: 'transporte@gov.br', contactPhone: '(61) 3333-6666', active: true },
  { id: '4', name: 'Secretaria de Cultura', description: 'Responsável pela cultura', contactEmail: 'cultura@gov.br', contactPhone: '(61) 3333-7777', active: true },
];

interface DepartmentSelectorProps {
  selectedDepartments: string[];
  onDepartmentChange: (departmentId: string, checked: boolean) => void;
}

const DepartmentSelector = ({ selectedDepartments, onDepartmentChange }: DepartmentSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Secretarias <span className="text-destructive">*</span></Label>
      <div className="border rounded-md p-4 space-y-3">
        <div className="text-sm text-muted-foreground mb-2">Selecione uma ou mais secretarias</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
          {mockDepartments.map((department) => (
            <div key={department.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`department-${department.id}`} 
                checked={selectedDepartments.includes(department.id)}
                onCheckedChange={(checked) => 
                  onDepartmentChange(department.id, checked === true)
                }
              />
              <Label 
                htmlFor={`department-${department.id}`}
                className="font-normal cursor-pointer"
              >
                {department.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentSelector;
