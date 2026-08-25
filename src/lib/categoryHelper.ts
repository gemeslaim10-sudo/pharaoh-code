import { CategoryItem } from '@/types/category';
import { SectionItem } from '@/types';

/**
 * Checks if a portfolio project belongs to a given category.
 */
export function isProjectInCategory(
  item: SectionItem,
  category: CategoryItem | string
): boolean {
  if (!item) return false;

  // If category is 'all' or empty string, every project matches
  if (typeof category === 'string') {
    if (category === 'all' || !category.trim()) return true;
  }

  // Extract all target category identifiers
  let targetIdentifiers: string[] = [];
  if (typeof category === 'string') {
    targetIdentifiers = [category.trim().toLowerCase()];
  } else if (category && typeof category === 'object') {
    const slug = (category.slug || category.id || '').trim().toLowerCase();
    const id = (category.id || '').trim().toLowerCase();
    const nameAr = (category.name_ar || category.nameAr || '').trim().toLowerCase();
    const nameEn = (category.name_en || category.nameEn || '').trim().toLowerCase();

    targetIdentifiers = [slug, id, nameAr, nameEn].filter(Boolean);
  }

  if (targetIdentifiers.length === 0) return false;

  // Extract all project's category representations
  const itemCats: string[] = [];

  if (Array.isArray(item.categories)) {
    item.categories.forEach(c => {
      if (typeof c === 'string' && c.trim()) {
        itemCats.push(c.trim().toLowerCase());
      }
    });
  }

  if (typeof item.category === 'string' && item.category.trim()) {
    item.category.split(',').forEach(c => {
      if (c.trim()) itemCats.push(c.trim().toLowerCase());
    });
  }

  if (typeof item.filterClass === 'string' && item.filterClass.trim()) {
    item.filterClass.split(',').forEach(c => {
      if (c.trim()) itemCats.push(c.trim().toLowerCase());
    });
  }

  if (typeof item.categorySlug === 'string' && item.categorySlug.trim()) {
    itemCats.push(item.categorySlug.trim().toLowerCase());
  }

  if (typeof item.category_ar === 'string' && item.category_ar.trim()) {
    itemCats.push(item.category_ar.trim().toLowerCase());
  }

  if (typeof item.category_en === 'string' && item.category_en.trim()) {
    itemCats.push(item.category_en.trim().toLowerCase());
  }

  if (typeof item.categoryLabel === 'string' && item.categoryLabel.trim()) {
    itemCats.push(item.categoryLabel.trim().toLowerCase());
  }

  // Compare project category identifiers against target category identifiers
  return targetIdentifiers.some(targetId => {
    return itemCats.some(itemCat => {
      if (itemCat === targetId) return true;
      // Also match if slug or name is contained (e.g. 'web' in 'web,app' or exact substrings)
      if (targetId.length > 2 && itemCat.includes(targetId)) return true;
      if (itemCat.length > 2 && targetId.includes(itemCat)) return true;
      return false;
    });
  });
}

/**
 * Resolves the display label of a project's category dynamically.
 */
export function getCategoryDisplayLabel(
  item: SectionItem,
  categories?: CategoryItem[],
  language: string = 'ar'
): string {
  if (!item) return language === 'ar' ? 'مشروع' : 'Project';

  // 1. Try to match with provided dynamic categories list from DB
  if (categories && categories.length > 0) {
    const matchedCategory = categories.find(c => isProjectInCategory(item, c));
    if (matchedCategory) {
      const name = language === 'ar'
        ? (matchedCategory.name_ar || matchedCategory.nameAr || matchedCategory.name_en || matchedCategory.nameEn)
        : (matchedCategory.name_en || matchedCategory.nameEn || matchedCategory.name_ar || matchedCategory.nameAr);
      if (name) return name;
    }
  }

  // 2. Try localized category fields stored directly on project item
  if (language === 'ar') {
    if (item.category_ar) return item.category_ar;
  } else {
    if (item.category_en) return item.category_en;
  }

  // 3. Fallback to category label or raw category string from DB
  if (item.categoryLabel && typeof item.categoryLabel === 'string') {
    return item.categoryLabel;
  }

  if (item.category && typeof item.category === 'string') {
    // If comma separated, take first
    const parts = item.category.split(',');
    const firstCat = parts[0]?.trim();
    if (firstCat) return firstCat;
  }

  return language === 'ar' ? 'مشروع رقمي' : 'Digital Project';
}
