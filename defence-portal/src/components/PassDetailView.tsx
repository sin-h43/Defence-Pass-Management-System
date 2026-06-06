// components/PassDetailView.tsx
import type { PassRecord } from "../utils/passStorage";

interface PassDetailViewProps {
  pass: PassRecord;
}

export default function PassDetailView({ pass }: PassDetailViewProps) {
  return (
    <div className="grid md:grid-cols-2">
      {/* LEFT PANEL */}
      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-70px)]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-mono">
              Pass ID
            </label>
            <p className="text-orange-400 font-mono font-bold text-sm">
              {pass.passId } 
              {/* removed pass.id */}
            </p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              Live Status
            </label>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-950/50 text-yellow-400 border border-yellow-800">
              {pass.liveStatus}
            </span>
          </div>
        </div>

        <div className="space-y-3 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              Holder Name
            </label>
            <p className="text-gray-200 font-medium text-base">{pass.holderName}</p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              Date of Birth
            </label>
            <p className="text-gray-300 text-sm font-mono">{pass.dob}</p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              Email Address
            </label>
            <p className="text-gray-300 text-sm font-mono">{pass.email}</p>
          </div>
          
          <div className='col-start-1 mt-2'>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              {pass.idType || "Government ID"}
            </label>
            <p className="text-gray-300 text-sm font-mono mt-0.5">
              {pass.idRef || "No ID Number Provided"}
            </p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              Phone Number
            </label>
            <p className="text-gray-300 text-sm font-mono">{pass.ph}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-800/60 pt-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              Clearance Level
            </label>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold border border-emerald-800 text-emerald-400 bg-emerald-950/20">
              {pass.clearanceLevel || 'Level 1'}
            </span>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500">
              Purpose of Visit
            </label>
            <p className="text-gray-300 text-sm mt-1">{pass.purpose || 'General Visit'}</p>
          </div>
        </div>

        <div className='border-t border-gray-800/60 pt-4'>
          <label className='block text-xs uppercase tracking-wider text-gray-500 mb-2'>
            Escorted Manifest Details
          </label>
          <p className='text-gray-400 text-xs mb-2 font-mono'>{pass.escortedManifest}</p>
          {pass.escortList && pass.escortList.length > 0 ? (
            <div className='space-y-2 max-h-48 overflow-y-auto pr-1'>
              {pass.escortList.map((escort: any, index: number) => (
                <div
                  key={index}
                  className='p-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-xs flex justify-between items-center'
                >
                  <div>
                    <p className="text-gray-200 font-medium">
                      {escort.name || `Escort #${index + 1}`}
                    </p>
                    <p className="text-gray-500 font-mono text-[10px]">
                      {escort.idRef}
                    </p>
                    <span className="px-1.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-400 text-[10px] font-mono">
                      {escort.idType || 'ID'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-xs italic bg-[#0d1117]/30 p-2 rounded border border-dashed border-gray-800">
              No secondary escorted escorts bound to this deployment clearance pass.
            </p>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Expiration Date
          </p>
          <p className="text-white mt-1">{pass.requestedDate}</p>
        </div>

        <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/50">
          <h4 className="text-sm font-medium text-white mb-3">
            Identity Verification
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Document Type</span>
              <span className="text-white font-mono">
                {pass.idType && pass.idType.trim() ? `${pass.idType} Card` : 'Verified Gov ID'}
              </span>
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
            src={pass.fileUrl}
            alt="Verification Document"
            className="w-full h-[420px] object-cover"
          />
          <div className="p-3 border-t border-slate-800">
            <p className="text-xs text-slate-400">
              Encrypted document preview stored in the dispatch ledger.
            </p>
          </div>
        </div>

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
  );
}