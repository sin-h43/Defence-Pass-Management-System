import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function ComplianceReporting(): React.JSX.Element {
  const triggerDownload = (reportType: string) => {
    alert(`Generating and downloading ${reportType} Compliance Report...`);
  };

  return (
    <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            Automated Security Compliance Reporting
          </h4>
          <p className="text-xs text-slate-400">
            One-click generation of fully compiled audits matching National Security logs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Daily Audit', sub: '24h Log', color: 'blue' },
            { label: 'Weekly Report', sub: '7-Day Run', color: 'purple' },
            { label: 'Monthly Ledger', sub: 'Secured Archive', color: 'emerald' },
            { label: 'Custom Range', sub: 'Selective Audit', color: 'amber' }
          ].map((item, index) => {
            const colorClasses = {
              blue: 'text-blue-400',
              purple: 'text-purple-400',
              emerald: 'text-emerald-400',
              amber: 'text-amber-400'
            };
            
            return (
              <button 
                key={index}
                onClick={() => triggerDownload(item.label)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-800 bg-slate-950/50 hover:bg-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition-all text-center group"
              >
                <FileText size={20} className={`${colorClasses[item.color as keyof typeof colorClasses]} group-hover:scale-105 transition-transform`} />
                <span className="text-xs font-semibold">{item.label}</span>
                <span className="text-[10px] text-slate-500 font-mono">{item.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg flex items-center justify-between text-xs text-amber-500/90 font-mono">
        <span>Standard export encryption mode: AES-256 Bit active</span>
        <Download size={14} />
      </div>
    </div>
  );
}