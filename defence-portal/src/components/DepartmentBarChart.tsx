import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Department Crowd Data
const departmentCrowdData = [
  { name: 'Research Wing', count: 124, fill: '#6366f1' },
  { name: 'IT & Cyber', count: 98, fill: '#a855f7' },
  { name: 'Operations', count: 76, fill: '#ec4899' },
  { name: 'Logistics', count: 54, fill: '#14b8a6' },
  { name: 'HR & Admin', count: 31, fill: '#f59e0b' },
];

export default function DepartmentBarChart(): React.JSX.Element {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
          Department Clearance Volumes
        </h4>
        <p className="text-xs text-slate-400">
          Active personnel counts isolated by installation wing.
        </p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentCrowdData} layout="vertical" margin={{ top: 5, right: 10, left: 15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#334155', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
              {departmentCrowdData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}