'use client';

import { useState } from 'react';
import CreativityHeader from '@/components/dashboard/creativity/CreativityHeader';
import CreativityProjectForm from '@/components/dashboard/creativity/CreativityProjectForm';
import CreativityThinkForm from '@/components/dashboard/creativity/CreativityThinkForm';
import CreativityServicesForm from '@/components/dashboard/creativity/CreativityServicesForm';
import CreativityRecords from '@/components/dashboard/creativity/CreativityRecords';
import { type CreativityType } from '@/types/creativity';

export default function DashboardCreativity() {
  const [activeTab, setActiveTabState] = useState<CreativityType>('portfolio');
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const setActiveTab = (tab: CreativityType) => {
    setEditingItem(null);
    setActiveTabState(tab);
  };

  const handleSaved = () => {
    setEditingItem(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (record: any) => {
    setEditingItem(record);
    document.getElementById('creativity-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <CreativityHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div id="creativity-form">
        {activeTab === 'portfolio' && <CreativityProjectForm onSuccess={handleSaved} editingItem={editingItem} onCancelEdit={() => setEditingItem(null)} />}
        {activeTab === 'philosophy' && <CreativityThinkForm onSuccess={handleSaved} editingItem={editingItem} onCancelEdit={() => setEditingItem(null)} />}
        {activeTab === 'services' && <CreativityServicesForm onSuccess={handleSaved} editingItem={editingItem} onCancelEdit={() => setEditingItem(null)} />}
      </div>

      <CreativityRecords activeTab={activeTab} refreshKey={refreshKey} onEdit={handleEdit} editingId={editingItem?.id || null} />
    </div>
  );
}
