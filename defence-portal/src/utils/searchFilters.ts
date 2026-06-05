export interface Visitor {
  id: string;
  name: string;
  purpose?: string;
  requestTime?: string;
  type: string;
  status?: string;
}

export const filterByIdentityAndId = (visitors: Visitor[], query: string): Visitor[] => {
  if (!query.trim()) return visitors;
  const q = query.toLowerCase();
  return visitors.filter(v => 
    v.name?.toLowerCase().includes(q) || 
    v.id?.toLowerCase().includes(q)
  );
};