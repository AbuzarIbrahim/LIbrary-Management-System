export type UserRole = 'admin' | 'user';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  type: 'book' | 'movie';
  serialNumber: string;
  available: boolean;
  addedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  _id: string;
  name: string;
  membershipNumber: string;
  startDate: string;
  duration: '6 months' | '1 year' | '2 years';
  expiryDate: string;
  status: 'active' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  book: string | Book;
  member: string | Member;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  finePaid: boolean;
  remarks?: string;
  status: 'issued' | 'returned';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  message?: string;
  results?: number;
  data: T;
}

export interface AuthData {
  token: string;
  user: User;
}
