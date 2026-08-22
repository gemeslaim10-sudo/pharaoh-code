'use client';

interface UserProfileModalAvatarProps {
  user: {
    photoURL?: string | null;
  };
  displayName: string;
  userInitial: string;
  email: string;
  isAdmin: boolean;
  isLight: boolean;
  language: string;
}

export function UserProfileModalAvatar({
  user,
  displayName,
  userInitial,
  email,
  isAdmin,
  isLight,
  language,
}: UserProfileModalAvatarProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative group/avatar mb-4">
        {/* Pulsing Aura */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] blur-md opacity-40 group-hover/avatar:opacity-80 transition-opacity duration-500 pointer-events-none" />

        {/* Double Gold Ring Frame */}
        <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] shadow-xl">
          <div className={`w-full h-full rounded-full p-1 overflow-hidden flex items-center justify-center ${
            isLight ? 'bg-white' : 'bg-[#0F2338]'
          }`}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-3xl font-serif font-black text-[#C5A16F] select-none">
                {userInitial}
              </span>
            )}
          </div>
        </div>

        {/* Status Indicator Badge */}
        <span className="absolute bottom-1 end-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0A192F] shadow-md" title="Active" />
      </div>

      {/* Centered User Display Name */}
      <h3 className={`text-xl sm:text-2xl font-black tracking-tight text-center max-w-full truncate ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}>
        {displayName}
      </h3>

      {/* Centered Email with verified badge */}
      <div className={`flex items-center justify-center gap-1.5 text-xs font-semibold mt-1 max-w-full truncate ${
        isLight ? 'text-slate-600' : 'text-gray-300'
      }`}>
        <svg className="w-3.5 h-3.5 text-[#C5A16F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="truncate dir-ltr">{email}</span>
      </div>

      {/* Role Capsule Tag */}
      <div className="mt-3">
        {isAdmin ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#C5A16F]/20 via-[#DFB77D]/25 to-[#C5A16F]/20 text-[#8A5800] dark:text-[#C5A16F] border border-[#C5A16F]/40 shadow-sm">
            <span>👑</span>
            <span>{language === 'ar' ? 'مدير النظام (Admin)' : 'Administrator'}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20">
            <span>✦</span>
            <span>{language === 'ar' ? 'عضو مميز' : 'Member'}</span>
          </span>
        )}
      </div>
    </div>
  );
}
