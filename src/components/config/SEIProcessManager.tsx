
import React from 'react';
import SEIProcessList from './sei-process/SEIProcessList';
import { Department } from '@/lib/types/department';

// Sample data - in a real application, this would come from a database or API
const sampleDepartments: Department[] = [
  { id: '1', name: 'Secretaria de Saúde', contactEmail: 'saude@gov.br', contactPhone: '6133334444', active: true },
  { id: '2', name: 'Secretaria de Educação', contactEmail: 'educacao@gov.br', contactPhone: '6133335555', active: true },
  { id: '3', name: 'Secretaria de Mobilidade Urbana', contactEmail: 'mobilidade@gov.br', contactPhone: '6133336666', active: true },
  { id: '4', name: 'Secretaria de Habitação', contactEmail: 'habitacao@gov.br', contactPhone: '6133337777', active: true },
];

const SEIProcessManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <SEIProcessList departments={sampleDepartments} />
    </div>
  );
};

export default SEIProcessManager;
