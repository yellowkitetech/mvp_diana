import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MessageSquare, X, Send, HelpCircle, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'diana';
  timestamp: Date;
}

interface Tutorial {
  id: number;
  title: string;
  content: string;
}

const DianaAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [currentTutorial, setCurrentTutorial] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const { user } = useAuth();

  // Tutorial content
  useEffect(() => {
    setTutorials([
      {
        id: 1,
        title: 'Bem-vindo ao DIANA',
        content: 'Olá! Sou a Diana, sua assistente virtual do Sistema de Dados e Informações Analisadas para Gestão de Comunicação. Estou aqui para ajudar você a utilizar todas as funcionalidades disponíveis. Vamos começar um breve tour pelo sistema?'
      },
      {
        id: 2,
        title: 'Dashboard',
        content: 'O Dashboard é a página inicial do sistema. Aqui você encontra um resumo visual das principais informações, como campanhas em andamento, orçamento disponível e próximos prazos importantes.'
      },
      {
        id: 3,
        title: 'Planejamento',
        content: 'Na seção de Planejamento você pode gerenciar o cronograma de campanhas e o planejamento orçamentário. É possível visualizar eventos em formato de calendário ou lista.'
      },
      {
        id: 4,
        title: 'Espelho e Empenho',
        content: 'A área de Espelho e Empenho permite o controle de informações sobre o espelhamento de campanhas e gerenciamento de empenhos, incluindo valores e informações fiscais.'
      },
      {
        id: 5,
        title: 'Criação',
        content: 'No módulo de Criação você gerencia todo o processo criativo das campanhas, desde o briefing até a aprovação das peças.'
      },
      {
        id: 6,
        title: 'PIs (Veiculação)',
        content: 'A seção de PIs (Pedidos de Inserção) permite gerenciar os planos de mídia e as inserções em veículos de comunicação.'
      },
      {
        id: 7,
        title: 'PPs (Produção)',
        content: 'O módulo de PPs (Pedidos de Produção) é onde você gerencia a produção das peças aprovadas, desde orçamentos até entregas.'
      },
      {
        id: 8,
        title: 'Faturamento',
        content: 'Na seção de Faturamento você pode controlar o processo financeiro, incluindo notas fiscais, pagamentos e controle de valores.'
      },
      {
        id: 9,
        title: 'Relatórios',
        content: 'O módulo de Relatórios disponibiliza dados analíticos e estatísticos sobre campanhas, investimentos e resultados obtidos.'
      },
      {
        id: 10,
        title: 'Comunicações',
        content: 'A área de Comunicações facilita a troca de informações entre equipes e parceiros envolvidos nos projetos.'
      },
      {
        id: 11,
        title: 'Configurações',
        content: 'Em Configurações você pode personalizar o sistema de acordo com suas necessidades, incluindo gerenciamento de tabelas ABAP, usuários e preferências.'
      },
      {
        id: 12,
        title: 'Como posso ajudar?',
        content: 'Se tiver qualquer dúvida ou precisar de ajuda com o sistema, é só me perguntar! Estou sempre disponível no canto inferior direito da tela.'
      }
    ]);
  }, []);

  // Show welcome message on first load
  useEffect(() => {
    if (firstVisit && user) {
      setIsMinimized(false);
      setTimeout(() => {
        addMessage('Olá, ' + (user?.name || 'usuário') + '! Sou a Diana, sua assistente virtual. Como posso ajudar você hoje? Se quiser conhecer melhor o sistema, posso fazer um tour completo pelas funcionalidades.', 'diana');
      }, 1000);
      setFirstVisit(false);
      
      // Show tutorial dialog after initial greeting
      setTimeout(() => {
        setShowTutorial(true);
      }, 2000);
    }
  }, [firstVisit, user]);

  const addMessage = (content: string, sender: 'user' | 'diana') => {
    const newMessage = {
      id: Date.now(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    addMessage(inputMessage, 'user');
    setInputMessage('');
    
    // Simple AI response logic - to be expanded in a real application
    setTimeout(() => {
      let response = '';
      const lowerCaseMessage = inputMessage.toLowerCase();
      
      if (lowerCaseMessage.includes('olá') || lowerCaseMessage.includes('oi') || lowerCaseMessage.includes('bom dia') || lowerCaseMessage.includes('boa tarde') || lowerCaseMessage.includes('boa noite')) {
        response = `Olá! Como posso ajudar você hoje?`;
      } else if (lowerCaseMessage.includes('tutorial') || lowerCaseMessage.includes('ajuda') || lowerCaseMessage.includes('como funciona')) {
        response = 'Claro! Posso mostrar um tutorial sobre o sistema. Clique no botão "Ver Tutorial" abaixo para começar.';
        setCurrentTutorial(0);
        setTimeout(() => setShowTutorial(true), 1000);
      } else if (lowerCaseMessage.includes('planejamento')) {
        response = 'O módulo de Planejamento permite gerenciar o cronograma de campanhas e o planejamento orçamentário. Você pode acessá-lo clicando no ícone de Calendário no menu lateral.';
      } else if (lowerCaseMessage.includes('criação')) {
        response = 'No módulo de Criação você gerencia todo o processo criativo das campanhas, desde o briefing até a aprovação das peças.';
      } else if (lowerCaseMessage.includes('faturamento')) {
        response = 'Na seção de Faturamento você pode controlar o processo financeiro, incluindo notas fiscais, pagamentos e controle de valores.';
      } else if (lowerCaseMessage.includes('relatórios')) {
        response = 'O módulo de Relatórios disponibiliza dados analíticos e estatísticos sobre campanhas, investimentos e resultados obtidos.';
      } else if (lowerCaseMessage.includes('abap') || lowerCaseMessage.includes('tabela')) {
        response = 'As tabelas ABAP podem ser gerenciadas na seção de Configurações. Lá você encontrará uma interface para adicionar, editar e remover itens da tabela.';
      } else {
        response = 'Entendo. Para mais informações sobre isso, você pode explorar o sistema ou me fazer perguntas mais específicas. Estou aqui para ajudar!';
      }
      
      addMessage(response, 'diana');
    }, 1000);
  };

  const nextTutorial = () => {
    if (currentTutorial < tutorials.length - 1) {
      setCurrentTutorial(currentTutorial + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const prevTutorial = () => {
    if (currentTutorial > 0) {
      setCurrentTutorial(currentTutorial - 1);
    }
  };

  const startTutorial = () => {
    setCurrentTutorial(0);
    setShowTutorial(true);
  };

  return (
    <>
      {/* Main Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {isMinimized ? (
          <Button 
            onClick={() => setIsMinimized(false)} 
            size="lg" 
            className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-80 shadow-lg border-primary/20 animate-fade-in">
            <CardHeader className="bg-primary/10 p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/lovable-uploads/a70c0419-a99d-4942-bff6-7de191eb15c3.png" alt="Diana" />
                    <AvatarFallback>DI</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-sm font-medium diana-title">Assistente Diana</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 h-60 overflow-y-auto">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] px-3 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 border-t">
              <div className="w-full space-y-2">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Digite sua mensagem..." 
                    className="resize-none min-h-9 h-9"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={startTutorial}
                  >
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Ver Tutorial
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => {
                      addMessage("Quais são as principais funcionalidades do sistema?", "user");
                      setTimeout(() => {
                        addMessage("O DIANA oferece gestão completa do processo de comunicação, incluindo planejamento, criação, mídia, produção, faturamento e relatórios. Cada módulo tem funções específicas para facilitar o fluxo de trabalho. Posso explicar cada um em detalhes se quiser.", "diana");
                      }, 1000);
                    }}
                  >
                    <Info className="h-3 w-3 mr-1" />
                    Ajuda Rápida
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Tutorial Dialog */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/lovable-uploads/a70c0419-a99d-4942-bff6-7de191eb15c3.png" alt="Diana" />
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
              {tutorials[currentTutorial]?.title || "Tutorial DIANA"}
            </DialogTitle>
            <DialogDescription>
              {tutorials[currentTutorial]?.content || ""}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={prevTutorial} 
              disabled={currentTutorial === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              {currentTutorial + 1} de {tutorials.length}
            </div>
            <Button onClick={nextTutorial}>
              {currentTutorial < tutorials.length - 1 ? (
                <>
                  Próximo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "Concluir"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DianaAssistant;
