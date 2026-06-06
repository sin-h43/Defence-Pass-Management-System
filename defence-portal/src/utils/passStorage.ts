export interface PassRecord {
  passId: string;
  holderName: string;
  purpose: string;
  ph?:string;
  email?: string;
  dob?: string;
  address?: string;
  clearanceLevel?: string;
  escortedManifest?: string;
  requestedDate?: string;
  liveStatus?: string;
  fileUrl?: string;
  createdAt: string;
  visitorCategory?: string;
  idType?: string;
  idRef?: string;
  escortList?: Array<{
    name: string;
    idRef: string;
    idType: string;
  }>;
}

const PASSES_KEY = 'dispatchedPasses';

export const savePass = (pass: PassRecord): void => {
  try {
    const existing = getStoredPasses();
    const updated = [pass, ...existing];
    localStorage.setItem(PASSES_KEY, JSON.stringify(updated));
    console.log('Pass saved to localStorage:', pass.passId);
  } catch (e) {
    console.error('Failed to save pass:', e);
  }
};

// EDITED: Renamed from getAllPasses to getStoredPasses to match imports across codebase
export const getStoredPasses = (): PassRecord[] => {
  try {
    const stored = localStorage.getItem(PASSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load passes:', e);
    return [];
  }
};

export const clearAllPasses = (): void => {
  localStorage.removeItem(PASSES_KEY);
};