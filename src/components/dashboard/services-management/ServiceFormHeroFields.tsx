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
    <div className="bg-slate-50 dark:bg-[#0A192F] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
      <div className="border-b border-slate-200 dark:border-white/10 pb-3">
        <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-amber-800 dark:text-pharaohGold">🌟</span>
          <span>تفاصيل عنوان قسم الهيرو في صفحة تفاصيل الخدمة (Hero Header Details)</span>
        </h5>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">العنوان الجذاب والنصوص الذهبية التي تتصدر أعلى صفحة الخدمة.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Column */}
        <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1">
              <span>🇸🇦</span>
              <span>نصوص الهيرو بالعربية</span>
            </span>
            <span className="text-[10px] text-slate-400">RTL</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">العنوان الفرعي الهيرو (Subtitle AR)</label>
            <input
              type="text"
              maxLength={120}
              placeholder="مثال: هندسة البرمجيات والتطبيقات"
              value={heroSubtitleAr}
              onChange={e => setHeroSubtitleAr(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">الجزء الذهبي المميز للعنوان (Title Part 2 AR)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: بوابتك الرقمية الأقوى"
              value={heroTitle2Ar}
              onChange={e => setHeroTitle2Ar(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* English Column */}
        <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>🇬🇧</span>
              <span>Hero Texts (EN)</span>
            </span>
            <span className="text-[10px] text-slate-400">LTR</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Hero Subtitle (English)</label>
            <input
              type="text"
              maxLength={120}
              placeholder="e.g. Software & Application Engineering"
              value={heroSubtitleEn}
              onChange={e => setHeroSubtitleEn(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Hero Title Part 2 (English)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Your Strongest Digital Gateway"
              value={heroTitle2En}
              onChange={e => setHeroTitle2En(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
