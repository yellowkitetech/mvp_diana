
import { useState, useMemo } from 'react';
import { CreativeWork } from '@/lib/types/creative';

export interface CreativeWorksFilterProps {
  creativeWorks: CreativeWork[];
  filterStatus: string;
  filterCampaign: string;
  filterType: string;
  filterSeiNumber: string;
  filterCommitmentNumber: string;
  searchTerm: string;
}

export const useCreativeWorksFilter = ({
  creativeWorks,
  filterStatus,
  filterCampaign,
  filterType,
  filterSeiNumber,
  filterCommitmentNumber,
  searchTerm
}: CreativeWorksFilterProps) => {
  
  const filteredWorks = useMemo(() => {
    return creativeWorks.filter(work => {
      // Filtro de status
      if (filterStatus !== 'all' && work.status !== filterStatus) return false;
      
      // Filtro de campanha
      if (filterCampaign !== 'all' && work.campaignRequestId !== filterCampaign) return false;
      
      // Filtro de tipo
      if (filterType !== 'all' && work.type !== filterType) return false;
      
      // Filtro de processo SEI
      if (filterSeiNumber !== 'all') {
        if (filterSeiNumber === 'empty' && work.seiNumber) return false;
        if (filterSeiNumber === 'filled' && !work.seiNumber) return false;
        if (filterSeiNumber !== 'empty' && filterSeiNumber !== 'filled' && work.seiNumber !== filterSeiNumber) return false;
      }
      
      // Filtro de número de empenho
      if (filterCommitmentNumber !== 'all') {
        if (filterCommitmentNumber === 'empty' && work.commitmentNumber) return false;
        if (filterCommitmentNumber === 'filled' && !work.commitmentNumber) return false;
        if (filterCommitmentNumber !== 'empty' && filterCommitmentNumber !== 'filled' && work.commitmentNumber !== filterCommitmentNumber) return false;
      }
      
      // Filtro de termo de busca
      if (searchTerm && 
          !work.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !work.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !(work.seiNumber && work.seiNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
          !(work.commitmentNumber && work.commitmentNumber.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      return true;
    });
  }, [creativeWorks, filterStatus, filterCampaign, filterType, filterSeiNumber, filterCommitmentNumber, searchTerm]);
  
  return filteredWorks;
};
