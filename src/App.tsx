import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MediaPlansPage from "./pages/MediaPlans";
import PlanejamentoPage from "./pages/Planejamento";
import EspelhoEmpenhoPage from "./pages/EspelhoEmpenho";
import NovoEspelhoPage from "./pages/NovoEspelho";
import CriacaoPage from "./pages/Criacao";
import ProducaoPage from "./pages/Producao";
import FaturamentoPage from "./pages/Faturamento";
import RelatoriosPage from "./pages/Relatorios";
import ComunicacoesPage from "./pages/Comunicacoes";
import ConfiguracoesPage from "./pages/Configuracoes";
import DianaAssistant from "./components/DianaAssistant";

const queryClient = new QueryClient();

// Componente para proteger rotas
const ProtectedRoute = ({ 
  children, 
  requiredModule
}: { 
  children: React.ReactNode, 
  requiredModule?: string 
}) => {
  const { user, hasPermission } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredModule && !hasPermission(requiredModule)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/planejamento" element={
        <ProtectedRoute requiredModule="planejamento">
          <PlanejamentoPage />
        </ProtectedRoute>
      } />
      <Route path="/espelho-empenho" element={
        <ProtectedRoute requiredModule="empenho">
          <EspelhoEmpenhoPage />
        </ProtectedRoute>
      } />
      <Route path="/novo-espelho" element={
        <ProtectedRoute requiredModule="empenho">
          <NovoEspelhoPage />
        </ProtectedRoute>
      } />
      <Route path="/criacao" element={
        <ProtectedRoute requiredModule="criacao">
          <CriacaoPage />
        </ProtectedRoute>
      } />
      <Route path="/media-plans" element={
        <ProtectedRoute requiredModule="veiculacao">
          <MediaPlansPage />
        </ProtectedRoute>
      } />
      <Route path="/producao" element={
        <ProtectedRoute requiredModule="producao">
          <ProducaoPage />
        </ProtectedRoute>
      } />
      <Route path="/faturamento" element={
        <ProtectedRoute requiredModule="financeiro">
          <FaturamentoPage />
        </ProtectedRoute>
      } />
      <Route path="/relatorios" element={
        <ProtectedRoute requiredModule="relatorios">
          <RelatoriosPage />
        </ProtectedRoute>
      } />
      <Route path="/comunicacoes" element={
        <ProtectedRoute requiredModule="comunicacoes">
          <ComunicacoesPage />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <ConfiguracoesPage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          {/* Assistente Diana visível em todas as rotas exceto login */}
          <Routes>
            <Route path="/login" element={null} />
            <Route path="*" element={<DianaAssistant />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
