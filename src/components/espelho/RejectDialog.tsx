
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from 'lucide-react';
import { Espelho } from './types';

interface RejectDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedEspelho: Espelho | null;
  feedback: string;
  setFeedback: (feedback: string) => void;
  handleRejectEspelho: () => void;
}

export const RejectDialog: React.FC<RejectDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedEspelho,
  feedback,
  setFeedback,
  handleRejectEspelho
}) => {
  if (!selectedEspelho) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reprovar Espelho</DialogTitle>
          <DialogDescription>
            Informe o motivo da reprovação do espelho #{selectedEspelho.numero}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Feedback <span className="text-red-500">*</span></label>
            <Textarea
              placeholder="Informe o motivo da reprovação..."
              className="min-h-[100px]"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            {feedback.trim() === '' && (
              <p className="text-xs text-red-500">O feedback é obrigatório para rejeição.</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleRejectEspelho}
            disabled={feedback.trim() === ''}
          >
            <X className="mr-2 h-4 w-4" /> Confirmar Reprovação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
