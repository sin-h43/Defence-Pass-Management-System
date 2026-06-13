import {cn} from '../lib/utils'
 import React, {useState} from 'react';
import { LayoutDashboard,Users, FileText, ShieldAlert, UserCheck, Settings, LogOut, ChevronRight,Search, Bell, PanelLeft,PanelRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DashboardLayout({children}: {children: React.ReactNode}){
    const navigate = useNavigate();
    const location = useLocation();
    // const [activeTab, setActiveTab] = useState("Dashboard")
    const [isPanelOpen, setIsPanelOpen] = useState(false)

    const navItems = [
        {name:"Dashboard", icon: LayoutDashboard },
        {name:"Visitor Management", icon: Users, hasSub:true , path:'/hr/visitorMgmt'},
        {name:"Analytics", icon: FileText, path:'/hr/analytics'},
        {name:"Security Alerts", icon:ShieldAlert},
        {name:"Audit Logs", icon: UserCheck},
        {name:"Settings", icon: Settings},
    ]

    return(
        <div className='flex w-screen h-screen overflow-hidden'>
            {/*SideBar nav */}
            <aside className={cn('bg-gray-900 border-r border-gray-700 flex flex-col justify-between p-4 shrink-0 transition-all duration-300 ease-in-out gap-3',
              isPanelOpen? 'w-64 items-stretch' : 'w-16 items-center px-2'
            )}>
            <div>
                {/*header logo box*/}
             <div className={cn("p-5 border-b border-slate-800/60 flex items-center gap-3",
                !isPanelOpen && 'border-none bg-gray-800/40 justify-center'
             )}>
            <div className="h-7 w-7 bg-amber-500 rounded flex items-center justify-center font-black text-black text-xs tracking-wider">
              DF
            </div>
            {isPanelOpen && (
              <div >
              <h1 className="font-bold text-xs tracking-wide text-white uppercase">Defence System</h1>
              <p className="text-[9px] text-amber-500 font-mono tracking-widest uppercase">Visitor Pass</p>
            </div>
            )}
          </div>   

          <nav className='p-3 space-y-1 mt-4 text-white'>
            {navItems.map((item)=>{
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return(
                    <button
                        key={item.name}
                       onClick={() => {
  // State setter is async, but putting it second ensures it gets queued
  if (item.path) 
    navigate(item.path);
  }}
                        className={cn(
                          "group w-full h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center text-sm hover:bg-gray-800 cursor-pointer transition-colors",
              isActive ? 'px-3 justify-between' : 'justify-center p-0',
              !isPanelOpen && 'justify-center px-0'
              )}>
                <div className="flex items-center gap-3">
                    <Icon 
                      onClick={()=> {if(item.path) {item.path};}}
                    className={cn("h-4 w-4" ,isActive ? "text-amber-500" : "text-slate-500 group-hover:text-slate-200")} />
                    {isPanelOpen && <span>{item.name}</span>}
                  </div>
                  {item.hasSub && isPanelOpen && (
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
            {isPanelOpen && (
              <div className='items-down'>
              <p className="text-xs font-medium text-slate-200">Sinchana K</p>
              <p className="text-[10px] text-slate-500 font-mono">Admin Officer</p>
            </div>
            )}
          </div>
          <button className="text-slate-500  hover:text-rose-400 transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        </aside>
        <main className='flex flex-col flex-1 overflow-hidden'>
            {/*Top Header Bar */}
            <header className="h-16 bg-gray-900 border-b border-[#21262d] shrink-0 flex items-center justify-between px-6 z-10 gap-3">
              <div className='text-gray-400'
                onClick={()=> setIsPanelOpen(!isPanelOpen)}>
                {isPanelOpen ? <PanelLeft size={20} /> : <PanelRight size={20}/>}
              </div>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 w-80">
              <Search className="text-gray-500 mr-2 h-4 w-4 shrink-0" />
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