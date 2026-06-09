import { ChevronLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import KPICards from '@/components/KPICards';
// Mock Data matching a Defense System environment
// const peakHoursData = [
//   { time: '06:00', visitors: 12 },
//   { time: '08:00', visitors: 45 },
//   { time: '10:00', visitors: 85 },
//   { time: '12:00', visitors: 60 },
//   { time: '14:00', visitors: 72 },
//   { time: '16:00', visitors: 90 },
//   { time: '18:00', visitors: 35 },
//   { time: '20:00', visitors: 15 },
// ];

// const departmentCrowdData = [
//   { name: 'Research Wing', count: 124, fill: '#6366f1' },
//   { name: 'IT & Cyber', count: 98, fill: '#a855f7' },
//   { name: 'Operations', count: 76, fill: '#ec4899' },
//   { name: 'Logistics', count: 54, fill: '#14b8a6' },
//   { name: 'HR & Admin', count: 31, fill: '#f59e0b' },
// ];

// const categoryData = [
//   { name: 'Contractors', value: 40, color: '#3b82f6' },
//   { name: 'Government Officials', value: 25, color: '#f59e0b' },
//   { name: 'Vendors', value: 20, color: '#10b981' },
//   { name: 'Foreign Nationals', value: 10, color: '#ef4444' },
//   { name: 'VIP Visitors', value: 5, color: '#ec4899' },
// ];




export default function Analytics(){
    const navigate = useNavigate();
    // const triggerDowload = (reportType:string) =>{
    //     alert(`Generating and dowloading ${reportType} Compliance Report...`);
    // };
    return(
        <div className='min-h-screen '>
            <div className='p-6 relative bg-[#0e121a] px-0 py-0'>
                <header className='flex items-center gap-4 mb-4 py-4 shadow-xl bg-gray-900'>
                {/*Header section */}
                <div className='bg-gray-800 border border-[#30363d] rounded-lg ml-3'>
                    <button onClick={()=> navigate('/hr')}
                    className='p-1 hover:bg-gray-900 rounded-lg text-gray-400 hover:text-white transition'>
                        <ChevronLeft size={20} />
                    </button>                
                </div>
                <div>
                    <h1 className='text-2xl text-white font-bold tracking-tight'>Analytics DashBoard</h1>
                    <p className='text-xs text-white mb-1'>Insights and analytics for visitor management</p>
                </div>
                </header>
            </div>
            <div className='p-6 text-white'>
              <KPICards/>
              
            </div>
            
    </div>
    );

}