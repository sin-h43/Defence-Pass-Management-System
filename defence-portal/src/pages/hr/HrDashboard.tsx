import {cn} from '../../lib/utils'
import DashboardLayout from '@/components/DashboardLayout';
import React, {useState} from 'react';
import {Plus, ShieldCheck} from 'lucide-react'

// Reusable card structure defined locally to keep things robust
interface MetricCardProps {
  title: string
  value: string
  type: "pending" | "active" | "denied" | "total"
}
function MetricCard({title, value, type}: MetricCardProps){

        return(
             <div className='bg-[#0bf19] border border-gray-600/80 p-5 rounded-xl text-white bg-gray-800'>
            <p>{title}</p>
            <p className={cn(
                "text-2xl front-bold mt-2",
                type === 'pending' && "text-amber-500",
                type === 'active' && "text-emerald-500",
                type === 'denied' && "text-rose-500",
                type === 'total' && "text-blue-500",
            )}> {value}</p>
        </div>
        )
}

export default function HrDashboard(){
    const [isPanelOpen, setIsPanelOpen] = useState(false)

    return(
        <DashboardLayout>
            <div className='space-y-6 '>
            {/*Head description Section */}
                <div>
                    <h2 className='text-xl font-bold text-white tracking-tight'>HR Visitor Control Panel</h2>
                    <p className='text-xs text-gray-400 mt-1'>Manage, approve, and track active military personnel and contractor gate entry requests.</p>
                </div>
            </div>
            
            <button 
                onClick={()=> setIsPanelOpen(true)}
                className='flex items-center gap-2 bg-amber-500 hover:bg-amber text-black px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-lg shadow-amber-500/10 cursor-pointer'>
                    <Plus className = "h-4 w-4 stroke-[3]" /> Create Pass Request
            </button>
            {/*Metric Overview Row */}
        <div className="grid grid-cols-1 mt-2 md:grid-cols-4 gap-4">
          <MetricCard title="Total Requests" value="218" type="total"  />          
          <MetricCard title="Pending Approvals" value="12" type="pending" />
          <MetricCard title="Active Passes" value="45" type="active" />
          <MetricCard title="Denied Passes" value="02" type="denied" />
        </div>
        </DashboardLayout>
    )
}