
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { EspelhoItem } from './types';

interface ItemsTableProps {
  items: EspelhoItem[];
  onRemoveItem: (index: number) => void;
}

export const ItemsTable: React.FC<ItemsTableProps> = ({ items, onRemoveItem }) => {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum item adicionado.</p>;
  }

  return (
    <div className="border rounded-md mt-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Tipo de Serviço</TableHead>
            <TableHead>Subtipo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Valor Unitário</TableHead>
            <TableHead className="text-right">Valor Líquido</TableHead>
            <TableHead className="text-right">Valor Bruto</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.fornecedorNome}</TableCell>
              <TableCell>{item.tipoServico}</TableCell>
              <TableCell>{item.subtipoServico}</TableCell>
              <TableCell>{item.descricao}</TableCell>
              <TableCell className="text-right">{item.quantidade}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorUnitario)}
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorLiquido)}
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorBruto)}
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onRemoveItem(index)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
