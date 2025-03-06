
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { Save } from "lucide-react";
import { toast } from "sonner";

const ProfileSettings = () => {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(61) 98765-4321', // Placeholder data
    position: user?.role === 'admin' ? 'Coordenador de Comunicação' : 
             user?.role === 'analyst' ? 'Analista de Comunicação' : 'Gerente de Contas',
    bio: 'Profissional com experiência em comunicação governamental.',
    avatar: user?.avatar || '/placeholder.svg',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to an API
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Usuário</CardTitle>
        <CardDescription>
          Gerencie suas informações pessoais e como elas são exibidas no sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Alterar foto
            </Button>
          </div>
          
          <div className="grid gap-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={profile.email} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={profile.phone} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input 
                  id="position" 
                  name="position" 
                  value={profile.position} 
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {user?.role === 'agency' && (
              <div className="space-y-2">
                <Label htmlFor="agency">Agência vinculada</Label>
                <Input 
                  id="agency" 
                  value="Agência Nacional de Comunicação" 
                  disabled
                />
              </div>
            )}
            
            {(user?.role === 'admin' || user?.role === 'analyst') && (
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Input 
                  id="department" 
                  value="Secretaria de Comunicação" 
                  disabled
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                rows={4} 
                value={profile.bio} 
                onChange={handleChange} 
                className="resize-none"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
