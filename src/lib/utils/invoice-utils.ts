
export const getStatusName = (status: 'pending' | 'verified' | 'paid' | 'cancelled'): string => {
  switch (status) {
    case 'pending': return 'Pendente';
    case 'verified': return 'Verificada';
    case 'paid': return 'Paga';
    case 'cancelled': return 'Cancelada';
    default: return status;
  }
};
