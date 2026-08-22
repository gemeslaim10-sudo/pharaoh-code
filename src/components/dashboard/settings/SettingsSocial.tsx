'use client';

import { useState, useEffect } from 'react';
import { getSocialLinks, updateSocialLinks } from '@/app/actions/dashboard/settings';
import { auth } from '@/lib/firebase/config';
import { DashboardAccordionGroup } from '../layout/DashboardAccordionGroup';
import { SocialLinksForm } from './social/SocialLinksForm';
import { SocialLinksPreviewTable } from './social/SocialLinksPreviewTable';

export default function SettingsSocial() {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [formData, setFormData] = useState({ fb: '', wa: '', ig: '' });
  const [openForm, setOpenForm] = useState(true);
  const [openTable, setOpenTable] = useState(false);

  const loadData = async () => {
    try {
      const data = await getSocialLinks();
      if (data) {
        setFormData({
          fb: data.fb || '',
          wa: data.wa || '',
          ig: data.ig || '',
        });
      }
    } catch (error) {
      console.error("Failed to load social links:", error);
    } finally {
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      
      await updateSocialLinks(token, formData);
      alert("تم تحديث وحفظ روابط التواصل الاجتماعي بنجاح!");
      await loadData();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حفظ الروابط.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id.replace('social-', '')]: e.target.value,
    }));
  };

  if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل قنوات الاتصال...</div>;

  return (
    <div className="space-y-6">
      {/* Group 1: Edit Social Channels Form */}
      <DashboardAccordionGroup
        group={{
          id: 'social-form',
          title: 'ربط القنوات الخارجية والشبكات (فيسبوك - واتساب - انستجرام)',
          description: 'تحديد الروابط الرسمية وأرقام واتساب المستخدمة في الفوتر والنافبار وأزرار التواصل',
          icon: <span className="text-base">🌐</span>,
          badge: 'قنوات',
          children: (
            <SocialLinksForm
              formData={formData}
              handleChange={handleChange}
              loading={loading}
              onSubmit={handleSubmit}
            />
          ),
        }}
        isOpen={openForm}
        onToggle={() => setOpenForm(!openForm)}
      />

      {/* Group 2: Current Channels Preview */}
      <DashboardAccordionGroup
        group={{
          id: 'social-table',
          title: 'السجلات الحالية لقنوات الاتصال الرسمية',
          description: 'معاينة مباشرة للروابط النشطة حالياً في الموقع',
          icon: <span className="text-base">📊</span>,
          badge: 'معاينة',
          children: <SocialLinksPreviewTable formData={formData} />,
        }}
        isOpen={openTable}
        onToggle={() => setOpenTable(!openTable)}
      />
    </div>
  );
}
