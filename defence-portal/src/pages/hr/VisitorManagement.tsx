import React, { useState } from 'react';
import { UserPlus, CheckCircle, XCircle, Clock, ShieldCheck, Search, Filter, ArrowUpRight } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

export default function VisitorManagement() {
  // Mock data for visitor requests
  const [visitors, setVisitors] = useState([
    { id: "VP-2026-89A", name: "Dr. Amit Verma", organization: "DRDO", purpose: "Research Wing Audit", zone: "Block-C (Secure)", status: "Pending", time: "12:45 PM" },
    { id: "VP-2026-90B", name: "Sarah Jenkins", organization: "Lockheed Contractor", purpose: "System Maintenance", zone: "Server Room Delta", status: "Approved", time: "01:15 PM" },
    { id: "VP-2026-91C", name: "Capt. Rohan Sharma", organization: "Indian Army", purpose: "Briefing Session", zone: "HQ Command", status: "Active", time: "10:30 AM" },
  ]);

  return (
    <DashboardLayout>
    <div className="space-y-6 text-slate-200">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide uppercase">
            Visitor Management Control
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time facility access logging, vetting, and security clearance management.
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs uppercase tracking-wider rounded font-mono transition-colors shadow-lg shadow-amber-500/10">
          <UserPlus size={16} />
          Issue Express Pass
        </button>
      </div>

      {/* 2. Metrics Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Inside", count: "42", label: "Personnel on-site", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
          { title: "Pending Clearance", count: "03", label: "Awaiting approval", icon: Clock, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
          { title: "Total Expected", count: "18", label: "Scheduled for today", icon: UserPlus, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
          { title: "Flagged/Denied", count: "01", label: "Security exceptions", icon: XCircle, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
        ].map((metric, idx) => (
          <div key={idx} className={`bg-slate-900/40 border rounded-lg p-4 flex items-center justify-between ${metric.color}`}>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400">{metric.title}</p>
              <h3 className="text-2xl font-bold mt-1 text-white font-mono">{metric.count}</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">{metric.label}</p>
            </div>
            <metric.icon size={24} className="opacity-80" />
          </div>
        ))}
      </div>

      {/* 3. Filter and Table Container */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-lg overflow-hidden">
        
        {/* Table Filters header */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-500/80 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Live Gate Clearances
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs w-full sm:w-48">
              <Filter size={12} className="text-slate-500 mr-2" />
              <select className="bg-transparent focus:outline-none text-slate-400 w-full cursor-pointer">
                <option value="all">All Sectors</option>
                <option value="pending">Pending Only</option>
                <option value="active">Active Inside</option>
              </select>
            </div>
          </div>
        </div>

        {/* Visitor Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 uppercase tracking-wider font-mono text-[10px]">
                <th className="p-4">Pass ID</th>
                <th className="p-4">Visitor Details</th>
                <th className="p-4">Affiliation</th>
                <th className="p-4">Clearance Zone</th>
                <th className="p-4">ETA / Time-In</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-4 font-mono text-slate-400 group-hover:text-amber-500 transition-colors">
                    {visitor.id}
                  </td>
                  <td className="p-4 font-medium text-white">
                    {visitor.name}
                    <span className="block text-[10px] text-slate-500 font-normal mt-0.5">{visitor.purpose}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-mono">{visitor.organization}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 font-mono text-[10px]">
                      {visitor.zone}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 font-mono">{visitor.time}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wide font-medium
                      ${visitor.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                      ${visitor.status === 'Approved' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : ''}
                      ${visitor.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' : ''}
                    `}>
                      {visitor.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {visitor.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded border border-transparent hover:border-emerald-500/30 transition-all" title="Approve Entry">
                          <CheckCircle size={15} />
                        </button>
                        <button className="p-1 text-rose-500 hover:bg-rose-500/10 rounded border border-transparent hover:border-rose-500/30 transition-all" title="Deny Entry">
                          <XCircle size={15} />
                        </button>
                      </div>
                    ) : (
                      <button className="text-slate-500 hover:text-white inline-flex items-center gap-0.5 font-mono text-[10px]" title="View Logs">
                        Logs <ArrowUpRight size={12} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}