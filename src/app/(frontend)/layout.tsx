import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalScripts from "@/components/layout/GlobalScripts";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import { getIdentity, getSocialLinks, getSystemStatus } from '@/app/actions/dashboard/settings';
import Link from 'next/link';

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [identity, socialLinks, systemStatus] = await Promise.all([
    getIdentity(),
    getSocialLinks(),
    getSystemStatus()
  ]);

  const siteName = identity?.name || "PHARAOH CODE";

  if (systemStatus?.mode === 'on') {
    return (
      <main className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden" dir="rtl">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pharaohGold/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-2xl">
          <div className="w-24 h-24 bg-[#112240] rounded-3xl border border-pharaohGold/20 flex items-center justify-center shadow-[0_0_50px_rgba(197,161,111,0.1)] mb-8">
            <svg className="w-12 h-12 text-pharaohGold animate-[spin_4s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle>
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            نحن نقوم <span className="text-pharaohGold">بتحديث</span> المنصة
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
            {systemStatus.message || 'نحن نقوم بتحديث منصتنا حالياً لنقدم لكم تجربة أفضل، سنعود قريباً.'}
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard" className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all">
              الإدارة
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Preloader />
      <Navbar siteName={siteName} />
      
      <main className="flex-grow bg-[#0A192F]">
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </main>

      <Footer siteName={siteName} socialLinks={socialLinks} />
      <GlobalScripts />

    </>
  );
}
