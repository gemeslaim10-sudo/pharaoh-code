'use client';

interface SocialLinksPreviewTableProps {
  formData: { fb: string; wa: string; ig: string };
}

export function SocialLinksPreviewTable({ formData }: SocialLinksPreviewTableProps) {
  const cleanWa = formData.wa.replace(/[^0-9]/g, '');

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm text-gray-400">
        <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10">
          <tr>
            <th className="px-6 py-4">فيسبوك (Facebook)</th>
            <th className="px-6 py-4">واتساب (WhatsApp)</th>
            <th className="px-6 py-4">انستجرام (Instagram)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5 hover:bg-white/5 transition">
            <td className="px-6 py-4 truncate max-w-[200px]">
              {formData.fb ? (
                <a href={formData.fb} target="_blank" rel="noopener noreferrer" className="text-[#C5A16F] hover:underline">
                  {formData.fb}
                </a>
              ) : (
                'غير محدد'
              )}
            </td>
            <td className="px-6 py-4 truncate max-w-[200px]">
              {formData.wa ? (
                <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer" className="text-[#C5A16F] hover:underline">
                  {formData.wa}
                </a>
              ) : (
                'غير محدد'
              )}
            </td>
            <td className="px-6 py-4 truncate max-w-[200px]">
              {formData.ig ? (
                <a href={formData.ig} target="_blank" rel="noopener noreferrer" className="text-[#C5A16F] hover:underline">
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
