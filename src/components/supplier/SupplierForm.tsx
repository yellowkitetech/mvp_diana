
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ServiceType, ServiceSubtype, Supplier } from '@/lib/types';
import { BasicInfoFields } from './BasicInfoFields';
import { ServiceTypeField } from './ServiceTypeField';
import { ServiceSubtypeField } from './ServiceSubtypeField';
import { ContactFields } from './ContactFields';

interface SupplierFormProps {
  supplier?: Supplier;
  onSave: (supplier: Partial<Supplier>) => void;
  onCancel: () => void;
}

const SupplierForm = ({ supplier, onSave, onCancel }: SupplierFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Formulário de estado
  const [name, setName] = useState(supplier?.name || '');
  const [companyName, setCompanyName] = useState(supplier?.companyName || '');
  const [group, setGroup] = useState(supplier?.group || '');
  const [cnpj, setCnpj] = useState(supplier?.cnpj || '');
  const [email, setEmail] = useState(supplier?.email || '');
  const [whatsapp, setWhatsapp] = useState(supplier?.whatsapp || '');
  
  // Estado para tipos de serviço
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<ServiceType[]>(
    supplier?.serviceTypes || []
  );
  
  // Estado para subtipos de serviço
  const [selectedServiceSubtypes, setSelectedServiceSubtypes] = useState<ServiceSubtype[]>(
    supplier?.serviceSubtypes || []
  );
  
  const handleServiceTypeChange = (type: ServiceType, checked: boolean) => {
    if (checked) {
      // Adiciona o tipo
      setSelectedServiceTypes([...selectedServiceTypes, type]);
      
      // Se for criação, adiciona automaticamente o subtipo 'agencia'
      if (type === 'criacao' && !selectedServiceSubtypes.includes('agencia')) {
        setSelectedServiceSubtypes([...selectedServiceSubtypes, 'agencia']);
      }
    } else {
      // Remove o tipo
      setSelectedServiceTypes(selectedServiceTypes.filter(t => t !== type));
      
      // Remove todos os subtipos associados a esse tipo
      const subtypesToRemove = type === 'criacao' 
        ? ['agencia'] 
        : type === 'veiculacao' 
          ? ['radio', 'televisao', 'site', 'midia-digital', 'outdoor', 'outbus', 'placa']
          : ['camisa', 'panfleto', 'video', 'spot-radio'];
        
      setSelectedServiceSubtypes(selectedServiceSubtypes.filter(st => !subtypesToRemove.includes(st)));
    }
  };
  
  const handleServiceSubtypeChange = (subtype: ServiceSubtype, checked: boolean) => {
    if (checked) {
      setSelectedServiceSubtypes([...selectedServiceSubtypes, subtype]);
    } else {
      setSelectedServiceSubtypes(selectedServiceSubtypes.filter(st => st !== subtype));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !companyName || !cnpj || !email || !whatsapp || selectedServiceTypes.length === 0) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const supplierData: Partial<Supplier> = {
      id: supplier?.id,
      name,
      companyName,
      group,
      cnpj,
      serviceTypes: selectedServiceTypes,
      serviceSubtypes: selectedServiceSubtypes,
      email,
      whatsapp,
      active: supplier?.active !== undefined ? supplier.active : true
    };
    
    // Simular uma chamada de API
    setTimeout(() => {
      onSave(supplierData);
      setIsSubmitting(false);
      
      toast({
        title: "Fornecedor salvo",
        description: "As informações do fornecedor foram salvas com sucesso."
      });
    }, 1000);
  };
  
  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{supplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <BasicInfoFields
            name={name}
            setName={setName}
            companyName={companyName}
            setCompanyName={setCompanyName}
            group={group}
            setGroup={setGroup}
            cnpj={cnpj}
            setCnpj={setCnpj}
          />
          
          <Separator />
          
          <div className="space-y-4">
            <ServiceTypeField
              selectedServiceTypes={selectedServiceTypes}
              onServiceTypeChange={handleServiceTypeChange}
            />
            
            <ServiceSubtypeField
              selectedServiceTypes={selectedServiceTypes}
              selectedServiceSubtypes={selectedServiceSubtypes}
              onServiceSubtypeChange={handleServiceSubtypeChange}
            />
          </div>
          
          <Separator />
          
          <ContactFields
            email={email}
            setEmail={setEmail}
            whatsapp={whatsapp}
            setWhatsapp={setWhatsapp}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Fornecedor"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SupplierForm;
