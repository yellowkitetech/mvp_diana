
import { useState } from 'react';
import { SEIProcess } from '@/lib/types/seiProcess';

// Sample data
const initialSEIProcesses: SEIProcess[] = [
  {
    id: '1',
    processNumber: '00123.45678/2023-01',
    description: 'Campanha Vacinação 2023',
    departments: ['1'], // Secretaria de Saúde
    attachments: ['documento_1.pdf', 'proposta_tecnica.docx'],
    campaignId: 'campaign1', // Campaign ID added
    createdAt: '2023-07-15T10:30:00Z',
    updatedAt: '2023-07-15T10:30:00Z'
  },
  {
    id: '2',
    processNumber: '00123.98765/2023-02',
    description: 'Campanha Educativa de Trânsito',
    departments: ['3'], // Secretaria de Mobilidade Urbana
    attachments: ['orcamento.pdf'],
    campaignId: 'campaign2', // Campaign ID added
    createdAt: '2023-08-20T14:45:00Z',
    updatedAt: '2023-08-22T09:15:00Z'
  },
  {
    id: '3',
    processNumber: '00123.56789/2023-03',
    description: 'Lançamento Programa Habitacional',
    departments: ['4'], // Secretaria de Habitação
    attachments: ['plano_midia.pdf', 'especificacoes.docx', 'cronograma.xlsx'],
    campaignId: 'campaign4', // Campaign ID added
    createdAt: '2023-08-25T11:20:00Z',
    updatedAt: '2023-09-01T16:30:00Z'
  }
];

export const useSEIProcesses = () => {
  const [seiProcesses, setSEIProcesses] = useState<SEIProcess[]>(initialSEIProcesses);
  const [newProcess, setNewProcess] = useState<Partial<SEIProcess>>({
    processNumber: '',
    description: '',
    departments: [],
    attachments: [],
    campaignId: '' // Added campaignId
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProcess = () => {
    if (!newProcess.processNumber || !newProcess.description || newProcess.departments?.length === 0) {
      return;
    }

    const process: SEIProcess = {
      id: Date.now().toString(),
      processNumber: newProcess.processNumber,
      description: newProcess.description || '',
      departments: newProcess.departments || [],
      attachments: newProcess.attachments || [],
      campaignId: newProcess.campaignId, // Include campaignId
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSEIProcesses([...seiProcesses, process]);
    setNewProcess({
      processNumber: '',
      description: '',
      departments: [],
      attachments: [],
      campaignId: '' // Reset campaignId
    });
    setIsDialogOpen(false);
  };

  const handleStartEdit = (id: string) => {
    const processToEdit = seiProcesses.find(process => process.id === id);
    if (processToEdit) {
      setNewProcess({ ...processToEdit });
      setEditingId(id);
      setIsDialogOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (!editingId || !newProcess.processNumber || !newProcess.description || newProcess.departments?.length === 0) {
      return;
    }

    const updatedProcesses = seiProcesses.map(process => {
      if (process.id === editingId) {
        return {
          ...process,
          processNumber: newProcess.processNumber || '',
          description: newProcess.description || '',
          departments: newProcess.departments || [],
          attachments: newProcess.attachments || [],
          campaignId: newProcess.campaignId, // Include campaignId
          updatedAt: new Date().toISOString()
        };
      }
      return process;
    });

    setSEIProcesses(updatedProcesses);
    setNewProcess({
      processNumber: '',
      description: '',
      departments: [],
      attachments: [],
      campaignId: '' // Reset campaignId
    });
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleDeleteProcess = (id: string) => {
    setSEIProcesses(seiProcesses.filter(process => process.id !== id));
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewProcess({
      processNumber: '',
      description: '',
      departments: [],
      attachments: [],
      campaignId: '' // Reset campaignId
    });
    setEditingId(null);
  };

  return {
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
  };
};
