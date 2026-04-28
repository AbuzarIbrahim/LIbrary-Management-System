// ==================== Type Definitions ====================
export type UserRole = 'admin' | 'user';
export type BookType = 'book' | 'movie';
export type MembershipDuration = '6 months' | '1 year' | '2 years';
export type MemberStatus = 'active' | 'cancelled';
export type TransactionStatus = 'issued' | 'returned';
export type ApiStatus = 'success' | 'fail' | 'error';

// ==================== Entity Interfaces ====================
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
  type: BookType;
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
  duration: MembershipDuration;
  expiryDate: string;
  status: MemberStatus;
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
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}

// ==================== API Response Interfaces ====================
export interface ApiResponse<T> {
  status: ApiStatus;
  message?: string;
  results?: number;
  data: T;
}

export interface AuthData {
  token: string;
  user: User;
}

// ==================== Generic Action Response Interface ====================
export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// ==================== Request Interfaces ====================
export interface IssueBookRequest {
  bookId: string;
  memberId: string;
  dueDate: string;
  remarks?: string;
}

export interface ReturnBookRequest {
  transactionId: string;
  returnDate?: string;
  remarks?: string;
  finePaid?: boolean;
}

export interface AddBookRequest {
  title: string;
  author: string;
  type: BookType;
  serialNumber: string;
}

export interface UpdateBookRequest {
  id: string;
  bookData: Partial<AddBookRequest>;
}

export interface AddMemberRequest {
  name: string;
  membershipNumber: string;
  startDate?: string;
  duration: MembershipDuration;
}

export interface UpdateMemberRequest {
  id: string;
  memberData: Partial<AddMemberRequest>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}
