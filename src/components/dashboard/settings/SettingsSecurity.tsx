'use client';

import { useState, useEffect } from 'react';
import { getAdmins, addAdmin, removeAdmin } from '@/app/actions/dashboard/settings';
import { auth } from '@/lib/firebase/config';
import { DashboardAccordionGroup } from '../layout/DashboardAccordionGroup';
import { AddAdminForm } from './security/AddAdminForm';
import { AdminsTable } from './security/AdminsTable';

export default function SettingsSecurity() {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [admins, setAdmins] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [openAdd, setOpenAdd] = useState(true);
  const [openList, setOpenList] = useState(true);

  const loadData = async () => {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (error) {
      console.error("Failed to load admins:", error);
    } finally {
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      
      await addAdmin(token, email);
      setEmail('');
      await loadData();
      alert("تمت إضافة المشرف بنجاح!");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إضافة المشرف.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من سحب صلاحية الإشراف من هذا الحساب؟")) return;
    
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      
      await removeAdmin(token, id);
      await loadData();
      alert("تم إزالة الصلاحية بنجاح.");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الإزالة.");
    }
  };

  if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل بيانات الحماية...</div>;

  return (
    <div className="space-y-6">
      {/* Group 1: Add Admin Form */}
      <DashboardAccordionGroup
        group={{
          id: 'admin-add',
          title: 'إضافة مشرف جديد (Admin Access)',
          description: 'منح صلاحيات إدارة لوحة التحكم لبريد إلكتروني مسجل على Google',
          icon: <span className="text-base">🔐</span>,
          badge: 'صلاحيات',
          children: (
            <AddAdminForm
              email={email}
              setEmail={setEmail}
              loading={loading}
              onSubmit={handleSubmit}
            />
          ),
        }}
        isOpen={openAdd}
        onToggle={() => setOpenAdd(!openAdd)}
      />

      {/* Group 2: Admins List Table */}
      <DashboardAccordionGroup
        group={{
          id: 'admin-list',
          title: 'قائمة المشرفين المصرح لهم بالدخول',
          description: 'استعراض وإدارة المشرفين الحاليين مع إمكانية إلغاء الصلاحيات',
          icon: <span className="text-base">👥</span>,
          badge: `${admins.length + 1} مشرف`,
          children: <AdminsTable admins={admins} onDelete={handleDelete} />,
        }}
        isOpen={openList}
        onToggle={() => setOpenList(!openList)}
      />
    </div>
  );
}
