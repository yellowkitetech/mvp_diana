
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Send, Mail, Paperclip, MessageSquare, User, Users } from 'lucide-react';
import AgencyList from '@/components/AgencyList';
import ProcessList from '@/components/ProcessList';
import CommunicationList from '@/components/CommunicationList';
import NewCommunicationForm from '@/components/NewCommunicationForm';
import { Agency, Process } from '@/lib/types';

const ComunicacoesPage = () => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('mensagens');
  
  const handleSelectAgency = (agency: Agency) => {
    setSelectedAgency(agency);
    setSelectedProcess(null); // Reset processo ao selecionar uma nova agência
  };
  
  const handleSelectProcess = (process: Process) => {
    setSelectedProcess(process);
  };
  
  const handleNewMessage = () => {
    setShowNewMessageForm(true);
  };
  
  const handleCloseForm = () => {
    setShowNewMessageForm(false);
  };
  
  return (
    <Layout title="Comunicações" description="Gerenciamento de comunicações com agências e processos">
      {showNewMessageForm ? (
        <NewCommunicationForm 
          selectedProcess={selectedProcess || undefined} 
          onClose={handleCloseForm} 
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="mensagens">
                    <Mail className="h-4 w-4 mr-2" /> Mensagens
                  </TabsTrigger>
                  <TabsTrigger value="agencias">
                    <Users className="h-4 w-4 mr-2" /> Agências
                  </TabsTrigger>
                  <TabsTrigger value="processos">
                    <MessageSquare className="h-4 w-4 mr-2" /> Processos
                  </TabsTrigger>
                </TabsList>
                
                <Button onClick={handleNewMessage}>
                  <Send className="h-4 w-4 mr-2" /> Nova Mensagem
                </Button>
              </div>
              
              <div className="mt-6">
                <TabsContent value="mensagens" className="m-0">
                  <div className="grid grid-cols-1 gap-6">
                    <CommunicationList selectedProcess={selectedProcess || undefined} />
                  </div>
                </TabsContent>
                
                <TabsContent value="agencias" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AgencyList onSelect={handleSelectAgency} />
                    
                    {selectedAgency && (
                      <Card className="w-full h-full border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl font-semibold">Detalhes da Agência</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium">{selectedAgency.name}</h3>
                              <Badge variant={selectedAgency.active ? "default" : "outline"}>
                                {selectedAgency.active ? "Ativa" : "Inativa"}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2">
                              <div className="border-b pb-2">
                                <div className="text-sm text-muted-foreground">Contato:</div>
                                <div className="font-medium">{selectedAgency.contactPerson}</div>
                              </div>
                              
                              <div className="border-b pb-2">
                                <div className="text-sm text-muted-foreground">Email:</div>
                                <div className="font-medium">{selectedAgency.email}</div>
                              </div>
                              
                              <div className="border-b pb-2">
                                <div className="text-sm text-muted-foreground">Telefone:</div>
                                <div className="font-medium">{selectedAgency.phone}</div>
                              </div>
                              
                              <div>
                                <div className="text-sm text-muted-foreground">Endereço:</div>
                                <div className="font-medium">{selectedAgency.address}</div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 pt-4">
                              <Button variant="outline" size="sm" className="flex-1">
                                <MessageSquare className="h-4 w-4 mr-2" /> Mensagens
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <User className="h-4 w-4 mr-2" /> Processos
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="processos" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProcessList 
                      onSelect={handleSelectProcess}
                      selectedAgencyId={selectedAgency?.id}
                    />
                    
                    {selectedProcess && (
                      <Card className="w-full h-full border">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-xl font-semibold">Comunicações do Processo</CardTitle>
                            <Button size="sm" onClick={handleNewMessage}>
                              <Send size={16} className="mr-1" /> Nova Mensagem
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <CommunicationList selectedProcess={selectedProcess} />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ComunicacoesPage;
