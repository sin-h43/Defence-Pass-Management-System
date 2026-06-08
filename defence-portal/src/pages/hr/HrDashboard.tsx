import {cn} from '../../lib/utils'
import DashboardLayout from '@/components/DashboardLayout';
import {Users, UserX, UsersRound, UserCheck} from 'lucide-react'
import React, { useState, useEffect } from 'react';
import {getStoredPasses} from "../../utils/passStorage"
import type { Visitor } from './../../utils/searchFilters';
import DataTable from '@/components/DataTable';



// Reusable card structure defined locally to keep things robust
interface MetricCardProps {
  title: string
  body: string
  value: string
  type: "pending" | "active" | "denied" | "total"
}


function MetricCard({title, value, body, type}: MetricCardProps){
        const iconMap = {
            pending: Users,
            active: UserCheck,
            denied: UserX,
            total: UsersRound,
        }
        const iconColorMap = {
            pending: "text-amber-500",
            active: "text-emerald-500",
            denied: "text-rose-500",
            total: "text-blue-500",
        }

        const IconComponent = iconMap[type]
        return(
            <div className='flex items-start justify-between group bg-gray-900 border border-gray-600/80 p-5 rounded-xl text-gray-200 font-semibold hover:bg-gray-800 '>
            <div className='space-y-1'>
                <p className={cn(
                    type === 'pending' && "group-hover:text-amber-500 ",
                    type === 'active' && "group-hover:text-emerald-500",
                    type === 'denied' && "group-hover:text-rose-500",
                    type === 'total' && "group-hover:text-blue-500",
                )}
                >{title}</p>
                <p className="text-xs  text-gray-400 max-w-sm">{body}</p>
                <p className={cn(
                    "text-2xl font-semibold mt-2 ",
                    type === 'pending' && "text-amber-500/70 ",
                    type === 'active' && "text-emerald-500/70",
                    type === 'denied' && "text-rose-500/70",
                    type === 'total' && "text-blue-500/70",
                )}> {value}</p>
            </div>
            <div className={cn(
                "p-3 rounded-lg shrink-0",
                    type === 'pending' && "bg-amber-500/20 ",
                    type === 'active' && "bg-emerald-500/20",
                    type === 'denied' && "bg-rose-500/20",
                    type === 'total' && "bg-blue-500/20",
            )}>
                <IconComponent className={cn(
                    "h-5 w-5",
                    iconColorMap[type]
                )} />
            </div>
        </div>
        )
}

export default function HrDashboard(){
    const [visitorsList, setVisitorsList] = useState <Visitor[]>([])

    //define headers exactly matchingte table columns you configured
    const tableHeaders = ["Pass ID", "Visitor Name", "Purpose of Visit","Requested Date", "Classification", "Live Status"]

    useEffect(()=>{
        //fetching entries n ->match Visitor type
        const storedEntries = getStoredPasses()

        const formattedData: Visitor[] = storedEntries.map((record)=>({
            id: record.passId,
            name: record.holderName,
            purpose: record.purpose,
            requestedDate: record.requestedDate ? new Date(record.requestedDate).toLocaleDateString() : record.createdAt || "Pending Status",
            type: record.visitorCategory || "Standard",
            liveStatus: record.liveStatus || "Pending"
        }))
        setVisitorsList(formattedData)
    },[])

    return(
        <DashboardLayout>
            <div className='space-y-6 '>
            {/*Head description Section */}
                <div className='mb-3'>
                    <h2 className='text-xl font-bold text-white tracking-tight'>HR Visitor Control Panel</h2>
                    <p className='text-xs text-gray-400 mt-1'>Manage, approve, and track active military personnel and contractor gate entry requests.</p>
                </div>
            </div>
            {/*Metric Overview Row */}
        <div className='flex space-x-3'>
            <div className='flex flex-col space-y-3'>
                <div className="grid grid-cols-1 mt-2 md:grid-cols-4 gap-2">
                    <MetricCard title="Total Requests"body='~' value="218" type="total"  />          
                    <MetricCard title="Pending Approvals" body='Awaiting approval' value="12" type="pending" />
                    <MetricCard title="Active Passes" body='Currently inside' value="45" type="active" />
                    <MetricCard title="Denied Passes" body='-5% from yday' value="02" type="denied" />
                </div>
                <div className="bg-[#0b0f19] border border-slate-800/80 rounded-xl overflow-hidden mt-6">
                    <div className="p-4 border-b border-slate-800/60 flex items-center justify-between bg-[#0e1424]/40">
                        <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono">Recent Pass Requests Log</h3>
                        <span className="text-[9px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                        SECURE STREAM
                        </span>
                    </div>
                
                {visitorsList.length === 0? (
                    <div className="p-12 text-center text-slate-500 text-xs font-mono bg-[#0b0f19]">
                        NO DISPATCHED ENTRIES FOUND IN DATABASE
                    </div> 
                    ):(
                        <div className="p-2 bg-[#0b0f19]">
                        {/* 4. Drop in your imported table component with arguments */}
                        <DataTable headers={tableHeaders} rows={visitorsList} />
                        </div>
                )}
                </div>
            </div>
            <div>
                <h2 className='text-white'>MEOW</h2>
            </div>
        </div>
        </DashboardLayout>
    )
}