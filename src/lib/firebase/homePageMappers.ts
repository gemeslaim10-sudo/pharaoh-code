import { admin } from '@/lib/firebase/admin';

export function mapReviews(docs: admin.firestore.QueryDocumentSnapshot[]) {
  return docs.map(doc => {
    const rev = doc.data();
    return {
      name: rev.name || 'عميل',
      name_ar: rev.name_ar || rev.name,
      name_en: rev.name_en,
      role: rev.role || 'شريك نجاح',
      role_ar: rev.role_ar || rev.role,
      role_en: rev.role_en,
      content: rev.text || rev.content || '',
      content_ar: rev.text_ar || rev.content_ar || rev.text || rev.content,
      content_en: rev.text_en || rev.content_en,
      rating: '★★★★★',
      imageUrl: rev.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    };
  });
}

export function mapPortfolio(docs: admin.firestore.QueryDocumentSnapshot[]) {
  return docs.map(doc => {
    const p = doc.data();
    return {
      id: doc.id,
      title: p.title,
      title_ar: p.title_ar || p.title,
      title_en: p.title_en,
      category: p.category,
      categoryLabel: p.category || '',
      image: p.image,
      description: p.desc || p.description,
      description_ar: p.desc_ar || p.description_ar || p.desc,
      description_en: p.desc_en || p.description_en,
      link: p.link,
    };
  });
}

export function mapServices(docs: admin.firestore.QueryDocumentSnapshot[]) {
  return docs.map(doc => {
    const s = doc.data();
    return {
      id: doc.id,
      title: s.title,
      title_ar: s.title_ar || s.title,
      title_en: s.title_en,
      description: s.desc || s.description,
      description_ar: s.desc_ar || s.description_ar || s.desc,
      description_en: s.desc_en || s.description_en,
      iconSvg: s.icon,
    };
  });
}

export function mapPhilosophy(docs: admin.firestore.QueryDocumentSnapshot[]) {
  return docs.map(doc => {
    const ph = doc.data();
    return {
      title: ph.title,
      title_ar: ph.title_ar || ph.title,
      title_en: ph.title_en,
      description: ph.desc || ph.description,
      description_ar: ph.desc_ar || ph.description_ar || ph.desc,
      description_en: ph.desc_en || ph.description_en,
      iconSvg: ph.icon,
    };
  });
}

export function mapClients(docs: admin.firestore.QueryDocumentSnapshot[]) {
  return docs.map(doc => {
    const c = doc.data();
    return {
      id: doc.id,
      name: c.name || '',
      name_ar: c.name_ar || c.name,
      name_en: c.name_en,
      logo: c.logo || '',
      description: c.description || c.desc || '',
      description_ar: c.description_ar || c.desc_ar || c.description,
      description_en: c.description_en || c.desc_en,
      websiteUrl: c.websiteUrl || ''
    };
  });
}

export function mapCategories(docs: admin.firestore.QueryDocumentSnapshot[]) {
  return docs.map(doc => {
    const cat = doc.data();
    return {
      id: doc.id,
      nameAr: cat.nameAr || cat.name || '',
      nameEn: cat.nameEn || '',
      slug: cat.slug || doc.id
    };
  });
}
