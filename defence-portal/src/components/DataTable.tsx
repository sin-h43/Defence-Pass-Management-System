import StatusBadge from "./StatusBadge";
import { useState, useEffect } from "react";
import RightDrawer from "./RightDrawer";
// 1. Import the global type from your utility file
import type { Visitor } from "../utils/searchFilters";

interface DataTableProps {
  headers: string[];
  rows: Visitor[]; // 2. Update to use Visitor[]
  externalSelectedRow?: Visitor | null; // 3. Update to use Visitor
  onExternalSelectRow?: (row: Visitor | null) => void; // 4. Update to use Visitor
}

export default function DataTable({ headers, rows, externalSelectedRow, onExternalSelectRow }: DataTableProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Visitor | null>(null); // 5. Update to use Visitor

  useEffect(() => {
    if (externalSelectedRow) {
      setSelectedRow(externalSelectedRow);
      setIsDrawerOpen(true);
    }
  }, [externalSelectedRow]);

  const handleRowClick = (row: Visitor) => { // 6. Update to use Visitor
    setSelectedRow(row);
    setIsDrawerOpen(true);
    if (onExternalSelectRow) onExternalSelectRow(row);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRow(null);
    if (onExternalSelectRow) onExternalSelectRow(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        {/* Keep the exact same mapping code inside the table—it stays unchanged! */}
        <thead>
          <tr className="border-b border-[#21262d] bg-gray-800/20 text-gray-400 font-medium select-none">
            {headers.map((header, idx) => (
              <th key={idx} className={`p-3.5 ${idx === headers.length - 1 ? 'text-right' : ''}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#21262d] text-gray-300">
          {rows.map((row) => (
            <tr key={row.id} 
              onClick={() => handleRowClick(row)}
              className="hover:bg-[#161b22]/20 transition-colors cursor-pointer"
            >
              <td className="p-3.5 font-mono text-amber-500 font-medium">{row.id}</td>
              <td className="p-3.5 font-medium text-gray-200">{row.name}</td>
              <td className="p-3.5 text-gray-400">{row.purpose}</td>
              <td className="p-3.5 text-gray-500">{row.requestTime}</td>
              <td className="p-3.5 text-gray-400">{row.type}</td>
              <td className="p-3.5 text-right">
                <StatusBadge status={row.status || 'Pending'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> 

      {/* Right Drawer section remains exactly identical below */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer} 
        title={`Security Entry Dossier - ${selectedRow?.id || ''}`}
      >
        <div className="space-y-4">
  <div>
    <p className="text-gray-500 text-xs">Visitor Name</p>
    <p className="text-white">{selectedRow?.name}</p>
  </div>

  <div>
    <p className="text-gray-500 text-xs">Visitor ID</p>
    <p className="text-amber-500 font-mono">{selectedRow?.id}</p>
  </div>

  <div>
    <p className="text-gray-500 text-xs">Purpose</p>
    <p>{selectedRow?.purpose}</p>
  </div>

  <div>
    <p className="text-gray-500 text-xs">Request Time</p>
    <p>{selectedRow?.requestTime}</p>
  </div>

  <div>
    <p className="text-gray-500 text-xs">Visitor Type</p>
    <p>{selectedRow?.type}</p>
  </div>

  <div>
    <p className="text-gray-500 text-xs">Status</p>
    <p>{selectedRow?.status}</p>
  </div>
</div>
      </RightDrawer>
    </div>
  );
}