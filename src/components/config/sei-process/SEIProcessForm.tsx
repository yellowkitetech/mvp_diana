
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEIProcess } from '@/lib/types/seiProcess';
import { Department } from '@/lib/types/department';
import { Paperclip, X } from 'lucide-react';

// Sample campaigns data - in a real app, this would come from your API or context
const sampleCampaigns = [
  { id: 'campaign1', title: 'Campanha de Vacinação' },
  { id: 'campaign2', title: 'Campanha de Segurança Viária' },
  { id: 'campaign3', title: 'Festival Cultural' },
  { id: 'campaign4', title: 'Programa Habitacional' },
  { id: 'campaign5', title: 'Incentivo ao Esporte' }
];

interface SEIProcessFormProps {
  newProcess: Partial<SEIProcess>;
  setNewProcess: React.Dispatch<React.SetStateAction<Partial<SEIProcess>>>;
  handleAddProcess: () => void;
  handleSaveEdit: () => void;
  editingId: string | null;
  closeDialog: () => void;
  departments: Department[];
}

const SEIProcessForm: React.FC<SEIProcessFormProps> = ({
  newProcess,
  setNewProcess,
  handleAddProcess,
  handleSaveEdit,
  editingId,
  closeDialog,
  departments
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProcess(prev => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (departmentId: string, checked: boolean) => {
    let updatedDepartments = [...(newProcess.departments || [])];
    
    if (checked) {
      updatedDepartments.push(departmentId);
    } else {
      updatedDepartments = updatedDepartments.filter(id => id !== departmentId);
    }
    
    setNewProcess(prev => ({ ...prev, departments: updatedDepartments }));
  };

  const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map(file => file.name);
      setNewProcess(prev => ({ 
        ...prev, 
        attachments: [...(prev.attachments || []), ...fileNames]
      }));
    }
  };

  const handleRemoveAttachment = (fileName: string) => {
    setNewProcess(prev => ({
      ...prev,
      attachments: (prev.attachments || []).filter(name => name !== fileName)
    }));
  };

  const handleCampaignChange = (campaignId: string) => {
    setNewProcess(prev => ({ ...prev, campaignId }));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="processNumber">Número do Processo SEI</Label>
          <Input
            id="processNumber"
            name="processNumber"
            value={newProcess.processNumber || ''}
            onChange={handleChange}
            placeholder="Ex: 00123.45678/2023-01"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            value={newProcess.description || ''}
            onChange={handleChange}
            placeholder="Descreva o processo SEI"
            rows={3}
          />
        </div>
        
        {/* Campaign selector */}
        <div className="space-y-2">
          <Label htmlFor="campaign">Campanha</Label>
          <Select 
            value={newProcess.campaignId || ''} 
            onValueChange={handleCampaignChange}
          >
            <SelectTrigger id="campaign">
              <SelectValue placeholder="Selecione uma campanha (opcional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Nenhuma</SelectItem>
              {sampleCampaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>{campaign.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Secretarias</Label>
          <div className="grid grid-cols-2 gap-2">
            {departments.map((department) => (
              <div key={department.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`dept-${department.id}`}
                  checked={(newProcess.departments || []).includes(department.id)}
                  onCheckedChange={(checked) => 
                    handleDepartmentChange(department.id, checked === true)
                  }
                />
                <Label htmlFor={`dept-${department.id}`} className="text-sm font-normal">
                  {department.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Anexos</Label>
          <div className="flex items-center space-x-2">
            <Button type="button" variant="outline" size="sm" className="gap-2" asChild>
              <label>
                <Paperclip className="h-4 w-4" />
                <span>Anexar arquivo</span>
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleAddAttachment}
                />
              </label>
            </Button>
          </div>
          
          {(newProcess.attachments || []).length > 0 && (
            <div className="space-y-2 mt-2">
              <p className="text-sm font-medium">Arquivos anexados:</p>
              <div className="flex flex-wrap gap-2">
                {(newProcess.attachments || []).map((fileName, index) => (
                  <div 
                    key={`${fileName}-${index}`} 
                    className="flex items-center bg-slate-100 rounded-md px-2 py-1 text-xs"
                  >
                    <span className="mr-1">{fileName}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveAttachment(fileName)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={closeDialog}>
          Cancelar
        </Button>
        <Button 
          onClick={editingId ? handleSaveEdit : handleAddProcess}
          disabled={!newProcess.processNumber || !newProcess.description || (newProcess.departments?.length === 0)}
        >
          {editingId ? 'Salvar Alterações' : 'Adicionar Processo'}
        </Button>
      </div>
    </div>
  );
};

export default SEIProcessForm;
