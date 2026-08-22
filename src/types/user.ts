export interface RegisteredUser {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin?: boolean;
  createdAt?: string | null;
  lastLoginAt?: string | null;
  provider?: string;
}

export interface UsersFetchStats {
  totalUsers: number;
  adminCount: number;
  memberCount: number;
  activeRecentCount: number;
}
