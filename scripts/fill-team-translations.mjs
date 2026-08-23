import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const serviceAccount = require(join(__dirname, '../pharaoh-code-project-firebase-adminsdk-fbsvc-e3697472df.json'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const KNOWN_TRANSLATIONS = {
  // Stats
  "سنوات الخبرة": "Years of Experience",
  "الحملات الناجحة": "Successful Campaigns",
  "متوسط نمو العائد": "Average ROI Growth",
  "الخبرة العملية": "Practical Experience",
  "العملاء المحتملون": "Potential Leads",
  "معدل التحويل": "Conversion Rate",
  "الرضا والتفاعل": "Satisfaction & Engagement",
  "المشاريع المدارة": "Managed Projects",
  "كفاءة العمليات": "Operations Efficiency",
  "فريق العمل": "Team Members",
  "المشاريع المكتملة": "Completed Projects",
  "رضا العملاء": "Client Satisfaction",
  "العلامات التجارية": "Brand Identities",
  "المشاريع المنجزة": "Accomplished Projects",
  "العملاء": "Clients",
  "العملاء والشركاء": "Clients & Partners",
  "مشاريع تم تأسيسها": "Established Projects",
  "سنوات القيادة": "Years of Leadership",
  "مشاريع مستقطبة": "Client Outreach Rate",
  "معدل رضا العملاء": "Client Satisfaction Rate",
  "واجهة مستخدم مصممة": "Designed User Interfaces",
  "دقة الهوية البصرية": "Visual Identity Precision",
  "منظومة برمجية مدمجة": "Integrated Systems",
  "استقرار الأنظمة": "System Uptime & Stability",
  "حملة إعلانية كبرى": "Major Ad Campaigns",
  "معدل مضاعفة المبيعات": "Sales ROI Multiplier",
  "قاعدة بيانات مدمجة": "Integrated Databases",
  "سرعة استجابة السيرفر": "Server Response Time",
  "مشروع تم تسليمه بنجاح": "Delivered Projects",
  "التزام بالجداول الزمنية": "On-Time Schedule Delivery",
  "ثغرات أمنية مكتشفة لاحقاً": "Discovered Vulnerabilities",
  "أمان وخصوصية تامة": "Privacy & Data Security",

  // Skills
  "إدارة الحملات الإعلانية الممولة (Facebook, Instagram, TikTok, Google)": "Paid Ad Campaigns (Meta, TikTok, Google)",
  "اختبارات A/B واستهداف الجماهير المخصصة (Audience Targeting)": "A/B Testing & Audience Targeting",
  "التخطيط الاستراتيجي للميزانيات الإعلانية": "Strategic Ad Budget Planning",
  "تحليل البيانات وقياس مؤشرات الأداء (Data Analytics & KPIs)": "Data Analytics & Performance KPIs",
  "تحسين معدل العائد على الإنفاق الإعلاني (ROAS Optimization)": "ROAS & Conversion Rate Optimization",
  "التواصل الفعّال ومهارات التفاوض": "Effective Communication & Negotiation",
  "إدارة وتوليد العملاء المحتملين (Lead Generation)": "Lead Generation & Prospecting",
  "إدارة علاقات العملاء (CRM)": "CRM & Client Relationship Management",
  "مهارات العرض والتوضيح (Pitching)": "Pitching & Presentation Skills",
  "تحليل السوق وفهم احتياجات العملاء": "Market Analysis & Customer Needs",
  "الإدارة التشغيلية وتحسين العمليات": "Operations & Process Optimization",
  "التخطيط الاستراتيجي وتنفيذ خطط العمل": "Strategic Planning & Execution",
  "التحليلات المالية وإدارة الميزانيات": "Financial Analytics & Budgeting",
  "إدارة الموارد البشرية وتوجيه فرق العمل": "HR & Team Mentorship",
  "إدارة الأزمات واتخاذ القرارات السريعة": "Crisis Management & Rapid Decisions",
  "تصميم الهويات البصرية والعلامات التجارية (Brand Identity)": "Brand Identity & Visual Design",
  "إتقان برامج أدوبي (Adobe Creative Suite - Photoshop, Illustrator, InDesign)": "Adobe Creative Suite Mastery",
  "تصميم الواجهات وتجربة المستخدم (UI/UX Design)": "UI/UX Interface Design",
  "تصميم المواد التسويقية وإعلانات السوشيال ميديا": "Marketing & Social Media Assets",
  "التفكير الإبداعي وابتكار المفاهيم البصرية (Creative Concepting)": "Creative Concepting & Visual Direction",
  "التخطيط الاستراتيجي وإدارة الشركات الناشئة": "Strategic Planning & Startup Management",
  "تطوير الأعمال وإدارة علاقات العملاء والمستثمرين": "Business Development & Investor Relations",
  "التفكير التحليلي وحل المشكلات المعقدة": "Analytical Thinking & Complex Problem Solving",
  "القيادة التنفيذية وتوجيه فرق العمل متعددة التخصصات": "Executive Leadership & Cross-Functional Mentorship",
  "إدارة المنتجات الرقمية وفهم اتجاهات التكنولوجيا الحديثة": "Digital Product Management & Tech Trends",

  // Roles
  "خبير إعلانات رقمية ومشتري وسائل إعلام": "Paid Ads Specialist & Media Buyer",
  "خبير إعلانات ممولة ومسوق رقمي": "Paid Ads Specialist & Performance Marketer",
  "تطوير المبيعات": "Sales & Business Development Lead",
  "مسؤولة مبيعات وتطوير الأعمال": "Sales & Business Development Executive",
  "المدير التنفيذي": "Chief Executive Officer & Co-Founder",
  "المدير التنفيذي والمؤسس الشريك": "Chief Executive Officer & Co-Founder",
  "مصمم جرافيك": "Graphic Designer & Brand Identity Specialist",
  "مصمم جرافيك ومطور هوية بصرية": "Graphic Designer & Brand Identity Specialist",
  "المؤسس والرئيس التنفيذي": "Founder & Chief Executive Officer",
  "المؤسس والمدير العام": "Founder & Managing Director"
};

const translateAr = (text) => text ? (KNOWN_TRANSLATIONS[text.trim()] || '') : '';

async function main() {
  console.log('\n🌟 Complete Team Translations & Hydration');
  console.log('==========================================');

  const snapshot = await db.collection('team_members').get();
  console.log(`Found ${snapshot.size} team members in Firestore\n`);

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const updates = {};

    // 1. Name
    const nameAr = data.name_ar || data.name || '';
    updates.name_ar = nameAr;
    if (!data.name_en || data.name_en.trim() === '') {
      updates.name_en = translateAr(nameAr) || nameAr;
    }

    // 2. Role
    const roleAr = data.role_ar || data.role || '';
    updates.role_ar = roleAr;
    const translatedRole = translateAr(roleAr);
    if (translatedRole) {
      updates.role_en = translatedRole;
    } else if (!data.role_en) {
      updates.role_en = roleAr;
    }

    // 3. Description
    const descAr = data.description_ar || data.description || data.desc_ar || data.desc || '';
    if (descAr) {
      updates.description_ar = descAr;
      updates.desc_ar = descAr;
    }

    // 4. Skills array with full bilingual support
    if (Array.isArray(data.skills)) {
      updates.skills = data.skills.map(s => {
        const nameArSkill = s.name_ar || s.name || '';
        const nameEnSkill = s.name_en || translateAr(nameArSkill) || nameArSkill;
        return {
          name: nameArSkill,
          name_ar: nameArSkill,
          name_en: nameEnSkill,
          value: s.value
        };
      });
    }

    // 5. Stats array with full bilingual support
    if (Array.isArray(data.stats)) {
      updates.stats = data.stats.map(st => {
        const labelArStat = st.label_ar || st.label || '';
        const labelEnStat = st.label_en || translateAr(labelArStat) || labelArStat;
        return {
          value: st.value,
          label: labelArStat,
          label_ar: labelArStat,
          label_en: labelEnStat
        };
      });
    }

    await doc.ref.update(updates);
    console.log(`✅ Updated doc [${doc.id}] - ${data.name || nameAr}`);
    console.log(`   Stats count: ${updates.stats?.length || 0}`);
    console.log(`   Skills count: ${updates.skills?.length || 0}`);
  }

  console.log('\n🎉 Successfully updated all team members in Firestore!');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error updating Firestore:', err);
  process.exit(1);
});
