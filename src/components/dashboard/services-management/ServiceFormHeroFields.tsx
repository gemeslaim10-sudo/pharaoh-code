'use client';

interface ServiceFormHeroFieldsProps {
  heroSubtitleAr: string;
  setHeroSubtitleAr: (val: string) => void;
  heroSubtitleEn: string;
  setHeroSubtitleEn: (val: string) => void;
  heroTitle1Ar: string;
  setHeroTitle1Ar: (val: string) => void;
  heroTitle1En: string;
  setHeroTitle1En: (val: string) => void;
  heroTitle2Ar: string;
  setHeroTitle2Ar: (val: string) => void;
  heroTitle2En: string;
  setHeroTitle2En: (val: string) => void;
  heroDescAr: string;
  setHeroDescAr: (val: string) => void;
  heroDescEn: string;
  setHeroDescEn: (val: string) => void;
  heroBtnAr: string;
  setHeroBtnAr: (val: string) => void;
  heroBtnEn: string;
  setHeroBtnEn: (val: string) => void;
}

const INPUT_CLASS =
  'w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600';
const TEXTAREA_CLASS =
  'w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600';
const LABEL_CLASS = 'block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1';

export function ServiceFormHeroFields({
  heroSubtitleAr,
  setHeroSubtitleAr,
  heroSubtitleEn,
  setHeroSubtitleEn,
  heroTitle1Ar,
  setHeroTitle1Ar,
  heroTitle1En,
  setHeroTitle1En,
  heroTitle2Ar,
  setHeroTitle2Ar,
  heroTitle2En,
  setHeroTitle2En,
  heroDescAr,
  setHeroDescAr,
  heroDescEn,
  setHeroDescEn,
  heroBtnAr,
  setHeroBtnAr,
  heroBtnEn,
  setHeroBtnEn,
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
            <label className={LABEL_CLASS}>العنوان الفرعي الهيرو (Subtitle AR)</label>
            <input
              type="text"
              maxLength={120}
              placeholder="مثال: هندسة البرمجيات والتطبيقات"
              value={heroSubtitleAr}
              onChange={e => setHeroSubtitleAr(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>الجزء الأول الأبيض للعنوان (Title Part 1 AR)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: تطوير أنظمة الشركات"
              value={heroTitle1Ar}
              onChange={e => setHeroTitle1Ar(e.target.value)}
              className={INPUT_CLASS}
            />
            <p className="text-[10px] text-slate-500 dark:text-gray-500 mt-1">إذا تُرك فارغاً سيتم استخدام اسم الخدمة تلقائياً.</p>
          </div>

          <div>
            <label className={LABEL_CLASS}>الجزء الذهبي المميز للعنوان (Title Part 2 AR)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: بوابتك الرقمية الأقوى"
              value={heroTitle2Ar}
              onChange={e => setHeroTitle2Ar(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>فقرة وصف إضافية أسفل العنوان (Hero Description AR)</label>
            <textarea
              rows={3}
              maxLength={300}
              placeholder="فقرة قصيرة تظهر أسفل عنوان الهيرو مباشرة..."
              value={heroDescAr}
              onChange={e => setHeroDescAr(e.target.value)}
              className={TEXTAREA_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>نص زر الهيرو الرئيسي (Hero Button AR)</label>
            <input
              type="text"
              maxLength={40}
              placeholder="مثال: طلب الخدمة الآن"
              value={heroBtnAr}
              onChange={e => setHeroBtnAr(e.target.value)}
              className={INPUT_CLASS}
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
            <label className={LABEL_CLASS}>Hero Subtitle (English)</label>
            <input
              type="text"
              maxLength={120}
              placeholder="e.g. Software & Application Engineering"
              value={heroSubtitleEn}
              onChange={e => setHeroSubtitleEn(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Hero Title Part 1 (English)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Enterprise Systems Development"
              value={heroTitle1En}
              onChange={e => setHeroTitle1En(e.target.value)}
              className={INPUT_CLASS}
            />
            <p className="text-[10px] text-slate-500 dark:text-gray-500 mt-1">Falls back to the service title when left empty.</p>
          </div>

          <div>
            <label className={LABEL_CLASS}>Hero Title Part 2 (English)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Your Strongest Digital Gateway"
              value={heroTitle2En}
              onChange={e => setHeroTitle2En(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Hero Description (English)</label>
            <textarea
              rows={3}
              maxLength={300}
              placeholder="Short paragraph rendered right under the hero headline..."
              value={heroDescEn}
              onChange={e => setHeroDescEn(e.target.value)}
              className={TEXTAREA_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Hero Button Text (English)</label>
            <input
              type="text"
              maxLength={40}
              placeholder="e.g. Request Service Now"
              value={heroBtnEn}
              onChange={e => setHeroBtnEn(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
