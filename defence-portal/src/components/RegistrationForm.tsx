import {useState} from "react";
import {UserPlus, ChevronDown, Users} from "lucide-react";

interface RegistrationFormProps {
    showHRFeatures? : boolean;
    onSubmit: (formData: any) => void;
}

export default function RegistrationForm({ showHRFeatures = false, onSubmit }: RegistrationFormProps) {
    //FT-3 state to control opening. closing the registration form
  const [visitorCategory, setVisitorCategory] = useState('new');
  //State to track which clearance level button is selected inside the form
  const [clearanceLevel, setClearanceLevel] = useState<string | null>(null);
  //FT-7 state to track the number of accompanying guests
  const [headCount, setHeadCount] = useState(0);
  //FT-8 Persistent state to store typed escort details
  const [escortList, setEscortList] = useState<{ name: string; idRef: string }[]>([]);
    const handleHeadCountChange = (newCount: number) => {
    if (isNaN(newCount)) return;
    setHeadCount(newCount);

    if (newCount === 0) return;

    const targetCount = Math.max(0, newCount);

    setEscortList((prevList) => {
      if (prevList.length < targetCount) {
        //scaling UP, append empty objs == target count
        const shortBy = targetCount - prevList.length;
        const extension = Array.from({ length: shortBy }, () => ({ name: '', idRef: '' }));
        return [...prevList, ...extension];
      } else if (targetCount < prevList.length) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    if(onSubmit){
      onSubmit({visitorCategory, clearanceLevel, headCount, escortList});
    }
  };

  return (
        <div className="bg-gray-900 border border-[#21262d] rounded-xl shadow-xl overflow-hidden flex flex-col scroll-mt-6">
            {/*Form Section Header */}
            <div className="p-4 border-b border-[#21262d] flex items-center justify-between bg-gray-950/40">
              <div className="flex items-center gap-2 text-amber-500">
                <UserPlus className="h-4 w-4" />
                <h3 className="font-semibold text-sm text-gray-200">Security Access Registry Form</h3>
              </div>
            </div>
            {/*Form Input Body */}
            <form onSubmit={handleSubmit} className="p-5 space-y-5 text-xs">
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
                    {showHRFeatures && (
                        <option value="hr">HR-Related Visit</option>
                    )}
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
      
    );
}