import StatusBadge from "./StatusBadge";
import {useState} from "react";
import RightDrawer from "./RightDrawer";
interface RowData {
  id: string;
  name: string;
  purpose: string;
  requestTime: string;
  type: string;
  status: string;
}

interface DataTableProps {
    headers: string[];
    rows: RowData[];
}

export default function DataTable({ headers, rows }: DataTableProps) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const handleRowClick = (row: RowData) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
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
              className="hover:bg-[#161b22]/20 transition-colors"
            >
              <td className="p-3.5 font-mono text-amber-500 font-medium">{row.id}</td>
              <td className="p-3.5 font-medium text-gray-200">{row.name}</td>
              <td className="p-3.5 text-gray-400">{row.purpose}</td>
              <td className="p-3.5 text-gray-500">{row.requestTime}</td>
              <td className="p-3.5 text-gray-400">{row.type}</td>
              <td className="p-3.5 text-right">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      {/*Resuable Right Drawer Component for Detailed View on Row Click*/}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`Security Entry Dossier - ${selectedRow?.id}`}
      >
        {selectedRow && (
          <div className="space-y-4">
            <div>
              <span className="text-gray-500 block mb-0.5">Visitor Identity Record</span>
              <span className="text-base font-semibold text-white block">{selectedRow.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-gray-500 block mb-0.5">Assigned Pipeline</span>
                <span className="text-gray-200 font-medium">{selectedRow.type}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-0.5">Check-In Timestamp</span>
                <span className="text-gray-200 font-medium">{selectedRow.requestTime}</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-gray-500 block mb-0.5">Declared Purpose of Visit</span>
              <span className="text-gray-200 font-medium">{selectedRow.purpose}</span>
            </div>
            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-gray-500">Live Status:</span>
              <StatusBadge status={selectedRow.status} />
            </div>
          </div>
        )}
      </RightDrawer>
    </div>
    );
}