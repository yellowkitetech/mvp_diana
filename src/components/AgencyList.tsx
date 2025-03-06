
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { Agency } from '@/lib/types';
import { sampleAgencies } from '@/lib/data';

interface AgencyListProps {
  onSelect: (agency: Agency) => void;
}

const AgencyList = ({ onSelect }: AgencyListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAgencies = searchTerm 
    ? sampleAgencies.filter(agency => 
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sampleAgencies;

  return (
    <Card className="w-full h-full border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Agências</CardTitle>
          <Button size="sm" className="ml-auto">
            <Plus size={16} className="mr-1" /> Nova Agência
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar agências..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 h-[calc(100%-140px)] overflow-auto">
        {filteredAgencies.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Nenhuma agência encontrada.
          </div>
        ) : (
          filteredAgencies.map((agency) => (
            <div
              key={agency.id}
              className="border rounded-lg p-4 card-hover cursor-pointer transition-all bg-card"
              onClick={() => onSelect(agency)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{agency.name}</div>
                <Badge variant={agency.active ? "default" : "outline"}>
                  {agency.active ? "Ativa" : "Inativa"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Contato: {agency.contactPerson}
              </div>
              <div className="text-xs text-muted-foreground">
                {agency.email} • {agency.phone}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AgencyList;
