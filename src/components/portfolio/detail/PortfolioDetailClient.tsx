'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { type PortfolioProject, type PortfolioCategoryRef } from '@/types/creativity';
import PortfolioCard from '@/components/services/portfolio/PortfolioCard';
import { PortfolioDetailGallery } from './PortfolioDetailGallery';
import { PortfolioDetailVideos } from './PortfolioDetailVideos';
import { pickLang, type DetailTheme } from './detailHelpers';

const FACT_COLS: Record<number, string> = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

interface Props {
  project: PortfolioProject;
  categories: PortfolioCategoryRef[];
  related: PortfolioProject[];
}

export default function PortfolioDetailClient({ project, categories, related }: Props) {
  const { language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const ar = language === 'ar';
  const tr = (a: string, e: string) => (ar ? a : e);

  const title = pickLang(project.title_ar, project.title_en, language);
  const description = pickLang(project.description_ar, project.description_en, language);
  const clientName = pickLang(project.clientName_ar, project.clientName_en, language);

  const categoryLabels = project.categories.map(slug => {
    const cat = categories.find(c => c.slug.toLowerCase() === slug.toLowerCase());
    return cat ? pickLang(cat.name_ar, cat.name_en, language) || slug : slug;
  });
  if (categoryLabels.length === 0) {
    const fallback = pickLang(project.category_ar, project.category_en, language);
    if (fallback) categoryLabels.push(fallback);
  }

  const c: DetailTheme = {
    isLight,
    page: isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060D1A] text-white',
    card: isLight
      ? 'bg-white border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)]'
      : 'bg-gradient-to-b from-[#0F1E38] to-[#081222] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]',
    muted: isLight ? 'text-slate-600' : 'text-gray-400',
    body: isLight ? 'text-slate-700' : 'text-gray-300',
    heading: isLight ? 'text-slate-900' : 'text-white',
    gold: isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]',
    divider: isLight ? 'border-slate-200' : 'border-white/10',
    chip: isLight ? 'bg-amber-50 border-[#8A5800]/25 text-[#8A5800]' : 'bg-[#C5A16F]/10 border-[#C5A16F]/25 text-[#C5A16F]',
  };

  const facts = [
    clientName && { label: tr('العميل', 'Client'), value: clientName, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    categoryLabels.length > 0 && { label: tr('التصنيف', 'Category'), value: categoryLabels.join(' · '), icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    project.projectYear && { label: tr('سنة التنفيذ', 'Year'), value: project.projectYear, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    (project.gallery.length > 0 || project.videos.length > 0) && {
      label: tr('محتوى المعرض', 'Media'),
      value: [
        project.gallery.length > 0 && tr(`${project.gallery.length} تصميم/صورة`, `${project.gallery.length} images`),
        project.videos.length > 0 && tr(`${project.videos.length} فيديو`, `${project.videos.length} videos`),
      ].filter(Boolean).join(' · '),
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
  ].filter(Boolean) as { label: string; value: string; icon: string }[];

  const relatedItems = related.map(r => ({
    id: r.id,
    title: r.title_ar,
    title_ar: r.title_ar,
    title_en: r.title_en,
    description: r.description_ar,
    description_ar: r.description_ar,
    description_en: r.description_en,
    image: r.image,
    imageUrl: r.image,
    categories: r.categories,
    category: r.categories[0] || '',
    category_ar: r.category_ar,
    category_en: r.category_en,
    link: r.link,
    appLink: r.appLink,
  }));
  const cardCategories = categories.map(cat => ({ id: cat.slug, slug: cat.slug, name_ar: cat.name_ar, name_en: cat.name_en }));

  const backArrow = (
    <svg className={`w-4 h-4 ${direction === 'rtl' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${c.page}`} dir={direction}>
      {/* Ambient lighting */}
      <div className="absolute inset-x-0 top-0 h-[640px] pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[150px] ${isLight ? 'bg-[#C5A16F]/15' : 'bg-[#C5A16F]/10'}`} />
        <div className={`absolute top-40 -start-40 w-96 h-96 rounded-full blur-[150px] ${isLight ? 'bg-blue-300/20' : 'bg-blue-600/10'}`} />
      </div>

      {/* ───────────── Hero ───────────── */}
      <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className={`flex items-center gap-2 text-xs font-bold mb-8 ${c.muted}`} aria-label="breadcrumb">
            <Link href="/" className="hover:underline">{tr('الرئيسية', 'Home')}</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:underline">{tr('أعمالنا', 'Our Work')}</Link>
            <span>/</span>
            <span className={`${c.gold} truncate max-w-[200px]`}>{title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              {categoryLabels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {categoryLabels.map((label, i) => (
                    <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black tracking-wide ${c.chip}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F]" />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight ${c.heading}`}>
                {title}
              </h1>

              {clientName && (
                <p className={`mt-4 text-sm font-bold ${c.muted}`}>
                  {tr('لصالح', 'For')} <span className={c.gold}>{clientName}</span>
                  {project.projectYear && <span> · {project.projectYear}</span>}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C5A16F] to-[#DFB77D] text-[#0A192F] font-black text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#C5A16F]/20 hover:shadow-[#C5A16F]/40 hover:-translate-y-0.5 transition-all">
                    {tr('زيارة المشروع', 'Visit Project')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
                {project.appLink && (
                  <a href={project.appLink} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-black text-sm px-6 py-3.5 rounded-xl border transition-all hover:-translate-y-0.5 ${
                      isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                    }`}>
                    {tr('تحميل التطبيق', 'Get the App')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </a>
                )}
                <Link href="/portfolio"
                  className={`inline-flex items-center gap-2 font-bold text-sm px-5 py-3.5 rounded-xl border transition-all ${
                    isLight ? 'border-slate-300 text-slate-700 hover:border-[#8A5800] hover:text-[#8A5800]' : 'border-white/15 text-gray-200 hover:border-[#C5A16F]/50 hover:text-[#C5A16F]'
                  }`}>
                  {backArrow}
                  {tr('كل الأعمال', 'All Work')}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className={`relative rounded-3xl p-2 border ${c.card}`}>
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#C5A16F]/40 via-transparent to-[#C5A16F]/20 pointer-events-none opacity-60" />
                <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-[#050C18]'}`}>
                  {project.image ? (
                    <img src={project.image} alt={title} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl text-[#C5A16F]/40 font-serif">✦</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Facts bar ───────────── */}
      {facts.length > 0 && (
        <section className="relative pb-10 sm:pb-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${FACT_COLS[facts.length] || 'lg:grid-cols-4'}`}>
              {facts.map((f, i) => (
                <div key={i} className={`rounded-2xl border p-4 sm:p-5 flex items-start gap-3 ${c.card}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${c.chip}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${c.muted}`}>{f.label}</div>
                    <div className={`text-sm sm:text-base font-black mt-0.5 break-words ${c.heading}`}>{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────── Overview ───────────── */}
      <section className="relative pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 rounded-3xl border p-6 sm:p-10 ${c.card}`}>
            <SectionTitle theme={c} eyebrow={tr('نبذة', 'Overview')} title={tr('عن المشروع', 'About the Project')} />
            <p className={`mt-6 text-sm sm:text-base leading-8 whitespace-pre-line ${c.body}`}>
              {description || tr('لا يوجد وصف لهذا المشروع بعد.', 'No description yet.')}
            </p>
          </div>

          <aside className={`rounded-3xl border p-6 sm:p-8 space-y-6 h-fit ${c.card}`}>
            <h3 className={`text-sm font-black ${c.heading}`}>{tr('تفاصيل سريعة', 'Quick Details')}</h3>
            <dl className="space-y-4">
              {facts.map((f, i) => (
                <div key={i} className={`flex items-start justify-between gap-4 pb-4 border-b last:border-b-0 last:pb-0 ${c.divider}`}>
                  <dt className={`text-xs font-bold ${c.muted}`}>{f.label}</dt>
                  <dd className={`text-xs font-black text-end ${c.heading}`}>{f.value}</dd>
                </div>
              ))}
            </dl>

            {project.tools.length > 0 && (
              <div>
                <h4 className={`text-xs font-bold mb-3 ${c.muted}`}>{tr('الأدوات والتقنيات', 'Tools & Technologies')}</h4>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {project.tools.map((tool, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold ${c.chip}`}>{tool}</span>
                  ))}
                </div>
              </div>
            )}

            {(project.link || project.appLink) && (
              <div className={`pt-5 border-t space-y-2 ${c.divider}`}>
                {project.link && <ExternalRow theme={c} href={project.link} label={tr('رابط المشروع', 'Live link')} />}
                {project.appLink && <ExternalRow theme={c} href={project.appLink} label={tr('رابط التطبيق', 'App link')} />}
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ───────────── Gallery ───────────── */}
      {project.gallery.length > 0 && (
        <section className="relative pb-14 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionTitle theme={c} eyebrow={tr('المعرض', 'Gallery')} title={tr('التصميمات والصور', 'Designs & Visuals')} count={project.gallery.length} />
            <div className="mt-8">
              <PortfolioDetailGallery images={project.gallery} title={title} theme={c} language={language} />
            </div>
          </div>
        </section>
      )}

      {/* ───────────── Videos ───────────── */}
      {project.videos.length > 0 && (
        <section className="relative pb-14 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionTitle theme={c} eyebrow={tr('فيديو', 'Video')} title={tr('فيديوهات المشروع', 'Project Videos')} count={project.videos.length} />
            <div className="mt-8">
              <PortfolioDetailVideos videos={project.videos} theme={c} />
            </div>
          </div>
        </section>
      )}

      {/* ───────────── CTA ───────────── */}
      <section className="relative pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`relative overflow-hidden rounded-3xl border p-8 sm:p-12 text-center ${
            isLight ? 'bg-gradient-to-br from-amber-50 to-white border-[#C5A16F]/30' : 'bg-gradient-to-br from-[#112240] to-[#0A192F] border-[#C5A16F]/25'
          }`}>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#C5A16F]/15 blur-[100px] rounded-full pointer-events-none" />
            <h2 className={`relative text-2xl sm:text-3xl font-black ${c.heading}`}>{tr('عايز مشروع بنفس المستوى؟', 'Want a project like this?')}</h2>
            <p className={`relative mt-3 text-sm sm:text-base ${c.body}`}>{tr('احكيلنا فكرتك وفريقنا هيحولها لتجربة متكاملة.', 'Tell us your idea and our team will bring it to life.')}</p>
            <Link href="/start-project"
              className="relative mt-7 inline-flex items-center gap-2 bg-gradient-to-r from-[#C5A16F] to-[#DFB77D] text-[#0A192F] font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#C5A16F]/25 hover:-translate-y-0.5 transition-all">
              {tr('ابدأ مشروعك الآن', 'Start Your Project')}
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Related ───────────── */}
      {relatedItems.length > 0 && (
        <section className="relative pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionTitle theme={c} eyebrow={tr('المزيد', 'More')} title={tr('أعمال أخرى قد تعجبك', 'More of Our Work')} />
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedItems.map(item => (
                <PortfolioCard key={item.id} item={item} categories={cardCategories} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SectionTitle({ theme, eyebrow, title, count }: { theme: DetailTheme; eyebrow: string; title: string; count?: number }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] ${theme.gold}`}>
          <span className="w-6 h-[2px] bg-[#C5A16F] rounded-full" />
          {eyebrow}
        </div>
        <h2 className={`mt-2 text-xl sm:text-2xl lg:text-3xl font-black ${theme.heading}`}>{title}</h2>
      </div>
      {typeof count === 'number' && (
        <span className={`shrink-0 px-3 py-1 rounded-full border text-xs font-black ${theme.chip}`}>{count}</span>
      )}
    </div>
  );
}

function ExternalRow({ theme, href, label }: { theme: DetailTheme; href: string; label: string }) {
  let host = href;
  try { host = new URL(href).hostname.replace(/^www\./, ''); } catch { /* keep raw */ }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
        theme.isLight ? 'border-slate-200 hover:border-[#8A5800]/50 hover:bg-amber-50/50' : 'border-white/10 hover:border-[#C5A16F]/40 hover:bg-white/[0.03]'
      }`}>
      <span className={`text-xs font-bold ${theme.muted}`}>{label}</span>
      <span className={`text-xs font-black truncate ${theme.gold}`} dir="ltr">{host} ↗</span>
    </a>
  );
}
