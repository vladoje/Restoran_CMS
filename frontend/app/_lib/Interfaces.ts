export interface Sala {
  salaId: number;
  restoranId: number;
  width: number;
  height: number;
}
export interface Restoran {
  restoranId: number;
  ownerId: number;
  siteId: number;
  name: string;
  address: string;
  phone: string;
  buffer: number;
  trajanjeRezervacije: number;
  slug: string;
}

export interface Rezervacija {
  reservationId: number;
  restoranId: number;
  userId: number;
  tableId: number;
  dateTime: Date;
  durration: string;
  numberOfPeople: number;
  note: string;
  status: string;
}

export interface Sto {
  tableId: number;
  capacity: number;
  positionX: number;
  positionY: number;
  orientation: number;
  salaId: number;
  tableNumber: number;
}
export interface User {
  email: string;
  role: string;
  name: string;
  userId: number;
  passwordHash: string;
}
export interface Foooter {
  footerId: number;
  hasContactInfo: boolean;
  hasLogo: boolean;
  classname: string;
  text: string;
}
export interface Sajt {
  siteId: number;
  headerId: number;
  footerId: number;
  primaryColor: string;
  secondaryColor: string;
  surfaceColor: string;
  backgroundColor: string;
  logoUrl: string;
}
export interface Headerr {
  headerId: number;
  hasLightModeSwitch: boolean;
  hasLogo: boolean;
  classname: string;
  text: string;
}
export interface Linkk {
  linkId: number;
  text: string;
  url: string;
  icon: string;
  headerId?: number;
  footerId?: number;
}
export interface DBRezervacija {
  reservationId: number;
  restoranId: number;
  userId: number;
  tableId: number;
  dateTime: string;
  durration: number;
  numberOfPeople: number;
  note: string;
  status: string;
}
