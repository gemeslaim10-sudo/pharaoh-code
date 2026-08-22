'use client';

import { DashboardSectionLayout } from '@/components/dashboard/layout/DashboardSectionLayout';
import { DashboardSectionConfig } from '@/types/dashboardLayout';
import SettingsIdentity from '@/components/dashboard/settings/SettingsIdentity';
import SettingsHeroTheme from '@/components/dashboard/settings/SettingsHeroTheme';
import SettingsSecurity from '@/components/dashboard/settings/SettingsSecurity';
import SettingsSocial from '@/components/dashboard/settings/SettingsSocial';
import SettingsSystem from '@/components/dashboard/settings/SettingsSystem';

export default function DashboardSettings() {
  const settingsSections: DashboardSectionConfig[] = [
    {
      id: 'identity',
      label: 'الهوية الرقمية والشعارات',
      labelEn: 'Brand Identity',
      icon: <span>👑</span>,
      badge: 'الأساسية',
      description: 'إدارة اسم المنصة والشعارات (Dark & Light) والأيقونة والبيانات الوصفية لمحركات البحث.',
      content: <SettingsIdentity />,
    },
    {
      id: 'theme',
      label: 'تخصيص الهيرو والألوان',
      labelEn: 'Hero & Theme',
      icon: <span>🎨</span>,
      badge: 'المظهر',
      description: 'تخصيص ميديا خلفيات الهيرو (فيديوهات وصور) ولوحات الألوان للوضعين الداكن والفاتح.',
      content: <SettingsHeroTheme />,
    },
    {
      id: 'security',
      label: 'الحساب وصلاحيات المشرفين',
      labelEn: 'Security & Access',
      icon: <span>🔐</span>,
      badge: 'الأمان',
      description: 'إدارة حسابات المشرفين المصرح لهم بالدخول إلى لوحة التحكم بصلاحيات Google.',
      content: <SettingsSecurity />,
    },
    {
      id: 'social',
      label: 'قنوات التواصل الاجتماعي',
      labelEn: 'Social Media',
      icon: <span>🌐</span>,
      badge: 'الروابط',
      description: 'تحديث روابط الحسابات الرسمية على فيسبوك، انستجرام، ورقم واتساب المباشر.',
      content: <SettingsSocial />,
    },
    {
      id: 'system',
      label: 'بث المنصة ووضع الصيانة',
      labelEn: 'System Broadcast',
      icon: <span>⚙️</span>,
      badge: 'الخادم',
      description: 'التحكم في فتح وإغلاق البث المباشر للجمهور وتفعيل بوابة الصيانة المغلقة.',
      content: <SettingsSystem />,
    },
  ];

  return (
    <DashboardSectionLayout
      title="تهيئة النظام الملكي"
      subtitle="إدارة وتحديث تفاصيل النظام وسجلات كل قسم بكفاءة فائقة مع إمكانية المراجعة والتعديل الفوري بدون أي تعقيد."
      badge="الإعدادات الشاملة"
      sections={settingsSections}
      defaultSectionId="identity"
    />
  );
}
