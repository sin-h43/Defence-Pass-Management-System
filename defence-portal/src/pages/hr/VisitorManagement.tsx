import { useState } from "react";
import { 
  Search, 
  SlidersHorizontal,
  User,
  Briefcase,
  Building2,
  Globe2,
  Truck
} from "lucide-react";
import DataTable from "../../components/DataTable";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from 'react-router-dom';
// Mock data based on the provided UI screenshot
const MOCK_VISITORS = [
  {
    id: "VP-2026-001",
    name: "Arjun Nair",
    phone: "+91 98765 12345",
    email: "arjun.nair@example.com",
    category: "General Visitor",
    host: "Rohit Singh",
    department: "IT Department",
    purpose: "Vendor Meeting",
    requestedDate: "20 May 2026, 10:00 AM",
    liveStatus: "Approved",
    type: "One Day"
  },
  {
    id: "VP-2026-002",
    name: "Li Wei",
    phone: "+91 91234 67890",
    email: "l.wei@example.com",
    category: "Foreign National",
    host: "Dr. Kavita Rao",
    department: "Research Wing",
    purpose: "Technical Discussion",
    requestedDate: "22 May 2026, 02:00 PM",
    liveStatus: "Pending",
    type: "One Day"
  },
  {
    id: "VP-2026-003",
    name: "Sneha Patel",
    phone: "+91 93214 56789",
    email: "sneha.patel@example.com",
    category: "HR Related",
    host: "Neha Kapoor",
    department: "HR Department",
    purpose: "Interview",
    requestedDate: "23 May 2026, 11:30 AM",
    liveStatus: "Approved",
    type: "One Day"
  },
  {
    id: "VP-2026-004",
    name: "M. S. Krishnan",
    phone: "+91 90087 64321",
    email: "mskrishnan@gov.in",
    category: "Government Official",
    host: "Amit Sharma",
    department: "Admin Department",
    purpose: "Official Meeting",
    requestedDate: "24 May 2026, 09:30 AM",
    liveStatus: "Approved",
    type: "One Day"
  },
  {
    id: "VP-2026-005",
    name: "Vikram Mahto",
    phone: "+91 98700 11223",
    email: "vikram.m@abc-services.com",
    category: "Service Provider",
    host: "Amit Sharma",
    department: "Facilities",
    purpose: "AC Maintenance",
    requestedDate: "25 May 2026, 04:00 PM",
    liveStatus: "CheckOut",
    type: "One Day"
  }
];

export default function VisitorMgmt() {
    const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All Visitors");
  const [selectedVisitor, setSelectedVisitor] = useState<any | null>(null);

  const tableHeaders = [
    "Visitor", 
    "Category", 
    "Host", 
    "Purpose", 
    "Visit Date & Time", 
    "Status", 
    "Pass Type", 
    "Actions"
  ];

  const categories = [
    { name: "General Visitor", icon: User, desc: "For vendors, contractors, guests and general visitors.", color: "border-blue-500 bg-blue-50/20 text-blue-600" },
    { name: "HR Related", icon: Briefcase, desc: "For candidates, interviewees, HR meetings and onboarding.", color: "border-purple-500 bg-purple-50/20 text-purple-600" },
    { name: "Government Official", icon: Building2, desc: "For government officials and authorized representatives.", color: "border-emerald-500 bg-emerald-50/20 text-emerald-600" },
    { name: "Foreign National", icon: Globe2, desc: "For foreign nationals requiring visa & passport verification.", color: "border-orange-500 bg-orange-50/20 text-orange-600" },
    { name: "Service Provider", icon: Truck, desc: "For technicians, maintenance and service personnel.", color: "border-amber-500 bg-amber-50/20 text-amber-600" }
  ];

  const subTabs = ["All Visitors", "Pre-Scheduled", "Active", "Completed", "Cancelled"];

  return (
    
    <DashboardLayout>
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
      {/* MAIN LAYOUT CONTEXT */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* COMPONENT CONTENT BODY */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Section: Welcome Title & Step Progression Tracker */}
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add Visitor</h2>
            <p className="text-slate-400 text-xs mt-0.5 font-medium">Create a new visitor pass token in a few simple steps.</p>
          </div>    

          {/* Grid Layout Configuration: Category Select Deck */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Choose visitor category</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {categories.map((cat, i) => {
                const IconComponent = cat.icon;
                const categoryKey = cat.name.toLowerCase().replace(" ", "-");
                return (
                  <button 
                    key={i}
                    onClick={()=> navigate(`/hr/visitorMgmt/register?type=${categoryKey}`)}
                    className={`p-4 bg-white border rounded-xl text-left transition-all flex flex-col justify-between group hover:shadow-sm ${
                      cat.name === "General Visitor" 
                        ? "border-blue-500 ring-2 ring-blue-50/50" 
                        : cat.name === "HR Related" 
                          ? "border-purple-500 ring-2 ring-purple-50/50"
                          : cat.name === "Government Official" 
                          ? "border-emerald-500 ring-2 ring-emerald-50/50"
                          : cat.name === "Foreign National" 
                          ? "border-orange-500 ring-2 ring-orange-50/50"
                          : cat.name === "Service Provider" 
                          ? "border-amber-500 ring-2 ring-amber-50/50"
                          : ""
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg border w-fit ${cat.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-slate-800">{cat.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">{cat.desc}</p>
                    </div>
                    <div className={`mt-4 text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity
                        ${
                            cat.name === "General Visitor" 
                        ? "text-blue-600" 
                        : cat.name === "HR Related" 
                          ? "text-purple-600"
                          : cat.name === "Government Official" 
                          ? "text-emerald-600"
                          : cat.name === "Foreign National" 
                          ? "text-orange-600"
                          : cat.name === "Service Provider" 
                          ? "text-amber-600"
                          : ""
                        }
                        `}>
                      Select Category &rarr;
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section Dynamic Context View: Table Filter Controls and Core Grid */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recently Added Visitors</h3>
              </div>
              
              {/* Context Search Filter input array */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search visitor, host or purpose..." 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Sub-Tabs Selector Layer matching image */}
            <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold select-none">
              {subTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-3 py-2 border-b-2 font-bold transition-all ${
                    selectedTab === tab 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Table Insertion Point */}
            <DataTable 
              headers={tableHeaders} 
              rows={MOCK_VISITORS}
              externalSelectedRow={selectedVisitor}
              onExternalSelectRow={(row) => setSelectedVisitor(row)}
            />
          </div>

        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}