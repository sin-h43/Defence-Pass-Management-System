import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, X, UserCheck, FileText, Search } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';


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
    <div className =" bg-gray-950/50 min-h-screen p-6 relative" > {/*the entire card*/}
      <div className='flex items-center gap-4 mt-3 mb-2 shadow-xl '> 
        {/*Header section */}
        <div className='bg-gray-800 border border-[#30363d] rounded-lg ml-3'>
          {/*icon */}
          <button onClick = {()=> navigate('/employee')}
            className='p-1 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition'>
            <ArrowLeft size={20} />
          </button>
        </div>
        {/*Title section */}
        <div>
          <h1 className='text-2xl text-white font-bold tracking-tight'>Master Dispatched Pass Log</h1>
          <p className='text-xs text-white mb-1'>Comp</p>
        </div>
      </div>
      <div className='px-6 mb-6' >
        <div className = "relative max-w-lg">
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400'/>
          <input 
            type='text'
            placeholder='Query dispatch ledger'
            className='w-full
                            bg-[#0d1117]
                            border border-[#30363d]
                            rounded-lg
                            pl-10
                            pr-4
                            py-2.5
                            text-sm
                            text-gray-200
                            placeholder:text-gray-500
                            focus:outline-none
                            focus:border-blue-500'
            />

        </div>

      </div>
      
      <div className='bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-x-auto'>
        {/*table */}
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-slate-950/60 border-b border-slate-800 text-xs font-semibold uppcase text-slate-400 tracking-wide '>
              <th className='p-4'>Pass ID</th>
              <th className='p-4'>Holder Name</th>
              <th className='p-4'>Clearance</th>
              <th className='p-4'>Escorted Manifest</th>
              <th className='p-4'>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-800/50 text-sm'>
            {masterPassHistory.map((pass)=>(
              <tr 
                key={pass.passId}
                onClick={()=> setSelectedPass(pass)}
                className='hover:bg-slate-800/60 cursor-pointor transition-colors gorup'>
                <td className = "p-4 font-mono font-medium text-blue-400 group-hover:underline">{pass.passId}</td>
                <td className = "p-4 font-medium">{pass.holderName}</td>
                <td className='p-4 font-medium'>{pass.escortedManifest }</td>
                <td className='p-4'>
                  <StatusBadge status={pass.clearanceLevel} />
                </td>
                <td className='p-4'>
                  <StatusBadge status={pass.liveStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedPass && (
  <>
    {/* Background Overlay */}
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      onClick={() => setSelectedPass(null)}
    />

    {/* Center Modal */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blue-sm bg-black/75">
      <div
        className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Visitor Record
            </h2>
            <p className="text-xs text-slate-400">
              Complete Dispatch Ledger Entry
            </p>
          </div>

          <button
            onClick={() => setSelectedPass(null)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2">

          {/* LEFT PANEL */}
          <div className="p-6 space-y-5">

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Pass ID
              </p>
              <p className="text-white font-mono mt-1">
                {selectedPass.passId}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Holder Name
              </p>
              <p className="text-white mt-1">
                {selectedPass.holderName}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Clearance Level
              </p>
              <div className="mt-1">
                <StatusBadge status={selectedPass.clearanceLevel} />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Live Status
              </p>
              <div className="mt-1">
                <StatusBadge status={selectedPass.liveStatus} />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Escorted Manifest
              </p>
              <p className="text-white mt-1">
                {selectedPass.escortedManifest}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Purpose of Visit
              </p>
              <p className="text-white mt-1">
                {selectedPass.purpose}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Expiration Date
              </p>
              <p className="text-white mt-1">
                {selectedPass.expiration}
              </p>
            </div>

            {/* Example Aadhaar Section */}
            <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/50">
              <h4 className="text-sm font-medium text-white mb-3">
                Identity Verification
              </h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Document Type</span>
                  <span className="text-white">Aadhaar Card</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Verification</span>
                  <span className="text-emerald-400">Verified</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Encryption</span>
                  <span className="text-blue-400">AES-256 Stored</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="border-l border-slate-800 p-6">

            <h3 className="text-sm font-medium text-white mb-4">
              Uploaded Verification File
            </h3>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
              <img
                src={selectedPass.fileUrl}
                alt="Verification Document"
                className="w-full h-[420px] object-cover"
              />

              <div className="p-3 border-t border-slate-800">
                <p className="text-xs text-slate-400">
                  Encrypted document preview stored in the dispatch ledger.
                </p>
              </div>
            </div>

            {/* Optional Actions */}
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/20 transition">
                View Full File
              </button>

              <button className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm hover:bg-amber-500/20 transition">
                Audit Record
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </>
)}
      </div>
    </div>
  );

}