
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  CalendarIcon, 
  Briefcase, 
  FileText, 
  Hash, 
  Truck, 
  Package, 
  DollarSign, 
  Upload, 
  MessageSquare 
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ServiceSubtype } from '@/lib/types/supplier';

// Dados simulados para testes
const mockCampaigns = [
  { id: 'camp1', title: 'Campanha de Vacinação 2023' },
  { id: 'camp2', title: 'Campanha de Segurança no Trânsito' },
  { id: 'camp3', title: 'Campanha de Reciclagem' },
];

const mockSEIProcesses = [
  { id: 'sei1', number: '00080-00123456/2023-01', description: 'Processo de Mídia - Vacinação' },
  { id: 'sei2', number: '00080-00654321/2023-02', description: 'Processo de Mídia - Trânsito' },
];

const mockCommitmentNumbers = [
  { id: 'comm1', number: '2023NE000123' },
  { id: 'comm2', number: '2023NE000456' },
];

// Fornecedores filtrados apenas para tipo "veiculacao"
const mockSuppliers = [
  { 
    id: 'sup1', 
    name: 'TV Centro-Oeste', 
    serviceTypes: ['veiculacao'], 
    serviceSubtypes: ['televisao'] 
  },
  { 
    id: 'sup2', 
    name: 'Rádio Capital', 
    serviceTypes: ['veiculacao'], 
    serviceSubtypes: ['radio'] 
  },
  { 
    id: 'sup3', 
    name: 'Outdoor Brasília', 
    serviceTypes: ['veiculacao'], 
    serviceSubtypes: ['outdoor'] 
  },
  { 
    id: 'sup4', 
    name: 'Portal de Notícias DF', 
    serviceTypes: ['veiculacao'], 
    serviceSubtypes: ['site', 'midia-digital'] 
  },
];

