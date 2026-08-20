'use client';

import { useState, useEffect } from 'react';
import { getServices, deleteService } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';
import ServicesManagementScripts from '@/components/dashboard/services-management/ServicesManagementScripts';
import ServicesManagementForm from '@/components/dashboard/services-management/ServicesManagementForm';
import ServicesManagementGrid from '@/components/dashboard/services-management/ServicesManagementGrid';

export default function DashboardServicesManagement() {
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ServicesManagementScripts />
      <section id="pharaoh-crud-services-dashboard" className="py-10 bg-pharaohNavy relative overflow-hidden text-right">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pharaohGold/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
              <ServicesManagementForm 
                  editingService={editingService} 
                  setEditingService={setEditingService} 
                  onSuccess={fetchAllServices} 
              />
              <ServicesManagementGrid 
                  services={services} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                  loading={loading} 
              />
          </div>
      </section>

      <style>{`
          @keyframes fieldFadeIn {
              from { opacity: 0; transform: scale(0.98) translateY(-5px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-field-fade { animation: fieldFadeIn 0.35s ease-out forwards; }
      `}</style>
    </>
  );
}
