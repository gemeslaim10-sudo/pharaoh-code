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

  const hasAside = project.tools.length > 0 || Boolean(project.link) || Boolean(project.appLink);
  const mediaSummary = [
    project.gallery.length > 0 && tr(`${project.gallery.length} تصميم`, `${project.gallery.length} designs`),
    project.videos.length > 0 && tr(`${project.videos.length} فيديو`, `${project.videos.length} videos`),
  ].filter(Boolean).join(' · ');

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${c.page}`} dir={direction}>
      {/* ── Page backdrop: faint grid + gold/blue glows so the page never reads as a flat color ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <svg className={`absolute inset-0 w-full h-full ${isLight ? 'opacity-[0.05]' : 'opacity-[0.045]'}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pd-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C5A16F" strokeWidth="0.8" />
              <circle cx="28" cy="28" r="1.2" fill="#C5A16F" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pd-grid)" />
        </svg>
        <div className={`absolute top-[8%] -start-40 w-[520px] h-[520px] rounded-full blur-[160px] ${isLight ? 'bg-blue-300/25' : 'bg-blue-600/15'}`} />
        <div className={`absolute top-[38%] -end-40 w-[560px] h-[560px] rounded-full blur-[170px] ${isLight ? 'bg-[#C5A16F]/20' : 'bg-[#C5A16F]/10'}`} />
        <div className={`absolute top-[72%] -start-32 w-[480px] h-[480px] rounded-full blur-[160px] ${isLight ? 'bg-[#C5A16F]/15' : 'bg-indigo-600/10'}`} />
      </div>

      {/* ───────────── Hero ───────────── */}
      <section className="relative isolate overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-14">
        {/* Blurred cover as ambient hero light */}
        {project.image && (
          <div
            className="absolute inset-0 -z-10 overflow-hidden"
            style={{ maskImage: 'linear-gradient(to bottom, black 55%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent)' }}
            aria-hidden
          >
            <img src={project.image} alt="" className={`w-full h-full object-cover scale-125 blur-3xl ${isLight ? 'opacity-20' : 'opacity-25'}`} />
            <div className={`absolute inset-0 ${isLight ? 'bg-slate-50/70' : 'bg-[#060D1A]/65'}`} />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className={`flex items-center gap-2 text-xs font-bold mb-6 sm:mb-8 ${c.muted}`} aria-label="breadcrumb">
            <Link href="/" className="hover:underline">{tr('الرئيسية', 'Home')}</Link>
            <span className="opacity-50">/</span>
            <Link href="/portfolio" className="hover:underline">{tr('أعمالنا', 'Our Work')}</Link>
            <span className="opacity-50">/</span>
            <span className={`${c.gold} truncate max-w-[220px]`}>{title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="order-2 lg:order-1">
              {categoryLabels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {categoryLabels.map((label, i) => (
                    <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black tracking-wide backdrop-blur-md ${c.chip}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-pulse" />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              <h1 className={`text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight ${c.heading}`}>
                {title}
              </h1>
              <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#C5A16F] to-transparent" />

              {description && (
                <p className={`mt-5 text-sm sm:text-base leading-8 whitespace-pre-line ${c.body}`}>{description}</p>
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
                {(project.gallery.length > 0 || project.videos.length > 0) && (
                  <a href={project.gallery.length > 0 ? '#gallery' : '#videos'}
                    className={`inline-flex items-center gap-2 font-black text-sm px-6 py-3.5 rounded-xl border transition-all hover:-translate-y-0.5 ${
                      isLight ? 'bg-white border-[#C5A16F]/50 text-[#8A5800] hover:bg-[#C5A16F] hover:text-[#0A192F]' : 'bg-[#C5A16F]/10 border-[#C5A16F]/40 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F]'
                    }`}>
                    {tr('شاهد الأعمال', 'View the Work')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  </a>
                )}
                <Link href="/portfolio"
                  className={`inline-flex items-center gap-2 font-bold text-sm px-5 py-3.5 rounded-xl border backdrop-blur-md transition-all ${
                    isLight ? 'bg-white/60 border-slate-300 text-slate-700 hover:border-[#8A5800] hover:text-[#8A5800]' : 'bg-white/[0.03] border-white/15 text-gray-200 hover:border-[#C5A16F]/50 hover:text-[#C5A16F]'
                  }`}>
                  {backArrow}
                  {tr('كل الأعمال', 'All Work')}
                </Link>
              </div>
            </div>

            {/* Cover */}
            <div className="order-1 lg:order-2 relative lg:sticky lg:top-28">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#C5A16F]/25 via-transparent to-blue-500/15 blur-2xl pointer-events-none" />
              <div className="relative rounded-[1.75rem] p-[1.5px] bg-gradient-to-br from-[#DFB77D] via-[#C5A16F]/30 to-[#9E7D47]/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                <div className={`relative rounded-[1.65rem] overflow-hidden ${isLight ? 'bg-white' : 'bg-[#050C18]'}`}>
                  {project.image ? (
                    <img src={project.image} alt={title} className="block w-full h-auto" />
                  ) : (
                    <div className="aspect-[16/11] w-full flex items-center justify-center text-6xl text-[#C5A16F]/40 font-serif">✦</div>
                  )}
                </div>
              </div>
              {mediaSummary && (
                <div className={`absolute -bottom-4 start-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-xl text-xs font-black shadow-xl ${
                  isLight ? 'bg-white/90 border-[#C5A16F]/40 text-[#8A5800]' : 'bg-[#0A1628]/85 border-[#C5A16F]/35 text-[#C5A16F]'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {mediaSummary}
                </div>
              )}
            </div>
          </div>

          {/* Facts strip */}
          {facts.length > 0 && (
            <div className={`mt-12 sm:mt-14 grid grid-cols-2 ${FACT_COLS[facts.length] || 'lg:grid-cols-4'} rounded-2xl border backdrop-blur-xl overflow-hidden ${
              isLight ? 'bg-white/80 border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)]' : 'bg-[#0B1730]/70 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]'
            }`}>
              {facts.map((f, i) => (
                <div key={i} className={`p-4 sm:p-5 flex items-center gap-3 max-lg:border-b lg:border-e last:border-e-0 ${i % 2 === 0 ? 'max-lg:border-e' : ''} ${c.divider}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${c.chip}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className={`text-[10px] font-bold uppercase tracking-wider ${c.muted}`}>{f.label}</div>
                    <div className={`text-sm font-black mt-0.5 break-words ${c.heading}`}>{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────────── Tools & links ───────────── */}
      {hasAside && (
        <section className="relative py-8 sm:py-10">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 grid gap-6 ${project.tools.length > 0 && (project.link || project.appLink) ? 'md:grid-cols-2' : ''}`}>
            {project.tools.length > 0 && (
              <div className={`rounded-3xl border p-6 ${c.card}`}>
                <h3 className={`text-sm font-black mb-4 ${c.heading}`}>{tr('الأدوات والتقنيات', 'Tools & Technologies')}</h3>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {project.tools.map((tool, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold ${c.chip}`}>{tool}</span>
                  ))}
                </div>
              </div>
            )}
            {(project.link || project.appLink) && (
              <div className={`rounded-3xl border p-6 space-y-2 ${c.card}`}>
                <h3 className={`text-sm font-black mb-3 ${c.heading}`}>{tr('روابط المشروع', 'Project Links')}</h3>
                {project.link && <ExternalRow theme={c} href={project.link} label={tr('الموقع', 'Website')} />}
                {project.appLink && <ExternalRow theme={c} href={project.appLink} label={tr('التطبيق', 'App')} />}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ───────────── Gallery ───────────── */}
      {project.gallery.length > 0 && (
        <section id="gallery" className={`relative py-12 sm:py-16 mt-4 border-y scroll-mt-24 ${isLight ? 'bg-white/60 border-slate-200' : 'bg-white/[0.015] border-white/5'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle theme={c} eyebrow={tr('المعرض', 'Gallery')} title={tr('التصميمات والصور', 'Designs & Visuals')} count={project.gallery.length} />
            <div className="mt-8">
              <PortfolioDetailGallery images={project.gallery} title={title} theme={c} language={language} />
            </div>
          </div>
        </section>
      )}

      {/* ───────────── Videos ───────────── */}
      {project.videos.length > 0 && (
        <section id="videos" className="relative py-12 sm:py-16 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle theme={c} eyebrow={tr('فيديو', 'Video')} title={tr('فيديوهات المشروع', 'Project Videos')} count={project.videos.length} />
            <div className="mt-8">
              <PortfolioDetailVideos videos={project.videos} theme={c} />
            </div>
          </div>
        </section>
      )}

      {/* ───────────── CTA ───────────── */}
      <section className="relative py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`relative overflow-hidden rounded-3xl border px-6 py-10 sm:px-12 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start ${
            isLight ? 'bg-gradient-to-br from-amber-50 via-white to-amber-50 border-[#C5A16F]/30' : 'bg-gradient-to-br from-[#14284A] via-[#0D1C36] to-[#0A192F] border-[#C5A16F]/25'
          }`}>
            <div className="absolute -top-24 start-1/4 w-[480px] h-[220px] bg-[#C5A16F]/20 blur-[110px] rounded-full pointer-events-none" />
            <div className="relative">
              <h2 className={`text-2xl sm:text-3xl font-black ${c.heading}`}>{tr('عايز مشروع بنفس المستوى؟', 'Want a project like this?')}</h2>
              <p className={`mt-2 text-sm sm:text-base ${c.body}`}>{tr('احكيلنا فكرتك وفريقنا هيحولها لتجربة متكاملة.', 'Tell us your idea and our team will bring it to life.')}</p>
            </div>
            <Link href="/start-project"
              className="relative shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#C5A16F] to-[#DFB77D] text-[#0A192F] font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#C5A16F]/25 hover:-translate-y-0.5 transition-all">
              {tr('ابدأ مشروعك الآن', 'Start Your Project')}
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Related ───────────── */}
      {relatedItems.length > 0 && (
        <section className="relative pt-6 pb-20 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
