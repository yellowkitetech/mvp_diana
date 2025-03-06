
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { useToast } from '@/components/ui/use-toast';
import { Send, Paperclip, X } from 'lucide-react';
import { Process } from '@/lib/types';
import { sampleProcesses } from '@/lib/data';

interface NewCommunicationFormProps {
  selectedProcess?: Process;
  onClose: () => void;
}

const NewCommunicationForm = ({ selectedProcess, onClose }: NewCommunicationFormProps) => {
  const { toast } = useToast();
  const [processId, setProcessId] = useState<string>(selectedProcess?.id || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!processId || !subject || !message || !recipient) {
      toast({
        title: "Campos incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Comunicação enviada",
        description: "Sua mensagem foi enviada com sucesso.",
      });
      
      // Reset form
      setSubject('');
      setMessage('');
      setRecipient('');
      setAttachments([]);
      setIsLoading(false);
      
      onClose();
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Nova Comunicação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="process">Processo</Label>
              <Select 
                value={processId} 
                onValueChange={setProcessId}
                disabled={!!selectedProcess}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um processo" />
                </SelectTrigger>
                <SelectContent>
                  {sampleProcesses.map((process) => (
                    <SelectItem key={process.id} value={process.id}>
                      {process.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">Destinatário</Label>
              <Input 
                id="recipient" 
                value={recipient} 
                onChange={(e) => setRecipient(e.target.value)} 
                placeholder="Nome do destinatário"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Assunto da mensagem"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Conteúdo da mensagem..."
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachments">Anexos</Label>
              <div className="flex items-center gap-2">
                <Label 
                  htmlFor="attachments" 
                  className="flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:bg-secondary transition-colors"
                >
                  <Paperclip size={16} />
                  <span>{attachments.length > 0 ? `${attachments.length} arquivo(s)` : "Adicionar anexos"}</span>
                </Label>
                <Input 
                  id="attachments" 
                  type="file" 
                  onChange={handleAttachmentChange} 
                  className="hidden"
                  multiple
                />
              </div>
              
              {attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-secondary/40 p-2 rounded-md">
                      <div className="text-sm truncate max-w-[80%]">{file.name}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        type="button"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="space-x-2"
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true"></div>
          ) : (
            <Send size={16} className="mr-2" />
          )}
          <span>Enviar</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewCommunicationForm;
