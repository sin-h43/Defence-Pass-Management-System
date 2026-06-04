import type { Visitor } from "../utils/searchFilters";
import RightDrawer from './RightDrawer';
import { useState } from 'react';

// interface Visitor {
//     id: string;
//     name: string;
//     purpose: string;
//     requestTime: string;
//     type: string;
//     status: string;
// }

interface RepeatedVisitorModuleProps {
    searchQuery: string;
    onAutofill: (visitor: Visitor) => void;
}

const MASTER_REPEATED_VISITORS: Visitor[] =[
    { id: 'DEF-M801', name: 'Sinchana K', purpose: 'System Audit', requestTime:'02:15 PM', type:'Repeated Visitor', status: 'Cleared'},
    { id: 'DEF-M802', name: 'Arya K', purpose: 'Equipment Delivery', requestTime:'11:00 AM', type:'Repeated Visitor', status: 'Cleared'}
];

export default function RepeatedVisitorModule({searchQuery, onAutofill}:RepeatedVisitorModuleProps){
    // Drawer States
  const [selectedMasterVisitor, setSelectedMasterVisitor] = useState<Visitor | null>(null);
  const [selectedHistoricalPass, setSelectedHistoricalPass] = useState<any | null>(null);

  // Filter the list based on the global top search bar query
  const searchLower = searchQuery.toLowerCase();
  const filteredMasterList = MASTER_REPEATED_VISITORS.filter(
    v => (v.name ?? '').toLowerCase().includes(searchLower) || (v.id ?? '').toLowerCase().includes(searchLower)
  );

  return (
    <div className="space-y-6">
      {/* 1. MASTER REPEATED VISITORS DIRECTORY */}
      <div className="bg-gray-900 border border-[#21262d] rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#21262d] flex items-center justify-between bg-gray-900/50">
          <div>
            <h3 className="text-sm font-semibold text-gray-200">Repeated Visitor Registry</h3>
            <p className="text-[12px] text-gray-400 mt-0.5">Frequent profiles cleared for accelerated access</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm text-slate-300">
            <thead className="bg-[#161b22] text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Registry ID</th>
                <th className="p-4">Visitor Name</th>
                <th className="p-4">Primary Classification</th>
                <th className="p-4">Security Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredMasterList.map((visitor) => (
                <tr 
                  key={visitor.id}
                  onClick={() => setSelectedMasterVisitor(visitor)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-mono text-amber-500 font-medium">{visitor.id}</td>
                  <td className="p-4 text-white font-medium">{visitor.name}</td>
                  <td className="p-4 text-slate-400">{visitor.type}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= LAYER A: MIDDLE DRAWER (Pass History Log) ================= */}
      <RightDrawer
        isOpen={selectedMasterVisitor !== null}
        onClose={() => setSelectedMasterVisitor(null)}
        title={`Visitation History — ${selectedMasterVisitor?.name || ''}`}
      >
        <div className="p-5 space-y-4 h-full flex flex-col">
          <p className="text-xs text-slate-400">
            Showing recorded logs for Registry ID: <span className="font-mono text-amber-500">{selectedMasterVisitor?.id}</span>
          </p>

          <div className="bg-slate-950/50 border border-slate-800 rounded-lg overflow-hidden flex-1">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Logged Date/Time</th>
                  <th className="p-3">Purpose Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                <tr 
                  onClick={() => setSelectedHistoricalPass({
                    id: 'DISPATCH-99A',
                    date: 'Jun 02, 2026',
                    purpose: selectedMasterVisitor?.purpose || 'Contracting Task',
                    gateOfficer: 'Officer Nexus-4',
                  })}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-mono text-slate-400">02-06-2026 10:15 AM</td>
                  <td className="p-3 truncate max-w-[140px] text-slate-200">{selectedMasterVisitor?.purpose}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={() => {
              if (selectedMasterVisitor) {
                onAutofill(selectedMasterVisitor);
                setSelectedMasterVisitor(null);
              }
            }}
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs tracking-wide transition shadow-lg mt-auto"
          >
            Autofill Identity Profile
          </button>
        </div>
      </RightDrawer>

      {/* ================= LAYER B: RIGHT DRAWER (Deep Dossier View) ================= */}
      <RightDrawer
        isOpen={selectedHistoricalPass !== null}
        onClose={() => setSelectedHistoricalPass(null)}
        title="Archived Dispatch Token File"
      >
        {selectedHistoricalPass && (
          <div className="p-5 space-y-5 text-slate-200">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 font-mono">
                System Registry Snapshot
              </span>
              <h4 className="text-lg font-bold text-white mt-1">{selectedHistoricalPass.id}</h4>
            </div>

            <div className="space-y-3 bg-slate-950/40 p-4 rounded-lg border border-slate-800">
              <div>
                <span className="text-[11px] text-slate-500 block">Logged Event Date</span>
                <span className="text-xs text-slate-300 font-mono">{selectedHistoricalPass.date}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Historical Purpose</span>
                <span className="text-xs text-slate-300">{selectedHistoricalPass.purpose}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Processing Gate Officer</span>
                <span className="text-xs text-slate-300 font-mono">{selectedHistoricalPass.gateOfficer}</span>
              </div>
            </div>
          </div>
        )}
      </RightDrawer>
    </div>
  );
}


