
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProcessMap from './components/ProcessMap';
import LeanAIAdvisor from './components/LeanAIAdvisor';
import { AppTab, ProcessStep } from './types';

// Mock initial process data
const initialSteps: ProcessStep[] = [
  { id: '1', name: 'Order Receipt', cycleTime: 0.5, leadTime: 2, status: 'active', resources: 2 },
  { id: '2', name: 'Material Prep', cycleTime: 3.5, leadTime: 8, status: 'bottleneck', resources: 1, wasteDetected: ['Waiting', 'Motion'] },
  { id: '3', name: 'Assembly', cycleTime: 4, leadTime: 5, status: 'active', resources: 4 },
  { id: '4', name: 'Quality Inspection', cycleTime: 1.5, leadTime: 12, status: 'active', resources: 1, wasteDetected: ['Defects'] },
  { id: '5', name: 'Shipping', cycleTime: 1, leadTime: 4, status: 'active', resources: 2 },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Dashboard);
  const [steps, setSteps] = useState<ProcessStep[]>(initialSteps);

  const addStep = () => {
    const newId = (steps.length + 1).toString();
    const newStep: ProcessStep = {
      id: newId,
      name: 'New Process Step',
      cycleTime: 1,
      leadTime: 2,
      status: 'active',
      resources: 1
    };
    setSteps([...steps, newStep]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.Dashboard:
        return <Dashboard />;
      case AppTab.ProcessMap:
        return <ProcessMap steps={steps} onAddStep={addStep} />;
      case AppTab.AIAdvisor:
        return <LeanAIAdvisor steps={steps} />;
      case AppTab.Kanban:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
             <div className="text-6xl mb-4">🏗️</div>
             <h3 className="text-xl font-bold text-slate-600">Kanban Flow Implementation</h3>
             <p className="max-w-md text-center mt-2">Connecting process steps to operational execution. Manage Work-in-Progress (WIP) limits and visualize pull signals.</p>
          </div>
        );
      case AppTab.LeanAnalyzer:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
             <div className="text-6xl mb-4">🔍</div>
             <h3 className="text-xl font-bold text-slate-600">Waste Identification Module</h3>
             <p className="max-w-md text-center mt-2">Root cause analysis (5 Whys) and Spaghetti diagram integration coming soon for deep TIMWOOD identification.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
