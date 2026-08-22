'use client';

interface UserProfileModalDetailsProps {
  memberSince: string;
  isLight: boolean;
  language: string;
}

export function UserProfileModalDetails({
  memberSince,
  isLight,
  language,
}: UserProfileModalDetailsProps) {
  return (
    <div className={`mt-6 p-4 rounded-2xl border text-xs grid grid-cols-2 gap-3 text-center ${
      isLight
        ? 'bg-slate-50 border-slate-200'
        : 'bg-white/[0.03] border-white/10'
    }`}>
      <div>
        <span className={`block text-[10px] font-bold uppercase mb-0.5 ${
          isLight ? 'text-slate-600' : 'text-gray-400'
        }`}>
          {language === 'ar' ? 'تاريخ الانضمام' : 'Member Since'}
        </span>
        <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-gray-200'}`}>
          {memberSince}
        </span>
      </div>

      <div>
        <span className={`block text-[10px] font-bold uppercase mb-0.5 ${
          isLight ? 'text-slate-600' : 'text-gray-400'
        }`}>
          {language === 'ar' ? 'حالة الحساب' : 'Account Status'}
        </span>
        <span className="font-bold text-emerald-500 flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {language === 'ar' ? 'نشط وموثق' : 'Verified'}
        </span>
      </div>
    </div>
  );
}
