
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Paperclip, Send } from 'lucide-react';
import { Communication, Process } from '@/lib/types';
import { sampleCommunications, getCommunicationsByProcessId } from '@/lib/data';

interface CommunicationListProps {
  selectedProcess?: Process;
}

const CommunicationList = ({ selectedProcess }: CommunicationListProps) => {
  const [communications, setCommunications] = useState<Communication[]>(
    selectedProcess 
      ? getCommunicationsByProcessId(selectedProcess.id) 
      : sampleCommunications
  );

  // Update communications when selected process changes
  useState(() => {
    if (selectedProcess) {
      setCommunications(getCommunicationsByProcessId(selectedProcess.id));
    } else {
      setCommunications(sampleCommunications);
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleCommunicationClick = (comm: Communication) => {
    // Placeholder for communication detail view
    console.log('Communication clicked:', comm);
  };

  return (
    <Card className="w-full h-full border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Comunicações
            {selectedProcess && (
              <span className="text-sm font-normal ml-2 text-muted-foreground">
                ({selectedProcess.title})
              </span>
            )}
          </CardTitle>
          <Button size="sm" className="ml-auto">
            <Send size={16} className="mr-1" /> Nova Mensagem
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 h-[calc(100%-100px)] overflow-auto">
        {communications.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Nenhuma comunicação encontrada.
          </div>
        ) : (
          communications.map((comm) => (
            <div
              key={comm.id}
              className={`border rounded-lg p-4 card-hover cursor-pointer transition-all ${
                !comm.read ? 'bg-secondary/50' : 'bg-card'
              }`}
              onClick={() => handleCommunicationClick(comm)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium flex items-center">
                  <Mail size={16} className="mr-2" />
                  {comm.subject}
                </div>
                {!comm.read && (
                  <Badge variant="secondary">Não lido</Badge>
                )}
              </div>
              <div className="flex justify-between text-sm mb-2">
                <div>
                  <span className="text-muted-foreground">De:</span> {comm.sender}
                </div>
                <div>
                  <span className="text-muted-foreground">Para:</span> {comm.recipient}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {comm.message}
              </div>
              {comm.attachments.length > 0 && (
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <Paperclip size={14} className="mr-1" />
                  {comm.attachments.length} anexo{comm.attachments.length !== 1 ? 's' : ''}
                </div>
              )}
              <div className="text-xs text-right text-muted-foreground mt-2">
                {formatDate(comm.createdAt)}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CommunicationList;
