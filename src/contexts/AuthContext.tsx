'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/config';
import { checkIsAdminAction } from '@/app/actions/dashboard/settings';
import { recordUserLoginAction } from '@/app/actions/dashboard/users';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let generation = 0;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const request = ++generation;
      setUser(currentUser);
      setIsAdmin(false);
      setLoading(true);
      try {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const adminStatus = await checkIsAdminAction(token);
          if (request !== generation) return;
          setIsAdmin(adminStatus);
          void recordUserLoginAction(token).catch((err) => console.warn('[auth] could not record login:', err));
        }
      } catch (err) {
        console.warn('[auth] admin status check failed:', err);
        if (request === generation) setIsAdmin(false);
      } finally {
        if (request === generation) setLoading(false);
      }
    });

    return () => { generation++; unsubscribe(); };
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // isAdmin is now managed in state

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
