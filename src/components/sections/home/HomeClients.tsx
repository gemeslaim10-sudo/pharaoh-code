'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface ClientItem {
    id: string;
    name: string;
    name_ar?: string;
    name_en?: string;
    logo: string;
    description: string;
    description_ar?: string;
    description_en?: string;
    websiteUrl: string;
}

export default function HomeClients({ clients = [] }: { clients?: ClientItem[] }) {
  const { t, language } = useTranslation();

  if (clients.length === 0) return null;

  // Limit homepage to a maximum of 6 clients
  const displayedClients = clients.slice(0, 6);

  return (
    <section id="our-clients" className="relative py-24 bg-[#0A192F] overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C5A16F]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16">
                <span className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                    {t("clients.subtitle")}
                </span>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    {t("clients.titlePart1")} <span className="text-[#C5A16F] italic">{t("clients.titlePart2")}</span>
                </h3>
                <div className="w-20 h-1.5 bg-[#C5A16F] mt-5 rounded-full shadow-[0_0_15px_rgba(197,161,111,0.3)]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedClients.map((client) => {
                    const clientName = getDynamicText(client, 'name', language) || client.name || '';
                    const clientDesc = getDynamicText(client, 'description', language) || client.description || '';

                    return (
                        <div 
                            key={client.id} 
                            className="group relative bg-white/[0.01] backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 hover:border-[#C5A16F]/40 hover:bg-[#112240]/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 shadow-2xl flex flex-col justify-between h-full overflow-hidden"
                        >
                            {/* Background radial glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#C5A16F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"></div>

                            {/* Glossy sweeping glare effect */}
                            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-180%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none"></div>

                            <div className="relative z-10">
                                {/* Client Logo Banner - Clickable Link to Details */}
                                <Link href={`/clients/${client.id}`} className="block">
                                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6 border border-white/5 bg-[#0A192F] flex items-center justify-center group-hover:border-[#C5A16F]/30 group-hover:shadow-[0_0_25px_rgba(197,161,111,0.15)] transition-all duration-700">
                                        <img 
                                            src={client.logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300"} 
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000 ease-out" 
                                            alt={clientName} 
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent"></div>
                                    </div>
                                </Link>

                                {/* Client Info - Title */}
                                <Link href={`/clients/${client.id}`} className="block relative">
                                    <h4 className="text-white text-2xl font-bold mb-1 hover:text-[#C5A16F] transition-colors flex items-center gap-2">
                                        <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors duration-500">𓂀</span>
                                        {clientName}
                                    </h4>
                                    <div className="w-0 h-[2px] bg-[#C5A16F] group-hover:w-20 transition-all duration-500 mb-4 rounded-full"></div>
                                </Link>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                                    {clientDesc}
                                </p>
                            </div>

                            {/* Action Links */}
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                                <Link 
                                    href={`/clients/${client.id}`} 
                                    className="text-xs text-[#C5A16F] font-bold bg-[#C5A16F]/10 hover:bg-[#C5A16F] hover:text-[#0A192F] px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 border border-[#C5A16F]/20 hover:border-transparent"
                                >
                                    {t("clients.projectDetails")} 
                                    <span className="inline-block transform group-hover:translate-x-[-3px] transition-transform duration-300">←</span>
                                </Link>
                                
                                <a 
                                    href={client.websiteUrl || "#"} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-xs text-gray-500 font-bold flex items-center gap-1 hover:text-white transition-colors py-2 px-1"
                                >
                                    {t("clients.visitWebsite")}
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* View All Clients Button */}
            {clients.length > 0 && (
                <div className="mt-16 flex justify-center">
                    <Link 
                        href="/clients" 
                        className="bg-[#112240] border border-[#C5A16F]/30 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] px-10 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-[#C5A16F]/10 flex items-center gap-2"
                    >
                        {t("clients.viewAllClients")}
                    </Link>
                </div>
            )}
        </div>

        {/* Huge background text */}
        <div className="absolute bottom-0 left-10 text-[12rem] font-black text-[#C5A16F]/[0.02] pointer-events-none select-none uppercase">
            Partners
        </div>
    </section>
  );
}
