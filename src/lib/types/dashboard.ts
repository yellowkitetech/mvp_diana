
export interface DashboardMetrics {
  totalCampaigns: number;
  pendingApprovals: number;
  ongoingCampaigns: number;
  completedCampaigns: number;
  totalBudget: number;
  committedBudget: number;
  remainingBudget: number;
  campaignsByDepartment: {
    departmentId: string;
    count: number;
  }[];
  invoicesByStatus: {
    status: string;
    count: number;
    value: number;
  }[];
}
