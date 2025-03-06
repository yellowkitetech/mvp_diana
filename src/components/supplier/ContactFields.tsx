
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatWhatsApp } from './utils/formUtils';

interface ContactFieldsProps {
  email: string;
  setEmail: (value: string) => void;
  whatsapp: string;
  setWhatsapp: (value: string) => void;
}

export const ContactFields = ({
  email,
  setEmail,
  whatsapp,
  setWhatsapp
}: ContactFieldsProps) => {
  
  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    
    if (rawValue.length <= 11) {
      setWhatsapp(formatWhatsApp(rawValue));
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail <span className="text-red-500">*</span></Label>
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="contato@fornecedor.com.br" 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp <span className="text-red-500">*</span></Label>
        <Input 
          id="whatsapp" 
          value={whatsapp} 
          onChange={handleWhatsAppChange} 
          placeholder="(00) 00000-0000" 
          required 
        />
      </div>
    </div>
  );
};
