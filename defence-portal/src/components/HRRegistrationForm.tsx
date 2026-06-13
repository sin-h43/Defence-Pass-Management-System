import { useState } from "react";
import { UserPlus, ShieldAlert, Globe, Briefcase, Building, User } from "lucide-react";

type AdvancedCategory = 'general' | 'hr' | 'government' | 'foreign' | 'service';

interface AdvancedRegistrationFormProps {
  onSubmitSuccess: (formData: any) => void;
}

export default function AdvancedRegistrationForm({ onSubmitSuccess }: AdvancedRegistrationFormProps) {
  const [category, setCategory] = useState<AdvancedCategory | null>(null);
  
  // Base Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idRef, setIdRef] = useState('');
  const [extraReference, setExtraReference] = useState(''); // Visa, Company, or Agency
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // 2. Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name,
      email,
      idRef,
      category,
      extraReference,
      fileName: uploadedFile ? uploadedFile.name : null 
    };

    onSubmitSuccess(formData);
    alert(`${category?.toUpperCase()} entry pass application submitted successfully.`);
    
    // Reset Form
    setName('');
    setEmail('');
    setIdRef('');
    setExtraReference('');
    setUploadedFile(null);
    setCategory(null);
  };

  // 1. Initial Card Selection Screen
  if (!category) {
    return (
      <div className="p-6 bg-gray-900 rounded-xl border border-[#21262d] space-y-4">
        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
          Select Security Processing Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <button onClick={() => setCategory('general')} className="p-4 bg-[#0d1117] border border-[#30363d] hover:border-amber-500 rounded-xl text-left space-y-1 transition-all">
            <div className="flex items-center gap-2 text-amber-500 font-semibold"><User className="h-4 w-4"/> General Visitor</div>
            <p className="text-gray-400">For vendors, guests, and general personnel.</p>
          </button>
          
          <button onClick={() => setCategory('hr')} className="p-4 bg-[#0d1117] border border-[#30363d] hover:border-purple-500 rounded-xl text-left space-y-1 transition-all">
            <div className="flex items-center gap-2 text-purple-500 font-semibold"><Briefcase className="h-4 w-4"/> HR Related</div>
            <p className="text-gray-400">For job candidates, interviewees, and onboarding.</p>
          </button>

          <button onClick={() => setCategory('government')} className="p-4 bg-[#0d1117] border border-[#30363d] hover:border-blue-500 rounded-xl text-left space-y-1 transition-all">
            <div className="flex items-center gap-2 text-blue-500 font-semibold"><Building className="h-4 w-4"/> Government Official</div>
            <p className="text-gray-400">For department inspectors and authorized officials.</p>
          </button>

          <button onClick={() => setCategory('foreign')} className="p-4 bg-[#0d1117] border border-[#30363d] hover:border-emerald-500 rounded-xl text-left space-y-1 transition-all">
            <div className="flex items-center gap-2 text-emerald-500 font-semibold"><Globe className="h-4 w-4"/> Foreign National</div>
            <p className="text-gray-400">Requires mandatory Passport & Visa logging.</p>
          </button>

          <button onClick={() => setCategory('service')} className="p-4 bg-[#0d1117] border border-[#30363d] hover:border-orange-500 rounded-xl text-left space-y-1 transition-all">
            <div className="flex items-center gap-2 text-orange-500 font-semibold"><ShieldAlert className="h-4 w-4"/> Service Provider</div>
            <p className="text-gray-400">For facilities maintenance, IT support, and technicians.</p>
          </button>
        </div>
      </div>
    );
  }

  // 2. Render Selected Input Fields
  return (
    <div className="bg-gray-900 border border-[#21262d] rounded-xl overflow-hidden flex flex-col text-xs">
      <div className="p-4 border-b border-[#21262d] flex items-center justify-between bg-gray-950/40">
        <div className="flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-amber-500" />
          <span className="font-semibold text-gray-200 capitalize">{category} Pass Registry</span>
        </div>
        <button 
          onClick={() => setCategory(null)} 
          className="text-gray-400 hover:text-white underline text-[11px]"
        >
          Change Category
        </button>
      </div>

      <form className="p-5 space-y-4" onSubmit={handleSubmit}>
        {/* Universal fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-gray-300">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-2 text-white" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-300">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-2 text-white" required />
          </div>
        </div>

        {/* Polymorphic ID Reference Fields */}
        <div className="space-y-1">
          <label className="text-gray-300 font-medium">
            {category === 'foreign' ? 'Passport Number *' : 'Govt Issued ID / Clearance Badge Reference *'}
          </label>
          <input 
            type="text" 
            value={idRef} 
            onChange={(e) => setIdRef(e.target.value.toUpperCase())}
            placeholder={category === 'foreign' ? "e.g. Z1234567" : "12-Digit Aadhaar / Alphanumeric Card ID"}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-2 text-white" 
            required 
          />
        </div>

        {/* Contextual Sub-Fields based on Selected Category */}
        {category === 'foreign' && (
          <div className="space-y-1 animate-in fade-in duration-200">
            <label className="text-gray-300">Visa Number / Entry Permit Reference *</label>
            <input type="text" value={extraReference} onChange={(e) => setExtraReference(e.target.value)} placeholder="e.g. V9876543" className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-2 text-white" required />
          </div>
        )}

        {(category === 'government' || category === 'service') && (
          <div className="space-y-1 animate-in fade-in duration-200">
            <label className="text-gray-300">Representing Agency / Agency / Employer Name *</label>
            <input type="text" value={extraReference} onChange={(e) => setExtraReference(e.target.value)} placeholder="e.g. Central Command / CleanTech Facilities" className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-2 text-white" required />
          </div>
        )}

        {/* ... Keep File Upload Drop-Zone and Action Buttons below ... */}
        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end gap-2">
          <button 
            type="button"
            onClick={() => setCategory(null)}
            className="px-4 py-2 bg-transparent border border-gray-700 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white font-medium transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#0d1117] font-bold rounded-lg transition shadow-lg shadow-amber-500/10"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}