'use client';

const INPUT_CLASS =
  'w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600';

const LABEL_CLASS = 'block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2';

interface BilingualFieldProps {
  /** Arabic label shown above the Arabic input. */
  labelAr: string;
  /** English label (short hint) shown above the English input. */
  labelEn: string;
  valueAr: string;
  valueEn: string;
  onChangeAr: (value: string) => void;
  onChangeEn: (value: string) => void;
  placeholderAr?: string;
  placeholderEn?: string;
  /** Render a textarea instead of a single-line input. */
  multiline?: boolean;
  rows?: number;
}

/** Arabic + English pair of inputs, the convention used across the dashboard. */
export function BilingualField({
  labelAr,
  labelEn,
  valueAr,
  valueEn,
  onChangeAr,
  onChangeEn,
  placeholderAr,
  placeholderEn,
  multiline = false,
  rows = 4,
}: BilingualFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={LABEL_CLASS}>{labelAr}</label>
        {multiline ? (
          <textarea
            rows={rows}
            placeholder={placeholderAr || ''}
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            className={`${INPUT_CLASS} resize-none`}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholderAr || ''}
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            className={INPUT_CLASS}
          />
        )}
      </div>
      <div>
        <label className={LABEL_CLASS}>{labelEn}</label>
        {multiline ? (
          <textarea
            rows={rows}
            placeholder={placeholderEn || ''}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            className={`${INPUT_CLASS} resize-none`}
            dir="ltr"
          />
        ) : (
          <input
            type="text"
            placeholder={placeholderEn || ''}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            className={INPUT_CLASS}
            dir="ltr"
          />
        )}
      </div>
    </div>
  );
}

interface PlainFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  ltr?: boolean;
}

/** Single (non-translated) value such as a link or a latin badge. */
export function PlainField({ label, value, onChange, placeholder, hint, ltr = true }: PlainFieldProps) {
  return (
    <div>
      <label className={LABEL_CLASS}>{label}</label>
      <input
        type="text"
        placeholder={placeholder || ''}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS}
        {...(ltr ? { dir: 'ltr' as const } : {})}
      />
      {hint && <p className="text-[11px] text-slate-500 dark:text-gray-500 mt-1.5">{hint}</p>}
    </div>
  );
}

interface HomeContentCardProps {
  title: string;
  description?: string;
  icon?: string;
  children: React.ReactNode;
}

/** White/navy card wrapper matching the About & Stats dashboard editors. */
export function HomeContentCard({ title, description, icon, children }: HomeContentCardProps) {
  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <div className="border-b border-slate-200 dark:border-white/10 pb-3">
        <h2 className="text-lg sm:text-xl font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2.5">
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </h2>
        {description && (
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1.5 font-normal">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

/** Small reminder that an empty field keeps the built-in bilingual text. */
export function FallbackNote() {
  return (
    <p className="text-[11px] text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3">
      💡 أي حقل تسيبه فاضي هيرجع تلقائياً للنص الأصلي المكتوب في الموقع (Empty field = built-in default text).
    </p>
  );
}
