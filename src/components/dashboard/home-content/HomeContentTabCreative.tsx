'use client';

import Link from 'next/link';
import { type HomeContentData, type HomeCreativeContent } from '@/types/homeContent';
import { BilingualField, PlainField, HomeContentCard, FallbackNote } from './HomeContentFields';

interface HomeContentTabCreativeProps {
  form: HomeContentData;
  setForm: React.Dispatch<React.SetStateAction<HomeContentData>>;
}

export function HomeContentTabCreative({ form, setForm }: HomeContentTabCreativeProps) {
  const update = (field: keyof HomeCreativeContent, value: string) => {
    setForm(prev => ({ ...prev, creative: { ...prev.creative, [field]: value } }));
  };

  return (
    <HomeContentCard
      icon="🏷️"
      title="شريط فلسفة الإبداع (Creative Banner)"
      description="الشريط الصغير اللي تحت ركائز الفلسفة في الصفحة الرئيسية."
    >
      <FallbackNote />

      <BilingualField
        multiline
        rows={3}
        labelAr="نص الشريط (عربي)"
        labelEn="Banner Text (English)"
        valueAr={form.creative.bannerText_ar}
        valueEn={form.creative.bannerText_en}
        onChangeAr={v => update('bannerText_ar', v)}
        onChangeEn={v => update('bannerText_en', v)}
        placeholderAr="كل سطر برمجي نصنعه يخضع لاختبارات أداء وأمان قياسية لضمان أقصى كفاءة."
        placeholderEn="Every line of code undergoes rigorous performance benchmarks and security audits."
      />

      <PlainField
        label="شارة الشريط الجانبية (Banner Badge)"
        value={form.creative.bannerBadge}
        onChange={v => update('bannerBadge', v)}
        placeholder="PHARAOH ARCHITECTURE"
        hint="نص لاتيني قصير بيظهر في مربع ذهبي على طرف الشريط."
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50 dark:bg-[#0A192F] border border-amber-300/60 dark:border-pharaohGold/25 rounded-xl p-4">
        <p className="text-xs text-amber-900 dark:text-gray-300 leading-relaxed">
          💎 ركائز الفلسفة نفسها (العناوين والأيقونات) بتتدار من صفحة (من نحن) ← فلسفة التشييد.
          <span className="block text-[11px] text-amber-800/80 dark:text-gray-500 mt-1" dir="ltr">
            Creative pillars are managed in the Philosophy collection.
          </span>
        </p>
        <Link
          href="/dashboard/about"
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 dark:bg-pharaohGold/20 dark:hover:bg-pharaohGold dark:hover:text-[#0A192F] text-amber-900 dark:text-pharaohGold px-4 py-2.5 rounded-xl text-xs font-bold border border-amber-500/40 dark:border-pharaohGold/40 transition-all"
        >
          فتح صفحة (من نحن) ←
        </Link>
      </div>
    </HomeContentCard>
  );
}
