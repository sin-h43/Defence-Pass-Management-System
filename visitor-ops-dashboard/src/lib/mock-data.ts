export type VisitorRequest = {
  id: string;
  visitor: string;
  org: string;
  purpose: string;
  department: string;
  requestedAt: string;
  visitAt: string;
  duration: string;
  status: "pending" | "approved" | "rejected" | "active" | "expired";
  qr: boolean;
  hrDecisionAt?: string;
  hrOfficer?: string;
  phone: string;
  email: string;
  idType: string;
  idNumber: string;
};

export const requests: VisitorRequest[] = [
  {
    id: "VP-3047",
    visitor: "Ramesh Mehta",
    org: "Tata Advanced Systems",
    purpose: "Avionics maintenance",
    department: "Hangar 4 · Engineering",
    requestedAt: "28 May 09:12",
    visitAt: "28 May 14:00",
    duration: "4h",
    status: "active",
    qr: true,
    hrDecisionAt: "28 May 10:04",
    hrOfficer: "Maj. P. Iyer",
    phone: "+91 98214 33012",
    email: "rmehta@tasl.in",
    idType: "Aadhaar",
    idNumber: "XXXX XXXX 4421",
  },
  {
    id: "VP-3046",
    visitor: "Dr. Anika Roy",
    org: "DRDO — Visiting Scientist",
    purpose: "Joint research briefing",
    department: "R&D · Wing C",
    requestedAt: "28 May 08:55",
    visitAt: "28 May 11:30",
    duration: "2h 30m",
    status: "approved",
    qr: true,
    hrDecisionAt: "28 May 09:21",
    hrOfficer: "Col. S. Bhatia",
    phone: "+91 99100 88210",
    email: "a.roy@drdo.gov.in",
    idType: "Govt. ID",
    idNumber: "DRDO-22-008812",
  },
  {
    id: "VP-3045",
    visitor: "Suresh Pillai",
    org: "BEL Subcontractor",
    purpose: "HVAC servicing",
    department: "Facilities · Block 2",
    requestedAt: "28 May 08:30",
    visitAt: "28 May 13:00",
    duration: "3h",
    status: "pending",
    qr: false,
    phone: "+91 90873 11200",
    email: "s.pillai@belsub.in",
    idType: "PAN",
    idNumber: "AXXPP7821K",
  },
  {
    id: "VP-3044",
    visitor: "Neha Verma",
    org: "Larsen & Toubro Defence",
    purpose: "Procurement meeting",
    department: "Admin Block",
    requestedAt: "28 May 08:02",
    visitAt: "28 May 15:00",
    duration: "1h",
    status: "approved",
    qr: true,
    hrDecisionAt: "28 May 08:44",
    hrOfficer: "Maj. P. Iyer",
    phone: "+91 98330 02211",
    email: "n.verma@lntdefence.com",
    idType: "Driving License",
    idNumber: "DL-09-2018-XXXX",
  },
  {
    id: "VP-3043",
    visitor: "Kabir Hassan",
    org: "Independent Journalist",
    purpose: "Press visit (unscheduled)",
    department: "Public Affairs",
    requestedAt: "27 May 17:21",
    visitAt: "29 May 10:00",
    duration: "1h",
    status: "rejected",
    qr: false,
    hrDecisionAt: "27 May 18:09",
    hrOfficer: "Col. S. Bhatia",
    phone: "+91 98998 00112",
    email: "k.hassan@press.in",
    idType: "Passport",
    idNumber: "Z21XXXXX",
  },
  {
    id: "VP-3042",
    visitor: "Pranav Iyer",
    org: "Interview Candidate",
    purpose: "Technical interview · Sys Eng",
    department: "HR · Recruitment",
    requestedAt: "27 May 14:11",
    visitAt: "29 May 09:30",
    duration: "2h",
    status: "approved",
    qr: true,
    hrDecisionAt: "27 May 15:02",
    hrOfficer: "Lt. R. Nair",
    phone: "+91 97223 44910",
    email: "p.iyer@gmail.com",
    idType: "Aadhaar",
    idNumber: "XXXX XXXX 0917",
  },
  {
    id: "VP-3041",
    visitor: "Asha Krishnan",
    org: "Canteen Vendor",
    purpose: "Weekly supply delivery",
    department: "Logistics Gate B",
    requestedAt: "27 May 06:45",
    visitAt: "28 May 06:30",
    duration: "1h",
    status: "active",
    qr: true,
    hrDecisionAt: "27 May 07:12",
    hrOfficer: "Lt. R. Nair",
    phone: "+91 90420 87766",
    email: "asha@suppliers.in",
    idType: "Aadhaar",
    idNumber: "XXXX XXXX 1188",
  },
];

export const recentVisitors = [
  { id: "VIS-1042", name: "Ramesh Mehta", org: "Tata Advanced Systems", lastVisit: "27 May", visits: 14, phone: "+91 98214 33012" },
  { id: "VIS-0918", name: "Asha Krishnan", org: "Canteen Vendor", lastVisit: "26 May", visits: 47, phone: "+91 90420 87766" },
  { id: "VIS-2210", name: "Dr. Anika Roy", org: "DRDO", lastVisit: "21 May", visits: 6, phone: "+91 99100 88210" },
  { id: "VIS-1755", name: "Neha Verma", org: "L&T Defence", lastVisit: "19 May", visits: 9, phone: "+91 98330 02211" },
  { id: "VIS-2901", name: "Suresh Pillai", org: "BEL Subcontractor", lastVisit: "14 May", visits: 22, phone: "+91 90873 11200" },
];
