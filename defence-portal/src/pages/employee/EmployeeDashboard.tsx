import { Search, Menu, Bell, LogOut, ClipboardList, Settings, Shield, History, UserPlus, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

export default function EmployeeDashboard() {

  const [showNotifications, setShowNotifications] = useState(false);
  //FT-3 state to control opening. closing the registration form
  const [visitorCategory, setVisitorCategory] = useState('new');
  //State to track which clearance level button is selected inside the form
  const [clearanceLevel, setClearanceLevel] = useState('Level 2');
  //anchor reference used to target the registration block for scorlling
  const registrationFormRef = useRef<HTMLDivElement>(null);
  const scrollToRegistrationForm = () => {
    registrationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    // outer container (FIXED: Corrected typo 'oveflow-hidden' to 'overflow-hidden')
    <div className="flex h-screen w-screen bg-[#0e121a] text-white font-sans overflow-hidden">
      
      {/* left sidebar */}
      <aside className={`bg-gray-900 border-r border-gray-700 flex flex-col justify-start p-4 shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 items-stretch' : 'w-16 items-center px-2'
      }`}> 
        
        {/* Sidebar Header Logo Icon */}
        <div className={`h-12 border border-dashed border-gray-600 rounded mb-5 flex items-center justify-center text-xs text-gray-400 w-full ${
          !isSidebarOpen && 'border-none bg-gray-800/40'
        }`}>       
          <Shield className="h-5 w-5 shrink-0 text-amber-500"/>
          {isSidebarOpen && <span className="ml-2 font-medium">Employee Portal</span>}
        </div>
        {/*Navigation Items Link Stack */}     
        <div className="space-y-2 flex-1">
          {/*New Visitor Button */}
          <div 
            onClick = {scrollToRegistrationForm}
            className={`h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors w-full ${
              isSidebarOpen? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title="New Visitor Registration"
            >
            <UserPlus className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>New Visitor</span>}
          </div> 
          <div 
            className={`h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors ${
              isSidebarOpen? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title='Reate Visitor Logs'
            >
            <History className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>Repeat Visitor</span>}
          </div> 
          <div className={`h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors ${
            isSidebarOpen? 'px-3 justify-start' : ''
            }`}>
            <ClipboardList className="h-4 w-4 mr-2"/>
            <span>Request History</span>
          </div> 
          <div className="h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors whitespace-nowrap">
            <Settings className="h-4 w-4 mr-2"/>
            <span>Settings</span>
          </div> 
        </div>
        <button className="w-full h-11 bg-gray-800 border border-gray-600 hover:bg-red-950/20 hover:border-red-900/50 rounded text-sm text-white hover:text-red-400 transition-all flex items-center justify-center gap-2 mt-auto whitespace-nowrap">
          <LogOut className="h-3.5 w-3.5" />
          <span>Logout Portal</span>
        </button>
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
          {/*Header Greeting */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back, Employee!</h2>
            <p className="text-xs text-gray-400 mt-1 ">Gate 1 Reception . Core Entry Registration Console</p>
          </div> 
          {/*Ft-1 Optional Action Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/*Action1: Add Visitor */}
            <div className="bg-gray-900 border border-[#21262d] rounded-xl p-5 flex-col justify-between group cursor-pointer hover:bg-gray-800 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-gray-200 group-hover:text-amber-400 transition-colors">Register New Visitor</h3>
                  <p className="text-xs text-gray-400 max-w-sm">Initiate check-in workflow, capture identification records, and issue temporary gate entry passes.</p>
                </div>
                <div className=" p-3 rounded-lg bg-amber-500/10 text-amber-400 shrink-0" >
                  <UserPlus className="h-5 w-5" />
                  <span className="text-lg font-semibold text-white">Add Visitor</span>
                </div>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-amber-500 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Open Registration Form</span>
                <span>→</span>
              </div>
            </div>
              {/*Action2: Check Send Status */}
              <div className="bg-gray-900 border border-[#21262d] rounded-xl p-5 flex flex-col justify-between group cursor-pointer hover:border-500/40 hover:bg-[#161b22]/40 transition-all duration-200 shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">Dispatched Pass Log</h3>
                    <p className="text-xs text-gray-400 max-w-sm">Track your locally registered guest entires, monitor pending clearances, and confirm exists. </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <ClipboardList className="h-5 w-5" />
                    <span className="text-lg font-semibold text-white">View Log</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center text-xs font-semibold text-blue-500 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>View Recent Dispatch</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          {/*FT-2 Shift Activity Log Table*/}
          <div className="bg-gray-900 border border-[#21262d] rounded-xl overflow-hidden shadow-xl">
            
            {/* Table Header Section */}
            <div className="p-4 border-b border-[#21262d] flex items-center justify-between bg-gray-900/50">
              <div>
                <h3 className="text-sm font-semibold text-gray-200">Your Shift Activity Log</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">Showing visitors registered by you today</p>
              </div>
              <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 ">
                Active Session
              </span>
            </div>

            {/* The Responsive Table Element */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#21262d] bg-gray-800/20 text-gray-400 font-medium select-none">
                    <th className="p-3.5">Pass ID</th>
                    <th className="p-3.5">Visitor Name</th>
                    <th className="p-3.5">Purpose / Agency</th>
                    <th className="p-3.5">Check-In Time</th>
                    <th className="p-3.5">Visitor Type</th>
                    <th className="p-3.5 text-right">Pass Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262d] text-gray-300">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-[#161b22]/20 transition-colors">
                    <td className="p-3.5 font-mono text-amber-500 font-medium">DEF-9402</td>
                    <td className="p-3.5 font-medium text-gray-200">Rajesh Kumar</td>
                    <td className="p-3.5 text-gray-400">CPWD Maintenance</td>
                    <td className="p-3.5 text-gray-500">02:15 PM</td>
                    <td className="p-3.5 text-gray-400">New Visitor/Urgent Access</td> 
                    <td className="p-3.5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                        Checked In
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-[#161b22]/20 transition-colors">
                    <td className="p-3.5 font-mono text-amber-500 font-medium">DEF-8831</td>
                    <td className="p-3.5 font-medium text-gray-200">Dr. Sunita Sharma</td>
                    <td className="p-3.5 text-gray-400">DRDO Technical Review</td>
                    <td className="p-3.5 text-gray-500">01:40 PM</td>
                    <td className="p-3.5 text-gray-400">Pre-Scheduled Clearance</td>
                    <td className="p-3.5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/10">
                        Pending Clearance
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-[#161b22]/20 transition-colors">
                    <td className="p-3.5 font-mono text-amber-500 font-medium">DEF-7110</td>
                    <td className="p-3.5 font-medium text-gray-200">Amit Patel</td>
                    <td className="p-3.5 text-gray-400">Logistics Delivery</td>
                    <td className="p-3.5 text-gray-500">11:05 AM</td>
                    <td className="p-3.5 text-gray-400">Repeated Visitor</td>
                    <td className="p-3.5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-800 text-gray-400">
                        Checked Out
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/*Inline form Wrapper */}
          <div 
            ref={registrationFormRef}
            className="bg-gray-900 border border-[#21262d] rounded-xl shadow-xl overflow-hidden flex flex-col scroll-mt-6"
          >
            {/*Form Section Header */}
            <div className="p-4 border-b border-[#21262d] flex items-center justify-between bg-gray-950/40">
              <div className="flex items-center gap-2 text-amber-500">
                <UserPlus className="h-4 w-4" />
                <h3 className="font-semibold text-sm text-gray-200">Security Access Registry Form</h3>
              </div>
            </div>
            {/*Form Input Body */}
            <form onSubmit={(e) => {e.preventDefault(); alert('Form submitted!');}} className="p-5 space-y-5 text-xs">
              {/* Visitor Category Selection */}
              <div className="space-y-1.5">
                <label className="block text-gray-300 font-medium">Pass Processing Pipeline</label>
                <div className="relative">
                  <select
                    value = {visitorCategory}
                    onChange={(e) => setVisitorCategory(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-gray-200 
                    focus:outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer">
                    <option value="">Select a category</option>
                    <option value="new">New Visitor / Urgent Access</option>
                    <option value="repeated">Repeated Visitor</option>
                    <option value="scheduled">Pre-Scheduled Visit</option>
                  </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              {/* Grid text Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-medium">Full Name</label>
                  <input
                    type="text"
                    required placeholder="e.g. Sinchana K"
                    className="bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                  <label className="block text-gray-300 font-medium">Govt Issued ID Ref</label>
                  <input type="text" required placeholder="Aadhaar / Passport Num" className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-200" />
              </div>
              {/* Purpose Input */}
              <div className="space-y-1.5">
                <label className="block text-gray-300 font-medium">Purpose of Entry / Host Organization</label>
                <input type="text" required placeholder="e.g. Meeting with the Team Lead" className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-200" />
              </div>
              {/* Feature 4: Clearance Level Selection Badge Grid */}
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">Assigned Zone Clearance Level</label>
                <div className="grid grid-cols-3 gap-3 text-center select-none text-[11px]">
                  <div 
                    onClick={() => setClearanceLevel('Level 1')}
                    className={`p-2.5 rounded-lg border cursor-pointer transition duration-150 font-medium ${
                      clearanceLevel === 'Level 1' 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold shadow-md' 
                        : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500/60 hover:bg-emerald-500/10'
                    }`}
                  >
                    Level 1 • Public
                  </div>
                  <div 
                    onClick={() => setClearanceLevel('Level 2')}
                    className={`p-2.5 rounded-lg border cursor-pointer transition duration-150 ${
                      clearanceLevel === 'Level 2' 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-semibold shadow-md' 
                        : 'bg-amber-500/5 border-amber-500/10 text-amber-500/60 hover:bg-amber-500/10'
                    }`}
                  >
                    Level 2 • Restricted
                  </div>
                  <div 
                    onClick={() => setClearanceLevel('Level 3')}
                    className={`p-2.5 rounded-lg border cursor-pointer transition duration-150 font-medium ${
                      clearanceLevel === 'Level 3' 
                        ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-semibold shadow-md' 
                        : 'bg-rose-500/5 border-rose-500/10 text-rose-500/60 hover:bg-rose-500/10'
                    }`}
                  >
                    Level 3 • Classified
                  </div>
                </div>
              </div>
              {/* Feature 4: Document Upload Selector Area */}
              <div className="space-y-1.5">
                <label className="block text-gray-300 font-medium">Scan Verification Documents</label>
                <div className="border border-dashed border-[#30363d] bg-[#0d1117] rounded-lg p-4 text-center cursor-pointer hover:border-gray-500 transition-colors group">
                  <input type="file" className="hidden" id="inline-doc-upload" />
                  <label htmlFor="inline-doc-upload" className="cursor-pointer space-y-1 block">
                    <span className="text-amber-500 font-semibold block group-hover:underline">Upload Digital ID Credentials</span>
                    <span className="text-[10px] text-gray-500 block">PDF, PNG, or JPG up to 5MB (Automatic encryption applied)</span>
                  </label>
                </div>
              </div>
              {/*Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-2">
                <button type="reset" className="px-4 py-2 bg-transparent border border-gray-700 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white font-medium transition">
                  Reset Form
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#0d1117] font-bold rounded-lg transition nded-lg transition shadow-lg shadow-amber-500/10">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

    </div>
  );
}