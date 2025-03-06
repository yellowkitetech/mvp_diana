
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useCreativeForm, mockAbapItems } from './useCreativeForm';
import {
  TitleField,
  CampaignField,
  SEINumberField,
  CommitmentNumberField,
  AbapItemField,
  PriceFields,
  ObservationsField,
  FileUploadField
} from './FormFields';

interface Campaign {
  id: string;
  title: string;
}

interface CreateCreativeRequestFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  campaigns: Campaign[];
  seiNumbers: string[];
  commitmentNumbers: string[];
  availableCommitmentNumbers: string[];
}

const CreateCreativeRequestForm = ({
  onClose,
  onSubmit,
  campaigns,
  seiNumbers,
  commitmentNumbers,
  availableCommitmentNumbers
}: CreateCreativeRequestFormProps) => {
  const {
    title,
    setTitle,
    campaign,
    setCampaign,
    seiNumber,
    setSeiNumber,
    commitmentNumber,
    setCommitmentNumber,
    abapItem,
    itemValue,
    discountedValue,
    observations,
    setObservations,
    handleAbapItemChange,
    formatCurrency,
    handleSubmit
  } = useCreativeForm(onSubmit, onClose);
  
  return (
    <div className="space-y-4 py-4">
      <TitleField 
        title={title} 
        setTitle={setTitle} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampaignField 
          campaign={campaign} 
          setCampaign={setCampaign} 
          campaigns={campaigns} 
        />
        
        <SEINumberField 
          seiNumber={seiNumber} 
          setSeiNumber={setSeiNumber} 
          seiNumbers={seiNumbers} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CommitmentNumberField 
          commitmentNumber={commitmentNumber} 
          setCommitmentNumber={setCommitmentNumber} 
          availableCommitmentNumbers={availableCommitmentNumbers}
          commitmentNumbers={commitmentNumbers} 
        />
        
        <AbapItemField 
          abapItem={abapItem} 
          handleAbapItemChange={handleAbapItemChange} 
          abapItems={mockAbapItems}
          formatCurrency={formatCurrency} 
        />
      </div>
      
      <PriceFields 
        itemValue={itemValue} 
        discountedValue={discountedValue}
        formatCurrency={formatCurrency} 
      />
      
      <ObservationsField 
        observations={observations} 
        setObservations={setObservations} 
      />
      
      <FileUploadField />
      
      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>
          Criar Solicitação
        </Button>
      </DialogFooter>
    </div>
  );
};

export default CreateCreativeRequestForm;
