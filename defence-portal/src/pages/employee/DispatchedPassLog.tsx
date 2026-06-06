import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { getStoredPasses } from "../../utils/passStorage";
import type { PassRecord } from "../../utils/passStorage";
import DetailModal from '../../components/DetailModal';
import PassDetailView from '../../components/PassDetailView';

export default function DispatchedPassLog() {
  const navigate = useNavigate();
  const [selectedPass, setSelectedPass] = useState<PassRecord | null>(null);
  // EDITED: Changed getAllPasses to getStoredPasses for consistency
  const [masterPassHistory, setMasterPassHistory ] = useState<PassRecord[]>(()=>
  {return getStoredPasses();});

  //sync the fresh strg ledger onto the screen on load
  useEffect(()=>{
    setMasterPassHistory(getStoredPasses());
  },[])


  return (
    <div className ="min-h-screen p-6 relative bg-[#0e121a] px-0 py-0 " > {/*the entire card*/}
      <header className='flex items-center gap-4 mb-2 py-4 shadow-xl bg-gray-900'> 
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
              <th className='p-3.5 border-r border-[#21262d]'>Requested Type</th>
              <th className='p-3.5 border-r border-[#21262d]'>Status</th>
              <th className='p-3.5 border-r border-[#21262d]'>Requested Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#21262d] text-gray-300 text-sm'>
            {masterPassHistory.map((pass)=>(
              <tr 
                key={pass.passId}
                onClick={()=> setSelectedPass(pass)}
                className='hover:bg-[#161b22]/20 cursor-pointer transition-colors group'
              >
                <td className='p-4 text-gray-400 font-mono text-xs'>{pass.createdAt}</td>
                <td className = "p-3.5 font-mono font-medium text-amber-500 group-hover:underline ">{pass.passId}</td>
                <td className = "p-3.4 font-medium text-gray-200">{pass.holderName}</td>
                <td className='p-3.5 font-medium'>{pass.escortedManifest }</td>              
                <td className='p-3.5'>
                  <StatusBadge status={pass.visitorCategory || 'Unknown'} />
                </td>
                <td className='p-3.5'>
                  <StatusBadge status={pass.liveStatus || 'Unknown'} />
                </td>
                <td className='p-3.5 font-medium'>{pass.requestedDate }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <DetailModal
          isOpen = {!!selectedPass}
          onClose={()=>setSelectedPass(null)}
          title="Visitor Record"
          subtitle='Complete Dispatch Ledger Entry'
        >

        {selectedPass && <PassDetailView pass= {selectedPass} />}
      </DetailModal>
      
    </div>
  );
}
