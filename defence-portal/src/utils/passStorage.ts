// A central utility to sync pass data across pages using localStorage
export interface PassRecord {
  passId: string;
  holderName: string;
  purpose: string;

  // visitorCategory: string;
  // clearanceLevel: string;
  // escortedManifest: string;
  // //expiration: string;
  // type: string;
  // liveStatus: string;
  // requestedDate: string;
  // fileUrl: string;

  // createdAt: number;

  [key: string]: any; //index signature accept any
}

const STORAGE_KEY = "defence_dispatched_passes";

export const getStoredPasses = (): PassRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const savePass = (
  newPass: PassRecord
): PassRecord[] => {
  const currentPasses = getStoredPasses();

  const updated = [newPass, ...currentPasses];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return updated
};