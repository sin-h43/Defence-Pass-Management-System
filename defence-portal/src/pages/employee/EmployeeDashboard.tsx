import { Search, Bell, ClipboardList, Settings, Shield, History, UserPlus, LogOut, PanelRight, PanelLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { savePass } from '../../utils/passStorage';
import DataTable from '../../components/DataTable';
import RegistrationForm from '../../components/RegistrationForm'; // Used as component in JSX
import { filterByIdentityAndId } from '../../utils/searchFilters';
import type { Visitor } from '../../utils/searchFilters';
import type { PassRecord } from '../../utils/passStorage'; // Import PassRecord type
import RightDrawer from '../../components/RightDrawer';
import { useRepeatedVisitors } from '../../contexts/RepeatedVisitorsContext';

export default function EmployeeDashboard() {

  const { addNewVisitRecord, addMasterVisitor, isRepeatedVisitor } = useRepeatedVisitors(); // Fixed: changed from useNewVisitRecord to addNewVisitRecord
  const location = useLocation();
  const alertShownRef = useRef(false); // Track if alert has been shown
  console.log(location.state);
  const [autoFillData, setAutoFillData] = useState<any>(null);

  useEffect(() => {
    // we check for 'autofillData' because that's what RepeatedVisitorPage.tsx sends
    const autofillData = (location.state as any)?.autofillData || (location.state as any)?.autoFillData;

    if (autofillData && !alertShownRef.current) {
      console.log("Received autofill data:", autofillData);
      setAutoFillData(autofillData);
      alert(`Security core: Profile verified for ${autofillData.name}. Injecting identity registry credentials.`);
      alertShownRef.current = true; // Mark alert as shown

      // clean the state so it doesnt refil on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);


  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  // anchor reference used to target the registration block for scrolling
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
      liveStatus: 'Cleared',
    },
    {
      id: 'DEF-1002',
      name: 'Jane Smith',
      purpose: 'Vendor Delivery',
      requestTime: '09:15 AM',
      type: 'New Visitor/Urgent Access',
      liveStatus: 'Pending Clearance',
    },
  ]);

  const filteredVisitors = filterByIdentityAndId(activityRows, searchQuery);

  const [selectedPass, setSelectedPass] = useState<Visitor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = () => setIsDrawerOpen(false);
  

  const handleSelectedVisitor = (visitor: Visitor) => {
    setSelectedPass(visitor);
    setSearchQuery('');
    setIsDrawerOpen(true);
  }

  // Handle repeated visitor form submission - adds to shared context
  const handleRepeatedVisitorSubmit = (newRecord: PassRecord) => {
    const validatedRecord = {
    ...newRecord,
    requestedDate: newRecord.requestedDate || new Date().toISOString(),
    escortList: newRecord.escortList || [],
    liveStatus: newRecord.liveStatus || "Pre-cleared",
    visitorCategory: newRecord.visitorCategory || newRecord.type || "repeated"
  };
    
    // Add to visitation history
    addNewVisitRecord(validatedRecord);
    
    // Check if this visitor already exists in the master registry
    // Only add to master registry if they don't already exist (by name)
    if (!isRepeatedVisitor(newRecord.holderName)) {
      // Only create and add to master visitors registry if they are NEW
      const masterVisitor: Visitor = {
        id: `DEF-M${Math.floor(1000 + Math.random() * 9000)}`,
        name: newRecord.holderName,
        purpose: newRecord.purpose,
        requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'Repeated Visitor',
        liveStatus: 'Cleared'
      };
      addMasterVisitor(masterVisitor);
      console.log('New master visitor added to registry:', masterVisitor);
    } else {
      console.log(`Visitor ${newRecord.holderName} already exists in master registry. Only adding to visitation history.`);
    }
    
    console.log('New repeated visitor record added to global history:', validatedRecord);
    // Silent submission - autofill alert already notified the user
};

  return (
    <div className="flex h-screen w-screen bg-[#0e121a] text-white font-sans overflow-hidden">

      {/* left sidebar */}
      <aside className={`bg-gray-900 border-r border-gray-700 flex flex-col justify-start p-4 shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 items-stretch' : 'w-16 items-center px-2'
      }`}>

        {/* Sidebar Header Logo Icon */}
        <div className={`h-12 border border-dashed border-gray-600 rounded mb-5 flex items-center justify-center text-xs text-gray-400 w-full ${
          !isSidebarOpen && 'border-none bg-gray-800/40'
        }`}>
          <Shield className="h-5 w-5 shrink-0 text-amber-500" />
          {isSidebarOpen && <span className="ml-2 font-medium">Employee Portal</span>}
        </div>

        {/* Navigation Items Link Stack */}
        <div className="space-y-2 flex-1">
          {/* New Visitor Button */}
          <div
            onClick={scrollToRegistrationForm}
            className={`h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center text-sm hover:bg-gray-800 cursor-pointer transition-colors w-full ${
              isSidebarOpen ? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title="New Visitor Registration"
          >
            <UserPlus className="h-4 w-4 shrink-0" />
            {isSidebarOpen && <span className='ml-2'>New Visitor</span>}
          </div>
          <div
            className={`w-full h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors ${
              isSidebarOpen ? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title='Repeated Visitor Logs'
            onClick={() => navigate('/employee/repeatedVisitor')}
          >
            <History className="h-4 w-4 shrink-0" />
            {isSidebarOpen && <span className='ml-2'>Repeated Visitor</span>}
          </div>
          <div
            className={`w-full h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors ${
              isSidebarOpen ? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            onClick={() => navigate('/employee/pre-scheduledDashboard')}
          >
            <ClipboardList className="h-4 w-4 shrink-0" />
            {isSidebarOpen && <span className='ml-2'>Pre-Scheduled Visits</span>}
          </div>
          <div
            className={`w-full h-10 bg-gray-700 rounded border border-amber-500/50 flex items-center px-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors whitespace-nowrap ${
              isSidebarOpen ? 'px-3 justify-start' : 'justify-center p-0'
            }`}
            title='Settings & Preferences'
          >
            <Settings className="h-4 w-4 shrink-0" />
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
        {/* overflow-y-auto allows the main content area to scroll vertically if the content exceeds the viewport height, ensuring that all content remains accessible without breaking the layout.*/}

        {/* Top Header Navigation Panel */}
        <header className="h-16 bg-gray-900 border-b border-[#21262d] shrink-0 flex items-center justify-between px-6 z-10">
          {/* DashPanel menu */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0 ">
            {
              isSidebarOpen ?
                (<PanelLeft className="h-5 w-5" />)
                : (<PanelRight className="h-5 w-5" />)
            }
          </button>

          {/* Search Bar: max width so it doesn't crowd out right-side header items) */}
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

            {/* RightDrawer for selected visitor details */}
            <RightDrawer
              isOpen={isDrawerOpen}
              onClose={closeDrawer}
              title={`Security Entry Dossier - ${selectedPass?.id || ''}`}
            >
              {/* Pass children content down here since your interface requires React.ReactNode */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Visitor Details</h3>
                <p>Name: {selectedPass?.name}</p>
                <p>ID: {selectedPass?.id}</p>
                {/* Additional security dossier elements go here */}
              </div>
            </RightDrawer>

            {/* Search Results Dropdown */}
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
            {/* Notification Button */}
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
          {/* Header Greeting */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back, Employee!</h2>
            <p className="text-xs text-gray-400 mt-1 ">Gate 1 Reception . Core Entry Registration Console</p>
          </div>
          {/* Ft-1 Optional Action Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Action1: Add Visitor */}
            <div className="bg-gray-900 border border-[#21262d] rounded-xl p-5 flex flex-col justify-between group cursor-pointer hover:bg-gray-800 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-gray-200 group-hover:text-amber-400 transition-colors">Register New Visitor</h3>
                  <p className="text-xs text-gray-400 max-w-sm">Initiate check-in workflow, capture identification records, and issue temporary gate entry passes.</p>
                </div>
                <div onClick={scrollToRegistrationForm} className="p-3 rounded-lg bg-amber-500/10 text-amber-400 shrink-0" >
                  <UserPlus className="h-5 w-5" />
                  <span className="text-lg font-semibold text-white">Add Visitor</span>
                </div>
              </div>
              <div onClick={scrollToRegistrationForm} className="mt-6 flex items-center text-xs font-semibold text-amber-500 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Open Registration Form</span>
                <span>→</span>
              </div>
            </div>

            {/* Action2: Check Send Status */}
            <div className="bg-gray-900 border border-[#21262d] rounded-xl p-5 flex flex-col justify-between group cursor-pointer hover:border-500/40 hover:bg-[#161b22]/40 transition-all duration-200 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">Dispatched Pass Log</h3>
                  <p className="text-xs text-gray-400 max-w-sm">Track your locally registered guest entries, monitor pending clearances, and confirm exits.</p>
                </div>
                <div
                  onClick={() => navigate('/employee/dispatchedPassLog')}
                  className="p-3 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <ClipboardList className="h-5 w-5" />
                  <span className="text-lg font-semibold text-white">View Log</span>
                </div>
              </div>
              <div
                onClick={() => navigate('/employee/dispatchedPassLog')}
                className="mt-6 flex items-center text-xs font-semibold text-blue-500 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>View Recent Dispatch</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* FT-2 Shift Activity Log Table */}
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
              externalSelectedRow={selectedPass}
              onExternalSelectRow={setSelectedPass}

            />
          </div>

          {/* Inline Form Wrapper */}
          <div ref={registrationFormRef} className="scroll-mt-6">
            {/* Render our highly scalable and reusable component */}
            <RegistrationForm
              showHRFeatures={false}
              initialValues={autoFillData}
              onSubmitSuccess={(newVisitorData) => {
                console.log("Form submitted with data:", newVisitorData);
                const generatedId = `DEF-${Math.floor(1000 + Math.random() * 9000)}`;
                // Fix: Map visitorCategory to proper type label
                const getVisitorTypeLabel = (category: string) => {
                  const typeMap: Record<string, string> = {
                    "hr": "HR-Related Visit",
                    "new": "New Visitor/Urgent Access", 
                    "repeated": "Repeated Visitor",
                    "scheduled": "Pre-scheduled Visit"
                  };
                  return typeMap[category?.toLowerCase()] || "General Visit";
                };

                const visitorTypeLabel = getVisitorTypeLabel(newVisitorData.visitorCategory);
                const isScheduled = newVisitorData.visitorCategory === 'scheduled';
                const determinedStatus = isScheduled ? "Awaiting Arrival":"Pending Clearance";
                const repeatedPassRecord = newVisitorData.repeatedPassRecord as PassRecord | null | undefined;
                const passId = repeatedPassRecord?.passId || generatedId;
                // Format new row to match the datatable structure
                const newRow = {
                  id: passId,
                  name: newVisitorData.name || "Unknown Visitor",
                  purpose: newVisitorData.purpose || "General Visit",
                  requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  type: visitorTypeLabel,                  
                  liveStatus: determinedStatus
                };

                // Append the new row to the existing table data 
                setActivityRows(prevRows => [newRow, ...prevRows]);
                // Instead of passing a straight value like setActivityRows(newData), this passes a callback function.
                const requestedDate = newVisitorData.requestedDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
                const escortList = newVisitorData.escortList || [];
                const pass: PassRecord = repeatedPassRecord
                  ? {
                      ...repeatedPassRecord,
                      passId,
                      holderName: newVisitorData.name || repeatedPassRecord.holderName || "Unknown Visitor",
                      purpose: newVisitorData.purpose || repeatedPassRecord.purpose || "General Visit",
                      email: newVisitorData.email || repeatedPassRecord.email || " ",
                      dob: newVisitorData.dob || repeatedPassRecord.dob || " ",
                      idRef: newVisitorData.idRef || repeatedPassRecord.idRef || repeatedPassRecord.value || " ",
                      idType: newVisitorData.idType || repeatedPassRecord.idType || " ",
                      ph: newVisitorData.ph || repeatedPassRecord.ph || repeatedPassRecord.phoneNumber || " ",
                      type: visitorTypeLabel,
                      visitorCategory: newVisitorData.visitorCategory || repeatedPassRecord.visitorCategory || "repeated",
                      clearanceLevel: newVisitorData.clearanceLevel || repeatedPassRecord.clearanceLevel || "Level 1",
                      escortList: escortList,
                      escortedManifest: newVisitorData.headCount > 0 ? `+${newVisitorData.headCount} Escorted` : repeatedPassRecord.escortedManifest || "None (Solo)",
                      requestedDate,
                      liveStatus: determinedStatus,
                    }
                  : {
                      passId,
                      holderName: newVisitorData.name || "Unknown Visitor",
                      purpose: newVisitorData.purpose || "General Visit",
                      email: newVisitorData.email || " ",
                      dob: newVisitorData.dob || " ",
                      idRef: newVisitorData.idRef || " ",
                      idType: newVisitorData.idType || " ",
                      ph: newVisitorData.ph || " ",
                      type: visitorTypeLabel,
                      visitorCategory: newVisitorData.visitorCategory || "new",
                      clearanceLevel: newVisitorData.clearanceLevel || "Level 1",
                      escortList: escortList,
                      escortedManifest: newVisitorData.headCount > 0 ? `+${newVisitorData.headCount} Escorted` : "None (Solo)",
                      requestedDate: requestedDate,
                      liveStatus: determinedStatus,
                      fileUrl: "https://via.placeholder.com/400x250?text=Uploaded+Document",
                      createdAt: new Date().toISOString()
                    };
                savePass(pass);
              }}
              
              onRepeatedVisitorSubmit={handleRepeatedVisitorSubmit} // Pass the callback for repeated visitors
              
            />
          </div>

        </main>
      </div>

    </div>
  );
}
