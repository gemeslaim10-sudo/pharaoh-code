'use client';

interface AddAdminFormProps {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddAdminForm({ email, setEmail, loading, onSubmit }: AddAdminFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <p className="text-gray-400 text-xs leading-relaxed">
        قم بإضافة البريد الإلكتروني للشخص الذي ترغب في منحه صلاحيات إدارة لوحة التحكم. يمكنه الدخول مباشرة بحسابه على جوجل دون الحاجة لإنشاء حساب جديد.
      </p>
      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2">البريد الإلكتروني (Gmail)</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition"
        />
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'جاري الإضافة...' : 'إضافة مشرف'}
        </button>
      </div>
    </form>
  );
}
