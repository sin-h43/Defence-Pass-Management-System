import { useState, useEffect } from "react";
import { Eye, Download, MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";
import RightDrawer from "./RightDrawer";
import type { Visitor } from './../utils/searchFilters';

interface DataTableProps {
  headers: string[];
  rows: Visitor[];
  externalSelectedRow?: Visitor | null;
  onExternalSelectRow?: (row: Visitor | null) => void;
}

export default function DataTable({ headers, rows, externalSelectedRow, onExternalSelectRow }: DataTableProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Visitor | null>(null);

  useEffect(() => {
    if (externalSelectedRow) {
      setSelectedRow(externalSelectedRow);
      setIsDrawerOpen(true);
    }
  }, [externalSelectedRow]);

  const handleOpenDetails = (row: Visitor) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
    if (onExternalSelectRow) onExternalSelectRow(row);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRow(null);
    if (onExternalSelectRow) onExternalSelectRow(null);
  };

  // Dynamic style helper matching the image's category badges
  const getCategoryStyles = (category: string = "General Visitor") => {
    switch (category) {
      case "General Visitor": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Foreign National": return "bg-orange-50 text-orange-600 border-orange-100";
      case "HR Related": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Government Official": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Service Provider": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-200 select-none">
              {headers.map((header, idx) => (
                <th key={idx} className={`py-3 px-4 font-semibold ${header === "Actions" ? "text-center" : ""}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {rows.map((row, idx) => (
              <tr key={row.id || idx} className="hover:bg-slate-50/70 transition-colors">
                
                {/* 1. Visitor Info Cell */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-800">{row.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {/* Fallback mock metrics if phone/email aren't standard on your Visitor type */}
                    {(row as any).phone || "+91 98765 12345"}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {(row as any).email || `${row.name.toLowerCase().replace(/\s+/g, '')}@example.com`}
                  </div>
                </td>

                {/* 2. Category Badge */}
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getCategoryStyles((row as any).category)}`}>
                    {(row as any).category || "General Visitor"}
                  </span>
                </td>

                {/* 3. Host Details */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-700">{(row as any).host || "Authorized Officer"}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{(row as any).department || "Security Dept"}</div>
                </td>

                {/* 4. Purpose */}
                <td className="py-3.5 px-4 font-medium text-slate-600">{row.purpose}</td>

                {/* 5. Visit Date & Time */}
                <td className="py-3.5 px-4 font-medium text-slate-600">{row.requestedDate}</td>

                {/* 6. Live Status Badging */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={row.liveStatus || "Pending"} />
                </td>

                {/* 7. Pass Type */}
                <td className="py-3.5 px-4 font-semibold text-slate-500">{row.type || "One Day"}</td>

                {/* 8. Explicit Action Icon Row */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center justify-center gap-2.5 text-slate-400">
                    <button 
                      onClick={() => handleOpenDetails(row)}
                      className="hover:text-blue-600 p-1 rounded hover:bg-slate-100 transition-colors" 
                      title="View Pass Dashboard"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors" title="Download Token Manifest">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Re-styled Bottom Pagination Footer Bar */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span>Showing 1 to {rows.length} of {rows.length} entries</span>
        <div className="flex items-center gap-1.5">
          <button className="px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">1</button>
        </div>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="bg-slate-50 border border-slate-200 rounded p-1 text-slate-600 outline-none">
            <option>{rows.length}</option>
            <option>10</option>
            <option>25</option>
          </select>
        </div>
      </div>

      {/* Right Side Drawer Component */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title={`Security Entry Dossier - ${selectedRow?.id || ""}`}
      >
        <div className="space-y-4 text-slate-700">
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Visitor Name</p>
            <p className="text-slate-900 font-bold text-sm mt-0.5">{selectedRow?.name}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Pass Tracker Token</p>
            <p className="text-blue-600 font-mono font-bold mt-0.5">{selectedRow?.id}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Operational Purpose</p>
            <p className="font-medium mt-0.5">{selectedRow?.purpose}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Scheduled Window</p>
            <p className="font-medium mt-0.5">{selectedRow?.requestedDate}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Pass Allocation Class</p>
            <p className="font-semibold text-slate-600 mt-0.5">{selectedRow?.type || "One Day"}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Current Security Status</p>
            <div className="mt-1">
              <StatusBadge status={selectedRow?.liveStatus || "Pending"} />
            </div>
          </div>
        </div>
      </RightDrawer>
    </div>
  );
}