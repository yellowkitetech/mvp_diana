
import { CreativeWork } from '@/lib/types/creative';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCheck, Clock, XCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ApprovalStatus } from '@/lib/types/common';

interface CreativeWorkTableProps {
  filteredWorks: CreativeWork[];
  selectedItems: string[];
  toggleSelectItem: (id: string, checked: boolean) => void;
  toggleSelectAll: (checked: boolean) => void;
  handleStatusChange: (id: string, status: ApprovalStatus) => void;
  setSelectedWork: (work: CreativeWork) => void;
  setIsPreviewOpen: (isOpen: boolean) => void;
  isSecomUser: boolean;
}

const CreativeWorkTable = ({
  filteredWorks,
  selectedItems,
  toggleSelectItem,
  toggleSelectAll,
  handleStatusChange,
  setSelectedWork,
  setIsPreviewOpen,
  isSecomUser
}: CreativeWorkTableProps) => {
  
  const renderStatusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="flex items-center"><Clock className="h-3 w-3 mr-1" /> Pendente</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 flex items-center"><CheckCheck className="h-3 w-3 mr-1" /> Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center"><XCircle className="h-3 w-3 mr-1" /> Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎬';
      case 'audio':
        return '🔊';
      case 'document':
        return '📄';
      default:
        return '📁';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">
            <Checkbox 
              checked={filteredWorks.length > 0 && selectedItems.length === filteredWorks.length}
              onCheckedChange={toggleSelectAll}
              aria-label="Selecionar todos"
            />
          </TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Material</TableHead>
          <TableHead>Campanha</TableHead>
          <TableHead>
            <div className="flex items-center">
              Data
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4"><path d="m21 16-4 4-4-4"/><path d="m17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
            </div>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Processos</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredWorks.map((work) => (
          <TableRow key={work.id} className="cursor-pointer hover:bg-muted/50">
            <TableCell>
              <Checkbox 
                checked={selectedItems.includes(work.id)}
                onCheckedChange={(checked) => toggleSelectItem(work.id, checked === true)}
                aria-label={`Selecionar ${work.title}`}
              />
            </TableCell>
            <TableCell>
              <div className="text-xl">{getFileTypeIcon(work.type)}</div>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{work.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {work.description}
                </p>
              </div>
            </TableCell>
            <TableCell>
              {work.campaignRequestId === '1' && 'Campanha de Vacinação'}
              {work.campaignRequestId === '2' && 'Programa Educacional'}
              {work.campaignRequestId === '3' && 'Festival Cultural'}
            </TableCell>
            <TableCell>
              {new Date(work.updatedAt).toLocaleDateString('pt-BR')}
            </TableCell>
            <TableCell>{renderStatusBadge(work.status)}</TableCell>
            <TableCell>
              <div className="space-y-1">
                {work.seiNumber && (
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                      {work.seiNumber}
                    </span>
                  </div>
                )}
                {work.commitmentNumber && (
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
                      {work.commitmentNumber}
                    </span>
                  </div>
                )}
                {!work.seiNumber && !work.commitmentNumber && (
                  <span className="text-xs text-muted-foreground">Não informado</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSelectedWork(work);
                    setIsPreviewOpen(true);
                  }}
                >
                  Visualizar
                </Button>
                {isSecomUser && work.status === 'pending' && (
                  <>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(work.id, 'approved')}
                    >
                      Aprovar
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleStatusChange(work.id, 'rejected')}
                    >
                      Rejeitar
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CreativeWorkTable;
