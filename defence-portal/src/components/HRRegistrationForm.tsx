import React, { useState, useEffect } from "react";
import { User, Briefcase, Building2, Globe2, Truck } from "lucide-react";

type AdvancedCategory = 'general-visitor' | 'hr-related' | 'government-official' | 'foreign-national' | 'service-provider';

interface AdvancedRegistrationFormProps {
  initialCategory: AdvancedCategory;
  onSubmitSuccess: (formData: any) => void;
}

// Map the keys coming from your URL parameter to the correct icons/labels
const CATEGORY_MAP: Record<AdvancedCategory, { label: string; icon: React.ComponentType<any>; color: string }> = {
  'general-visitor': { label: "General Visitor", icon: User, color: "text-blue-600 bg-blue-50/50 border-blue-200" },
  'hr-related': { label: "HR Related Pass", icon: Briefcase, color: "text-purple-600 bg-purple-50/50 border-purple-200" },
  'government-official': { label: "Government Official Clearance", icon: Building2, color: "text-emerald-600 bg-emerald-50/50 border-emerald-200" },
  'foreign-national': { label: "Foreign National Passport Verification", icon: Globe2, color: "text-orange-600 bg-orange-50/50 border-orange-200" },
  'service-provider': { label: "Service Provider Authorization", icon: Truck, color: "text-amber-600 bg-amber-50/50 border-amber-200" }
};

export default function AdvancedRegistrationForm({ initialCategory, onSubmitSuccess }: AdvancedRegistrationFormProps) {
  // Base Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idRef, setIdRef] = useState('');
  const [extraReference, setExtraReference] = useState('');

  // Reset form inputs if the pipeline category switches
  useEffect(() => {
    setIdRef('');
    setExtraReference('');
  }, [initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess({
      name,
      email,
      idRef,
      extraReference,
      category: initialCategory
    });
  };

  const currentMeta = CATEGORY_MAP[initialCategory] || CATEGORY_MAP['general-visitor'];
  const IconComponent = currentMeta.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-xs">
      
      {/* Form Context Banner with matching Icon */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2 text-slate-700 font-bold tracking-wide">
        <div className={`p-1.5 rounded-md border ${currentMeta.color}`}>
          <IconComponent className="h-3.5 w-3.5" />
        </div>
        <span>{currentMeta.label} Registration Form</span>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-slate-600 font-bold">Full Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-blue-500 font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-slate-600 font-bold">Email ID *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-blue-500 font-medium" required />
          </div>
        </div>

        {/* Polymorphic ID Row */}
        <div className="space-y-1">
          <label className="text-slate-600 font-bold">
            {initialCategory === 'foreign-national' ? 'Passport Number *' : 'Govt Issued ID / Identity Card Reference *'}
          </label>
          <input 
            type="text" 
            value={idRef} 
            onChange={(e) => setIdRef(e.target.value.toUpperCase())}
            placeholder={initialCategory === 'foreign-national' ? "Enter passport alphanumeric text" : "12-Digit Aadhaar / Alphanumeric ID"}
            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-blue-500 font-medium" 
            required 
          />
        </div>

        {/* Conditional Fields based on pipeline string */}
        {initialCategory === 'foreign-national' && (
          <div className="space-y-1 animate-in fade-in duration-200">
            <label className="text-slate-600 font-bold">Visa Number / Entry Permit Reference *</label>
            <input type="text" value={extraReference} onChange={(e) => setExtraReference(e.target.value)} placeholder="e.g. V9876543" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-blue-500 font-medium" required />
          </div>
        )}

        {(initialCategory === 'government-official' || initialCategory === 'service-provider') && (
          <div className="space-y-1 animate-in fade-in duration-200">
            <label className="text-slate-600 font-bold">Representing Agency / Employer / Department Name *</label>
            <input type="text" value={extraReference} onChange={(e) => setExtraReference(e.target.value)} placeholder="e.g. Central Command / CleanTech Facilities" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-blue-500 font-medium" required />
          </div>
        )}

        {/* Submit Core */}
        <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-sm">
            Generate Security Pass
          </button>
        </div>
      </form>
    </div>
  );
}