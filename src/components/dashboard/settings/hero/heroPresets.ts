export interface PresetItem {
  id: string;
  name: string;
  desc: string;
  titleColor: string;
  accentColor: string;
}

export const HERO_PRESETS: PresetItem[] = [
  {
    id: 'royal_gold',
    name: 'الملكي الكلاسيكي (Pharaoh Gold & Royal Navy)',
    desc: 'عناوين بيضاء ناصعة مع لمسات ذهبية وأزرار كحلية وذهبية فاخرة',
    titleColor: '#FFFFFF',
    accentColor: '#C5A16F'
  },
  {
    id: 'luminous_gold',
    name: 'الذهبي البراق (Luminous Gold & White)',
    desc: 'ألوان ذهبية براقة مع خلفية أزرار ذهبية مشعة وتباين عالٍ',
    titleColor: '#FFFFFF',
    accentColor: '#F59E0B'
  },
  {
    id: 'sovereign_silver',
    name: 'السيادي الفضي والذهبي (Sovereign Silver & Gold)',
    desc: 'عناوين فضية ملكية وتفاصيل ذهبية دافئة',
    titleColor: '#F8FAFC',
    accentColor: '#EAB308'
  },
  {
    id: 'cinematic',
    name: 'التباين العالي السينمائي (High Contrast Cinematic Yellow)',
    desc: 'ألوان سينمائية ذات تباين ناصع جداً وقراءة مريحة فوق جميع الفيديوهات',
    titleColor: '#FFFFFF',
    accentColor: '#FACC15'
  }
];
