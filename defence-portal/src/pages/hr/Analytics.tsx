import { ChevronLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import KPICards from '@/components/KPICards';
import PeakTrafficChart from '@/components/PeakTrafficChart';
import ComplianceReporting from '@/components/ComplianceReporting';
import DepartmentBarChart from '@/components/DepartmentBarChart';

import {PieChart, Pie, Tooltip,ResponsiveContainer,Cell} from 'recharts';
import ClassificationPieChart from '@/components/ClassificationPieChart';
// const departmentCrowdData = [
//   { name: 'Research Wing', count: 124, fill: '#6366f1' },
//   { name: 'IT & Cyber', count: 98, fill: '#a855f7' },
//   { name: 'Operations', count: 76, fill: '#ec4899' },
//   { name: 'Logistics', count: 54, fill: '#14b8a6' },
//   { name: 'HR & Admin', count: 31, fill: '#f59e0b' },
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Peak Traffic Area Chart - Now imported */}
          <div className="lg:col-span-2">
            <PeakTrafficChart />
          </div>
          <DepartmentBarChart />

        <ClassificationPieChart/>

          <ComplianceReporting />
            
                
                
            </div>
          </div>  
    </div>
    );

}