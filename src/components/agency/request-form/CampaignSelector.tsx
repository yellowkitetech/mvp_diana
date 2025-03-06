
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Campaign {
  id: string;
  title: string;
}

const mockCampaigns: Campaign[] = [
  { id: '1', title: 'Campanha de Vacinação' },
  { id: '2', title: 'Programa Educacional' },
  { id: '3', title: 'Festival Cultural' },
];

interface CampaignSelectorProps {
  campaignId: string;
  setCampaignId: (value: string) => void;
}

const CampaignSelector = ({ campaignId, setCampaignId }: CampaignSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="campaign">Campanha <span className="text-destructive">*</span></Label>
      <Select value={campaignId} onValueChange={setCampaignId}>
        <SelectTrigger id="campaign" className="w-full">
          <SelectValue placeholder="Selecione a campanha" />
        </SelectTrigger>
        <SelectContent>
          {mockCampaigns.map((campaign) => (
            <SelectItem key={campaign.id} value={campaign.id}>
              {campaign.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CampaignSelector;
