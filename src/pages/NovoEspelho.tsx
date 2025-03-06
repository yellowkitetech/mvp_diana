
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NovoEspelhoForm } from '@/components/espelho/form/NovoEspelhoForm';

const NovoEspelhoPage = () => {
  return (
    <Layout title="Novo Espelho" description="Criação de espelho para campanhas publicitárias">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Espelho</CardTitle>
        </CardHeader>
        <CardContent>
          <NovoEspelhoForm />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default NovoEspelhoPage;
