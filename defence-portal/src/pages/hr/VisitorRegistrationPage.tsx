import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Briefcase, Building2, Globe2, Truck } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AdvancedRegistrationForm from "../../components/HRRegistrationForm";

type AdvancedCategory = 'general-visitor' | 'hr-related' | 'government-official' | 'foreign-national' | 'service-provider';

const CATEGORY_CONFIGS: Record<AdvancedCategory, { title: string; desc: string; icon: React.ComponentType<any>; color: string }> = {
  'general-visitor': { title: "General Visitor", desc: "For vendors, contractors, guests and general visitors.", icon: User, color: "text-blue-600 bg-blue-50 border-blue-200" },
  'hr-related': { title: "HR Related", desc: "For candidates, interviewees, HR meetings and onboarding.", icon: Briefcase, color: "text-purple-600 bg-purple-50 border-purple-200" },
  'government-official': { title: "Government Official", desc: "For government officials and authorized representatives.", icon: Building2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  'foreign-national': { title: "Foreign National", desc: "For foreign nationals requiring visa & passport verification.", icon: Globe2, color: "text-orange-600 bg-orange-50 border-orange-200" },
  'service-provider': { title: "Service Provider", desc: "For technicians, maintenance and service personnel.", icon: Truck, color: "text-amber-600 bg-amber-50 border-amber-200" }
};

export default function VisitorRegistrationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const rawType = searchParams.get("type");
  const category: AdvancedCategory = 
    (rawType && Object.keys(CATEGORY_CONFIGS).includes(rawType)) 
      ? (rawType as AdvancedCategory) 
      : 'general-visitor';

  const currentConfig = CATEGORY_CONFIGS[category];
  const IconComponent = currentConfig.icon;

  const handleFormSubmission = (formData: any) => {
    console.log("Processing Data Payload from HR Form:", formData);
    // Add your database post / state sync action handler here
    navigate("/hr/visitorMgmt");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto bg-slate-50 min-h-screen text-xs text-slate-800">
        
        {/* Navigation Action */}
        <button 
          onClick={() => navigate("/hr/visitorMgmt")}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 font-semibold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Visitors
        </button>

        {/* Dynamic Context Header Banner */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className={`p-3 rounded-xl border ${currentConfig.color}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{currentConfig.title}</h2>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">{currentConfig.desc}</p>
          </div>
        </div>

        {/* Pass the URL Category down to the form component 
          so it can dynamically alter its layout matching the type state context!
        */}
        <AdvancedRegistrationForm 
          initialCategory={category} 
          onSubmitSuccess={handleFormSubmission} 
        />
        
      </div>
    </DashboardLayout>
  );
}