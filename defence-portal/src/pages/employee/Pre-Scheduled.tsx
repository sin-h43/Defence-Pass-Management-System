import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { getStoredPasses } from "../../utils/passStorage";
import type { PassRecord } from "../../utils/passStorage";

export default function PreSched() {
  const navigate = useNavigate();
  const [selectedPass, setSelectedPass] = useState<PassRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Base State setup using shared ledger arrays
  const [scheduledPasses, setScheduledPasses] = useState<PassRecord[]>([]);

  // EDITED: Changed getAllPasses to getStoredPasses for consistency
  // Filter out any elements that aren't configured with a 'scheduled' tracking pipeline marker
  useEffect(() => {
    const freshLedger = getStoredPasses();
    const filtered = freshLedger.filter(
      (pass: any) => pass.visitorCategory === "scheduled"
    );
    setScheduledPasses(filtered);
  }, []);

  // Filter table rows matching global search queries dynamically on the client viewport
  const displayedPasses = scheduledPasses.filter((pass) => {
    const query = searchQuery.toLowerCase();
    return (
      pass.holderName.toLowerCase().includes(query) ||
      pass.passId.toLowerCase().includes(query) ||
      (pass.purpose && pass.purpose.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen p-6 relative px-0 py-0 bg-[#0e121a]">
      {/* Portal Header */}
      <header className="flex items-center gap-4 py-4 shadow-xl bg-gray-900">
        <div className="bg-gray-800 border border-[#30363d] rounded-lg px-0.5 ml-3">
          <button
            className="p-1 hover:bg-[#0e121a] rounded-lg text-gray-400 hover:text-white transition flex items-center"
            onClick={() => navigate("/employee")}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div>
          <h1 className="text-2xl text-white font-bold tracking-tight">
            Pre-Scheduled Visitors
          </h1>
          <p className="text-xs text-gray-400">
            Advanced Clearance Registry Ledger
          </p>
        </div>
      </header>

      {/* Action Filters Section */}
      <div className="px-6 mt-6 mb-4">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pre-scheduled visitors, requests, ID..."
            className="w-full bg-gray-950/50 border border-[#30363d] rounded-lg pl-10 pr-16 text-sm text-gray-200 py-1.5 placeholder-gray-500 focus:outline-none focus:border-[#444c56] focus:bg-[#12162d] transition-all"
          />
        </div>
      </div>

      {/* Main Reactive Workspace Table Container */}
      <div className="mx-3 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/20 border-b border-[#21262d] text-xs font-semibold uppercase text-gray-400 tracking-wide text-left">
              <th className="p-3.5 border-r border-[#21262d]">Created At</th>
              <th className="p-3.5 border-r border-[#21262d]">Pass ID</th>
              <th className="p-3.5 border-r border-[#21262d]">Holder Name</th>
              <th className="p-3.5 border-r border-[#21262d]">Escorted Manifest</th>
              <th className="p-3.5 border-r border-[#21262d]">Clearance</th>
              <th className="p-3.5 border-r border-[#21262d]">Requested Date</th>
              <th className="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d] text-gray-300 text-sm">
            {displayedPasses.length > 0 ? (
              displayedPasses.map((pass) => (
                <tr
                  key={pass.passId}
                  onClick={() => setSelectedPass(pass)}
                  className="hover:bg-[#161b22]/20 cursor-pointer transition-colors group"
                >
                  <td className="p-4 text-gray-400 font-mono text-xs">
                    {pass.createdAt ? new Date(pass.createdAt).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'}) : 'N/A'}
                  </td>
                  <td className="p-3.5 font-mono font-medium text-amber-500 group-hover:underline">
                    {pass.passId}
                  </td>
                  <td className="p-3.5 font-medium text-gray-200">
                    {pass.holderName}
                  </td>
                  <td className="p-3.5 font-mono text-xs text-gray-400">
                    {pass.escortedManifest}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={pass.clearanceLevel || "Level 1"} />
                  </td>
                  <td className="p-3.5 font-mono text-xs text-amber-400 font-semibold">
                    {pass.requestedDate ? pass.requestedDate.replace('T', ' ') : 'Immediate'}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950/40 text-blue-400 border border-blue-900/40">
                      {pass.liveStatus || "Awaiting Arrival"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500 italic">
                  No upcoming pre-scheduled visits found in security storage arrays matching the specified criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Central Inspection Modal Overlay */}
      {selectedPass && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSelectedPass(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
            <div
              className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Pre-Scheduled Entry Record
                  </h2>
                  <p className="text-xs text-slate-400">
                    Pre-Vetted Clearance Ledger Check
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPass(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body Wrapper */}
              <div className="grid md:grid-cols-2">
                {/* Left Form Panel Metadata */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-70px)]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500 font-mono">Pass ID</label>
                      <p className="text-amber-500 font-mono font-bold text-sm">{selectedPass.passId}</p>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Pipeline Pipeline</label>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950/50 text-blue-400 border border-blue-800">
                        Pre-Scheduled Access
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Holder Name</label>
                      <p className="text-gray-200 font-medium text-base">{selectedPass.holderName}</p>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Target ETA Window</label>
                      <p className="text-amber-400 text-sm font-mono font-bold">{selectedPass.requestedDate ? selectedPass.requestedDate.replace('T', ' ') : 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Phone Number</label>
                      <p className="text-amber-400 text-sm font-mono font-bold">{selectedPass.ph || 'N/A' }</p>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Email Address</label>
                      <p className="text-gray-300 text-sm font-mono">{selectedPass.email || 'N/A'}</p>
                    </div>
                    </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-800/60 pt-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Clearance Threshold</label>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold border border-emerald-800 text-emerald-400 bg-emerald-950/20">
                        {selectedPass.clearanceLevel || "Level 1"}
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Purpose of Visit</label>
                      <p className="text-gray-300 text-sm mt-1">{selectedPass.purpose || 'General Visit'}</p>
                    </div>
                  </div>

                  {/* Accompanying Escort Manifest Groupings */}
                  <div className="border-t border-gray-800/60 pt-4">
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Linked Escort Members List ({selectedPass.escortList?.length || 0})
                    </label>
                    {selectedPass.escortList && selectedPass.escortList.length > 0 ? (
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {selectedPass.escortList.map((escort: any, index: number) => (
                          <div key={index} className="p-2 bg-[#0d1117] border border-[#21262d] rounded-lg text-xs flex justify-between items-center">
                            <div>
                              <p className="text-gray-200 font-medium">{escort.name || `Escort Member`}</p>
                              <p className="text-gray-500 font-mono text-[10px]">{escort.idRef}</p>
                            </div>
                            <span className="px-1.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-amber-500 text-[10px] font-mono">
                              {escort.idType || "Gov ID"}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-xs italic bg-[#0d1117]/30 p-2 rounded border border-dashed border-gray-800">
                        No auxiliary escorted individuals linked onto this individual clearance key.
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Document Display Panel */}
                <div className="border-l border-slate-800 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-white mb-4">
                        Uploaded Verification File
                        </h3>
                        <span className="px-1.5  rounded bg-gray-900 border border-gray-800 text-amber-500 text-[10px] font-mono">
                              {selectedPass.idType || "Gov ID"}
                        </span>

                    </div>
                    <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                      <img
                        src={selectedPass.fileUrl || "https://placeholder.pics/svg/400x250/0F172A/94A3B8/NoImage"}
                        alt="Verification Document"
                        className="w-full h-[280px] object-cover"
                      />
                      <div className="p-3 border-t border-slate-800">
                        <p className="text-xs text-slate-400">
                          Pre-registered system screening documentation attachments.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/20 transition">
                      View Document
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/20 transition">
                      Approve Check-In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
