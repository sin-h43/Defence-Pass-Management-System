import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Peak Traffic Data
const peakHoursData = [
  { time: '06:00', visitors: 12 },
  { time: '08:00', visitors: 45 },
  { time: '10:00', visitors: 85 },
  { time: '12:00', visitors: 60 },
  { time: '14:00', visitors: 72 },
  { time: '16:00', visitors: 90 },
  { time: '18:00', visitors: 35 },
  { time: '20:00', visitors: 15 },
];

export default function PeakTrafficChart(): React.JSX.Element {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
          Peak Security Traffic Hours
        </h4>
        <p className="text-xs text-slate-400">
          Identifies high-density intervals across entry checkpoints.
        </p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={peakHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#334155', 
                borderRadius: '8px',
                color: '#fff'
              }}
              labelStyle={{ color: '#94a3b8', fontFamily: 'monospace' }}
            />
            <Area 
              type="monotone" 
              dataKey="visitors" 
              stroke="#f59e0b" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorVisitors)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}