// Schema de validação com Zod
const formSchema = z.object({
  campaignId: z.string({ required_error: 'Selecione uma campanha' }),
  seiProcessId: z.string({ required_error: 'Selecione um processo SEI' }),
  commitmentNumberId: z.string({ required_error: 'Selecione um número de empenho' }),
  supplierId: z.string({ required_error: 'Selecione um fornecedor' }),
  serviceSubtype: z.string({ required_error: 'Selecione um tipo de serviço' }),
  startDate: z.date({ required_error: 'Selecione a data de início' }),
  endDate: z.date({ required_error: 'Selecione a data de término' }),
  netValue: z.string().refine(val => !isNaN(Number(val)), {
    message: 'Informe um valor numérico',
  }),
  grossValue: z.string().refine(val => !isNaN(Number(val)), {
    message: 'Informe um valor numérico',
  }),
  observations: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CreateMediaPlanFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMediaPlanForm = ({ isOpen, onClose }: CreateMediaPlanFormProps) => {
  const { toast } = useToast();
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [availableSubtypes, setAvailableSubtypes] = useState<ServiceSubtype[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      observations: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form;
  
  // Watch form fields
  const supplierId = watch('supplierId');
  const netValue = watch('netValue');
  const grossValue = watch('grossValue');

  // Handle supplier change
  const handleSupplierChange = (id: string) => {
    setValue('supplierId', id);
    setValue('serviceSubtype', ''); // Reset service subtype when supplier changes
    
    const supplier = mockSuppliers.find(s => s.id === id);
    if (supplier) {
      setSelectedSupplier(id);
      setAvailableSubtypes(supplier.serviceSubtypes as ServiceSubtype[]);
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const onSubmit = (data: FormData) => {
    // Incluir o arquivo no objeto de dados
    const formData = {
      ...data,
      file: file,
      netValue: Number(data.netValue),
      grossValue: Number(data.grossValue),
    };
    
    console.log('Form submitted:', formData);
    
    toast({
      title: "Plano de mídia criado",
      description: "O plano de mídia foi criado com sucesso!",
    });
    
    // Reset form and close dialog
    reset();
    setFile(null);
    setSelectedSupplier(null);
    setAvailableSubtypes([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Plano de Mídia</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um novo plano de mídia.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campanha */}
            <div className="space-y-2">
              <Label htmlFor="campaignId">
                <Briefcase className="h-4 w-4 inline mr-1" /> Campanha
              </Label>
              <Select 
                onValueChange={(value) => setValue('campaignId', value)} 
                defaultValue={form.watch('campaignId')}
              >
                <SelectTrigger id="campaignId" className={errors.campaignId ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione uma campanha" />
                </SelectTrigger>
                <SelectContent>
                  {mockCampaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.campaignId && (
                <p className="text-red-500 text-xs">{errors.campaignId.message}</p>
              )}
            </div>

            {/* Processo SEI */}
            <div className="space-y-2">
              <Label htmlFor="seiProcessId">
                <FileText className="h-4 w-4 inline mr-1" /> Processo SEI
              </Label>
              <Select 
                onValueChange={(value) => setValue('seiProcessId', value)}
                defaultValue={form.watch('seiProcessId')}
              >
                <SelectTrigger id="seiProcessId" className={errors.seiProcessId ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione um processo SEI" />
                </SelectTrigger>
                <SelectContent>
                  {mockSEIProcesses.map((process) => (
                    <SelectItem key={process.id} value={process.id}>
                      {process.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.seiProcessId && (
                <p className="text-red-500 text-xs">{errors.seiProcessId.message}</p>
              )}
            </div>

            {/* Número do Empenho */}
            <div className="space-y-2">
              <Label htmlFor="commitmentNumberId">
                <Hash className="h-4 w-4 inline mr-1" /> Número do Empenho
              </Label>
              <Select 
                onValueChange={(value) => setValue('commitmentNumberId', value)}
                defaultValue={form.watch('commitmentNumberId')}
              >
                <SelectTrigger id="commitmentNumberId" className={errors.commitmentNumberId ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione um número de empenho" />
                </SelectTrigger>
                <SelectContent>
                  {mockCommitmentNumbers.map((commitment) => (
                    <SelectItem key={commitment.id} value={commitment.id}>
                      {commitment.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.commitmentNumberId && (
                <p className="text-red-500 text-xs">{errors.commitmentNumberId.message}</p>
              )}
            </div>

            {/* Fornecedor */}
            <div className="space-y-2">
              <Label htmlFor="supplierId">
                <Truck className="h-4 w-4 inline mr-1" /> Fornecedor
              </Label>
              <Select 
                onValueChange={handleSupplierChange}
                defaultValue={form.watch('supplierId')}
              >
                <SelectTrigger id="supplierId" className={errors.supplierId ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {mockSuppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.supplierId && (
                <p className="text-red-500 text-xs">{errors.supplierId.message}</p>
              )}
            </div>

            {/* Tipo (Serviço Subtipo) - Aparece apenas quando um fornecedor é selecionado */}
            {selectedSupplier && (
              <div className="space-y-2">
                <Label htmlFor="serviceSubtype">
                  <Package className="h-4 w-4 inline mr-1" /> Tipo
                </Label>
                <Select 
                  onValueChange={(value) => setValue('serviceSubtype', value)}
                  defaultValue={form.watch('serviceSubtype')}
                >
                  <SelectTrigger id="serviceSubtype" className={errors.serviceSubtype ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubtypes.map((subtype) => (
                      <SelectItem key={subtype} value={subtype}>
                        {(() => {
                          switch(subtype) {
                            case 'radio': return 'Rádio';
                            case 'televisao': return 'Televisão';
                            case 'site': return 'Site';
                            case 'midia-digital': return 'Mídia Digital';
                            case 'outdoor': return 'Outdoor';
                            case 'outbus': return 'Outbus';
                            case 'placa': return 'Placa';
                            default: return subtype;
                          }
                        })()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceSubtype && (
                  <p className="text-red-500 text-xs">{errors.serviceSubtype.message}</p>
                )}
              </div>
            )}

            {/* Data de início */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("startDate") && "text-muted-foreground",
                      errors.startDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("startDate") ? (
                      format(form.watch("startDate"), "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione a data de início</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("startDate")}
                    onSelect={(date) => date && setValue("startDate", date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <p className="text-red-500 text-xs">{errors.startDate.message}</p>
              )}
            </div>

            {/* Data de término */}
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de término</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("endDate") && "text-muted-foreground",
                      errors.endDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("endDate") ? (
                      format(form.watch("endDate"), "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione a data de término</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("endDate")}
                    onSelect={(date) => date && setValue("endDate", date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-red-500 text-xs">{errors.endDate.message}</p>
              )}
            </div>

            {/* Valor líquido */}
            <div className="space-y-2">
              <Label htmlFor="netValue">
                <DollarSign className="h-4 w-4 inline mr-1" /> Valor líquido (R$)
              </Label>
              <Input
                id="netValue"
                placeholder="0,00"
                {...register('netValue')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  const formattedValue = value ? (Number(value) / 100).toFixed(2) : '';
                  setValue('netValue', formattedValue);
                }}
                className={errors.netValue ? "border-red-500" : ""}
              />
              {errors.netValue && (
                <p className="text-red-500 text-xs">{errors.netValue.message}</p>
              )}
            </div>

            {/* Valor bruto */}
            <div className="space-y-2">
              <Label htmlFor="grossValue">
                <DollarSign className="h-4 w-4 inline mr-1" /> Valor bruto (R$)
              </Label>
              <Input
                id="grossValue"
                placeholder="0,00"
                {...register('grossValue')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  const formattedValue = value ? (Number(value) / 100).toFixed(2) : '';
                  setValue('grossValue', formattedValue);
                }}
                className={errors.grossValue ? "border-red-500" : ""}
              />
              {errors.grossValue && (
                <p className="text-red-500 text-xs">{errors.grossValue.message}</p>
              )}
            </div>
          </div>

          {/* Anexo de arquivo */}
          <div className="space-y-2">
            <Label htmlFor="file">
              <Upload className="h-4 w-4 inline mr-1" /> Anexo de arquivo
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="flex-1"
              />
              {file && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  Remover
                </Button>
              )}
            </div>
            {file && (
              <p className="text-sm text-muted-foreground">
                Arquivo selecionado: {file.name}
              </p>
            )}
          </div>

          {/* Observação */}
          <div className="space-y-2">
            <Label htmlFor="observations">
              <MessageSquare className="h-4 w-4 inline mr-1" /> Observação
            </Label>
            <Textarea
              id="observations"
              placeholder="Informações adicionais sobre o plano de mídia..."
              {...register('observations')}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Plano</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMediaPlanForm;
