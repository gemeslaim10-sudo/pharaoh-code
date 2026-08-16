'use client';

import { useState } from 'react';
import ServiceFormBasicInputs from './ServiceFormBasicInputs';
import ServiceFormDescriptions from './ServiceFormDescriptions';
import { useServiceForm } from './useServiceForm';
import { ServiceItem } from './serviceFormTypes';
import { ServiceFormOverviewTab } from './ServiceFormOverviewTab';
import { ServiceFormPackagesTab } from './ServiceFormPackagesTab';
import { ServiceFormRoadmapTab } from './ServiceFormRoadmapTab';
import { ServiceFormHeroFields } from './ServiceFormHeroFields';

interface Props {
  editingService: ServiceItem | null;
  setEditingService: (service: ServiceItem | null) => void;
  onSuccess: () => void;
}

export default function ServicesManagementForm({ editingService, setEditingService, onSuccess }: Props) {
  const [activeTab, setActiveTab] = useState<'basic' | 'overview' | 'packages' | 'roadmap'>('basic');
  const form = useServiceForm(editingService, setEditingService, onSuccess);

  return (
    <div className="max-w-6xl mx-auto bg-[#112240] p-6 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-[#C5A16F]/20 shadow-2xl transition-all duration-500 mb-20">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-pharaohGold rounded-full" />
          <h4 id="form-mode-title" className="text-xl font-bold text-white">
            {editingService ? "تعديل محتوى وتفاصيل الخدمة 𓂀" : "تنصيب بند خدمة جديد مع صفحة التفاصيل 𓂀"}
          </h4>
        </div>
        <button 
          type="button" 
          id="cancel-edit-btn" 
          onClick={() => setEditingService(null)}
          className={`${editingService ? "block" : "hidden"} text-xs text-red-400 hover:text-red-500 border border-red-500/20 px-3 py-1 rounded-lg bg-red-500/5 transition`}
        >
          إلغاء التعديل
        </button>
      </div>

      {/* Form Section Tabs */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto custom-scrollbar pb-3 mb-6">
        {[
          { id: 'basic', label: '1. الأساسيات والهيرو (Basic & Hero)' },
          { id: 'overview', label: '2. النظرة العامة والمميزات (Overview & Features)' },
          { id: 'packages', label: '3. باقات التسعير (Pricing Packages)' },
          { id: 'roadmap', label: '4. خطوات ومراحل العمل (Work Roadmap)' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form id="pharaoh-adv-service-form" className="space-y-6" onSubmit={form.handleSubmit} encType="multipart/form-data">
        <input type="hidden" id="editing-service-id" value={editingService?.id || ""} />

        {/* TAB 1: BASIC & HERO */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <ServiceFormBasicInputs
              title={form.title} setTitle={form.setTitle}
              titleEn={form.titleEn} setTitleEn={form.setTitleEn}
              type={form.type} setType={form.setType}
              typeCustom={form.typeCustom} setTypeCustom={form.setTypeCustom}
              price={form.price} setPrice={form.setPrice}
              badge={form.badge} setBadge={form.setBadge}
              imageFile={form.imageFile} imageUrl={form.imageUrl}
              handleFileChange={form.handleFileChange}
              btnText={form.btnText} setBtnText={form.setBtnText}
              svg={form.svg} setSvg={form.setSvg}
            />

            <ServiceFormDescriptions
              desc={form.desc} setDesc={form.setDesc}
              descEn={form.descEn} setDescEn={form.setDescEn}
              loading={form.loading} editingService={editingService}
            />

            <ServiceFormHeroFields
              heroSubtitleAr={form.tpl.heroSubtitleAr} setHeroSubtitleAr={v => form.setTplField('heroSubtitleAr', v)}
              heroSubtitleEn={form.tpl.heroSubtitleEn} setHeroSubtitleEn={v => form.setTplField('heroSubtitleEn', v)}
              heroTitle2Ar={form.tpl.heroTitle2Ar} setHeroTitle2Ar={v => form.setTplField('heroTitle2Ar', v)}
              heroTitle2En={form.tpl.heroTitle2En} setHeroTitle2En={v => form.setTplField('heroTitle2En', v)}
            />
          </div>
        )}

        {/* TAB 2: OVERVIEW & FEATURES */}
        {activeTab === 'overview' && (
          <ServiceFormOverviewTab
            overviewTitleAr={form.tpl.overviewTitleAr} setOverviewTitleAr={v => form.setTplField('overviewTitleAr', v)}
            overviewTitleEn={form.tpl.overviewTitleEn} setOverviewTitleEn={v => form.setTplField('overviewTitleEn', v)}
            overviewDescAr={form.tpl.overviewDescAr} setOverviewDescAr={v => form.setTplField('overviewDescAr', v)}
            overviewDescEn={form.tpl.overviewDescEn} setOverviewDescEn={v => form.setTplField('overviewDescEn', v)}
            features={form.features} setFeatures={form.setFeatures}
          />
        )}

        {/* TAB 3: PACKAGES & PRICING */}
        {activeTab === 'packages' && (
          <ServiceFormPackagesTab
            packagesTitleAr={form.tpl.packagesTitleAr} setPackagesTitleAr={v => form.setTplField('packagesTitleAr', v)}
            packagesTitleEn={form.tpl.packagesTitleEn} setPackagesTitleEn={v => form.setTplField('packagesTitleEn', v)}
            packages={form.packages} setPackages={form.setPackages}
          />
        )}

        {/* TAB 4: ROADMAP STEPS */}
        {activeTab === 'roadmap' && (
          <ServiceFormRoadmapTab
            roadmapSteps={form.roadmapSteps} setRoadmapSteps={form.setRoadmapSteps}
          />
        )}

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={form.loading}
            className="bg-pharaohGold text-[#0A192F] px-10 py-4 rounded-xl font-black text-sm hover:bg-white transition-all shadow-xl disabled:opacity-50"
          >
            {form.loading ? 'جاري التنصيب والحفظ...' : 'حفظ التغيرات ونشر تفاصيل الخدمة'}
          </button>
        </div>
      </form>
    </div>
  );
}
