import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DocumentData } from 'firebase-admin/firestore';
import { db } from '@/lib/firebase/admin';
import { safeExternalUrl } from '@/lib/safeUrl';
import PortfolioDetailClient from '@/components/portfolio/detail/PortfolioDetailClient';
import { type PortfolioProject, type PortfolioCategoryRef } from '@/types/creativity';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const snap = await db.collection('portfolio').get();
    return snap.docs.map(doc => ({ id: doc.id }));
  } catch {
    return [];
  }
}

function cleanUrls(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(v => (typeof v === 'string' ? safeExternalUrl(v) : '#'))
    .filter(v => v !== '#');
}

function toStr(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function mapProject(id: string, p: DocumentData): PortfolioProject {
  const categories: string[] = Array.isArray(p.categories)
    ? p.categories.filter((c: unknown) => typeof c === 'string')
    : (p.category ? String(p.category).split(',').map(s => s.trim()).filter(Boolean) : []);
  const link = p.link ? safeExternalUrl(p.link) : '';
  const appLink = p.appLink ? safeExternalUrl(p.appLink) : '';

  return {
    id,
    title_ar: toStr(p.title_ar) || toStr(p.title),
    title_en: toStr(p.title_en),
    description_ar: toStr(p.desc_ar) || toStr(p.description_ar) || toStr(p.desc) || toStr(p.description),
    description_en: toStr(p.desc_en) || toStr(p.description_en),
    image: toStr(p.image) || toStr(p.imageUrl),
    categories,
    category_ar: toStr(p.category_ar),
    category_en: toStr(p.category_en),
    link: link === '#' ? '' : link,
    appLink: appLink === '#' ? '' : appLink,
    clientName_ar: toStr(p.clientName_ar) || toStr(p.clientName),
    clientName_en: toStr(p.clientName_en),
    projectYear: toStr(p.projectYear),
    tools: Array.isArray(p.tools) ? p.tools.filter((t: unknown) => typeof t === 'string' && t.trim()) : [],
    gallery: cleanUrls(p.gallery),
    videos: cleanUrls(p.videos),
    createdAt: toStr(p.createdAt),
  };
}

async function loadProject(id: string) {
  const [doc, allSnap, catSnap] = await Promise.all([
    db.collection('portfolio').doc(id).get(),
    db.collection('portfolio').orderBy('createdAt', 'desc').get(),
    db.collection('categories').get().catch(() => null),
  ]);
  if (!doc.exists) return null;

  const project = mapProject(doc.id, doc.data() || {});
  const categories: PortfolioCategoryRef[] = (catSnap?.docs || []).map(d => {
    const c = d.data();
    return {
      slug: c.slug || d.id,
      name_ar: c.name_ar || c.nameAr || c.name || '',
      name_en: c.name_en || c.nameEn || '',
    };
  });

  // Related work: same category first, then the latest projects.
  const others = allSnap.docs.filter(d => d.id !== id).map(d => mapProject(d.id, d.data()));
  const sameCat = others.filter(o => o.categories.some(c => project.categories.includes(c)));
  const related = [...sameCat, ...others.filter(o => !sameCat.includes(o))].slice(0, 3);

  return { project, categories, related };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const doc = await db.collection('portfolio').doc(id).get();
    if (!doc.exists) return {};
    const p = mapProject(doc.id, doc.data() || {});
    const title = p.title_ar || p.title_en;
    return {
      title: `${title} | Pharaoh Code`,
      description: (p.description_ar || p.description_en).slice(0, 160),
      ...(p.image ? { openGraph: { images: [p.image] } } : {}),
    };
  } catch {
    return {};
  }
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let data: Awaited<ReturnType<typeof loadProject>> = null;
  try {
    data = await loadProject(id);
  } catch (error) {
    console.error('Failed to fetch portfolio project:', error);
  }
  if (!data) notFound();

  return <PortfolioDetailClient project={data.project} categories={data.categories} related={data.related} />;
}
