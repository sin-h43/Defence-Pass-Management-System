import {Search, Bell, ClipboardList, Settings, Shield, History, UserPlus, LogOut, PanelRight, PanelLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {savePass} from '../../utils/passStorage';
import DataTable from '../../components/DataTable';
import RegistrationForm from '../../components/RegistrationForm'; // Used as component in JSX
//import DispatchedPassLog from '../../components/DispatchedPassLog';
import { filterByIdentityAndId } from '../../utils/searchFilters';
import type {Visitor} from '../../utils/searchFilters';



export default function EmployeeDashboard() {

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery]= useState<string>('');
  //anchor reference used to target the registration block for scorlling
  const registrationFormRef = useRef<HTMLDivElement>(null);
  const scrollToRegistrationForm = () => {
    registrationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const activityHeaders = [
    'ID',
    'Visitor Name',
    'Purpose',
    'Request Time',
    'Visitor Type',
    'Status',
  ];

  const [activityRows, setActivityRows] = useState<Visitor[]>([
    {
      id: 'DEF-1001',
      name: 'John Doe',
      purpose: 'Contractor Check-in',
      requestTime: '08:45 AM',
      type: 'New Visitor/Urgent Access',
      status: 'Cleared',
    },
    {
      id: 'DEF-1002',
      name: 'Jane Smith',
      purpose: 'Vendor Delivery',
      requestTime: '09:15 AM',
      type: 'New Visitor/Urgent Access',
      status: 'Pending Clearance',
    },
  ]);

  const filteredVisitors = filterByIdentityAndId(activityRows,searchQuery);

  const [selectedPass, setSelectedPass] = useState<Visitor | null> (null);

  const handleSelectedVisitor = (visitor:Visitor)=>{
    setSelectedPass(visitor);
    setSearchQuery('');
  }

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
            className={`h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center text-sm hover:bg-gray-800 cursor-pointer transition-colors w-full ${
              isSidebarOpen? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title="New Visitor Registration"
            >
            <UserPlus className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>New Visitor</span>}
          </div> 
          <div 
            className={`w-full h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors ${
              isSidebarOpen? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title='Repeated Visitor Logs'
            >
            <History className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>Repeated Visitor</span>}
          </div> 
          <div className={`w-full h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors ${
            isSidebarOpen? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            onClick={()=> navigate('/employee/pre-scheduledDashboard')}>
            <ClipboardList className="h-4 w-4 shrink-0"/>
            {isSidebarOpen && <span className='ml-2'>Pre-Scheduled Visits</span>}
          </div> 
          <div 
            className={`w-full h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors whitespace-nowrap ${
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
          {/*DashPanel menu*/}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0 ">
              {
              isSidebarOpen ? 
                (<PanelLeft className="h-5 w-5" />)
              : (<PanelRight className="h-5 w-5" />)
            }
          </button>
          
          {/*Search Bar: max width so it doesn't crowd out right-side header items)*/}
          <div className="relative w-full max-w-md mx-4">
            {/* Search Input Container Box */}
            <div className="flex items-center bg-slate-900 border border-slate-850 rounded-lg px-3 py-2">
              <Search className="text-gray-500 mr-2 h-4 w-4" />
              <input
                type="text"
                placeholder="Search visitors, requests, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-500 text-white"
              />
              {/* Optional clean badge layout right inside input panel */}
              <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-[#161b22] border border-[#30363d] rounded text-[10px] font-mono text-gray-500 pointer-events-none ml-2">
                <span>ctrl</span>
                <span>+</span>
                <span>k</span>
              </div>
            </div>

            {/* Absolute Dropdown Layer for Filtered Results */}
            {searchQuery && (
              <div className="absolute top-full left-0 w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50 overflow-hidden">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((visitor) => (
                    <div 
                      key={visitor.id} 
                      onClick={() => handleSelectedVisitor(visitor)}
                      className="flex justify-between items-center px-4 py-2.5 hover:bg-slate-800/60 cursor-pointer border-b border-slate-850 last:border-b-0 transition-colors"
                    >
                      <span className="text-sm font-medium text-white">{visitor.name}</span>
                      <span className="text-xs font-mono text-amber-500">{visitor.id}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-gray-500 italic">
                    No records match "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ZONE 2 & 3: RIGHT SIDE PLACEHOLDER FOR NEXT STEP (FIXED: Container handles notification bell inside header alignment) */}
          <div className="flex relative items-center gap-4 shrink-0">
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
              <div className="absolute right-0 top-11 z-50 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-xs text-gray-300">
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
            <div className="bg-gray-900 border border-[#21262d] rounded-xl p-5 flex flex-col justify-between group cursor-pointer hover:bg-gray-800 transition-all">
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
                  <div 
                    onClick={()=>navigate('/employee/dispatchedPassLog')}
                    className="p-3 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <ClipboardList className="h-5 w-5" />
                    <span className="text-lg font-semibold text-white">View Log</span>
                  </div>
                </div>
                <div 
                  onClick={()=>navigate('/employee/dispatchedPassLog')}
                  className="mt-6 flex items-center text-xs font-semibold text-blue-500 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
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
            <DataTable 
              headers={activityHeaders} 
              rows={filteredVisitors as any}
              externalSelectedRows = {selectedPass}
              onExternalSelectedRow = {setSelectedPass}
              
               />
          </div>

          {/* Inline Form Wrapper */}
          <div ref={registrationFormRef} className="scroll-mt-6">
            {/* Render our highly scalable and reusable component */}
            <RegistrationForm 
              showHRFeatures={false}
              onSubmitSuccess={(newVisitorData) => {
              const generatedId = `DEF-${Math.floor(1000 + Math.random() * 9000)}`;
                
                // Format new row to match the datatable structure
                const newRow = {
                  id: generatedId,
                  name: newVisitorData.name || "Unknown Visitor",
                  purpose: newVisitorData.purpose || "General Visit",
                  requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  type: newVisitorData.visitorType === "hr" ? "HR-Related Visit" : "New Visitor/Urgent Access",
                  status: "Pending Clearance"
                };

                // Append the new row to the existing table data 
                setActivityRows(prevRows => [newRow, ...prevRows]);

                const pass = {
                  passId : generatedId,
                  holderName :newVisitorData.name || "Unknown Visitor",
                  purpose: newVisitorData.purpose || "General Visit",
                  email: newVisitorData.email || " ",
                  dob: newVisitorData.dob || " ",
                  idRef:newVisitorData.idRef || " ",
                  idType: newVisitorData.idType || " ",
                  visitorCategory :newVisitorData.visitorCategory || "urgent",
                  clearanceLevel: newVisitorData.clearanceLevel || "Level 1",
                  escortList:newVisitorData.escortList || [],
                  escortedManifest:newVisitorData.headCount>0 ? `+${newVisitorData.headCount} Escorted` : "None (Solo)",
                  type: newVisitorData.visitorType === "hr" ? "HR-Related Visit" : "New Visitor/Urgent Access",
                  liveStatus: newVisitorData.visitorCategory === "scheduled"
                    ? "Awaiting Arrival" : "Pending Clearance",
                  requestedDate : newVisitorData.requestedDate || new Date(Date.now() + 24*60*60*1000).toISOString(),
                  fileUrl : "https://via.placholder.com/400x250?text=Uploaded+Document",
                  createdAt: Date.now()
                };
                savePass(pass);

              }} 
            />
          </div>
            
        </main>
      </div>

    </div>
  );
}