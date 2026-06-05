import { useState, useEffect } from "react";
import { UserPlus, ChevronDown, Users, Upload, FileCheck } from "lucide-react";
import type { PassRecord } from "../utils/passStorage"; // Import PassRecord type//
// import { Visitor } from './../utils/searchFilters';

interface RegistrationFormProps {
  showHRFeatures?: boolean;
  onSubmitSuccess: (formData: any) => void;
  initialValues?: any;
  onRepeatedVisitorSubmit?: (record: PassRecord) => void; // ADD THIS PROP
}

interface EscortMember {
  name: string;
  idRef: string;
  idType: string;
}

type VisitorCategory = 'new' | 'repeated' | 'scheduled' |'urgent'|'hr';

export default function RegistrationForm({ 
  showHRFeatures = false, 
  onSubmitSuccess, 
  initialValues,
  onRepeatedVisitorSubmit // ADD THIS TO PROPS DESTRUCTURING
}: RegistrationFormProps) {

  
  //primary Form state trackers
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [ph, setPh] = useState('');
  const [idRef, setIdRef] = useState('');
  const [address, setAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [idType, setIdType] = useState(' ');
  const [escortList, setEscortList] = useState<EscortMember[]>([]);
  const [requestedDate, setRequestedDate] = useState('');

  //FT-3 state to control opening. closing the registration form
  const [visitorCategory, setVisitorCategory] = useState('new');
  //State to track which clearance level button is selected inside the form
  const [clearanceLevel, setClearanceLevel] = useState<string | null>(null);
  //FT-7 state to track the number of accompanying guests
  const [headCount, setHeadCount] = useState(0);

  //drag n drop state elements
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // ADD THIS HOOK BELOW YOUR USESTATES:
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || '');
      setEmail(initialValues.email || '');
      setDob(initialValues.dob || '');
      setPh(initialValues.ph || '');
      setIdRef(initialValues.idRef || '');
      setAddress(initialValues.address || '');
      setPurpose(initialValues.purpose || '');
      setVisitorCategory('repeated'); // Swaps the tab to Repeated Visitor

      // If the ID Type was detected previously
      const detection = detectedGovtIdType(initialValues.idRef || '');
      setIdType(detection.idType);

      // Handle the mock file if one was provided in the payload
      if (initialValues.fileUrl) {
        // Since we can't easily turn a URL into a File object for the input,
        // we create a "Fake" file so the validation check passes.
        const mockFile = new File([""], "previously_verified_id.jpg", { type: "image/jpeg" });
        setUploadedFile(mockFile);
      }
    }
  }, [initialValues]);

  const handleHeadCountChange = (newCount: number) => {
    if (isNaN(newCount)) return;
    setHeadCount(newCount);

    if (newCount === 0) return;

    const targetCount = Math.max(0, newCount);

    setEscortList((prevList) => {
      if (prevList.length < targetCount) {
        //scaling UP, append empty objs == target count
        const shortBy = targetCount - prevList.length;
        const extension = Array.from({ length: shortBy }, () => ({ name: '', idRef: '', idType: '' }));
        return [...prevList, ...extension];
      } else if (targetCount < prevList.length) {
        //scaling DOWN, trim the list to target count
        return prevList.slice(0, targetCount);
      }
      return prevList;
    });
  };

  //FT 9 Handler functions to update the escort details in state on input change
  const updateEscortField = (index: number, field: 'name' | 'idRef' | 'idType', value: string) => {
    setEscortList((prevList) => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    //validation check
    if (!uploadedFile) {
      alert("Please upload the required verification document before submitting the form.");
      return;
    }

    // Create the form data object
    const formData = {
      name,
      email,
      dob,
      ph,
      idRef,
      idType,
      address,
      purpose,
      visitorCategory:visitorCategory,
      clearanceLevel,
      headCount: escortList.length,
      escortList: escortList,
      fileName: uploadedFile.name,
      requestedDate: visitorCategory === 'scheduled' ? requestedDate : new Date().toISOString()
    };

    // If this is a repeated visitor AND we have the callback, create a PassRecord
   // In RegistrationForm.tsx, update the PassRecord creation section:

// If this is a repeated visitor AND we have the callback, create a PassRecord
if (visitorCategory === 'repeated' && onRepeatedVisitorSubmit) {
  const newPassRecord: PassRecord = {
    passId: `DISPATCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    holderName: name,
    purpose: purpose,
    email: email,
    dob: dob,
    address: address,
    clearanceLevel: clearanceLevel || 'Level 1',
    escortedManifest: escortList.length > 0
      ? `Accompanied by ${escortList.length} escort(s)`
      : 'Single personnel, no escorts',
    // Use provided requestedDate when available; otherwise default to today's date
    requestedDate: requestedDate ?? new Date().toISOString().split('T')[0],
    liveStatus: 'Active',
    fileUrl: uploadedFile ? URL.createObjectURL(uploadedFile) : 'https://via.placeholder.com/400x250?text=Uploaded+Document',
    createdAt: new Date().toISOString(),
    type: visitorCategory,
    idType: idType.trim() || 'Government ID',
    value: idRef,
    phoneNumber: ph,
    escortList: escortList.length > 0 ? escortList : undefined
  };

  console.log('Creating new repeated visitor record:', newPassRecord);
  
  // Call the callback to add to repeated visitor history
  onRepeatedVisitorSubmit(newPassRecord);
  
  // For repeated visitors, skip the normal form submission
  // Alert will be shown from the callback in EmployeeDashboard
  
  // Reset form
  setName('');
  setEmail('');
  setDob('');
  setPh('');
  setIdRef('');
  setAddress('');
  setPurpose('');
  setHeadCount(0);
  setRequestedDate('');
  setVisitorCategory('new');
  setClearanceLevel('Level 1');
  setEscortList([]);
  setUploadedFile(null);
  return; // Exit early for repeated visitors
}

    alert('Form submitted successfully!');

    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    }

    // Reset form
    setName('');
    setEmail('');
    setDob('');
    setPh('');
    setIdRef('');
    setAddress('');
    setPurpose('');
    setHeadCount(0);
    setRequestedDate('');
    setVisitorCategory('new'); // Match whatever your form's default starting tab is
    setClearanceLevel('Level 1');
    setEscortList([]); // Reset escort list
    setUploadedFile(null); // Clears the file/drag & drop upload zone
  };

  const processSingleFile = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];

      // Optional security check: limit to 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert("Security Pass Denied: File size exceeds the 5MB limit.");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processSingleFile(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSingleFile(e.target.files);
    }
  };

  const detectedGovtIdType = (value: string) => {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadhrRegex = /^[0-9]{12}$/;

    let idType = " ";
    if (aadhrRegex.test(cleaned)) { idType = "Aadhar"; }
    else if (panRegex.test(cleaned)) { idType = "PAN"; }
    else if (cleaned.length > 0) { idType = "Incomplete / Invalid"; }

    return { value: cleaned, idType };
  };

  return (
    <div className="bg-gray-900 border border-[#21262d] rounded-xl shadow-xl overflow-hidden flex flex-col scroll-mt-6">
      {/* Form Section Header */}
      <div className="p-4 border-b border-[#21262d] flex items-center justify-between bg-gray-950/40">
        <div className="flex items-center gap-2 text-amber-500">
          <UserPlus className="h-4 w-4" />
          <h3 className="font-semibold text-sm text-gray-200">Security Access Registry Form</h3>
        </div>
      </div>

      {/* Form Input Body */}
      <form onSubmit={handleSubmit} className="p-5 space-y-5 text-xs">
        {/* Visitor Category Selection */}
        <div className="space-y-1.5">
          <label className="block text-gray-300 font-medium">Pass Processing Pipeline</label>
          <div className="relative">
            <select
              value={visitorCategory}
              onChange={(e) => setVisitorCategory(e.target.value as VisitorCategory)}
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

        {/* conditional rendering for scheduled date picker */}
        {visitorCategory === 'scheduled' && (
          <div className="space-y-1.5 p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="block text-amber-400 font-semibold">Requested Arrival Date & Time *</label>
            <input
              type="date"
              required={visitorCategory === 'scheduled'}
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              className="w-full sm:w-72 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        )}

        {/* Grid text Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-gray-300 font-medium">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Sinchana K"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-[#12161d] transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-gray-300 font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="e.g. name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:bg-[#12161d] transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-gray-300 font-medium">Date of Birth</label>
            <input
              type="date"
              required
              placeholder="dd/mm/yyyy"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-300 font-medium">Govt Issued ID Ref *</label>
            <input
              type="text"
              required
              maxLength={12}
              value={idRef}
              onChange={(e) => {
                const { value, idType } = detectedGovtIdType(e.target.value);
                setIdRef(value);
                setIdType(idType);
              }}
              onBlur={() => {
                if (idType === 'Incomplete / Invalid') {
                  alert('Invalid ID Format! Please enter a valid 12-Digit Aadhaar or alpha-numeric PAN.')
                  setIdRef('');
                  setIdType('');
                }
              }}
              placeholder="12-Digit Aadhaar / Alpha-Numeric PAN"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 text-gray-200 focus:bg-[#12161d]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-gray-300 font-medium">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 9066224569"
              value={ph}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 10) value = value.slice(0, 10);
                setPh(value);
              }}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Permanent Address / Agency Address */}
        <div className="space-y-1.5">
          <label className="block text-gray-300 font-medium">Permanent Address</label>
          <input type="text" required placeholder="e.g. House/Office No, Street, City, State, Pincode"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-200" />
        </div>

        {/* Purpose Input */}
        <div className="space-y-1.5">
          <label className="block text-gray-300 font-medium">Purpose of Entry / Host Organization</label>
          <input type="text" required placeholder="e.g. Meeting with the Team Lead" value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-200" />
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
          />
        </div>

        {/* Dynamic Escorted Manifest Row Generator: conditional rendering */}
        {headCount > 0 && (
          <div className="bg-[#161b22]/50 border border-[#21262d] rounded-lg p-4 space-y-3.5 animate-fade-in">
            {/* Manifest Section Header */}
            <div className="flex items-center justify-between border-b border-[#21262d] pb-2">
              <div className="flex items-center gap-2 text-amber-500">
                <Users className="h-3.5 w-3.5" />
                <h4 className="font-semibold text-xs text-gray-200">Escorted Group Manifest</h4>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-medium border border-amber-500/10">
                {headCount} {headCount === 1 ? 'Accompanying Member' : 'Members Required'}
              </span>
            </div>

            {/* Generate structured rows matching the headcount exactly */}
            <div className="space-y-3 divide-y divide-[#21262d]/40">
              {escortList.map((escort, index) => (
                <div key={index} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${index > 0 ? 'pt-3.5' : ''
                  }`}>
                  {/* Member name controlled input */}
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
                      value={escort.name || ''}
                      onChange={(e) => updateEscortField(index, 'name', e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-600 text-gray-200 focus:bg-[#12161d] transition-all"
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
                      maxLength={12}
                      value={escort.idRef || ''}
                      onChange={(e) => {
                        const { value, idType } = detectedGovtIdType(e.target.value);
                        updateEscortField(index, 'idRef', value);
                        updateEscortField(index, 'idType', idType)
                      }}
                      onBlur={() => {
                        if (escort.idType === 'Incomplete / Invalid') {
                          alert('Invalid ID Format! Please enter a valid 12-Digit Aadhaar or alpha-numeric PAN.')
                          updateEscortField(index, 'idRef', '');
                          updateEscortField(index, 'idType', '')
                        }
                      }}
                      placeholder="12-Digit Aadhaar / Alpha-Numeric PAN"
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 text-gray-200 focus:bg-[#12161d]"
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
              className={`p-2.5 rounded-lg border cursor-pointer transition duration-150 font-medium ${clearanceLevel === 'Level 1'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold shadow-md'
                  : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500/60 hover:bg-emerald-500/10'
                }`}
            >
              Level 1 • Public
            </div>
            <div
              onClick={() => setClearanceLevel('Level 2')}
              className={`p-2.5 rounded-lg border cursor-pointer transition duration-150 ${clearanceLevel === 'Level 2'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-semibold shadow-md'
                  : 'bg-amber-500/5 border-amber-500/10 text-amber-500/60 hover:bg-amber-500/10'
                }`}
            >
              Level 2 • Restricted
            </div>
            <div
              onClick={() => setClearanceLevel('Level 3')}
              className={`p-2.5 rounded-lg border cursor-pointer transition duration-150 font-medium ${clearanceLevel === 'Level 3'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-semibold shadow-md'
                  : 'bg-rose-500/5 border-rose-500/10 text-rose-500/60 hover:bg-rose-500/10'
                }`}
            >
              Level 3 • Classified
            </div>
          </div>
        </div>

        {/* Feature 4: Document Upload Selector Area: drag n drop- fully function */}
        <div className="space-y-1.5">
          <label className="block text-gray-300 font-medium">Scan Verification Documents</label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all group ${isDragging ? 'border-amber-500 bg-amber-500/5 shadow-inner ' : 'border-[#30363d] bg-[#0d1117] hover:border-gray-500'
              }`}
          >
            <input type="file" className="hidden" id="inline-doc-upload"
              onChange={handleFileChange}
              accept=".pdf, .png, .jpg, .jpeg"
            />
            <label htmlFor="inline-doc-upload" className="cursor-pointer space-y-1 block">
              <div className="flex flex-col items-center justify-center gap-1.5">
                {uploadedFile ? (
                  <div className="space-y-1.5">
                    <FileCheck className="h-6 w-6 text-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-semibold block break-all">
                      {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)}KB)
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                      className="mt-1 text-xs text-red-400 hover:text-red-300 font-medium underline text-[10px] block mx-auto cursor-pointer transition-colors"
                    >
                      Remove & Upload Again
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-gray-500 group-hover:text-amber-500 transition-colors" />
                    <span className="text-amber-500 font-semibold block group-hover:underline">Drag & Drop or Click to Upload Credentials</span>
                    <span className="text-[10px] text-gray-500 block">PDF, PNG, or JPG up to 5MB (Automatic encryption applied)</span>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-end gap-2">
          <button type="reset"
            onClick={() => setUploadedFile(null)}
            className="px-4 py-2 bg-transparent border border-gray-700 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white font-medium transition">
            Reset Form
          </button>
          <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#0d1117] font-bold rounded-lg transition shadow-lg shadow-amber-500/10">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}