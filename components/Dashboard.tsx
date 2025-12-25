
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { OperationalMetrics } from '../types';

const data = [
  { name: 'Mon', throughput: 45, leadTime: 12 },
  { name: 'Tue', throughput: 52, leadTime: 11 },
  { name: 'Wed', throughput: 48, leadTime: 14 },
  { name: 'Thu', throughput: 61, leadTime: 10 },
  { name: 'Fri', throughput: 55, leadTime: 9 },
  { name: 'Sat', throughput: 30, leadTime: 8 },
  { name: 'Sun', throughput: 28, leadTime: 8 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Operational Overview</h2>
        <p className="text-slate-500">Real-time performance indicators for active processes.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg Lead Time', value: '10.8 hrs', trend: '-12%', color: 'text-blue-600' },
          { label: 'Avg Cycle Time', value: '4.2 hrs', trend: '+2%', color: 'text-emerald-600' },
          { label: 'Throughput', value: '46 units/d', trend: '+18%', color: 'text-purple-600' },
          { label: 'Resource Utilization', value: '84%', trend: '-5%', color: 'text-amber-600' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                kpi.trend.startsWith('-') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Throughput Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Throughput Trend (Units/Day)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="throughput" stroke="#3b82f6" fillOpacity={1} fill="url(#colorThroughput)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Time Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Lead Time vs Goal (Hrs)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Line type="monotone" dataKey="leadTime" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
