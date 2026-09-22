'use client';

import Link from 'next/link';
import { type HomeContentData, type HomeHeroContent } from '@/types/homeContent';
import { BilingualField, PlainField, HomeContentCard, FallbackNote } from './HomeContentFields';

interface HomeContentTabHeroProps {
  form: HomeContentData;
  setForm: React.Dispatch<React.SetStateAction<HomeContentData>>;
}

export function HomeContentTabHero({ form, setForm }: HomeContentTabHeroProps) {
  const update = (field: keyof HomeHeroContent, value: string) => {
    setForm(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  return (
    <div className="space-y-6">
      <HomeContentCard
        icon="🏛️"
        title="الشريحة الأولى من الهيرو (Hero — Slide 1)"
        description="العنوان المتحرك، الوصف، وأزرار الدعوة للتواصل اللي بتظهر أول ما الزائر يفتح الموقع."
      >
        <FallbackNote />

        <BilingualField
          labelAr="الشارة العلوية / العنوان الفرعي (عربي)"
          labelEn="Badge / Subtitle (English)"
          valueAr={form.hero.subtitle_ar}
          valueEn={form.hero.subtitle_en}
          onChangeAr={v => update('subtitle_ar', v)}
          onChangeEn={v => update('subtitle_en', v)}
          placeholderAr="نجمع بين عظمة الفكر الهندسي وأحدث التقنيات"
          placeholderEn="Uniting engineering grandeur with modern tech"
        />

        <BilingualField
          labelAr="العنوان — الجزء الأول (عربي)"
          labelEn="Title Part 1 (English)"
          valueAr={form.hero.titlePart1_ar}
          valueEn={form.hero.titlePart1_en}
          onChangeAr={v => update('titlePart1_ar', v)}
          onChangeEn={v => update('titlePart1_en', v)}
          placeholderAr="نبني"
          placeholderEn="Building"
        />

        <BilingualField
          labelAr="العنوان — الجزء الذهبي (عربي)"
          labelEn="Title Part 2 — Gold (English)"
          valueAr={form.hero.titlePart2_ar}
          valueEn={form.hero.titlePart2_en}
          onChangeAr={v => update('titlePart2_ar', v)}
          onChangeEn={v => update('titlePart2_en', v)}
          placeholderAr="أهرامات"
          placeholderEn="Digital"
        />

        <BilingualField
          labelAr="العنوان — الجزء الثالث المتحرك (عربي)"
          labelEn="Title Part 3 — Typing (English)"
          valueAr={form.hero.titlePart3_ar}
          valueEn={form.hero.titlePart3_en}
          onChangeAr={v => update('titlePart3_ar', v)}
          onChangeEn={v => update('titlePart3_en', v)}
          placeholderAr="رقمية"
          placeholderEn="Pyramids"
        />

        <BilingualField
          multiline
          rows={3}
          labelAr="الوصف تحت العنوان (عربي)"
          labelEn="Hero Description (English)"
          valueAr={form.hero.description_ar}
          valueEn={form.hero.description_en}
          onChangeAr={v => update('description_ar', v)}
          onChangeEn={v => update('description_en', v)}
          placeholderAr="نجمع بين عظمة الفكر الهندسي وأحدث تقنيات البرمجة العالمية."
          placeholderEn="Uniting timeless engineering grandeur with bleeding-edge technologies."
        />
      </HomeContentCard>

      <HomeContentCard
        icon="🔘"
        title="أزرار الهيرو (Hero Buttons)"
        description="نصوص ووجهة الزرارين اللي تحت العنوان. سيبهم فاضيين علشان يفضلوا زي ما هما (خدماتنا / تواصل معنا)."
      >
        <BilingualField
          labelAr="نص الزر الأساسي الذهبي (عربي)"
          labelEn="Primary Button Text (English)"
          valueAr={form.hero.primaryBtnText_ar}
          valueEn={form.hero.primaryBtnText_en}
          onChangeAr={v => update('primaryBtnText_ar', v)}
          onChangeEn={v => update('primaryBtnText_en', v)}
          placeholderAr="اكتشف عالمنا"
          placeholderEn="Discover Our World"
        />

        <PlainField
          label="رابط الزر الأساسي (Primary Button Link)"
          value={form.hero.primaryBtnLink}
          onChange={v => update('primaryBtnLink', v)}
          placeholder="/services"
          hint="رابط داخلي زي /services أو /start-project. الافتراضي: /services"
        />

        <BilingualField
          labelAr="نص الزر الثانوي (عربي)"
          labelEn="Secondary Button Text (English)"
          valueAr={form.hero.secondaryBtnText_ar}
          valueEn={form.hero.secondaryBtnText_en}
          onChangeAr={v => update('secondaryBtnText_ar', v)}
          onChangeEn={v => update('secondaryBtnText_en', v)}
          placeholderAr="تواصل معنا"
          placeholderEn="Contact Us"
        />

        <PlainField
          label="رابط الزر الثانوي (Secondary Button Link)"
          value={form.hero.secondaryBtnLink}
          onChange={v => update('secondaryBtnLink', v)}
          placeholder="/contact"
          hint="رابط داخلي زي /contact. الافتراضي: /contact"
        />
      </HomeContentCard>

      <HomeContentCard
        icon="🎞️"
        title="الشريحة الثانية من الهيرو (Hero — Slide 2)"
        description="نصوص السلايد التاني في السلايدر. الأزرار نفسها بتتكرر في السلايدين."
      >
        <BilingualField
          labelAr="عنوان السلايد الثاني — الجزء الأول (عربي)"
          labelEn="Slide 2 — Title Part 1 (English)"
          valueAr={form.hero.slide2TitlePart1_ar}
          valueEn={form.hero.slide2TitlePart1_en}
          onChangeAr={v => update('slide2TitlePart1_ar', v)}
          onChangeEn={v => update('slide2TitlePart1_en', v)}
          placeholderAr="كود نظيف.."
          placeholderEn="Clean Code.."
        />

        <BilingualField
          labelAr="عنوان السلايد الثاني — الجزء الذهبي (عربي)"
          labelEn="Slide 2 — Title Part 2 (English)"
          valueAr={form.hero.slide2TitlePart2_ar}
          valueEn={form.hero.slide2TitlePart2_en}
          onChangeAr={v => update('slide2TitlePart2_ar', v)}
          onChangeEn={v => update('slide2TitlePart2_en', v)}
          placeholderAr="أداء أسطوري"
          placeholderEn="Legendary Performance"
        />

        <BilingualField
          multiline
          rows={3}
          labelAr="وصف السلايد الثاني (عربي)"
          labelEn="Slide 2 — Subtitle (English)"
          valueAr={form.hero.slide2Subtitle_ar}
          valueEn={form.hero.slide2Subtitle_en}
          onChangeAr={v => update('slide2Subtitle_ar', v)}
          onChangeEn={v => update('slide2Subtitle_en', v)}
          placeholderAr="مواقعنا مصممة لتكون الأسرع والأكثر أماناً."
          placeholderEn="Our websites are engineered to be the fastest and most secure."
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50 dark:bg-[#0A192F] border border-amber-300/60 dark:border-pharaohGold/25 rounded-xl p-4">
          <p className="text-xs text-amber-900 dark:text-gray-300 leading-relaxed">
            🖼️ صور وفيديوهات السلايدين (وضع نهاري / ليلي) بتتظبط من صفحة إعدادات المنصة ← قسم مظهر الهيرو.
            <span className="block text-[11px] text-amber-800/80 dark:text-gray-500 mt-1" dir="ltr">
              Hero slide media lives in Settings → Hero Theme.
            </span>
          </p>
          <Link
            href="/dashboard/settings"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 dark:bg-pharaohGold/20 dark:hover:bg-pharaohGold dark:hover:text-[#0A192F] text-amber-900 dark:text-pharaohGold px-4 py-2.5 rounded-xl text-xs font-bold border border-amber-500/40 dark:border-pharaohGold/40 transition-all"
          >
            فتح إعدادات مظهر الهيرو ←
          </Link>
        </div>
      </HomeContentCard>
    </div>
  );
}
