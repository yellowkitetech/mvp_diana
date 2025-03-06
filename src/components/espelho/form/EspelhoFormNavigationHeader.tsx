
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EspelhoFormNavigationHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        type="button" 
        variant="ghost" 
        onClick={() => navigate('/espelho-empenho')}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>
    </div>
  );
};
