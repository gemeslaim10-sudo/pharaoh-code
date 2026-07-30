'use server';

import { db } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function seedDashboardData(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const collections = ['orders', 'reviews', 'notifications'];
    for (const col of collections) {
      const snap = await db.collection(col).get();
      const deleteBatch = db.batch();
      snap.docs.forEach(doc => deleteBatch.delete(doc.ref));
      await deleteBatch.commit();
    }

    const batch = db.batch();

    // 1. Seed Orders
    const ordersRef = db.collection('orders');
    const orders = [
      {
        name: 'عميل جديد (إثبات أن الجدول ديناميكي)',
        phone: '01000000000',
        email: 'test@test.com',
        service: 'تطبيق موبايل',
        date: '2026-06-06',
        status: 'pending',
        type: 'project_request',
        budget: 'من 50,000 إلى 100,000 ج.م',
        goal: 'تطوير تطبيق جوال',
        revenue: 0,
        createdAt: new Date().toISOString()
      },
      {
        name: 'أحمد محمد عبد الله',
        phone: '01023456789',
        email: 'ahmed@example.com',
        service: 'بناء سيستم ERP',
        date: '2026-05-17',
        status: 'pending',
        type: 'project_request',
        budget: 'أكثر من 250,000 ج.م',
        goal: 'نظام لإدارة الشركات (ERP)',
        revenue: 85000,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        name: 'سارة رأفت فهمي',
        phone: '01198765432',
        email: 'sara.r@example.com',
        service: 'تطوير موقع ويب',
        date: '2026-05-16',
        status: 'contacted',
        type: 'project_request',
        budget: 'من 20,000 إلى 50,000 ج.م',
        goal: 'بناء موقع ويب احترافي',
        revenue: 45000,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ];

    orders.forEach(order => {
      const docRef = ordersRef.doc();
      batch.set(docRef, order);
    });

    // 2. Seed Notifications
    const notifsRef = db.collection('notifications');
    const notifs = [
      {
        type: 'طلب مشروع جديد',
        title: 'العميل "أحمد محمد" قدم طلباً لتنفيذ "سيستم ERP".',
        createdAt: new Date().toISOString(),
        style: 'emerald'
      },
      {
        type: 'تحديث حالة',
        title: 'تم التواصل مع "سارة رأفت" وجاري التنسيق.',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        style: 'blue'
      },
      {
        type: 'تعليق جديد',
        title: 'ترك "أحمد الخطيب" أثراً رقمياً وتعليقاً جديداً.',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        style: 'amber'
      }
    ];

    notifs.forEach(notif => {
      batch.set(notifsRef.doc(), notif);
    });

    // 3. Seed Reviews
    const reviewsRef = db.collection('reviews');
    const reviews = [
      {
        name: 'أحمد الخطيب',
        phone: '+201012345678',
        initials: 'أ خ',
        text: 'أريد الاستفسار عن تكلفة برمجة متجر إلكتروني متعدد التجارب لشركتنا، وهل توجد فترة دعم فني مجانية مرافقة للسيستم؟',
        status: 'pending',
        date: '2026-05-17',
        createdAt: new Date().toISOString()
      },
      {
        name: 'المهندس محمد رأفت',
        phone: '+201198765432',
        initials: 'م ح',
        text: 'هل يمكن ربط نظام الـ ERP الخاص بكم مع الفاتورة الإلكترونية المصرية مباشرة؟ أرجو مراسلتي لإيضاح الميزة.',
        status: 'pending',
        date: '2026-05-16',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        name: 'الأستاذة سارة علي',
        phone: '+201255554444',
        initials: 'أ س',
        text: 'تجربة تعامل ممتازة جداً مع Pharaoh Code، التزام تام بموعد التسليم المتفق عليه ودقة برمجية لا غبار عليها!',
        status: 'approved',
        date: '2026-05-15',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ];

    reviews.forEach(review => {
      const docRef = reviewsRef.doc();
      batch.set(docRef, review);
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('Error seeding data:', error);
    throw new Error('Failed to seed database.');
  }
}
