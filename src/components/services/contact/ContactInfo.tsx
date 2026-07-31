'use client';

import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function ContactInfo({ data }: { data: SectionData }) {
    const { t, language } = useTranslation();

    return (
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-[#C5A16F]/30 transition-all group relative overflow-hidden">
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] mb-6 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h4 className="text-white text-xl font-bold mb-2">{getDynamicText(data.info || {}, 'emailTitle', language) || t('contact.instantEmail')}</h4>
                    <p className="text-gray-400 text-sm mb-4">{data.info?.email || "info@pharaohcode.com"}</p>
                    <a href={`mailto:${data.info?.email || "info@pharaohcode.com"}`} className="text-[#C5A16F] text-xs font-bold hover:underline">
                        {getDynamicText(data.info || {}, 'emailLinkText', language) || t('contact.sendDirectEmail')}
                    </a>
                </div>
            </div>

            <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-[#C5A16F]/30 transition-all group">
                <div className="w-14 h-14 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] mb-6 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                </div>
                <h4 className="text-white text-xl font-bold mb-2">{getDynamicText(data.info || {}, 'addressTitle', language) || t('contact.visitOffice')}</h4>
                <p className="text-gray-400 text-sm">{getDynamicText(data.info || {}, 'address', language) || t('contact.officeAddress')}</p>
            </div>

            <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-[#C5A16F]/30 transition-all group">
                <div className="w-14 h-14 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] mb-6 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </div>
                <h4 className="text-white text-xl font-bold mb-2">{getDynamicText(data.info || {}, 'phoneTitle', language) || t('contact.callNow')}</h4>
                <p className="text-gray-400 text-sm mb-4">{data.info?.phone || "+20 123 456 7890"}</p>
                <a href={data.info?.whatsappLink || "#"} className="inline-block bg-[#25D366] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-opacity-80 transition-all">
                    {getDynamicText(data.info || {}, 'whatsappText', language) || t('contact.openWhatsapp')}
                </a>
            </div>
        </div>
    );
}
