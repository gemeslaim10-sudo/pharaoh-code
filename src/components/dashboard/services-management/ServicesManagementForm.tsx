'use client';

import { useState } from 'react';
import ServiceFormBasicInputs from './ServiceFormBasicInputs';
import ServiceFormDescriptions from './ServiceFormDescriptions';
import { useServiceForm } from './useServiceForm';

interface Props {
    editingService: any;
    setEditingService: (service: any) => void;
    onSuccess: () => void;
}

export default function ServicesManagementForm({ editingService, setEditingService, onSuccess }: Props) {
    const [activeTab, setActiveTab] = useState<'basic' | 'overview' | 'packages' | 'roadmap'>('basic');

    const form = useServiceForm(editingService, setEditingService, onSuccess);

    return (
        <div className="max-w-6xl mx-auto bg-[#112240] p-6 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-[#C5A16F]/20 shadow-2xl transition-all duration-500 mb-20">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
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
                <button
                    type="button"
                    onClick={() => setActiveTab('basic')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'basic' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    1. الأساسيات والهيرو (Basic & Hero)
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    2. النظرة العامة والمميزات (Overview & Features)
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('packages')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'packages' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    3. باقات التسعير (Pricing Packages)
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('roadmap')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'roadmap' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    4. خطوات ومراحل العمل (Work Roadmap)
                </button>
            </div>

            <form id="pharaoh-adv-service-form" className="space-y-6" onSubmit={form.handleSubmit} encType="multipart/form-data">
                <input type="hidden" id="editing-service-id" value={editingService?.id || ""} />

                {/* TAB 1: BASIC & HERO */}
                {activeTab === 'basic' && (
                    <div className="space-y-6">
                        <ServiceFormBasicInputs
                            title={form.title}
                            setTitle={form.setTitle}
                            titleEn={form.titleEn}
                            setTitleEn={form.setTitleEn}
                            type={form.type}
                            setType={form.setType}
                            typeCustom={form.typeCustom}
                            setTypeCustom={form.setTypeCustom}
                            price={form.price}
                            setPrice={form.setPrice}
                            badge={form.badge}
                            setBadge={form.setBadge}
                            imageFile={form.imageFile}
                            imageUrl={form.imageUrl}
                            handleFileChange={form.handleFileChange}
                            btnText={form.btnText}
                            setBtnText={form.setBtnText}
                            svg={form.svg}
                            setSvg={form.setSvg}
                        />

                        <ServiceFormDescriptions
                            desc={form.desc}
                            setDesc={form.setDesc}
                            descEn={form.descEn}
                            setDescEn={form.setDescEn}
                            loading={form.loading}
                            editingService={editingService}
                        />

                        {/* Extra Hero Header Controls */}
                        <div className="bg-[#0A192F] p-5 rounded-2xl border border-white/10 space-y-4 pt-4">
                            <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">تفاصيل عنوان قسم الهيرو في صفحة الخدمة (Hero Header Details)</h5>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">العنوان الفرعي الهيرو (عربي)</label>
                                    <input type="text" maxLength={120} placeholder="هندسة البرمجيات والتطبيقات" value={form.heroSubtitleAr} onChange={e => form.setHeroSubtitleAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Hero Subtitle (English)</label>
                                    <input type="text" maxLength={120} placeholder="Software & Application Engineering" value={form.heroSubtitleEn} onChange={e => form.setHeroSubtitleEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">العنوان الهيرو - الجزء الذهبي (عربي)</label>
                                    <input type="text" maxLength={60} placeholder="بوابتك الرقمية الأقوى" value={form.heroTitle2Ar} onChange={e => form.setHeroTitle2Ar(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Hero Title Part 2 (English)</label>
                                    <input type="text" maxLength={60} placeholder="Your Strongest Digital Gateway" value={form.heroTitle2En} onChange={e => form.setHeroTitle2En(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: OVERVIEW & FEATURES */}
                {activeTab === 'overview' && (
                    <div className="bg-[#0A192F] p-6 rounded-2xl border border-white/10 space-y-6">
                        <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">قسم النظرة العامة والمميزات الثلاث (Overview & Features)</h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">عنوان القسم العلوي (عربي)</label>
                                <input type="text" maxLength={60} placeholder="نظرة عامة على الخدمة الفنية" value={form.overviewTitleAr} onChange={e => form.setOverviewTitleAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">Overview Section Title (English)</label>
                                <input type="text" maxLength={60} placeholder="Technical Service Overview" value={form.overviewTitleEn} onChange={e => form.setOverviewTitleEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">فقرة النظرة العامة (عربي)</label>
                                <textarea rows={3} maxLength={250} placeholder="نحن لا نعتمد على حلول مستهلكة؛ بل نعتمد على هندسة أكواد مخصصة..." value={form.overviewDescAr} onChange={e => form.setOverviewDescAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">Overview Description (English)</label>
                                <textarea rows={3} maxLength={250} placeholder="We engineer custom, high-performance software code..." value={form.overviewDescEn} onChange={e => form.setOverviewDescEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white resize-none" dir="ltr" />
                            </div>
                        </div>

                        {/* 3 Features list */}
                        <div className="space-y-4 border-t border-white/10 pt-4">
                            <h6 className="text-xs font-bold text-white">المميزات الرئيسية الثلاث (3 Features)</h6>
                            {form.features?.map((feat: any, idx: number) => (
                                <div key={idx} className="bg-[#112240] p-4 rounded-xl border border-white/10 space-y-3">
                                    <h6 className="text-xs font-bold text-pharaohGold">الميزة رقم {idx + 1}</h6>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input type="text" maxLength={50} placeholder="عنوان الميزة (عربي)" value={feat.title_ar || ''} onChange={e => {
                                                const newF = [...form.features];
                                                newF[idx] = { ...newF[idx], title_ar: e.target.value };
                                                form.setFeatures(newF);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
                                        </div>
                                        <div>
                                            <input type="text" maxLength={50} placeholder="Feature Title (English)" value={feat.title_en || ''} onChange={e => {
                                                const newF = [...form.features];
                                                newF[idx] = { ...newF[idx], title_en: e.target.value };
                                                form.setFeatures(newF);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" dir="ltr" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input type="text" maxLength={150} placeholder="شرح الميزة (عربي)" value={feat.desc_ar || ''} onChange={e => {
                                                const newF = [...form.features];
                                                newF[idx] = { ...newF[idx], desc_ar: e.target.value };
                                                form.setFeatures(newF);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
                                        </div>
                                        <div>
                                            <input type="text" maxLength={150} placeholder="Feature Desc (English)" value={feat.desc_en || ''} onChange={e => {
                                                const newF = [...form.features];
                                                newF[idx] = { ...newF[idx], desc_en: e.target.value };
                                                form.setFeatures(newF);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" dir="ltr" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 3: PACKAGES & PRICING */}
                {activeTab === 'packages' && (
                    <div className="bg-[#0A192F] p-6 rounded-2xl border border-white/10 space-y-6">
                        <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">باقات التسعير الثلاث (3 Packages & Pricing)</h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">عنوان قسم الباقات (عربي)</label>
                                <input type="text" placeholder="باقات استثمار الخدمة" value={form.packagesTitleAr || ''} onChange={e => form.setPackagesTitleAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">Packages Section Title (English)</label>
                                <input type="text" placeholder="Service Investment Packages" value={form.packagesTitleEn || ''} onChange={e => form.setPackagesTitleEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
                            </div>
                        </div>

                        {/* 3 Packages */}
                        <div className="space-y-6">
                            {form.packages?.map((pkg: any, idx: number) => (
                                <div key={idx} className="bg-[#112240] p-4 md:p-5 rounded-xl border border-white/10 space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <h6 className="text-xs font-bold text-pharaohGold">الباقة رقم {idx + 1} {idx === 1 ? '(الأكثر طلباً)' : ''}</h6>
                                        <label className="flex items-center gap-2 text-xs text-gray-300">
                                            <input type="checkbox" checked={pkg.isPopular || false} onChange={e => {
                                                const newP = [...form.packages];
                                                newP[idx] = { ...newP[idx], isPopular: e.target.checked };
                                                form.setPackages(newP);
                                            }} />
                                            تميز كأكثر مبيعاً
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-[11px] text-gray-400 mb-1">اسم الباقة (عربي)</label>
                                            <input type="text" maxLength={50} placeholder="مثال: الباقة التعريفية" value={pkg.title_ar || ''} onChange={e => {
                                                const newP = [...form.packages];
                                                newP[idx] = { ...newP[idx], title_ar: e.target.value };
                                                form.setPackages(newP);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-gray-400 mb-1">Package Title (English)</label>
                                            <input type="text" maxLength={50} placeholder="e.g. Starter Package" value={pkg.title_en || ''} onChange={e => {
                                                const newP = [...form.packages];
                                                newP[idx] = { ...newP[idx], title_en: e.target.value };
                                                form.setPackages(newP);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" dir="ltr" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-gray-400 mb-1">السعر (e.g. 45,000 ج.م)</label>
                                            <input type="text" maxLength={30} placeholder="45,000 ج.م" value={pkg.price || ''} onChange={e => {
                                                const newP = [...form.packages];
                                                newP[idx] = { ...newP[idx], price: e.target.value };
                                                form.setPackages(newP);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] text-gray-400 mb-1">شرح الباقة (عربي)</label>
                                            <textarea rows={2} maxLength={150} placeholder="شرح مختصر لمحتوى الباقة..." value={pkg.desc_ar || ''} onChange={e => {
                                                const newP = [...form.packages];
                                                newP[idx] = { ...newP[idx], desc_ar: e.target.value };
                                                form.setPackages(newP);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-gray-400 mb-1">Package Desc (English)</label>
                                            <textarea rows={2} maxLength={150} placeholder="Short package summary..." value={pkg.desc_en || ''} onChange={e => {
                                                const newP = [...form.packages];
                                                newP[idx] = { ...newP[idx], desc_en: e.target.value };
                                                form.setPackages(newP);
                                            }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" dir="ltr" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: ROADMAP STEPS */}
                {activeTab === 'roadmap' && (
                    <div className="bg-[#0A192F] p-6 rounded-2xl border border-white/10 space-y-6">
                        <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">خطوات ومراحل العمل الأربعة (4 Roadmap Steps)</h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {form.roadmapSteps?.map((step: any, idx: number) => (
                                <div key={idx} className="bg-[#112240] p-4 rounded-xl border border-white/10 space-y-3">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                                        <span className="text-xs font-bold text-pharaohGold">الخطوة {step.number || `0${idx + 1}`}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <input type="text" maxLength={50} placeholder="عنوان الخطوة (عربي)" value={step.title_ar || ''} onChange={e => {
                                            const newS = [...form.roadmapSteps];
                                            newS[idx] = { ...newS[idx], title_ar: e.target.value };
                                            form.setRoadmapSteps(newS);
                                        }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white" />

                                        <input type="text" maxLength={50} placeholder="Step Title (English)" value={step.title_en || ''} onChange={e => {
                                            const newS = [...form.roadmapSteps];
                                            newS[idx] = { ...newS[idx], title_en: e.target.value };
                                            form.setRoadmapSteps(newS);
                                        }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white" dir="ltr" />

                                        <textarea rows={2} maxLength={150} placeholder="شرح تفصيلي للخطوة (عربي)" value={step.desc_ar || ''} onChange={e => {
                                            const newS = [...form.roadmapSteps];
                                            newS[idx] = { ...newS[idx], desc_ar: e.target.value };
                                            form.setRoadmapSteps(newS);
                                        }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" />

                                        <textarea rows={2} maxLength={150} placeholder="Step Desc (English)" value={step.desc_en || ''} onChange={e => {
                                            const newS = [...form.roadmapSteps];
                                            newS[idx] = { ...newS[idx], desc_en: e.target.value };
                                            form.setRoadmapSteps(newS);
                                        }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" dir="ltr" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
