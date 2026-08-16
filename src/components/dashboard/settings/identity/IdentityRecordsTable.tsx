'use client';
import { IdentityFormData } from '../SettingsIdentityForm';

interface IdentityRecordsTableProps {
  formData: IdentityFormData;
}

export function IdentityRecordsTable({ formData }: IdentityRecordsTableProps) {
  return (
    <div className="bg-[#112240]/40 border border-white/5 rounded-3xl p-6 lg:p-8">
      <h4 className="text-sm font-bold text-pharaohGold mb-4">📜 السجلات المحفوظة الحالية لهوية المنصة</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm text-gray-400">
          <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10">
            <tr>
              <th className="px-6 py-4">اسم المنصة</th>
              <th className="px-6 py-4">العنوان الوصفي</th>
              <th className="px-6 py-4">الكلمات الدلالية</th>
              <th className="px-6 py-4 text-center">التحكم والتعديل</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 hover:bg-white/5 transition">
              <td className="px-6 py-4 font-bold text-white">
                <div>{formData.name}</div>
                {formData.name_en && <div className="text-xs text-pharaohGold/80" dir="ltr">{formData.name_en}</div>}
              </td>
              <td className="px-6 py-4">
                <div>{formData.title}</div>
                {formData.title_en && <div className="text-xs text-pharaohGold/80" dir="ltr">{formData.title_en}</div>}
              </td>
              <td className="px-6 py-4 truncate max-w-[200px]">{formData.keywords}</td>
              <td className="px-6 py-4 text-center">
                <span className="text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1 rounded-full">السجل النشط 🟢</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
