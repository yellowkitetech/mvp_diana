
import { UserRole } from './common';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  agencyId?: string;
}

export interface Agency {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
}
