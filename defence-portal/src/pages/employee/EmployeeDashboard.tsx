import { Search, Menu, Bell, ClipboardList, Settings, Shield, History, UserPlus, ChevronDown, LogOut, Users } from 'lucide-react';
import { useRef, useState } from 'react';

export default function EmployeeDashboard() {

  const [showNotifications, setShowNotifications] = useState(false);
  //FT-3 state to control opening. closing the registration form
  const [visitorCategory, setVisitorCategory] = useState('new');
  //State to track which clearance level button is selected inside the form
  const [clearanceLevel, setClearanceLevel] = useState<string | null>(null);
  //anchor reference used to target the registration block for scorlling
  const registrationFormRef = useRef<HTMLDivElement>(null);
  const scrollToRegistrationForm = () => {
    registrationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //FT-7 state to track the number of accompanying guests
  const [headCount, setHeadCount] = useState(0);
  //FT-8 Persistent state to store typed escort details
  const [escortList, setEscortList] = useState<{ name: string; idRef: string }[]>([]);

  const handleHeadCountChange = (newCount: number) => {
    if(isNaN(newCount)) return;
    setHeadCount(newCount);

    if(newCount === 0) return;

    const targetCount = Math.max(0, newCount);
    

    setEscortList((prevList)=>{
      if(prevList.length < targetCount){
        //scalling UP, append empty objs == target count
        const shortBy = targetCount - prevList.length;
        const extension = Array.from({length: shortBy}, ()=>({name:'', idRef:''}));
      return [...prevList, ...extension];
      }else if (targetCount < prevList.length){
        //scaling DOWN, trim the list to target count
      return prevList.slice(0, targetCount);
      }
    return prevList;
    });
  };
  //FT 9 Handler functions to update the escort details in state on input change
  const updateEscortField = (index: number, field: 'name' | 'idRef', value: string) => {
    setEscortList((prevList) => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
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
            title='Repeated Visitor Logs'
            >
            <History className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>Repeated Visitor</span>}
          </div> 
          <div className={`h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors ${
            isSidebarOpen? 'px-3 justify-start' : 'justify-center p-0'
            }`}>
            <ClipboardList className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>Pre-Scheduled Visits</span>}
          </div> 
          <div 
            className={`h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors whitespace-nowrap ${
              isSidebarOpen? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title='Settings & Preferences'>
            <Settings className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>Settings</span>}
          </div> 
        </div>
        {/* Feature 7: Responsive Logout Slot */}
        <div className={`mt-auto w-full transition-all duration-200 ${
          isSidebarOpen 
            ? 'p-0' 
            : 'flex justify-center'
        }`}>
          <button 
            onClick={() => alert("Logging out of Defence Session...")}
            className={`w-full flex items-center justify-center text-white hover:text-red-400 transition-all cursor-pointer ${
              isSidebarOpen 
                ? 'h-12 bg-gray-800 border border-gray-700 rounded text-xs hover:bg-red-950/10 hover:border-red-900/40 gap-2' 
                : 'h-10 w-10 bg-red-950/10 rounded-lg hover:bg-red-950/30 text-red-400/70 hover:text-red-400'
            }`}
            title="Logout Portal Session"
          >
            {/* Imports the standard power logout arrow icon asset */}
            <LogOut className="h-4 w-4 shrink-0" />
            
            {/* Conditional formatting to slide text strings out of layout dynamically */}
            {isSidebarOpen && <span className="font-medium">Logout Portal</span>}
          </button>
        </div>
      </aside>

      {/* 2.main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* min-w-0 prevents the layout from breaking or stretching horizontally when the content overflows.*/}
        {/*overflow-y-auto allows the main content area to scroll vertically if the content exceeds the viewport height, ensuring that all content remains accessible without breaking the layout.*/}
        
        {/* Top Header Navigation Panel */}
        <header className="h-16 bg-gray-900 border-b border-[#21262d] shrink-0 flex items-center justify-between px-6 z-10">
          {/*Hamburger menu*/}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0">
            <Menu className="h-5 w-5" />
          </button>
          
          {/*Search Bar: max width so it doesn't crowd out right-side header items)*/}
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
            {/*Notification Button */}
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
                <div onClick = {scrollToRegistrationForm} className=" p-3 rounded-lg bg-amber-500/10 text-amber-400 shrink-0" >
                  <UserPlus className="h-5 w-5" />
                  <span className="text-lg font-semibold text-white">Add Visitor</span>
                </div>
              </div>
              <div onClick = {scrollToRegistrationForm} className="mt-6 flex items-center text-xs font-semibold text-amber-500 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sinchana K"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-[#12161d] transition-all"
                  />              
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@gmail.com"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-[#12161d] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-medium">Date of Birth</label>
                  <input
                    type="date"
                    required placeholder="dd/mm/yyyy"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-medium">Govt Issued ID Ref</label>
                  <input type="text" required placeholder="Aadhaar / PAN Card Number" className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-200" />
                </div>
              </div>
              
              {/*Permanent Address / Agency Address */}
              <div className="space-y-1.5">
                <label className="block text-gray-300 font-medium">Permanent Address</label>
                <input type="text" required placeholder="e.g. House/Office No, Street, City, State, Pincode" className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-200" />
              </div>

              {/* Purpose Input */}
              <div className="space-y-1.5">
                <label className="block text-gray-300 font-medium">Purpose of Entry / Host Organization</label>
                <input type="text" required placeholder="e.g. Meeting with the Team Lead" className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-200" />
              </div>

              {/* Linked Headcount Input box tracking changes dynamically */}
              <div className="space-y-1.5">
                  <label className="block text-gray-300 font-medium">Head Count</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={headCount === 0 ? '' : headCount}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                      handleHeadCountChange(val);
                    }}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-gray-500"
                    // required placeholder="Number of accompanying guests (0 if none)"
                  />
              </div>
              {/*Dynamic Escorted Manifest Row Generator*/}
              {headCount > 0 && (
                <div className="bg-[#161b22]/50 border border-[#21262d] rounded-lg p-4 space-y-3.5 animate-fade-in">
                  {/* Manifest Section Header */}
                  <div className="flex items-center justify-between border-b border-[#21262d] pb-2">
                    <div className="flex items-center gap-2 text-amber-500">
                      <Users className="h-3.5 w-3.5" />
                      <h4 className="font-semibold text-xs text-gray-200">Escorted Group Manifest</h4>
                    </div>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-medium border border-amber-500/10">
                      {headCount} {headCount  === 1 ? 'Accompanying Member' : 'Members Required'}
                    </span>
                  </div>
                  {/*Generate structured rows matching the headcount exactly */}
                  <div className="space-y-3 divide-y divide-[#21262d]/40">
                    {escortList.map((escort, index) => (
                      <div key={index} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                        index > 0 ? 'pt-3.5' : ''
                      }`}>
                        {/*Member name controlled input */}
                        <div className="space-y-1.5">
                          <label className="block text-gray-500 font-medium flex items-center gap-1.5">
                            <span className="text-[10px] bg-gray-800 text-gray-400 h-4 w-4 rounded flex items-center justify-center font-mono font-bold">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span>Member Full Name</span>
                          </label>
                          <input 
                            type="text"
                            required 
                            value={escort.name}
                            onChange={(e) => updateEscortField(index, 'name',e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-600 text-gray-200 focus:bg-[#12161d]  transition-all"
                          />
                        </div>

                        {/* Member ID Input */}
                        <div className="space-y-1.5">
                          <label className="block text-gray-500 font-medium pt-0.5 sm:pt-0 pl-0 sm:pl-5">
                            Member Aadhaar / Govt ID Num
                          </label>
                          <input 
                            type="text" 
                            required 
                            value={escort.idRef}
                            onChange={(e) => updateEscortField(index, 'idRef',e.target.value)}
                            placeholder="12-Digit Aadhaar / PAN" 
                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-gray-200 placeholder-gray-700 focus:outline-none focus:border-gray-600 focus:bg-[#12161d] transition-all" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
                  
                      
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