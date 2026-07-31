import { Language } from '@/types/i18n';

// Known static translation dictionary for DB strings that don't have _en or _ar fields
const KNOWN_TRANSLATIONS: Record<string, { ar: string; en: string }> = {
  // About Philosophy
  "التحليل العميق": { ar: "التحليل العميق", en: "Deep Analysis" },
  "Deep Analysis": { ar: "التحليل العميق", en: "Deep Analysis" },
  "كود لا يصدأ": { ar: "كود لا يصدأ", en: "Stainless Code" },
  "Stainless Code": { ar: "كود لا يصدأ", en: "Stainless Code" },
  "السيادة التقنية": { ar: "السيادة التقنية", en: "Technical Dominance" },
  "Technical Dominance": { ar: "السيادة التقنية", en: "Technical Dominance" },
  "HOW WE THINK": { ar: "كيف نفكر", en: "HOW WE THINK" },
  "How We Think": { ar: "كيف نفكر", en: "HOW WE THINK" },
  "كيف نفكر": { ar: "كيف نفكر", en: "HOW WE THINK" },
  "Philosophy of Digital Engineering": { ar: "فلسفة التشييد الرقمي", en: "Philosophy of Digital Engineering" },
  "فلسفة التشييد الرقمي": { ar: "فلسفة التشييد الرقمي", en: "Philosophy of Digital Engineering" },
  "Have Questions? We Have Engineering Answers": { ar: "لديك أسئلة؟ لدينا حلول أسطورية", en: "Have Questions? We Have Engineering Answers" },

  // About Hero & Features
  "Legacy & Vision": { ar: "رؤيتنا وإرثنا", en: "Legacy & Vision" },
  "Where Code Mastery Meets Legacy Engineering": { ar: "حيث يلتقي ذكاء الكود بعظمة الأجداد", en: "Where Code Mastery Meets Legacy Engineering" },
  "Explore Our World": { ar: "استكشف عالمنا", en: "Explore Our World" },
  "دقة فرعونية": { ar: "دقة فرعونية", en: "Pharaonic Precision" },
  "Pharaonic Precision": { ar: "دقة فرعونية", en: "Pharaonic Precision" },
  "اهتمام بكل بكسل في الكود": { ar: "اهتمام بكل بكسل في الكود", en: "Attention to every pixel in code." },
  "اهتمام بكل بكسل في الكود.": { ar: "اهتمام بكل بكسل في الكود.", en: "Attention to every pixel in code." },
  "Attention to every pixel in code": { ar: "اهتمام بكل بكسل في الكود", en: "Attention to every pixel in code." },
  "سرعة خارقة": { ar: "سرعة خارقة", en: "Blazing Speed" },
  "Blazing Speed": { ar: "سرعة خارقة", en: "Blazing Speed" },
  "أداء لا يعرف البطء أو التعليق": { ar: "أداء لا يعرف البطء أو التعليق", en: "Performance without lag or slowdown." },
  "أداء لا يعرف البطء أو التعليق.": { ar: "أداء لا يعرف البطء أو التعليق.", en: "Performance without lag or slowdown." },
  "Performance without lag or slowdown": { ar: "أداء لا يعرف البطء أو التعليق", en: "Performance without lag or slowdown." },

  // Philosophy Card Descriptions
  "نبدأ بدراسة فكرتك كأنها أساس لمعبد لا نبدأ في الكود إلا بعد فهم كل تفصيلة في البزنس بتاعك.": {
    ar: "نبدأ بدراسة فكرتك كأنها أساس لمعبد لا نبدأ في الكود إلا بعد فهم كل تفصيلة في البزنس بتاعك.",
    en: "We study your idea as the foundation of a monument, coding only after understanding every detail of your business."
  },
  "نبدأ بدراسة فكرتك كأنها أساس لمعبد، لا نبدأ في الكود إلا بعد فهم كل تفصيلة في البزنس بتاعك.": {
    ar: "نبدأ بدراسة فكرتك كأنها أساس لمعبد، لا نبدأ في الكود إلا بعد فهم كل تفصيلة في البزنس بتاعك.",
    en: "We study your idea as the foundation of a monument, coding only after understanding every detail of your business."
  },
  "قابلاً للتطوير (Clean Code) نكتب كوداً نظيفاً لسنوات قادمة، تماماً كما صمدت أحجار الأهرامات.": {
    ar: "قابلاً للتطوير (Clean Code) نكتب كوداً نظيفاً لسنوات قادمة، تماماً كما صمدت أحجار الأهرامات.",
    en: "Scalable (Clean Code) written for years to come, just as the pyramids stood the test of time."
  },
  "لا نتبع الترندات فقط، بل نختار التقنية التي تضمن لعملك السيطرة والسرعة والأمان المطلق.": {
    ar: "لا نتبع الترندات فقط، بل نختار التقنية التي تضمن لعملك السيطرة والسرعة والأمان المطلق.",
    en: "We don't just follow trends; we choose tech that guarantees control, speed, and absolute security for your business."
  },

  // Services
  "Our Software Services": { ar: "خدماتنا البرمجية", en: "Our Software Services" },
  "خدماتنا البرمجية": { ar: "خدماتنا البرمجية", en: "Our Software Services" },
  "لوحة تحكم شاملة": { ar: "لوحة تحكم شاملة", en: "Full Control Panel" },
  "Full Control Panel": { ar: "لوحة تحكم شاملة", en: "Full Control Panel" },

  // Portfolio
  "إرثنا من الإبداع": { ar: "إرثنا من الإبداع", en: "Our Creative Legacy" },
  "Our Creative Legacy": { ar: "إرثنا من الإبداع", en: "Our Creative Legacy" },
  "جوهر أعمالنا": { ar: "جوهر أعمالنا", en: "The Core of Our Work" },
  "The Core of Our Work": { ar: "جوهر أعمالنا", en: "The Core of Our Work" },
  "خدمات العرش": { ar: "خدمات العرش", en: "Throne Services" },
  "Throne Services": { ar: "خدمات العرش", en: "Throne Services" },

  // Portfolio Services Cards
  "Artificial Intelligence & ML": { ar: "الذكاء الاصطناعي وتعلم الآلة", en: "Artificial Intelligence & ML" },
  "الذكاء الاصطناعي وتعلم الآلة": { ar: "الذكاء الاصطناعي وتعلم الآلة", en: "Artificial Intelligence & ML" },
  "Search Engine Optimization (SEO)": { ar: "تحسين محركات البحث (SEO)", en: "Search Engine Optimization (SEO)" },
  "تحسين محركات البحث (SEO)": { ar: "تحسين محركات البحث (SEO)", en: "Search Engine Optimization (SEO)" },
  "Digital Marketing & Growth": { ar: "التسويق الرقمي والنمو", en: "Digital Marketing & Growth" },
  "التسويق الرقمي والنمو": { ar: "التسويق الرقمي والنمو", en: "Digital Marketing & Growth" },
  "UI/UX Design & User Experience": { ar: "تصميم واجهات وتجربة المستخدم (UI/UX)", en: "UI/UX Design & User Experience" },
  "تصميم واجهات وتجربة المستخدم (UI/UX)": { ar: "تصميم واجهات وتجربة المستخدم (UI/UX)", en: "UI/UX Design & User Experience" },
  "Enterprise Software Solutions": { ar: "حلول البرمجيات للمؤسسات", en: "Enterprise Software Solutions" },
  "حلول البرمجيات للمؤسسات": { ar: "حلول البرمجيات للمؤسسات", en: "Enterprise Software Solutions" },
  "Mobile Applications Development": { ar: "تطوير تطبيقات الهواتف الذكية", en: "Mobile Applications Development" },
  "تطوير تطبيقات الهواتف الذكية": { ar: "تطوير تطبيقات الهواتف الذكية", en: "Mobile Applications Development" },

  // Card descriptions
  "AI integration and machine learning algorithms for smart automation.": {
    ar: "دمج الذكاء الاصطناعي وخوارزميات تعلم الآلة للأتمتة الذكية.",
    en: "AI integration and machine learning algorithms for smart automation."
  },
  "Comprehensive search engine optimization to boost organic traffic.": {
    ar: "تحسين شامل لمحركات البحث لزيادة الزيارات المجانية.",
    en: "Comprehensive search engine optimization to boost organic traffic."
  },
  "Data-driven digital marketing campaigns and online presence.": {
    ar: "حملات تسويق رقمية قائمة على البيانات وتعزيز الحضور الرقمي.",
    en: "Data-driven digital marketing campaigns and online presence."
  },
  "Elegant user interface and seamless user experience design.": {
    ar: "تصميم واجهات أنيقة وتجربة مستخدم سلسة واستثنائية.",
    en: "Elegant user interface and seamless user experience design."
  },
  "Custom software architectures and tailored ERP systems.": {
    ar: "بناء معمارية برمجية مخصصة وأنظمة إدارة مؤسسات متكاملة.",
    en: "Custom software architectures and tailored ERP systems."
  },
  "High-performance iOS and Android native applications.": {
    ar: "تطوير تطبيقات هاتف عالية الأداء لنظامي iOS و Android.",
    en: "High-performance iOS and Android native applications."
  }
};

