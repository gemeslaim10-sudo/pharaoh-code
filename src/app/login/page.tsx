'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user, loginWithGoogle, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (isAdmin) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return <div className="h-screen w-full bg-[#0A192F] flex items-center justify-center text-pharaohGold text-2xl font-bold">جاري التحميل...</div>;
  }

  return (
    <div className="h-screen w-full bg-[#0A192F] flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md max-w-md w-full text-center">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">
          PHARAOH <span className="text-[#C5A16F]">CODE</span>
        </h1>
        <p className="text-gray-400 mb-8">تسجيل الدخول إلى حسابك</p>
        
        <button 
          onClick={loginWithGoogle}
          className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-lg hover:shadow-xl active:scale-98"
        >
          <svg className="w-6 h-6" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          تسجيل الدخول بواسطة جوجل
        </button>

        <div className="mt-6 pt-6 border-t border-white/10">
          <button 
            onClick={() => router.push('/')}
            className="text-xs text-gray-400 hover:text-[#C5A16F] transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
          >
            <span>العودة إلى الموقع الرئيسي</span>
            <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
