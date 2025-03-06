
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Edit, FileText } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StatusBadge } from './StatusBadge';
import { Empenho } from './types';

interface EmpenhoTableProps {
  empenhos: Empenho[];
  selectedItems: string[];
  handleSelectItem: (id: string) => void;
  handleSelectAll: () => void;
}

export const EmpenhoTable: React.FC<EmpenhoTableProps> = ({
  empenhos,
  selectedItems,
  handleSelectItem,
  handleSelectAll
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox 
              checked={selectedItems.length > 0 && selectedItems.length === empenhos.length} 
              onCheckedChange={handleSelectAll}
              aria-label="Selecionar todos"
            />
          </TableHead>
          <TableHead>Número</TableHead>
          <TableHead>Campanha</TableHead>
          <TableHead>Processo SEI</TableHead>
          <TableHead className="text-right">Valor Líquido (R$)</TableHead>
          <TableHead className="text-right">Valor Bruto (R$)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {empenhos.length > 0 ? (
          empenhos.map((empenho) => (
            <TableRow key={empenho.id} className="cursor-pointer hover:bg-muted">
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(empenho.id.toString())} 
                  onCheckedChange={() => handleSelectItem(empenho.id.toString())}
                  aria-label={`Selecionar empenho ${empenho.numero}`}
                />
              </TableCell>
              <TableCell className="font-medium">{empenho.numero}</TableCell>
              <TableCell>{empenho.campanha}</TableCell>
              <TableCell>{empenho.seiProcesso || '-'}</TableCell>
              <TableCell className="text-right">{empenho.valorLiquido.toLocaleString('pt-BR')}</TableCell>
              <TableCell className="text-right">{empenho.valorBruto.toLocaleString('pt-BR')}</TableCell>
              <TableCell><StatusBadge status={empenho.status} /></TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" /> Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" /> Gerar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
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
            <TableCell colSpan={8} className="text-center py-4">
              Nenhum empenho encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
