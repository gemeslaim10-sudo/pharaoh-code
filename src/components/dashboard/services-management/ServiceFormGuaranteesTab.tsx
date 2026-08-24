'use client';
import { useState } from 'react';
import { GuaranteeItem } from './serviceFormTypes';

interface ServiceFormGuaranteesTabProps {
  addedValueTitleAr: string;
  setAddedValueTitleAr: (val: string) => void;
  addedValueTitleEn: string;
  setAddedValueTitleEn: (val: string) => void;
  addedValueSubtitleAr: string;
  setAddedValueSubtitleAr: (val: string) => void;
  addedValueSubtitleEn: string;
  setAddedValueSubtitleEn: (val: string) => void;
  guarantees: GuaranteeItem[];
  setGuarantees: (items: GuaranteeItem[]) => void;
  addGuarantee?: () => void;
  removeGuarantee?: (idx: number) => void;
}

const EMOJI_PRESETS = ['💎', '✨', '🗺️', '🛡️', '⚡', '🚀', '🎯', '🤝', '🔒', '🏆', '⭐', '🌟'];

export function ServiceFormGuaranteesTab({
  addedValueTitleAr,
  setAddedValueTitleAr,
  addedValueTitleEn,
  setAddedValueTitleEn,
  addedValueSubtitleAr,
  setAddedValueSubtitleAr,
  addedValueSubtitleEn,
  setAddedValueSubtitleEn,
  guarantees,
  setGuarantees,
  addGuarantee,
  removeGuarantee,
}: ServiceFormGuaranteesTabProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const updateItem = (idx: number, field: keyof GuaranteeItem, value: string) => {
    const newItems = [...guarantees];
    newItems[idx] = { ...newItems[idx], [field]: value };
    setGuarantees(newItems);
  };

  const handleAdd = () => {
    if (addGuarantee) {
      addGuarantee();
      setActiveIdx(guarantees.length);
    } else {
      setGuarantees([...guarantees, { icon: '✨', title_ar: '', title_en: '', desc_ar: '', desc_en: '' }]);
      setActiveIdx(guarantees.length);
    }
  };

  const handleRemove = (idx: number) => {
    if (guarantees.length <= 1) {
      alert('يجب الإبقاء على بند ضمان وقيمة مضافة واحد على الأقل');
      return;
    }
    if (removeGuarantee) {
      removeGuarantee(idx);
    } else {
      setGuarantees(guarantees.filter((_, i) => i !== idx));
    }
    if (activeIdx >= guarantees.length - 1) {
      setActiveIdx(Math.max(0, guarantees.length - 2));
    }
  };

  const renderCard = (item: GuaranteeItem, idx: number) => (
    <div key={idx} className="bg-white dark:bg-[#112240] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-sm">
            {item.icon || '💎'}
          </span>
          <h6 className="text-xs font-bold text-slate-900 dark:text-white">
            {item.title_ar || `بند القيمة والضمان #${idx + 1}`}
          </h6>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono" dir="ltr">
            {item.title_en || `Advantage ${idx + 1}`}
          </span>
          {guarantees.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-xs font-bold text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>🗑️</span>
              <span>حذف</span>
            </button>
          )}
        </div>
      </div>

      {/* Icon / Emoji Selection */}
      <div className="bg-slate-50 dark:bg-[#0A192F] p-3 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
        <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300">
          الأيقونة أو الإيموجي (Icon / Emoji)
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            maxLength={10}
            placeholder="✨"
            value={item.icon || ''}
            onChange={e => updateItem(idx, 'icon', e.target.value)}
            className="w-16 text-center bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none"
          />
          <div className="flex items-center gap-1 flex-wrap">
            {EMOJI_PRESETS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => updateItem(idx, 'icon', emoji)}
                className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all cursor-pointer ${
                  item.icon === emoji
                    ? 'bg-amber-500/20 dark:bg-pharaohGold/30 border border-amber-500 dark:border-pharaohGold scale-110'
                    : 'bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/5 hover:border-amber-400'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
              <span>🇸🇦</span>
              <span>المحتوى بالعربية</span>
            </span>
            <span className="text-[10px] text-slate-400">RTL</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">عنوان البند (عربي)</label>
            <input
              type="text"
              maxLength={80}
              placeholder="مثال: تحليل وتخطيط متكامل"
              value={item.title_ar || ''}
              onChange={e => updateItem(idx, 'title_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">شرح البند (عربي)</label>
            <textarea
              rows={3}
              maxLength={200}
              placeholder="جلسة تحليل تفصيلية لتحديد المتطلبات الدقيقة ورسم خطة التنفيذ المثالية..."
              value={item.desc_ar || ''}
              onChange={e => updateItem(idx, 'desc_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* English Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span>🇬🇧</span>
              <span>English Content</span>
            </span>
            <span className="text-[10px] text-slate-400">LTR</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Item Title (English)</label>
            <input
              type="text"
              maxLength={80}
              placeholder="e.g. Comprehensive Discovery & Strategy"
              value={item.title_en || ''}
              onChange={e => updateItem(idx, 'title_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Item Description (English)</label>
            <textarea
              rows={3}
              maxLength={200}
              placeholder="Detailed discovery session to specify requirements and timeline..."
              value={item.desc_en || ''}
              onChange={e => updateItem(idx, 'desc_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Panel 1: Added Value Header & Intro */}
      <div className="bg-slate-50 dark:bg-[#0A192F] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-5 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-3">
          <h5 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-amber-800 dark:text-pharaohGold text-lg">💎</span>
            <span>القيمة المضافة والضمان (Added Value & Guarantee CMS)</span>
          </h5>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
            تخصيص بطاقة الضمان والقيمة المضافة الجانبية في صفحة تفاصيل هذه الخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arabic Header */}
          <div className="bg-white dark:bg-[#112240] p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
                <span>🇸🇦</span>
                <span>العنوان والمقدمة بالعربية</span>
              </span>
              <span className="text-[10px] text-slate-400">RTL</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">عنوان بطاقة الضمان (عربي)</label>
              <input
                type="text"
                maxLength={60}
                placeholder="القيمة المضافة والضمان"
                value={addedValueTitleAr}
                onChange={e => setAddedValueTitleAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">النص التمهيدي / المقدمة (عربي)</label>
              <textarea
                rows={3}
                maxLength={250}
                placeholder="الحصول على هذه الخدمة يشمل مزايا واعدة موجهة لضمان نجاح مشروعك:"
                value={addedValueSubtitleAr}
                onChange={e => setAddedValueSubtitleAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* English Header */}
          <div className="bg-white dark:bg-[#112240] p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <span>🇬🇧</span>
                <span>English Header & Intro</span>
              </span>
              <span className="text-[10px] text-slate-400">LTR</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Guarantee Card Title (English)</label>
              <input
                type="text"
                maxLength={60}
                placeholder="Added Value & Guarantee"
                value={addedValueTitleEn}
                onChange={e => setAddedValueTitleEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Introductory Text (English)</label>
              <textarea
                rows={3}
                maxLength={250}
                placeholder="Ordering this service includes guaranteed advantages:"
                value={addedValueSubtitleEn}
                onChange={e => setAddedValueSubtitleEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Dynamic Guarantees List */}
      <div className="bg-slate-50 dark:bg-[#0A192F] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h5 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-amber-800 dark:text-pharaohGold text-lg">✨</span>
              <span>بنود ومزايا الضمان ({guarantees.length} Advantage Items)</span>
            </h5>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">البنود الفردية التي تظهر داخل كارد القيمة المضافة والضمان.</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <button
              type="button"
              onClick={handleAdd}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 dark:bg-pharaohGold/20 text-amber-900 dark:text-pharaohGold border border-amber-500/30 dark:border-pharaohGold/30 hover:bg-amber-500/25 dark:hover:bg-pharaohGold/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>➕</span>
              <span>إضافة بند ضمان</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-[#112240] p-1 rounded-xl border border-slate-300 dark:border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('tabs')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'tabs'
                    ? 'bg-amber-800 dark:bg-pharaohGold text-white dark:text-[#0A192F] shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                عرض بالتبويبات
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-amber-800 dark:bg-pharaohGold text-white dark:text-[#0A192F] shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                عرض الكل
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'tabs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {guarantees?.map((item, idx) => {
                const isActive = activeIdx === idx;
                const title = item.title_ar || `بند الضمان ${idx + 1}`;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/15 dark:bg-[#112240] border-amber-500 dark:border-pharaohGold text-slate-900 dark:text-white shadow-md'
                        : 'bg-white dark:bg-[#112240]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-amber-500/40 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/15 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs shrink-0">
                        {item.icon || (idx + 1 < 10 ? `0${idx + 1}` : idx + 1)}
                      </span>
                      <span className="text-xs font-bold truncate">{title}</span>
                    </div>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-amber-600 dark:bg-pharaohGold' : 'bg-transparent'}`} />
                  </button>
                );
              })}
            </div>

            {guarantees[activeIdx] && renderCard(guarantees[activeIdx], activeIdx)}
          </div>
        )}

        {viewMode === 'all' && (
          <div className="space-y-4">
            {guarantees?.map((item, idx) => renderCard(item, idx))}
          </div>
        )}
      </div>
    </div>
  );
}
