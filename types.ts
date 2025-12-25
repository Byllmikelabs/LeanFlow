
export type WasteType = 'Waiting' | 'Overproduction' | 'Defects' | 'Inventory' | 'Transportation' | 'Motion' | 'Extra Processing' | 'Underutilized Talent';

export interface ProcessStep {
  id: string;
  name: string;
  cycleTime: number; // in hours
  leadTime: number; // in hours
  status: 'active' | 'bottleneck' | 'idle';
  wasteDetected?: WasteType[];
  resources: number;
}

export interface ImprovementInquiry {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  status: 'Backlog' | 'In Progress' | 'Done';
}

export interface OperationalMetrics {
  avgLeadTime: number;
  avgCycleTime: number;
  throughput: number; // units/day
  utilization: number; // percentage
}

export enum AppTab {
  Dashboard = 'dashboard',
  ProcessMap = 'process-map',
  Kanban = 'kanban',
  LeanAnalyzer = 'lean-analyzer',
  AIAdvisor = 'ai-advisor'
}
