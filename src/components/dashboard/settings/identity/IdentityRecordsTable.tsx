'use client';
import { IdentityFormData } from '../SettingsIdentityForm';

interface IdentityRecordsTableProps {
  formData: IdentityFormData;
}

export function IdentityRecordsTable({ formData }: IdentityRecordsTableProps) {
  return (
    <div className="bg-white dark:bg-[#112240]/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 lg:p-8 shadow-xs">
      <h4 className="text-sm font-bold text-amber-800 dark:text-pharaohGold mb-4">السجلات المحفوظة الحالية لهوية المنصة</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm text-slate-600 dark:text-gray-400">
          <thead className="text-xs uppercase bg-slate-100 dark:bg-[#0A192F] text-amber-800 dark:text-pharaohGold font-bold border-b border-slate-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-4">اسم المنصة</th>
              <th className="px-6 py-4">العنوان الوصفي</th>
              <th className="px-6 py-4">الكلمات الدلالية</th>
              <th className="px-6 py-4 text-center">التحكم والتعديل</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
              <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                <div>{formData.name}</div>
                {formData.name_en && <div className="text-xs text-amber-800 dark:text-pharaohGold/80" dir="ltr">{formData.name_en}</div>}
              </td>
              <td className="px-6 py-4">
                <div>{formData.title}</div>
                {formData.title_en && <div className="text-xs text-amber-800 dark:text-pharaohGold/80" dir="ltr">{formData.title_en}</div>}
              </td>
              <td className="px-6 py-4 truncate max-w-[200px] text-slate-700 dark:text-gray-300">{formData.keywords}</td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-800 dark:text-pharaohGold bg-amber-500/10 dark:bg-pharaohGold/10 px-3 py-1 rounded-full border border-amber-500/20 dark:border-pharaohGold/20 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>السجل النشط</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
