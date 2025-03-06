
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Check, X, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StatusBadge } from './StatusBadge';
import { Espelho } from './types';

interface EspelhoTableProps {
  espelhos: Espelho[];
  selectedItems: string[];
  handleSelectItem: (id: string) => void;
  handleSelectAll: () => void;
  handleViewEspelho: (espelho: Espelho) => void;
  handleApproveEspelho: (id: string) => void;
  handleOpenRejectDialog: (espelho: Espelho) => void;
}

export const EspelhoTable: React.FC<EspelhoTableProps> = ({
  espelhos,
  selectedItems,
  handleSelectItem,
  handleSelectAll,
  handleViewEspelho,
  handleApproveEspelho,
  handleOpenRejectDialog
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox 
              checked={selectedItems.length > 0 && selectedItems.length === espelhos.length} 
              onCheckedChange={handleSelectAll}
              aria-label="Selecionar todos"
            />
          </TableHead>
          <TableHead>Número</TableHead>
          <TableHead>Campanha</TableHead>
          <TableHead>Agência</TableHead>
          <TableHead>Processo SEI</TableHead>
          <TableHead>Número Empenho</TableHead>
          <TableHead className="text-right">Valor Líquido (R$)</TableHead>
          <TableHead className="text-right">Valor Bruto (R$)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {espelhos.length > 0 ? (
          espelhos.map((espelho) => (
            <TableRow key={espelho.id} className="cursor-pointer hover:bg-muted">
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(espelho.id)} 
                  onCheckedChange={() => handleSelectItem(espelho.id)}
                  aria-label={`Selecionar espelho ${espelho.numero}`}
                />
              </TableCell>
              <TableCell className="font-medium">{espelho.numero}</TableCell>
              <TableCell>{espelho.campanha}</TableCell>
              <TableCell>{espelho.agencia}</TableCell>
              <TableCell>{espelho.seiProcesso || '-'}</TableCell>
              <TableCell>{espelho.numeroEmpenho || '-'}</TableCell>
              <TableCell className="text-right">{espelho.valorLiquido.toLocaleString('pt-BR')}</TableCell>
              <TableCell className="text-right">{espelho.valorBruto.toLocaleString('pt-BR')}</TableCell>
              <TableCell><StatusBadge status={espelho.status} /></TableCell>
              <TableCell>
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewEspelho(espelho)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Visualizar</span>
                  </Button>
                  
                  {espelho.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleApproveEspelho(espelho.id)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Aprovar</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleOpenRejectDialog(espelho)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reprovar</span>
                      </Button>
                    </>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewEspelho(espelho)}>
                        <Eye className="h-4 w-4 mr-2" /> Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      {espelho.status === 'pending' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-green-600"
                            onClick={() => handleApproveEspelho(espelho.id)}
                          >
                            <Check className="h-4 w-4 mr-2" /> Aprovar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleOpenRejectDialog(espelho)}
                          >
                            <X className="h-4 w-4 mr-2" /> Reprovar
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-4">
              Nenhum espelho encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
