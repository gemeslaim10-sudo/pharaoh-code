'use client';
import { AboutFormData } from './aboutDashboardTypes';

interface AboutTabPhilosophyProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

export function AboutTabPhilosophy({ form, setForm }: AboutTabPhilosophyProps) {
  const updatePhilItem = (idx: number, field: string, value: string) => {
    const items = [...(form.philosophy.items || [])];
    const current = items[idx] || { title_ar: '', title_en: '', description_ar: '', description_en: '' };
    items[idx] = { ...current, [field]: value };
    setForm(prev => ({ ...prev, philosophy: { ...prev.philosophy, items } }));
  };

  return (
    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
      <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">فلسفة التشييد الرقمي (Philosophy)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
          <input
            type="text"
            placeholder="كيف نفكر"
            value={form.philosophy.subtitle_ar || ''}
            onChange={(e) => setForm(prev => ({ ...prev, philosophy: { ...prev.philosophy, subtitle_ar: e.target.value } }))}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">Subtitle (English)</label>
          <input
            type="text"
            placeholder="HOW WE THINK"
            value={form.philosophy.subtitle_en || ''}
            onChange={(e) => setForm(prev => ({ ...prev, philosophy: { ...prev.philosophy, subtitle_en: e.target.value } }))}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
            dir="ltr"
          />
        </div>
      </div>

      <div className="space-y-6 border-t border-white/10 pt-6">
        <h3 className="text-md font-bold text-white">بطاقات الفلسفة الثلاث (3 Cards)</h3>

        {form.philosophy.items?.map((item, idx) => (
          <div key={idx} className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-pharaohGold">البطاقة رقم {idx + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
                <input
                  type="text"
                  placeholder={idx === 0 ? 'التحليل العميق' : idx === 1 ? 'كود لا يصدأ' : 'السيادة التقنية'}
                  value={item.title_ar || ''}
                  onChange={(e) => updatePhilItem(idx, 'title_ar', e.target.value)}
                  className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
                <input
                  type="text"
                  placeholder={idx === 0 ? 'Deep Analysis' : idx === 1 ? 'Stainless Code' : 'Technical Dominance'}
                  value={item.title_en || ''}
                  onChange={(e) => updatePhilItem(idx, 'title_en', e.target.value)}
                  className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
                <textarea
                  rows={2}
                  placeholder="نبدأ بدراسة فكرتك كأنها أساس لمعبد..."
                  value={item.description_ar || ''}
                  onChange={(e) => updatePhilItem(idx, 'description_ar', e.target.value)}
                  className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  placeholder="We study your idea as a temple foundation..."
                  value={item.description_en || ''}
                  onChange={(e) => updatePhilItem(idx, 'description_en', e.target.value)}
                  className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
