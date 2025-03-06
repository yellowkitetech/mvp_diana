
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Briefcase, 
  FileText, 
  Hash, 
  Table, 
  DollarSign, 
  Upload, 
  X, 
  FileIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';

interface Campaign {
  id: string;
  title: string;
}

// Title Field Component
export const TitleField = ({ 
  title, 
  setTitle 
}: { 
  title: string; 
  setTitle: (value: string) => void 
}) => (
  <div className="space-y-2">
    <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
    <Input 
      id="title" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      placeholder="Título da criação" 
    />
  </div>
);

// Campaign Field Component
export const CampaignField = ({ 
  campaign, 
  setCampaign, 
  campaigns 
}: { 
  campaign: string; 
  setCampaign: (value: string) => void;
  campaigns: Campaign[];
}) => (
  <div className="space-y-2">
    <Label htmlFor="campaign">
      <Briefcase className="h-4 w-4 inline mr-1" /> 
      Campanha <span className="text-red-500">*</span>
    </Label>
    <Select value={campaign} onValueChange={setCampaign}>
      <SelectTrigger id="campaign">
        <SelectValue placeholder="Selecione a campanha" />
      </SelectTrigger>
      <SelectContent>
        {campaigns.map(campaign => (
          <SelectItem key={campaign.id} value={campaign.id}>
            {campaign.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// SEI Number Field Component
export const SEINumberField = ({ 
  seiNumber, 
  setSeiNumber, 
  seiNumbers 
}: { 
  seiNumber: string; 
  setSeiNumber: (value: string) => void;
  seiNumbers: string[];
}) => (
  <div className="space-y-2">
    <Label htmlFor="seiNumber">
      <FileText className="h-4 w-4 inline mr-1" /> 
      Processo SEI
    </Label>
    <Select value={seiNumber} onValueChange={setSeiNumber}>
      <SelectTrigger id="seiNumber">
        <SelectValue placeholder="Selecione o processo SEI" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Não informar</SelectItem>
        {seiNumbers.map((number, index) => (
          <SelectItem key={index} value={number}>
            {number}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// Commitment Number Field Component
export const CommitmentNumberField = ({ 
  commitmentNumber, 
  setCommitmentNumber, 
  availableCommitmentNumbers,
  commitmentNumbers
}: { 
  commitmentNumber: string; 
  setCommitmentNumber: (value: string) => void;
  availableCommitmentNumbers: string[];
  commitmentNumbers: string[];
}) => (
  <div className="space-y-2">
    <Label htmlFor="commitmentNumber">
      <Hash className="h-4 w-4 inline mr-1" /> 
      Número do Empenho
    </Label>
    <Select value={commitmentNumber} onValueChange={setCommitmentNumber}>
      <SelectTrigger id="commitmentNumber">
        <SelectValue placeholder="Selecione o número de empenho" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Não informar</SelectItem>
        {availableCommitmentNumbers.map((number, index) => (
          <SelectItem key={`available-${index}`} value={number}>
            {number} (disponível)
          </SelectItem>
        ))}
        {commitmentNumbers.map((number, index) => (
          <SelectItem key={`used-${index}`} value={number}>
            {number} (em uso)
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// ABAP Item Field Component
interface AbapItem {
  id: string;
  name: string;
  value: number;
}

export const AbapItemField = ({ 
  abapItem, 
  handleAbapItemChange, 
  abapItems,
  formatCurrency
}: { 
  abapItem: string; 
  handleAbapItemChange: (value: string) => void;
  abapItems: AbapItem[];
  formatCurrency: (value: number) => string;
}) => (
  <div className="space-y-2">
    <Label htmlFor="abapItem">
      <Table className="h-4 w-4 inline mr-1" /> 
      Item ABAP <span className="text-red-500">*</span>
    </Label>
    <Select value={abapItem} onValueChange={handleAbapItemChange}>
      <SelectTrigger id="abapItem">
        <SelectValue placeholder="Selecione o item" />
      </SelectTrigger>
      <SelectContent>
        {abapItems.map(item => (
          <SelectItem key={item.id} value={item.id}>
            {item.name} - {formatCurrency(item.value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// Price Fields Component
export const PriceFields = ({ 
  itemValue, 
  discountedValue,
  formatCurrency
}: { 
  itemValue: number; 
  discountedValue: number;
  formatCurrency: (value: number) => string;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="itemValue">
        <DollarSign className="h-4 w-4 inline mr-1" /> 
        Valor do Item
      </Label>
      <Input 
        id="itemValue" 
        value={formatCurrency(itemValue)}
        readOnly
        className="bg-muted"
      />
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="discountedValue">
        <DollarSign className="h-4 w-4 inline mr-1" /> 
        Valor com Desconto (50%)
      </Label>
      <Input 
        id="discountedValue" 
        value={formatCurrency(discountedValue)}
        readOnly
        className="bg-muted"
      />
    </div>
  </div>
);

// Observations Field Component
export const ObservationsField = ({ 
  observations, 
  setObservations 
}: { 
  observations: string; 
  setObservations: (value: string) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor="observations">Observações</Label>
    <Textarea
      id="observations"
      value={observations}
      onChange={(e) => setObservations(e.target.value)}
      placeholder="Observações ou informações adicionais..."
      className="min-h-[100px]"
    />
  </div>
);

// File Upload Component
export const FileUploadField = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError('O arquivo deve ter no máximo 10MB');
        e.target.value = '';
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  // Remove selected file
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="file">
        <Upload className="h-4 w-4 inline mr-1" /> 
        Anexar Arquivo (máx. 10MB)
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id="file"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="flex-1"
        />
        {file && (
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {fileError && (
        <p className="text-sm text-destructive">{fileError}</p>
      )}
      {file && (
        <div className="mt-2 p-2 bg-muted rounded-md flex items-center gap-2">
          <FileIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium truncate">{file.name}</span>
          <span className="text-xs text-muted-foreground">
            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </span>
        </div>
      )}
    </div>
  );
};
