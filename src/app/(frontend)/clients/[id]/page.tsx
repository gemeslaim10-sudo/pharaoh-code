import { admin } from '@/lib/firebase/admin';
import { getClients } from '@/app/actions/dashboard/clients';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClientLogoZoom from '@/components/clients/ClientLogoZoom';

export async function generateStaticParams() {
    const clients = await getClients();
    return clients.map((client: any) => ({
        id: client.id,
    }));
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let client: admin.firestore.DocumentData | null = null;
    try {
        const db = admin.firestore();
        const doc = await db.collection('clients').doc(id).get();
        if (doc.exists) {
            client = doc.data() || null;
        }
    } catch (error) {
        console.error("Failed to fetch client details from firebase:", error);
    }
    
    if (!client) {
        notFound();
    }
    
    return (
        <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 bg-[#0A192F] overflow-hidden text-right min-h-screen flex items-center" dir="rtl">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="pharaoh-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <text x="0" y="50" fontFamily="serif" fontSize="20" fill="#C5A16F">✦</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pharaoh-pattern)" />
                </svg>
            </div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C5A16F]/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                {/* Back Button */}
                <div className="mb-8 flex justify-start">
                    <Link href="/" className="bg-[#112240] border border-pharaohGold/30 text-pharaohGold hover:bg-pharaohGold hover:text-[#0A192F] px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-pharaohGold/10">
                        ← العودة للرئيسية
                    </Link>
                </div>
                
                {/* Main Client Profile Card */}
                <div className="bg-[#112240] border-t-2 border-r-2 border-pharaohGold/40 rounded-tr-[4rem] rounded-bl-[4rem] shadow-[0_25px_60px_rgba(197,161,111,0.15)] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] font-serif opacity-[0.01] text-pharaohGold select-none pointer-events-none">✦</div>
                    
                    {/* Header Layout */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 border-b border-pharaohGold/10 pb-8 mb-8 relative z-10">
                        <ClientLogoZoom src={client.logo} alt={client.name} />
                        <div className="flex-1 text-center md:text-right">
                            <span className="inline-block bg-pharaohGold/10 text-pharaohGold text-xs font-bold px-4 py-1.5 rounded-lg tracking-wider uppercase border border-pharaohGold/20 shadow-md">
                                شريك نجاح معتمد
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-white mt-4 mb-3 tracking-tight">
                                {client.name}
                            </h1>
                        </div>
                    </div>
                    
                    {/* Detailed info */}
                    <div className="space-y-8 relative z-10">
                        <div className="bg-[#0A192F]/50 p-6 md:p-8 rounded-tr-[2.5rem] rounded-bl-[2.5rem] border border-white/5 shadow-inner">
                            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-lg bg-pharaohGold/10 text-pharaohGold flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span>الخدمات والحلول البرمجية المقدمة</span>
                            </h4>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
                                {client.description}
                            </p>
                        </div>
                        
                        {/* Visit Site Button */}
                        {client.websiteUrl && (
                            <div className="flex justify-end pt-4 border-t border-pharaohGold/10">
                                <a 
                                    href={client.websiteUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="bg-gradient-to-r from-pharaohGold to-amber-600 text-[#0A192F] font-black text-sm px-8 py-3.5 rounded-xl shadow-xl hover:shadow-pharaohGold/10 hover:opacity-95 transition duration-300 transform active:scale-95 flex items-center gap-2"
                                >
                                    <span>زيارة موقع الشريك الإلكتروني</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
