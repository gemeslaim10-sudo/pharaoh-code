'use client';

import { useState, useEffect } from 'react';
import { getServices, deleteService } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';
import ServicesManagementForm from '@/components/dashboard/services-management/ServicesManagementForm';
import ServicesManagementGrid from '@/components/dashboard/services-management/ServicesManagementGrid';
import { DashboardAccordionGroup } from '@/components/dashboard/layout/DashboardAccordionGroup';

export default function DashboardServicesManagement() {
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(true);
  const [openList, setOpenList] = useState(true);

  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      await deleteService(token, id);
      setServices(prev => prev.filter(s => s.id !== id));
      alert('تم حذف الخدمة بنجاح!');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'حدث خطأ أثناء حذف الخدمة.');
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setOpenForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 text-right" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-pharaohGold/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">إدارة الخدمات وباقات التسعير</h1>
            <span className="inline-flex items-center leading-none px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold border border-amber-500/30 dark:border-pharaohGold/30">
              {services.length} خدمة
            </span>
          </div>
          <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">تعديل وإضافة الخدمات، الباقات الثلاث، والنظرة العامة، وخطوات التنفيذ المنعكسة في الموقع</p>
        </div>
      </div>

      {/* Group 1: Service Form */}
      <DashboardAccordionGroup
        group={{
          id: 'service-form',
          title: editingService ? 'تعديل الخدمة المحددة وباقاتها' : 'إضافة خدمة برمجية جديدة مع صفحات التفاصيل والباقات',
          description: 'تخصيص العناوين، الأيقونات، باقات التسعير الثلاث، والنظرة العامة، وخطوات الـ Roadmap',
          icon: <span className="text-base">⚡</span>,
          badge: editingService ? 'وضع التعديل' : 'جديد',
          children: (
            <ServicesManagementForm
              editingService={editingService}
              setEditingService={setEditingService}
              onSuccess={fetchAllServices}
            />
          ),
        }}
        isOpen={openForm}
        onToggle={() => setOpenForm(!openForm)}
      />

      {/* Group 2: Services Grid */}
      <DashboardAccordionGroup
        group={{
          id: 'services-list',
          title: 'الخدمات المعتمدة والمنشورة في المنصة',
          description: 'استعراض كافة الخدمات المتوفرة مع إمكانية التعديل الشامل أو الحذف',
          icon: <span className="text-base">📋</span>,
          badge: `${services.length} منشورة`,
          children: (
            <ServicesManagementGrid
              services={services}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          ),
        }}
        isOpen={openList}
        onToggle={() => setOpenList(!openList)}
      />
    </div>
  );
}
