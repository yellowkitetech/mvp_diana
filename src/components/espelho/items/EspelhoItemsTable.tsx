
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EspelhoItem } from '../types';
import { formatCurrency } from '../utils/formatters';
import { translateServiceType, translateServiceSubtype } from '../utils/serviceTranslations';

interface EspelhoItemsTableProps {
  items: EspelhoItem[];
  onRemoveItem: (index: number) => void;
  totalValue?: number;
}

export const EspelhoItemsTable: React.FC<EspelhoItemsTableProps> = ({
  items,
  onRemoveItem,
  totalValue
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Fornecedor</th>
            <th className="py-2 px-4 text-left">Tipo</th>
            <th className="py-2 px-4 text-left">Subtipo</th>
            <th className="py-2 px-4 text-left">Descrição</th>
            <th className="py-2 px-4 text-right">Qtd.</th>
            <th className="py-2 px-4 text-right">Valor Unit.</th>
            <th className="py-2 px-4 text-right">Valor Total</th>
            <th className="py-2 px-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="border-b hover:bg-muted/50">
              <td className="py-2 px-4">{item.fornecedorNome}</td>
              <td className="py-2 px-4">{translateServiceType(item.tipoServico)}</td>
              <td className="py-2 px-4">{translateServiceSubtype(item.subtipoServico)}</td>
              <td className="py-2 px-4">{item.descricao}</td>
              <td className="py-2 px-4 text-right">{item.quantidade}</td>
              <td className="py-2 px-4 text-right">{formatCurrency(item.valorUnitario)}</td>
              <td className="py-2 px-4 text-right">{formatCurrency(item.valorLiquido)}</td>
              <td className="py-2 px-4 text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveItem(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-medium">
            <td colSpan={6} className="py-2 px-4 text-right">Valor Total:</td>
            <td className="py-2 px-4 text-right">
              {totalValue !== undefined 
                ? formatCurrency(totalValue) 
                : formatCurrency(items.reduce((sum, item) => sum + item.valorLiquido, 0))}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
