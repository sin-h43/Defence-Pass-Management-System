import StatusBadge from "./StatusBadge";

interface DataTableProps {
    headers: string[];
    rows: Array<{ 
        id: string;
        name: string;
        purpose: string;
        time: string;
        type: string;
        status: string;
    }>;
}

export default function DataTable({ headers, rows }: DataTableProps) {
    return (
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
            <tr key={row.id} className="hover:bg-[#161b22]/20 transition-colors">
              <td className="p-3.5 font-mono text-amber-500 font-medium">{row.id}</td>
              <td className="p-3.5 font-medium text-gray-200">{row.name}</td>
              <td className="p-3.5 text-gray-400">{row.purpose}</td>
              <td className="p-3.5 text-gray-500">{row.time}</td>
              <td className="p-3.5 text-gray-400">{row.type}</td>
              <td className="p-3.5 text-right">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    );
}