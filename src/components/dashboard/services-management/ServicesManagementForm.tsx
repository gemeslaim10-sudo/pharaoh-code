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
import { ServiceFormGuaranteesTab } from './ServiceFormGuaranteesTab';

interface Props {
  editingService: ServiceItem | null;
  setEditingService: (service: ServiceItem | null) => void;
  onSuccess: () => void;
}

export default function ServicesManagementForm({ editingService, setEditingService, onSuccess }: Props) {
  const [activeTab, setActiveTab] = useState<'basic' | 'overview' | 'packages' | 'roadmap' | 'guarantees'>('basic');
  const form = useServiceForm(editingService, setEditingService, onSuccess);

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-[#112240] p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 hover:border-pharaohGold/30 shadow-md dark:shadow-2xl transition-all duration-500 mb-6">
      {/* Edit Mode Alert Banner */}
      {editingService && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 dark:bg-pharaohGold/15 border border-amber-500/30 dark:border-pharaohGold/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 dark:bg-pharaohGold/20 text-amber-900 dark:text-pharaohGold flex items-center justify-center font-black text-base shrink-0">
              ✏️
            </div>
            <div>
              <p className="text-xs text-amber-800 dark:text-pharaohGold font-bold">أنت الآن في وضع تعديل خدمة قائمة:</p>
              <h5 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {editingService.title || editingService.title_ar || 'خدمة محددة'}
              </h5>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEditingService(null)}
            className="text-xs text-red-600 dark:text-red-400 hover:text-white hover:bg-red-500 border border-red-500/30 px-3.5 py-1.5 rounded-xl bg-red-500/10 transition-all font-bold cursor-pointer shrink-0"
          >
            ✕ إلغاء التعديل والعودة لإضافة خدمة جديدة
          </button>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-pharaohGold rounded-full" />
          <h4 id="form-mode-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {editingService ? "تعديل محتوى وتفاصيل وباقات الخدمة" : "إضافة خدمة جديدة مع صفحة التفاصيل والباقات"}
          </h4>
        </div>
        {editingService && (
          <button 
            type="button" 
            id="cancel-edit-btn" 
            onClick={() => setEditingService(null)}
            className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 border border-red-500/20 px-3 py-1 rounded-lg bg-red-500/5 transition cursor-pointer"
          >
            إلغاء التعديل
          </button>
        )}
      </div>

      {/* Form Section Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 gap-2 overflow-x-auto custom-scrollbar pb-3 mb-6">
        {[
          { id: 'basic', label: '1. الأساسيات والهيرو (Basic & Hero)' },
          { id: 'overview', label: '2. النظرة العامة والمميزات (Overview & Features)' },
          { id: 'packages', label: '3. باقات التسعير الثلاث (Pricing Packages)' },
          { id: 'roadmap', label: '4. مراحل وخطوات العمل (Work Roadmap)' },
          { id: 'guarantees', label: '5. القيمة المضافة والضمانات (Added Value & Guarantees)' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-pharaohGold text-[#0A192F] shadow-sm font-black'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5'
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
            addFeature={form.addFeature} removeFeature={form.removeFeature}
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

        {/* TAB 5: ADDED VALUE & GUARANTEES */}
        {activeTab === 'guarantees' && (
          <ServiceFormGuaranteesTab
            addedValueTitleAr={form.tpl.addedValueTitleAr || ''}
            setAddedValueTitleAr={v => form.setTplField('addedValueTitleAr', v)}
            addedValueTitleEn={form.tpl.addedValueTitleEn || ''}
            setAddedValueTitleEn={v => form.setTplField('addedValueTitleEn', v)}
            addedValueSubtitleAr={form.tpl.addedValueSubtitleAr || ''}
            setAddedValueSubtitleAr={v => form.setTplField('addedValueSubtitleAr', v)}
            addedValueSubtitleEn={form.tpl.addedValueSubtitleEn || ''}
            setAddedValueSubtitleEn={v => form.setTplField('addedValueSubtitleEn', v)}
            guarantees={form.guarantees}
            setGuarantees={form.setGuarantees}
            addGuarantee={form.addGuarantee}
            removeGuarantee={form.removeGuarantee}
          />
        )}

        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          {editingService ? (
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="px-6 py-3.5 rounded-xl border border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all font-bold text-xs cursor-pointer"
            >
              ✕ إلغاء التعديل
            </button>
          ) : <div />}

          <button
            type="submit"
            disabled={form.loading}
            className="bg-pharaohGold text-[#0A192F] px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-black text-xs sm:text-sm hover:bg-white transition-all shadow-xl disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {form.loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0A192F] border-t-transparent rounded-full animate-spin" />
                <span>جاري الحفظ والتثبيت...</span>
              </>
            ) : editingService ? (
              <span>✓ حفظ التعديلات على الخدمة</span>
            ) : (
              <span>+ حفظ ونشر الخدمة الجديدة</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
