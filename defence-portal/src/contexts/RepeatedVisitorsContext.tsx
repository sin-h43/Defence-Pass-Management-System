// contexts/RepeatedVisitorsContext.tsx
// EDITED: Added useEffect import for localStorage persistence
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Visitor } from '../utils/searchFilters';
import type { PassRecord } from '../utils/passStorage';

// EDITED: Added new methods to interface for master visitor management
interface RepeatedVisitorsContextType {
  masterVisitors: Visitor[];
  visitationHistory: PassRecord[];
  addNewVisitRecord: (record: PassRecord) => void;
  getVisitorHistory: (visitorName: string) => PassRecord[];
  addMasterVisitor: (visitor: Visitor) => void;
  isRepeatedVisitor: (name: string, id?: string) => boolean;
}

const RepeatedVisitorsContext = createContext<RepeatedVisitorsContextType | undefined>(undefined);

// Master frequent flyers database
const MASTER_REPEATED_VISITORS: Visitor[] = [
  { id: 'DEF-M801', name: 'Sinchana K', purpose: 'System Audit', requestTime: '02:15 PM', type: 'Repeated Visitor', status: 'Cleared' },
  { id: 'DEF-M802', name: 'Arya K', purpose: 'Equipment Delivery', requestTime: '11:00 AM', type: 'Repeated Visitor', status: 'Cleared' },
];

// Mock historical logs database
const INITIAL_HISTORY: PassRecord[] = [
  { 
    passId: 'DISPATCH-TRX99',
    holderName: 'Sinchana K',
    purpose: 'Core Server Room Infrastructure Patching',
    email: 'sinchana.k@defence.gov.in',
    dob: '1996-08-24',
    address: 'Hangar Block 4, Defense Corridor, Phase II, Bengaluru',
    clearanceLevel: 'Level 3',
    escortedManifest: 'Single personnel, no escorts',
    requestedDate: '2026-06-02',
    liveStatus: 'Active',
    fileUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400',
    createdAt: '2026-06-02T10:15:00Z',
    type: 'Repeated Visitor',
    idType: 'Aadhaar',
    value: 'AADH-8839-2041-9920'
  },
  { 
    passId: 'DISPATCH-TRX41',
    holderName: 'Sinchana K',
    purpose: 'Quarterly Critical Firmware Audit',
    email: 'sinchana.k@defence.gov.in',
    dob: '1996-08-24',
    address: 'Hangar Block 4, Defense Corridor, Phase II, Bengaluru',
    clearanceLevel: 'Level 3',
    escortedManifest: 'Accompanied by 1 escort',
    requestedDate: '2026-05-28',
    liveStatus: 'Expired',
    fileUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400',
    createdAt: '2026-05-28T09:00:00Z',
    type: 'Repeated Visitor',
    idType: 'Aadhaar',
    value: 'AADH-8839-2041-9920',
    escortList: [
      { name: 'Security Officer Smith', idRef: 'SEC-8821', idType: 'Service ID' }
    ]
  },
  { 
    passId: 'DISPATCH-TRX12',
    holderName: 'Sinchana K',
    purpose: 'Emergency HVAC Component Diagnostic',
    email: 'sinchana.k@defence.gov.in',
    dob: '1996-08-24',
    address: 'Hangar Block 4, Defense Corridor, Phase II, Bengaluru',
    clearanceLevel: 'Level 2',
    escortedManifest: 'Emergency response team',
    requestedDate: '2026-05-14',
    liveStatus: 'Expired',
    fileUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400',
    createdAt: '2026-05-14T16:30:00Z',
    type: 'Repeated Visitor',
    idType: 'Aadhaar',
    value: 'AADH-8839-2041-9920',
    escortList: [
      { name: 'Technician John', idRef: 'TECH-4472', idType: 'Service ID' },
      { name: 'Engineer Sarah', idRef: 'ENG-9913', idType: 'Service ID' }
    ]
  },
];

// EDITED: Added localStorage keys
const MASTER_STORAGE_KEY = 'masterVisitors';
const HISTORY_STORAGE_KEY = 'visitationHistory';

export function RepeatedVisitorsProvider({ children }: { children: ReactNode }) {
  // EDITED: Initialize from localStorage with fallback to initial data
  const [masterVisitors, setMasterVisitors] = useState<Visitor[]>(() => {
    try {
      const stored = localStorage.getItem(MASTER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : MASTER_REPEATED_VISITORS;
    } catch (error) {
      console.error('Failed to load master visitors from localStorage:', error);
      return MASTER_REPEATED_VISITORS;
    }
  });

  const [visitationHistory, setVisitationHistory] = useState<PassRecord[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_HISTORY;
    } catch (error) {
      console.error('Failed to load visitation history from localStorage:', error);
      return INITIAL_HISTORY;
    }
  });

  // EDITED: Persist masterVisitors to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(masterVisitors));
    } catch (error) {
      console.error('Failed to save master visitors to localStorage:', error);
    }
  }, [masterVisitors]);

  // EDITED: Persist visitationHistory to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(visitationHistory));
    } catch (error) {
      console.error('Failed to save visitation history to localStorage:', error);
    }
  }, [visitationHistory]);

  const addNewVisitRecord = (record: PassRecord) => {
    setVisitationHistory(prev => [record, ...prev]);
    console.log('New repeated visitor record added:', record);
  };

  const getVisitorHistory = (visitorName: string) => {
    return visitationHistory.filter(history => history.holderName === visitorName);
  };

  // EDITED: Implement addMasterVisitor function
  const addMasterVisitor = (visitor: Visitor) => {
    // Check if visitor already exists by name (case-insensitive)
    const exists = masterVisitors.some(v => v.name.toLowerCase() === visitor.name.toLowerCase());
    if (!exists) {
      setMasterVisitors(prev => [visitor, ...prev]);
      console.log('New master visitor added:', visitor);
    } else {
      console.warn(`Visitor with name ${visitor.name} already exists in master registry`);
    }
  };

  // EDITED: Implement isRepeatedVisitor function
  const isRepeatedVisitor = (name: string, id?: string): boolean => {
    return masterVisitors.some(v => {
      const nameMatch = v.name.toLowerCase() === name.toLowerCase();
      const idMatch = id ? v.id === id : true;
      return nameMatch && idMatch;
    });
  };

  return (
    <RepeatedVisitorsContext.Provider value={{
      masterVisitors,
      visitationHistory,
      addNewVisitRecord,
      getVisitorHistory,
      addMasterVisitor,
      isRepeatedVisitor
    }}>
      {children}
    </RepeatedVisitorsContext.Provider>
  );
}

export function useRepeatedVisitors() {
  const context = useContext(RepeatedVisitorsContext);
  if (!context) {
    throw new Error('useRepeatedVisitors must be used within RepeatedVisitorsProvider');
  }
  return context;
}