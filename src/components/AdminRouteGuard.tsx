'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin) {
        router.push('/');
      }
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !isAdmin) {
    return <div className="min-h-screen w-full bg-[#0A192F] flex items-center justify-center text-pharaohGold text-2xl font-bold">جاري التحقق من الصلاحيات...</div>;
  }

  return <>{children}</>;
}
