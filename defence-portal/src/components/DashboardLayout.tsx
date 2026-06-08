import {cn} from '../lib/utils'
import React, {useState} from 'react';
import { LayoutDashboard,Users, FileText, ShieldAlert, UserCheck, Settings, LogOut, ChevronRight,Search, Bell } from 'lucide-react';


export default function DashboardLayout({children}: {children: React.ReactNode}){
    const [activeTab, setActiveTab] = useState("Dashboard")
    const navItems = [
        {name:"Dashboard", icon: LayoutDashboard},
        {name:"Visitor Management", icon: Users, hasSub:true},
        {name:"Pass Requests", icon: FileText},
        {name:"Security Alerts", icon:ShieldAlert},
        {name:"Approvals", icon: UserCheck},
        {name:"Settings", icon: Settings},
    ]

    return(
        <div className='flex w-screen h-screen overflow-hidden'>
            {/*SideBar nav */}
            <aside className='bg-gray-900 border-r border-gray-700 flex flex-col justify-start items-center gay-3'>
            <div>
                {/*header logo box*/}
             <div className="p-5 border-b border-slate-800/60 flex items-center gap-3">
            <div className="h-7 w-7 bg-amber-500 rounded flex items-center justify-center font-black text-black text-xs tracking-wider">
              DF
            </div>
            <div>
              <h1 className="font-bold text-xs tracking-wide text-white uppercase">Defence System</h1>
              <p className="text-[9px] text-amber-500 font-mono tracking-widest uppercase">Visitor Pass</p>
            </div>
          </div>   
          <nav className='p-3 space-y-1 mt-4 text-white'>
            {navItems.map((item)=>{
                const Icon = item.icon
                const isActive = activeTab == item.name
                return(
                    <button
                        key={item.name}
                        onClick={()=>setActiveTab(item.name)}
                        className={cn(
                            "h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center text-sm hover:bg-gray-800 cursor-pointer transition-colors w-full",
              isActive ? 'px-3 justify-start' : 'justify-center p-0'
              )}>
                <div className="flex items-center gap-3">
                    <Icon className={cn("h-4 w-4", isActive ? "text-amber-500" : "text-slate-400 group-hover:text-slate-200")} />
                    <span>{item.name}</span>
                  </div>
                  {item.hasSub && (
                    <ChevronRight className="h-3 w-3 text-slate-500 group-hover:text-slate-300" />
                  )}
              </button>
            )
            })}
          </nav>
        </div>
        {/* User Badge Footer */}
        <div className="p-4 border-t border-slate-800/60 flex items-center justify-between bg-[#090d16]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-white">
              SH
            </div>
            <div className='items-down'>
              <p className="text-xs font-medium text-slate-200">Sinchana K</p>
              <p className="text-[10px] text-slate-500 font-mono">Admin Officer</p>
            </div>
          </div>
          <button className="text-slate-500  hover:text-rose-400 transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        </aside>
        <main className='flex flex-col items-center'>
            {/*Top Header Bar */}
            <header className="h-16 bg-gray-900 border-b border-[#21262d] shrink-0 flex items-center justify-between px-6 z-10 gap-3">
            <div className="flex items-center bg-slate-900 border border-slate-850 rounded-lg px-3 py-2">
              <Search className="text-gray-500 mr-2 h-4 w-4" />
              <input
                type="text"
                placeholder="Search visitors, requests, ID..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-500 text-white"
              />    
            </div>
            <div className="flex items-center gap-4">
            <button className="relative p-1.5 text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800/80 rounded-md">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
            </button>            
          </div>            
            </header>
            {/*Dynamic Page Component Window */}
            <div className='flex-1 overflow-y-auto p-6 bg-[#070a12]'>
                {children}
            </div>
        </main>
        </div>
    )
}