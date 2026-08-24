'use client';
import { TechStackFormData } from '@/types/techStack';

interface TechStackFeaturePointsProps {
  form: TechStackFormData;
  setForm: React.Dispatch<React.SetStateAction<TechStackFormData>>;
}

export function TechStackFeaturePoints({ form, setForm }: TechStackFeaturePointsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-white/10">
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">النقطة الأولى (Clean Architecture)</label>
        <input
          type="text"
          placeholder="الاعتماد على Clean Architecture"
          value={form.cleanArch_ar || ''}
          onChange={(e) => setForm({ ...form, cleanArch_ar: e.target.value })}
          className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none mb-2 placeholder:text-slate-400 dark:placeholder:text-gray-600"
        />
        <input
          type="text"
          placeholder="Clean Architecture Engineering"
          value={form.cleanArch_en || ''}
          onChange={(e) => setForm({ ...form, cleanArch_en: e.target.value })}
          className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          dir="ltr"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">النقطة الثانية (AES Encryption)</label>
        <input
          type="text"
          placeholder="تشفير البيانات بمعايير AES-256"
          value={form.aesEncrypt_ar || ''}
          onChange={(e) => setForm({ ...form, aesEncrypt_ar: e.target.value })}
          className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none mb-2 placeholder:text-slate-400 dark:placeholder:text-gray-600"
        />
        <input
          type="text"
          placeholder="AES-256 Military Grade Encryption"
          value={form.aesEncrypt_en || ''}
          onChange={(e) => setForm({ ...form, aesEncrypt_en: e.target.value })}
          className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          dir="ltr"
        />
      </div>
    </div>
  );
}