/**
 * Helper to dynamically extract text based on active language from database objects.
 * Supports objects structured as:
 * 1. { title_ar: '...', title_en: '...' }
 * 2. { title: { ar: '...', en: '...' } }
 * 3. Known translation dictionary lookup.
 * 4. Language-matched fallback or empty string for component fallback key execution.
 */
export function getDynamicText(
  data: any,
  field: string,
  language: Language = 'ar'
): string {
  if (!data) return '';

  // 1. Nested object format -> data[field] = { ar: '...', en: '...' }
  if (data[field] && typeof data[field] === 'object') {
    if (data[field][language]) return data[field][language];
  }

  // 2. Explicit suffix format -> data.title_ar / data.title_en
  const targetKey = `${field}_${language}`;
  if (data[targetKey] && typeof data[targetKey] === 'string' && data[targetKey].trim() !== '') {
    return data[targetKey];
  }

  // 3. Raw value processing
  const rawValue = typeof data[field] === 'string' ? data[field].trim() : '';

  // Check KNOWN_TRANSLATIONS dictionary for the raw value if it exists
  if (rawValue && KNOWN_TRANSLATIONS[rawValue]) {
    return KNOWN_TRANSLATIONS[rawValue][language];
  }

  if (rawValue) {
    const isArabicStr = /[\u0600-\u06FF]/.test(rawValue);
    // If requesting English but raw value is Arabic without explicit _en field,
    // return empty string so caller can use || fallback key
    if (language === 'en' && isArabicStr) {
      return '';
    }
    // If requesting Arabic but raw value is English without explicit _ar field,
    // return empty string so caller can use || fallback key
    if (language === 'ar' && !isArabicStr && /[a-zA-Z]/.test(rawValue)) {
      return '';
    }
    return rawValue;
  }

  return '';
}
