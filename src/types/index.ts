// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  // Add other user properties as needed
  // favorites?: string[];
  // createdAt?: string;
  // updatedAt?: string;
}

// Auth State
export interface AuthState {
  userInfo: User | null;
}

