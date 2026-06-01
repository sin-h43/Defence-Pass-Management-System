import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, X, UserCheck, FileText } from 'lucide-react';

type PassRecord = {
  passId: string;
  holderName: string;
  clearanceLevel: string;
  escortedManifest: string;
  expiration: string;
  liveStatus: string;
  purpose: string;
  fileUrl: string;
};

export default function DispatchedPassLog() {
  const navigate = useNavigate();
  const [selectedPass, setSelectedPass] = useState<PassRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  //Simulated data
  const masterPassHistory = [
    { passId: "DP-2024-001", holderName: "Sinchana K", clearanceLevel: "Level 2", escortedManifest: "+ 1 Escorted", expiration: "2026-06-01", liveStatus: "Active", purpose: "Core Server Room Maintenance", fileUrl: "https://via.placeholder.com/400x250?text=Aadhaar+Card+Encrypted" },
    { passId: "DSP-8832", holderName: "Commander K. Singh", clearanceLevel: "Level 3", escortedManifest: "+ 2 Escorted", expiration: "2026-06-01", liveStatus: "Pending Clearance", purpose: "DRDO Tactical Alignment", fileUrl: "https://via.placeholder.com/400x250?text=Defense+ID+Form" },
    { passId: "DSP-4591", holderName: "Alok Mehta", clearanceLevel: "Level 2", escortedManifest: "None (Solo)", expiration: "2026-05-28", liveStatus: "Checked Out", purpose: "Logistics Delivery", fileUrl: "https://via.placeholder.com/400x250?text=Vendor+Pass+Scan" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 relative">
      
      {/* Header Actions */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/employee')} 
          className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Master Dispatched Pass Log</h1>
          <p className="text-xs text-slate-400">Complete historical system ledger database</p>
        </div>
      </div>

      {/* Master Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-800 text-xs font-semibold uppercase text-slate-400 tracking-wider">
              <th className="p-4">Pass ID</th>
              <th className="p-4">Holder Name</th>
              <th className="p-4">Clearance</th>
              <th className="p-4">Escorted Manifest</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-sm">
            {masterPassHistory.map((row) => (
              <tr 
                key={row.passId} 
                onClick={() => setSelectedPass(row)}
                className="hover:bg-slate-800/60 cursor-pointer transition-colors group"
              >
                <td className="p-4 font-mono font-medium text-blue-400 group-hover:underline">{row.passId}</td>
                <td className="p-4 font-medium">{row.holderName}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-xs border ${
                    row.clearanceLevel === 'Level 3' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {row.clearanceLevel}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{row.escortedManifest}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    row.liveStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {row.liveStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- THE MIDDLE DRAWER OVERLAY --- */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl h-[80vh] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <Shield className="text-blue-500" size={24} />
                <div>
                  <h2 className="text-lg font-mono font-bold text-slate-200">{selectedPass.passId}</h2>
                  <p className="text-xs text-slate-400">Security Entry Dossier</p>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedPass(null); setIsEditing(false); }}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content Split Grid */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Data Form fields */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Personnel Diagnostics</h3>
                
                <div className="space-y-3 bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-500 block">Full Name</label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      defaultValue={selectedPass.holderName} 
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 mt-1 text-sm disabled:opacity-70 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 block">Purpose of Entry</label>
                    <textarea 
                      disabled={!isEditing}
                      defaultValue={selectedPass.purpose} 
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 mt-1 text-sm disabled:opacity-70 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>

                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Accompanied Escort Details</h3>
                <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800 flex items-center gap-3">
                  <UserCheck className="text-blue-400" size={20} />
                  <div>
                    <p className="text-sm font-medium">{selectedPass.escortedManifest}</p>
                    <p className="text-xs text-slate-500">Personnel cleared under primary handler accountability</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Embedded Verification Image */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Loaded Credential Verification</h3>
                
                <div className="flex-1 min-h-[280px] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-2 bg-checkerboard">
                  {/* Active Document Frame */}
                  <img 
                    src={selectedPass.fileUrl} 
                    alt="Credential verification payload" 
                    className="max-w-full max-h-[260px] object-contain rounded border border-slate-800 shadow"
                  />
                  <div className="w-full mt-2 flex items-center justify-between px-2">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <FileText size={12} /> hardware_clearance_payload.jpg
                    </span>
                    <button className="text-[11px] text-blue-400 hover:underline">View Raw</button>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end gap-2">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-medium rounded text-white transition"
                  >
                    Save Modifications
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded transition"
                >
                  Edit Request Parameters
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );

}