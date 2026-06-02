import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Search } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { getStoredPasses } from "../../utils/passStorage";
import type { PassRecord } from "../../utils/passStorage";

// type PassRecord = {
//   passId: string;
//   holderName: string;
//   purpose: string;
//   email: string;
//   dob: string;
//   address: string;
//   clearanceLevel: string;
//   escortedManifest: string; 
//   requestedDate: string;
//   liveStatus: string;
//   fileUrl: string;
//   createdAt: string;
//   };


export default function DispatchedPassLog() {
  const navigate = useNavigate();
  const [selectedPass, setSelectedPass] = useState<PassRecord | null>(null);
  // Simulated data
  const masterPassHistory = getStoredPasses();


  return (
    <div className ="min-h-screen p-6 relative bg-[#0e121a] px-0 " > {/*the entire card*/}
      <header className='flex items-center gap-4 mb-2 h-16 shadow-xl bg-gray-900'> 
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
      </header>
      <div className='px-6 mb-6 ' >
        <div className="relative w-full max-w-md mx-4 group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search visitors, requests, ID..." 
              className="w-full bg-gray-950/50 border border-[#30363d] rounded-lg pl-10 pr-16 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#444c56] focus:bg-[#12161d] transition-all"
            />
        </div>
      </div>
      
      <div className='mx-3 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-x-auto'>
        {/*table */}
        <table className='w-full text-left border-collapse '>
          <thead>
            <tr className='bg-gray-800/20 border-b border-[#21262d]  text-xs font-semibold uppercase text-gray-400 tracking-wide text-left '>
              <th className='p-3.5 border-r border-[#21262d]'>Created At</th>
              <th className='p-3.5 border-r border-[#21262d]'>Pass ID</th>            
              <th className='p-3.5 border-r border-[#21262d]'>Holder Name</th>
              <th className='p-3.5 border-r border-[#21262d]'>Escorted Manifest</th>
              <th className='p-3.5 border-r border-[#21262d]'>Clearance</th>
              <th className='p-3.5 border-r border-[#21262d]'>Requested Date</th>
              <th className='p-3.5 border-r border-[#21262d]'>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#21262d] text-gray-300 text-sm'>
            {masterPassHistory.map((pass)=>(
              <tr 
                key={pass.passId}
                onClick={()=> setSelectedPass(pass)}
                className='hover:bg-[#161b22]/20 cursor-pointor transition-colors group'
              >
                <td className='p-4 text-gray-400 font-mono text-xs'>{pass.createdAt}</td>
                <td className = "p-3.5 font-mono font-medium text-amber-500 group-hover:underline ">{pass.passId}</td>
                <td className = "p-3.4 font-medium text-gray-200">{pass.holderName}</td>
                <td className='p-3.5 font-medium'>{pass.escortedManifest }</td>              
                <td className='p-3.5'>
                  <StatusBadge status={pass.clearanceLevel} />
                </td>
                <td className='p-4'>
                  <StatusBadge status={pass.liveStatus} />
                </td>
                <td className='p-3.5 font-medium'>{pass.requestedDate }</td>
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
                {selectedPass.requestedDate}
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