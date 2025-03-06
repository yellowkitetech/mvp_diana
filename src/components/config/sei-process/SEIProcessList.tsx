
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, FileText, Paperclip } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSEIProcesses } from './useSEIProcesses';
import SEIProcessForm from './SEIProcessForm';
import { Department } from '@/lib/types/department';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// Sample campaigns data - in a real app would come from context or API
const sampleCampaigns = [
  { id: 'campaign1', title: 'Campanha de Vacinação' },
  { id: 'campaign2', title: 'Campanha de Segurança Viária' },
  { id: 'campaign3', title: 'Festival Cultural' },
  { id: 'campaign4', title: 'Programa Habitacional' },
  { id: 'campaign5', title: 'Incentivo ao Esporte' }
];

interface SEIProcessListProps {
  departments: Department[];
}

const SEIProcessList: React.FC<SEIProcessListProps> = ({ departments }) => {
  const {
    seiProcesses,
    newProcess,
    editingId,
    isDialogOpen,
    setNewProcess,
    handleAddProcess,
    handleDeleteProcess,
    handleStartEdit,
    handleSaveEdit,
    openDialog,
    closeDialog
  } = useSEIProcesses();

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const getDepartmentNames = (departmentIds: string[]) => {
    return departmentIds
      .map(id => departments.find(dept => dept.id === id)?.name || '')
      .filter(Boolean)
      .join(', ');
  };

  const getCampaignName = (campaignId?: string) => {
    if (!campaignId) return '';
    return sampleCampaigns.find(c => c.id === campaignId)?.title || '';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      handleDeleteProcess(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Processos SEI</CardTitle>
          <CardDescription>
            Gerencie os processos SEI do sistema
          </CardDescription>
        </div>
        <Button onClick={openDialog} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Processo SEI
        </Button>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Número do Processo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Campanha</TableHead>
              <TableHead>Secretarias</TableHead>
              <TableHead>Anexos</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seiProcesses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum processo SEI cadastrado
                </TableCell>
              </TableRow>
            ) : (
              seiProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {process.processNumber}
                    </div>
                  </TableCell>
                  <TableCell>{process.description}</TableCell>
                  <TableCell>
                    {process.campaignId ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        {getCampaignName(process.campaignId)}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">Nenhuma</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {process.departments.map((deptId) => {
                        const dept = departments.find(d => d.id === deptId);
                        return dept ? (
                          <Badge key={deptId} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                            {dept.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    {process.attachments.length > 0 ? (
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{process.attachments.length}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Nenhum</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(process.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleStartEdit(process.id)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(process.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Editar Processo SEI' : 'Novo Processo SEI'}
            </DialogTitle>
          </DialogHeader>
          <SEIProcessForm
            newProcess={newProcess}
            setNewProcess={setNewProcess}
            handleAddProcess={handleAddProcess}
            handleSaveEdit={handleSaveEdit}
            editingId={editingId}
            closeDialog={closeDialog}
            departments={departments}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este processo SEI? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default SEIProcessList;
