
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderSettingsProps {
  title: string;
  description: string;
}

const PlaceholderSettings = ({ title, description }: PlaceholderSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Configure as opções de {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          Configurações de {description} serão implementadas em breve.
        </p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderSettings;
