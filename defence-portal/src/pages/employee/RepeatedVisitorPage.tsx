import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, ArrowLeft, Clock, FileText, UserCheck } from 'lucide-react';
import RightDrawer from '../../components/RightDrawer';
import type {Visitor} from '../../utils/searchFilters';

// Master frequent flyers database
const MASTER_REPEATED_VISITORS: Visitor[] = [
  { id: 'DEF-M801', name: 'Sinchana K', purpose: 'System Audit', requestTime: '02:15 PM', type: 'Repeated Visitor', status: 'Cleared' },
  { id: 'DEF-M802', name: 'Arya K', purpose: 'Equipment Delivery', requestTime: '11:00 AM', type: 'Repeated Visitor', status: 'Cleared' },
];

// Mock historical logs database for a specific individual
const REPEATED_VISITATION_HISTORY = [
  { dispatchId: 'DISPATCH-TRX99', date: '02-06-2026', time: '10:15 AM', purpose: 'Core Server Room Infrastructure Patching', gateOfficer: 'Officer Crimson-6' },
  { dispatchId: 'DISPATCH-TRX41', date: '28-05-2026', time: '09:00 AM', purpose: 'Quarterly Critical Firmware Audit', gateOfficer: 'Officer Shadow-3' },
  { dispatchId: 'DISPATCH-TRX12', date: '14-05-2026', time: '04:30 PM', purpose: 'Emergency HVAC Component Diagnostic', gateOfficer: 'Officer Titan-1' },
];

export default function RepeatedVisitorsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Twin-Drawer Interface States
  const [selectedMasterVisitor, setSelectedMasterVisitor] = useState<Visitor | null>(null); // Controls Middle Drawer
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<any | null>(null);     // Controls Right Drawer

  const filteredMasterList = MASTER_REPEATED_VISITORS.filter(
    v => (v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) || v.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Package the exact historical attributes to forward back to the home console
  const executeReRegistrationWorkflow = (visitor: Visitor) => {
    const autofillPayload = {
      pipelineCategory: 'Repeated Visitor',
      name: visitor.name,
      email: `${(visitor.name ?? 'unknown').toLowerCase().replace(/\s+/g, '')}@defence.gov.in`, 
      dob: '1996-08-24', 
      idRef: 'AADH-8839-2041-9920', 
      address: 'Hangar Block 4, Defense Corridor, Phase II, Bengaluru',
      purpose: selectedHistoryEntry?.purpose || visitor.purpose,
      fileUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400' // Pre-scanned encrypted mock token doc
    };

    // Forward the state securely over the React Router compilation pipe
    navigate('/employee', { state: { autofillData: autofillPayload } });
  };

  return (
    <div className="min-h-screen bg-[#0e121a] text-white p-6 font-sans">
      
      {/* Upper Navigation Row */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/employee')}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              Repeated Visitor Registry
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Frequent clearance credentials management terminal</p>
          </div>
        </div>

        {/* Local Table Search Bar filter box */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-72">
          <Search className="text-gray-500 mr-2 h-4 w-4" />
          <input
            type="text"
            placeholder="Search master profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs focus:outline-none placeholder-gray-500 text-white"
          />
        </div>
      </div>

      {/* 1. MASTER DIRECTORY TABLE */}
      <div className="bg-gray-900 border border-[#21262d] rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse text-sm text-slate-300">
          <thead className="bg-[#161b22] text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Registry ID</th>
              <th className="p-4">Visitor Name</th>
              <th className="p-4">Classification Group</th>
              <th className="p-4">Security Registry Status</th>
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
                    Verified / Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= LAYER A: MIDDLE DRAWER (Pass Dispatch History Table Log) ================= */}
      <RightDrawer
        isOpen={selectedMasterVisitor !== null}
        onClose={() => setSelectedMasterVisitor(null)}
        title={`Visitation Logs — ${selectedMasterVisitor?.name || ''}`}
      >
        <div className="p-5 space-y-4 h-full flex flex-col">
          <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-950/40 p-3 rounded-lg border border-slate-850">
            <Clock className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Select an archived dispatch token to inspect file profiles and cryptographic logs.</span>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-lg overflow-hidden flex-1 overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 sticky top-0">
                <tr>
                  <th className="p-3">Dispatch ID / Date</th>
                  <th className="p-3">Log Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {REPEATED_VISITATION_HISTORY.map((log) => (
                  <tr 
                    key={log.dispatchId}
                    onClick={() => setSelectedHistoryEntry(log)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-mono">
                      <div className="text-white font-medium">{log.dispatchId}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{log.date} {log.time}</div>
                    </td>
                    <td className="p-3 truncate max-w-[150px] text-slate-300 italic">{log.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </RightDrawer>

      {/* ================= LAYER B: RIGHT DRAWER (Deep Dossier View + Reregistration Action Redirect) ================= */}
      <RightDrawer
        isOpen={selectedHistoryEntry !== null}
        onClose={() => setSelectedHistoryEntry(null)}
        title="Archived Session Track Token"
      >
        {selectedHistoryEntry && (
          <div className="p-5 space-y-5 h-full flex flex-col justify-between text-slate-200">
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 font-mono">
                    Security Audit Record
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">{selectedHistoryEntry.dispatchId}</h4>
                </div>
                <FileText className="h-5 w-5 text-slate-500" />
              </div>

              <div className="space-y-3 bg-slate-950/40 p-4 rounded-lg border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5">Logged Transaction Timestamp</span>
                  <span className="text-slate-300 font-mono">{selectedHistoryEntry.date} | {selectedHistoryEntry.time}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Historical Purpose Context</span>
                  <span className="text-slate-300 leading-relaxed">{selectedHistoryEntry.purpose}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Processing Gate Authority</span>
                  <span className="text-slate-300 font-mono">{selectedHistoryEntry.gateOfficer}</span>
                </div>
              </div>
            </div>

            {/* Re-Registration Action Footer Trigger */}
            <button
              onClick={() => {
                if (selectedMasterVisitor) {
                  executeReRegistrationWorkflow(selectedMasterVisitor);
                }
              }}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs tracking-wide transition shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-auto"
            >
              <UserCheck className="h-4 w-4" />
              Re-Register & Autofill Profile
            </button>
          </div>
        )}
      </RightDrawer>
    </div>
  );
}