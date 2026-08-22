'use client';

interface SocialLinksFormProps {
  formData: { fb: string; wa: string; ig: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function SocialLinksForm({
  formData,
  handleChange,
  loading,
  onSubmit,
}: SocialLinksFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-400 mb-2">رابط فيسبوك (Facebook)</label>
          <input
            type="url"
            id="social-fb"
            value={formData.fb}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pharaohGold transition placeholder:text-slate-400 dark:placeholder:text-gray-600"
            placeholder="https://facebook.com/your-page"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-400 mb-2">رابط / رقم واتساب (WhatsApp)</label>
          <input
            type="text"
            id="social-wa"
            value={formData.wa}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pharaohGold transition placeholder:text-slate-400 dark:placeholder:text-gray-600"
            placeholder="201000000000"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-400 mb-2">رابط انستجرام (Instagram)</label>
          <input
            type="url"
            id="social-ig"
            value={formData.ig}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pharaohGold transition placeholder:text-slate-400 dark:placeholder:text-gray-600"
            placeholder="https://instagram.com/your-account"
            dir="ltr"
          />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'جاري الحفظ...' : 'تحديث وحفظ الروابط'}
        </button>
      </div>
    </form>
  );
}
