// RepeatedVisitorsPage.tsx (updated)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, ArrowLeft, Clock, UserCheck } from 'lucide-react';
import RightDrawer from '../../components/RightDrawer';
import DetailModal from '../../components/DetailModal';
import PassDetailView from '../../components/PassDetailView';
import { useRepeatedVisitors } from '../../contexts/RepeatedVisitorsContext'; // Import the hook
import type { Visitor } from '../../utils/searchFilters';
import type { PassRecord } from '../../utils/passStorage';

export default function RepeatedVisitorsPage() {
  const navigate = useNavigate();
  const { masterVisitors, getVisitorHistory } = useRepeatedVisitors(); // Use context
  const [searchQuery, setSearchQuery] = useState('');
  
  // Twin Interface States
  const [selectedMasterVisitor, setSelectedMasterVisitor] = useState<Visitor | null>(null);
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<PassRecord | null>(null);

  const filteredMasterList = masterVisitors.filter(
    v => (v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) || 
         v.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get history for the selected visitor
  const visitorHistory = selectedMasterVisitor?.name
    ? getVisitorHistory(selectedMasterVisitor.name)
    : [];

  // Package the exact historical attributes to forward back to the home console
  const executeReRegistrationWorkflow = (visitor: Visitor, historyEntry: PassRecord) => {
    const autofillPayload = {
      pipelineCategory: 'Repeated Visitor',
      name: visitor.name,
      email: historyEntry.email || `${(visitor.name ?? 'unknown').toLowerCase().replace(/\s+/g, '')}@defence.gov.in`, 
      dob: historyEntry.dob || '1996-08-24', 
      ph: historyEntry.phoneNumber || '', // Add phone number
      idRef: historyEntry.value || 'AADH-8839-2041-9920', 
      address: historyEntry.address || 'Hangar Block 4, Defense Corridor, Phase II, Bengaluru',
      purpose: historyEntry.purpose || visitor.purpose,
      fileUrl: historyEntry.fileUrl || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400'
    };

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

      {/* ================= LAYER 2: MIDDLE DRAWER (Pass Dispatch History Table Log) ================= */}
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
                {visitorHistory.map((log) => (
                  <tr 
                    key={log.passId}
                    onClick={() => setSelectedHistoryEntry(log)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-mono">
                      <div className="text-white font-medium">{log.passId}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="p-3 truncate max-w-[150px] text-slate-300 italic">{log.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </RightDrawer>

      {/* ================= LAYER 3: DETAIL MODAL ================= */}
      <DetailModal
        isOpen={selectedHistoryEntry !== null}
        onClose={() => setSelectedHistoryEntry(null)}
        title="Complete Dispatch Ledger Entry"
        subtitle={`Pass ID: ${selectedHistoryEntry?.passId || ''} • ${selectedHistoryEntry?.liveStatus || 'Status Unknown'}`}
        widthClassName="max-w-6xl"
      >
        {selectedHistoryEntry && (
          <div>
            <PassDetailView pass={selectedHistoryEntry} />
            
            <div className="p-6 border-t border-slate-800 bg-slate-900/50">
              <button
                onClick={() => {
                  if (selectedMasterVisitor && selectedHistoryEntry) {
                    executeReRegistrationWorkflow(selectedMasterVisitor, selectedHistoryEntry);
                    setSelectedHistoryEntry(null);
                    setSelectedMasterVisitor(null);
                  }
                }}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-sm tracking-wide transition shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="h-4 w-4" />
                Re-Register & Autofill Profile with This Session Data
              </button>
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}