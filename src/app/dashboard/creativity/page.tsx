'use client';

import { useState } from 'react';
import CreativityHeader from '@/components/dashboard/creativity/CreativityHeader';
import CreativityProjectForm from '@/components/dashboard/creativity/CreativityProjectForm';
import CreativityThinkForm from '@/components/dashboard/creativity/CreativityThinkForm';
import CreativityServicesForm from '@/components/dashboard/creativity/CreativityServicesForm';
import CreativityRecords from '@/components/dashboard/creativity/CreativityRecords';
import { CreativityType } from '@/types/creativity';

export default function DashboardCreativity() {
  const [activeTab, setActiveTab] = useState<CreativityType>('portfolio');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleItemAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <CreativityHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'portfolio' && <CreativityProjectForm onSuccess={handleItemAdded} />}
      {activeTab === 'philosophy' && <CreativityThinkForm onSuccess={handleItemAdded} />}
      {activeTab === 'services' && <CreativityServicesForm onSuccess={handleItemAdded} />}
      
      <CreativityRecords activeTab={activeTab} refreshKey={refreshKey} />
    </div>
  );
}
