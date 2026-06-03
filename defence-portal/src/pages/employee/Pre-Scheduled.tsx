import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

export default function PreSched(){
    const navigate = useNavigate();
    return(
        <div className="min-h-screen p-6 relative px-0 py-0 bg-[#0e121a]">
            <header className="flex items-center gap-4 py-4 shadow-xl bg-gray-900 ">
                <div className="bg-gray-800 border border-[#30363d] rounded-lg px-0.5 ml-3">
                    <button
                        className="p-1 hover:bg-[#0e121a] rounded-lg text-gray-400 hover:text-white transition"
                        onClick={()=> navigate('/employee')}>
                    <ArrowLeft size={20}/>
                    </button>
                </div>
                <div>
                    <h1 className="text-2xl text-white font-bold tracking-tight">Pre-Scheduled Visitors</h1>
                    <p className="text-xs text-white">helloo</p>
                </div>
            </header>
            <div className="px-8 mt-2">
                <div className="relative w-full max-w-md mx-4 group">
                    <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400 group-focus-within:text-amber-500 transition-color"/>
                    <input type="text"
                        placeholder="Search visitors, requests, ID..." 
                        className='w-full bg-gray-950/50 border border-[#30363d] rounded-lg pl-8 pr-16 text-sm text-gray-200 py-1 placeholder-gray-500 focus:outline-none focus:border-[#444c56] focus:bg-[#12162d] transition-all'    
                    />
                </div>
            </div>
            <div>
                <table className="w-full text-left border-collapse ml-3 mr-7 my-4">
                    <thead>
                        <tr className="bg-gray-800/20 border-b border-[#21262d]  text-xs font-semibold uppercase text-gray-400 tracking-wide text-lef">
                            <th className='p-3.5 border-r border-[#21262d]'>Created At</th>
                            <th className='p-3.5 border-r border-[#21262d]'>Pass ID</th>            
                            <th className='p-3.5 border-r border-[#21262d]'>Holder Name</th>
                            <th className='p-3.5 border-r border-[#21262d]'>Escorted Manifest</th>
                            <th className='p-3.5 border-r border-[#21262d]'>Clearance</th>
                            <th className='p-3.5 border-r border-[#21262d]'>Requested Date</th>
                            <th className='p-3.5 border-r border-[#21262d]'>Status</th>
                        </tr>
                    </thead>

                </table>
            </div>
        </div>
    );
}