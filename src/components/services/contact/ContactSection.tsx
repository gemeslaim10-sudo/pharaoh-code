'use client';

import { SectionData } from '@/types';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactSection({ data }: { data: SectionData }) {
  if (!data) return null;

  return (
    <section id="contact" className="py-24 bg-[#0A192F] relative overflow-hidden text-right" dir="rtl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A16F]/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C5A16F]/5 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-[#C5A16F] font-bold tracking-[0.3em] uppercase text-xs mb-4">
                    {data.subtitle || "Get In Touch"}
                </h2>
                <h3 className="text-4xl md:text-6xl font-black text-white">
                    {data.titlePart1 || "لنصنع"} <span className="text-[#C5A16F]">{data.titlePart2 || "التاريخ الرقمي"}</span> {data.titlePart3 || "معاً"}
                </h3>
                <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                    {data.description || "سواء كنت تملك فكرة ناشئة أو صرحاً قائماً، فريقنا جاهز لتحويل رؤيتك إلى شفرات برمجية تسيطر على السوق."}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <ContactInfo data={data} />
                <div className="lg:col-span-8">
                    <ContactForm />
                </div>
            </div>
        </div>
    </section>
  );
}
