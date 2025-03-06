
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Save, X, Plus, FileText, Upload } from 'lucide-react';
import { InvoiceWithMeta } from '@/lib/types/invoice';
import { useToast } from '@/components/ui/use-toast';

interface InvoiceFormProps {
  invoice?: InvoiceWithMeta; // Optional for create mode
  onSubmit: (invoice: InvoiceWithMeta) => void;
  onCancel: () => void;
  suppliers?: { id: string, name: string }[];
  campaigns?: { id: string, name: string }[];
}

const InvoiceForm = ({ 
  invoice, 
  onSubmit, 
  onCancel,
  suppliers = [],
  campaigns = []
}: InvoiceFormProps) => {
  const { toast } = useToast();
  const isEditMode = !!invoice;
  
  // Default empty invoice template for create mode
  const emptyInvoice: InvoiceWithMeta = {
    id: '',
    campaignRequestId: '',
    number: '',
    supplierId: '',
    supplierName: '',
    campaignId: '',
    campaignName: '',
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd'),
    totalValue: 0,
    status: 'pending',
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seiNumber: '',
    commitmentNumber: ''
  };
  
  const [formData, setFormData] = useState<InvoiceWithMeta>(
    invoice ? { ...invoice } : emptyInvoice
  );

  useEffect(() => {
    if (invoice) {
      setFormData({ ...invoice });
    }
  }, [invoice]);
  
  const handleChange = (field: keyof InvoiceWithMeta, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    // Validation
    if (!formData.number) {
      toast({
        title: "Campo obrigatório",
        description: "O número da fatura é obrigatório.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.supplierName) {
      toast({
        title: "Campo obrigatório",
        description: "O fornecedor é obrigatório.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a random ID for new invoices
    if (!isEditMode) {
      formData.id = Math.random().toString(36).substring(2, 15);
      formData.createdAt = new Date().toISOString();
    }
    
    formData.updatedAt = new Date().toISOString();
    
    onSubmit(formData);
    
    toast({
      title: isEditMode ? "Fatura atualizada" : "Fatura criada",
      description: isEditMode 
        ? "As alterações foram salvas com sucesso." 
        : "A fatura foi criada com sucesso."
    });
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditMode ? "Editar Fatura" : "Nova Fatura"}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações da Fatura</h3>
            
            <div className="space-y-2">
              <Label htmlFor="number">Número da Fatura *</Label>
              <Input 
                id="number"
                value={formData.number}
                onChange={(e) => handleChange('number', e.target.value)}
                placeholder="Ex: NF-001234"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor *</Label>
              <Select 
                value={formData.supplierId} 
                onValueChange={(value) => {
                  const supplier = suppliers.find(s => s.id === value);
                  handleChange('supplierId', value);
                  handleChange('supplierName', supplier?.name || '');
                }}
              >
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign">Campanha</Label>
              <Select 
                value={formData.campaignId || ''} 
                onValueChange={(value) => {
                  const campaign = campaigns.find(c => c.id === value);
                  handleChange('campaignId', value);
                  handleChange('campaignName', campaign?.name || '');
                }}
              >
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Selecione uma campanha" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalValue">Valor Total (R$) *</Label>
              <Input 
                id="totalValue"
                type="number"
                step="0.01"
                value={formData.totalValue}
                onChange={(e) => handleChange('totalValue', Number(e.target.value))}
                placeholder="0,00"
              />
            </div>
          </div>
          
          {/* Datas e Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Datas e Processo</h3>
            
            <div className="space-y-2">
              <Label htmlFor="issueDate">Data de Emissão *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.issueDate ? format(new Date(formData.issueDate), 'PPP', { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.issueDate ? new Date(formData.issueDate) : undefined}
                    onSelect={(date) => handleChange('issueDate', date ? format(date, 'yyyy-MM-dd') : '')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(new Date(formData.dueDate), 'PPP', { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
                    onSelect={(date) => handleChange('dueDate', date ? format(date, 'yyyy-MM-dd') : '')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seiNumber">Número do Processo SEI</Label>
              <Input 
                id="seiNumber"
                value={formData.seiNumber || ''}
                onChange={(e) => handleChange('seiNumber', e.target.value)}
                placeholder="Ex: 12345.678910/2023-01"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="commitmentNumber">Número do Empenho</Label>
              <Input 
                id="commitmentNumber"
                value={formData.commitmentNumber || ''}
                onChange={(e) => handleChange('commitmentNumber', e.target.value)}
                placeholder="Ex: NE2023001234"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: any) => handleChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="verified">Verificada</SelectItem>
                  <SelectItem value="paid">Paga</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Notas */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Observações</h3>
          <Textarea 
            placeholder="Adicione observações ou informações adicionais sobre esta fatura"
            value={formData.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
          />
        </div>
        
        <Separator />
        
        {/* Anexos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Anexos</h3>
          
          {formData.attachments && formData.attachments.length > 0 ? (
            <div className="space-y-2">
              {formData.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center p-2 border rounded-md">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="text-sm">{attachment}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => {
                      const newAttachments = [...formData.attachments];
                      newAttachments.splice(index, 1);
                      handleChange('attachments', newAttachments);
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remover</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 border border-dashed rounded-md">
              <p className="text-muted-foreground">Nenhum anexo adicionado</p>
            </div>
          )}
          
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Anexar Arquivo
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          {isEditMode ? "Salvar Alterações" : "Criar Fatura"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvoiceForm;
