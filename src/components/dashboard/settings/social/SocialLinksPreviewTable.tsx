'use client';

interface SocialLinksPreviewTableProps {
  formData: { fb: string; wa: string; ig: string };
}

export function SocialLinksPreviewTable({ formData }: SocialLinksPreviewTableProps) {
  const cleanWa = formData.wa.replace(/[^0-9]/g, '');

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm text-slate-600 dark:text-gray-400">
        <thead className="text-xs uppercase bg-slate-100 dark:bg-[#0A192F] text-amber-800 dark:text-pharaohGold font-bold border-b border-slate-200 dark:border-white/10">
          <tr>
            <th className="px-6 py-4">فيسبوك (Facebook)</th>
            <th className="px-6 py-4">واتساب (WhatsApp)</th>
            <th className="px-6 py-4">انستجرام (Instagram)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
            <td className="px-6 py-4 truncate max-w-[200px]">
              {formData.fb ? (
                <a href={formData.fb} target="_blank" rel="noopener noreferrer" className="text-amber-800 dark:text-pharaohGold hover:underline font-bold">
                  {formData.fb}
                </a>
              ) : (
                'غير محدد'
              )}
            </td>
            <td className="px-6 py-4 truncate max-w-[200px]">
              {formData.wa ? (
                <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer" className="text-amber-800 dark:text-pharaohGold hover:underline font-bold">
                  {formData.wa}
                </a>
              ) : (
                'غير محدد'
              )}
            </td>
            <td className="px-6 py-4 truncate max-w-[200px]">
              {formData.ig ? (
                <a href={formData.ig} target="_blank" rel="noopener noreferrer" className="text-amber-800 dark:text-pharaohGold hover:underline font-bold">
                  {formData.ig}
                </a>
              ) : (
                'غير محدد'
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
