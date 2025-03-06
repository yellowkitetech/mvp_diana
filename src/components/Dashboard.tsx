
import { useState } from 'react';
import { Agency, Process } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import NewCommunicationForm from './NewCommunicationForm';
import AgencyDashboard from './dashboard/AgencyDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import AnalystDashboard from './dashboard/AnalystDashboard';

const Dashboard = () => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [showNewCommunicationForm, setShowNewCommunicationForm] = useState(false);
  const { user } = useAuth();

  const handleAgencySelect = (agency: Agency) => {
    setSelectedAgency(agency);
    setSelectedProcess(null);
  };

  const handleProcessSelect = (process: Process) => {
    setSelectedProcess(process);
  };

  if (showNewCommunicationForm) {
    return (
      <NewCommunicationForm 
        selectedProcess={selectedProcess || undefined}
        onClose={() => setShowNewCommunicationForm(false)} 
      />
    );
  }

  if (user?.role === 'agency') {
    return (
      <AgencyDashboard
        selectedProcess={selectedProcess}
        onProcessSelect={handleProcessSelect}
        showNewCommunicationForm={showNewCommunicationForm}
        setShowNewCommunicationForm={setShowNewCommunicationForm}
        userId={user?.agencyId}
      />
    );
  } 
  
  if (user?.role === 'admin') {
    return (
      <AdminDashboard
        selectedAgency={selectedAgency}
        selectedProcess={selectedProcess}
        onAgencySelect={handleAgencySelect}
        onProcessSelect={handleProcessSelect}
      />
    );
  }
  
  return (
    <AnalystDashboard
      selectedAgency={selectedAgency}
      selectedProcess={selectedProcess}
      onAgencySelect={handleAgencySelect}
      onProcessSelect={handleProcessSelect}
      showNewCommunicationForm={showNewCommunicationForm}
      setShowNewCommunicationForm={setShowNewCommunicationForm}
    />
  );
};

export default Dashboard;
