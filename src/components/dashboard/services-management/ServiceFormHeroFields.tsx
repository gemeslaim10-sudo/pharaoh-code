'use client';

interface ServiceFormHeroFieldsProps {
  heroSubtitleAr: string;
  setHeroSubtitleAr: (val: string) => void;
  heroSubtitleEn: string;
  setHeroSubtitleEn: (val: string) => void;
  heroTitle2Ar: string;
  setHeroTitle2Ar: (val: string) => void;
  heroTitle2En: string;
  setHeroTitle2En: (val: string) => void;
}

export function ServiceFormHeroFields({
  heroSubtitleAr,
  setHeroSubtitleAr,
  heroSubtitleEn,
  setHeroSubtitleEn,
  heroTitle2Ar,
  setHeroTitle2Ar,
  heroTitle2En,
  setHeroTitle2En,
}: ServiceFormHeroFieldsProps) {
  return (
    <div className="bg-[#0A192F] p-5 rounded-2xl border border-white/10 space-y-4 pt-4">
      <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">تفاصيل عنوان قسم الهيرو في صفحة الخدمة (Hero Header Details)</h5>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">العنوان الفرعي الهيرو (عربي)</label>
          <input type="text" maxLength={120} placeholder="هندسة البرمجيات والتطبيقات" value={heroSubtitleAr} onChange={e => setHeroSubtitleAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Hero Subtitle (English)</label>
          <input type="text" maxLength={120} placeholder="Software & Application Engineering" value={heroSubtitleEn} onChange={e => setHeroSubtitleEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">العنوان الهيرو - الجزء الذهبي (عربي)</label>
          <input type="text" maxLength={60} placeholder="بوابتك الرقمية الأقوى" value={heroTitle2Ar} onChange={e => setHeroTitle2Ar(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Hero Title Part 2 (English)</label>
          <input type="text" maxLength={60} placeholder="Your Strongest Digital Gateway" value={heroTitle2En} onChange={e => setHeroTitle2En(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
        </div>
      </div>
    </div>
  );
}
