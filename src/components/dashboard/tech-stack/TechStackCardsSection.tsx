'use client';
import { TechStackFormData } from './TechStackHeaderFields';

const DEFAULT_TITLES = [
  'الأنظمة الخلفية', 'تطبيقات الجوال', 'قواعد البيانات',
  'السحابية (Cloud)', 'واجهات المستخدم', 'الأمن السيبراني'
];
const DEFAULT_TITLES_EN = [
  'Backend Systems', 'Mobile Applications', 'Databases & Storage',
  'Cloud Infrastructure', 'Frontend & UI/UX', 'Cybersecurity'
];

interface TechStackCardsSectionProps {
  form: TechStackFormData;
  setForm: React.Dispatch<React.SetStateAction<TechStackFormData>>;
}

export function TechStackCardsSection({ form, setForm }: TechStackCardsSectionProps) {
  return (
    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
      <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">بطاقات التقنيات الست (6 Tech Cards)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {form.cards?.map((card, idx) => (
          <div key={idx} className="bg-[#0A192F] p-5 rounded-xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-pharaohGold">البطاقة {idx + 1}: {DEFAULT_TITLES[idx]}</h3>
              <span className="text-xs text-gray-400">{DEFAULT_TITLES_EN[idx]}</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
                <input
                  type="text"
                  placeholder={DEFAULT_TITLES[idx]}
                  value={card.title_ar || ''}
                  onChange={(e) => {
                    const cards = [...(form.cards || [])];
                    cards[idx] = { ...cards[idx], title_ar: e.target.value };
                    setForm({ ...form, cards });
                  }}
                  className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
                <input
                  type="text"
                  placeholder={DEFAULT_TITLES_EN[idx]}
                  value={card.title_en || ''}
                  onChange={(e) => {
                    const cards = [...(form.cards || [])];
                    cards[idx] = { ...cards[idx], title_en: e.target.value };
                    setForm({ ...form, cards });
                  }}
                  className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
                <textarea
                  rows={2}
                  placeholder="وصف التقنيات والتفاصيل..."
                  value={card.desc_ar || card.description_ar || ''}
                  onChange={(e) => {
                    const cards = [...(form.cards || [])];
                    cards[idx] = { ...cards[idx], desc_ar: e.target.value, description_ar: e.target.value };
                    setForm({ ...form, cards });
                  }}
                  className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  placeholder="Tech stack details..."
                  value={card.desc_en || card.description_en || ''}
                  onChange={(e) => {
                    const cards = [...(form.cards || [])];
                    cards[idx] = { ...cards[idx], desc_en: e.target.value, description_en: e.target.value };
                    setForm({ ...form, cards });
                  }}
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
