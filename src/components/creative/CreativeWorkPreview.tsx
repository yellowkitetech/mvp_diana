
import { CreativeWork } from '@/lib/types/creative';
import { ApprovalStatus } from '@/lib/types/common';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CreativeWorkPreviewProps {
  selectedWork: CreativeWork | null;
  isPreviewOpen: boolean;
  setIsPreviewOpen: (isOpen: boolean) => void;
  handleStatusChange: (id: string, status: ApprovalStatus, feedback?: string) => void;
  isSecomUser: boolean;
}

const CreativeWorkPreview = ({ 
  selectedWork, 
  isPreviewOpen, 
  setIsPreviewOpen, 
  handleStatusChange,
  isSecomUser
}: CreativeWorkPreviewProps) => {
  const { toast } = useToast();

  if (!selectedWork) return null;

  return (
    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{selectedWork.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden">
            {selectedWork.type === 'image' && (
              <img 
                src={selectedWork.fileUrl} 
                alt={selectedWork.title}
                className="w-full h-auto object-contain max-h-[400px]"
              />
            )}
            {selectedWork.type === 'video' && (
              <div className="aspect-video bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Preview de vídeo não disponível</p>
              </div>
            )}
            {selectedWork.type === 'audio' && (
              <div className="aspect-square bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Preview de áudio não disponível</p>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Descrição</h3>
            <p className="text-sm">{selectedWork.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Processo SEI</h3>
              {selectedWork.seiNumber ? (
                <div className="mt-1 flex items-center">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                    {selectedWork.seiNumber}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Não informado</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium">Número de Empenho</h3>
              {selectedWork.commitmentNumber ? (
                <div className="mt-1 flex items-center">
                  <span className="text-sm font-medium bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
                    {selectedWork.commitmentNumber}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Não informado</p>
              )}
            </div>
          </div>
          
          {selectedWork.feedback && (
            <div className="space-y-2">
              <h3 className="font-medium">Feedback</h3>
              <p className="text-sm bg-muted p-3 rounded-md">{selectedWork.feedback}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Criado em</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(selectedWork.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Última atualização</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(selectedWork.updatedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="space-x-2">
          {isSecomUser && (
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Função indisponível",
                  description: "A edição de processos e empenhos será implementada em breve.",
                });
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Editar Processos
            </Button>
          )}
          
          {isSecomUser && selectedWork.status === 'pending' && (
            <>
              <Button 
                variant="destructive" 
                onClick={() => {
                  const feedback = prompt('Informe o motivo da rejeição:');
                  if (feedback) {
                    handleStatusChange(selectedWork.id, 'rejected', feedback);
                    setIsPreviewOpen(false);
                  }
                }}
              >
                Rejeitar
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  handleStatusChange(selectedWork.id, 'approved');
                  setIsPreviewOpen(false);
                }}
              >
                Aprovar
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreativeWorkPreview;
