import { Invitation } from '../types';

// Toy: "Əli & Nigar", ad günü: "Leyla"
export const displayNames = (inv: Pick<Invitation, 'groomName' | 'brideName'>): string =>
  [inv.groomName, inv.brideName].filter((n) => n && n.trim()).join(' & ');
