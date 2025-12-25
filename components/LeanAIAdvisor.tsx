
import React, { useState, useEffect } from 'react';
import { getLeanOptimizationAdvice } from '../services/geminiService';
import { ProcessStep } from '../types';

interface LeanAIAdvisorProps {
  steps: ProcessStep[];
}

const LeanAIAdvisor: React.FC<LeanAIAdvisorProps> = ({ steps }) => {
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    const result = await getLeanOptimizationAdvice(steps);
    setAdvice(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">AI Optimization Advisor</h2>
          <p className="text-slate-500">Intelligent process improvement suggestions based on Lean & Six Sigma.</p>
        </div>
        <button 
          onClick={fetchAdvice}
          disabled={loading}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-500 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Refresh Insights'}
        </button>
      </header>

      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Crunching operational data and applying Lean principles...</p>
        </div>
      ) : advice ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">Expert Diagnosis</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {advice.bottleneckAnalysis}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-800 font-bold mb-4 uppercase text-xs tracking-widest">Waste Inventory (TIMWOOD)</h3>
              <div className="space-y-2">
                {advice.wasteSummary?.map((waste: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{waste}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-slate-800 font-bold uppercase text-xs tracking-widest px-2">Prioritized Experiments (PDCA Cycles)</h3>
            <div className="grid grid-cols-1 gap-4">
              {advice.recommendations?.map((rec: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{rec.title}</h4>
                    <div className="flex gap-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                        rec.impact === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        Impact: {rec.impact}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                        rec.effort === 'High' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Effort: {rec.effort}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {rec.action}
                  </p>
                  <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    Add to Sprint Backlog <span className="text-lg">→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-400">Unable to generate insights. Ensure process data is correct.</p>
        </div>
      )}
    </div>
  );
};

export default LeanAIAdvisor;
