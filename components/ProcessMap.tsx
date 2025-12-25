
import React from 'react';
import { ProcessStep } from '../types';

interface ProcessMapProps {
  steps: ProcessStep[];
  onAddStep: () => void;
}

const ProcessMap: React.FC<ProcessMapProps> = ({ steps, onAddStep }) => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Process Mapping (AS-IS)</h2>
          <p className="text-slate-500">Visualize end-to-end material and information flow.</p>
        </div>
        <button 
          onClick={onAddStep}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Step
        </button>
      </header>

      <div className="relative overflow-x-auto pb-8">
        <div className="flex items-center gap-8 min-w-max p-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              {/* Process Step Card */}
              <div className={`w-64 flex flex-col items-center group`}>
                <div className={`w-full p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  step.status === 'bottleneck' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-slate-200 bg-white hover:border-blue-400'
                }`}>
                  {step.status === 'bottleneck' && (
                    <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                      Bottleneck
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {idx + 1}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{step.resources} Res</span>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 text-lg mb-4">{step.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Cycle Time</p>
                      <p className="text-sm font-semibold text-slate-700">{step.cycleTime}h</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Lead Time</p>
                      <p className="text-sm font-semibold text-slate-700">{step.leadTime}h</p>
                    </div>
                  </div>
                </div>

                {/* Waste Indicators */}
                {step.wasteDetected && step.wasteDetected.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1 justify-center">
                    {step.wasteDetected.map(w => (
                      <span key={w} className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase">
                        {w}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Connecting Arrow */}
              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center">
                   <div className="w-12 h-0.5 bg-slate-300 relative">
                     <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 border-r-2 border-t-2 border-slate-300"></div>
                   </div>
                   <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase">
                     Wait: {steps[idx+1].leadTime - steps[idx+1].cycleTime}h
                   </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Process Efficiency</h5>
            <div className="text-4xl font-bold">34.2%</div>
            <p className="text-xs text-slate-400 mt-2">PCE (Process Cycle Efficiency) = Total Cycle / Total Lead</p>
          </div>
          <div>
             <h5 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Critical Path</h5>
             <div className="flex gap-2 items-center">
                <span className="text-emerald-400 font-bold">Step 2 → Step 3</span>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded">Max Constraint</span>
             </div>
          </div>
          <div className="flex items-center">
             <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all transform hover:scale-[1.02]">
                Generate TO-BE Process (Lean Optimization)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessMap;
