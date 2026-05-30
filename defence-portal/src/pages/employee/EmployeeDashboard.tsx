import { Search, Menu, Bell } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeDashboard() {
  // 1. FIXED: State must be declared inside the component function
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    // outer container (FIXED: Corrected typo 'oveflow-hidden' to 'overflow-hidden')
    <div className="flex h-screen w-screen bg-[#0e121a] text-white font-sans overflow-hidden">
      
      {/* left sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col justify-start p-4 shrink-0"> 
        <div className="h-12 border border-dashed border-gray-600 rounded mb-5 flex items-center justify-center text-xs text-gray-400">       
          Logo & Title slot
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm">New Visitor</div> 
          <div className="h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm">Repeat History</div> 
          <div className="h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm">Request History</div> 
          <div className="h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm">Settings</div> 
        </div>
        <div className="h-12 border border-dashed border-gray-700 rounded text-xs text-gray-500 flex items-center justify-center mt-auto">
          Logout Button Slot
        </div>
      </aside>

      {/* 2.main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* min-w-0 prevents the layout from breaking or stretching horizontally when the content overflows.*/}
        {/*overflow-y-auto allows the main content area to scroll vertically if the content exceeds the viewport height, ensuring that all content remains accessible without breaking the layout.*/}
        
        {/* Top Header Navigation Panel */}
        <header className="h-16 bg-[#161b22]/80 border-b border-[#21262d] shrink-0 flex items-center justify-between px-6 z-10">
          {/*Hamburger menu*/}
          <button className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0">
            <Menu className="h-5 w-5" />
          </button>
          
          {/*Search Bar (FIXED: Added max width so it doesn't crowd out right-side header items)*/}
          <div className="relative w-full max-w-md mx-4 group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search visitors, requests, ID..." 
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-16 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#444c56] focus:bg-[#12161d] transition-all"
            />
            
            {/* Kbd Shortcut Badge pinned to the right side of the input field */}
            <div className="absolute right-3 top-2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-[#161b22] border border-[#30363d] rounded text-[10px] font-mono text-gray-500 pointer-events-none">
              <span>ctrl</span>
              <span>+</span>
              <span>k</span>
            </div>
          </div>

          {/* ZONE 2 & 3: RIGHT SIDE PLACEHOLDER FOR NEXT STEP (FIXED: Container handles notification bell inside header alignment) */}
          <div className="flex items-center gap-4 shrink-0">
            {/*nOTIFICATION bELL iCON Button */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-[#21262d] transition-all cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-4 w-4 bg-amber-500 text-[#0d1117] font-sans font-bold text-[10px] rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-6 top-14 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-xs text-gray-300">
                Notification Panel Active
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Dashboard View Grid Workspace */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Amit Sharma 👋</h2> 
          <div className="border border-dashed border-gray-700 h-96 rounded-xl p-4 text-center text-gray-500 flex items-center justify-center">
            Dashboard internal cards grid will sit right here
          </div>
        </main>
      </div>

    </div>
  );
}