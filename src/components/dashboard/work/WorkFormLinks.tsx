'use client';
import { type MemberLink } from '@/types/team';
import { IconField } from '@/components/dashboard/common/IconField';

interface WorkFormLinksProps {
    links: MemberLink[];
    onAddLink: () => void;
    onRemoveLink: (index: number) => void;
    onLinkChange: (index: number, field: keyof MemberLink, val: string) => void;
}

const outline = (d: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;

const LINK_ICON_PRESETS = [
    { name: 'موقع إلكتروني', svg: outline('M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18') },
    { name: 'رابط', svg: outline('M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5') },
    { name: 'بريد إلكتروني', svg: outline('M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z') },
    { name: 'هاتف', svg: outline('M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z') },
];

const inputCls = "w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600";

export default function WorkFormLinks({
    links,
    onAddLink,
    onRemoveLink,
    onLinkChange
}: WorkFormLinksProps) {
    return (
        <div className="bg-slate-50 dark:bg-pharaohNavy/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-3">
                <div>
                    <h5 className="text-sm font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2">
                        <span>🔗</span>
                        <span>روابط إضافية بأيقونات (Custom Links)</span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                        أضف أي رابط (LinkedIn، GitHub، Behance، موقع شخصي...) مع أيقونته. تظهر الأيقونة في كارت العضو وصفحة تفاصيله، والضغط عليها يفتح الرابط.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onAddLink}
                    className="bg-amber-500/10 hover:bg-amber-500/20 dark:bg-pharaohGold/10 dark:hover:bg-pharaohGold/20 border border-amber-500/30 dark:border-pharaohGold/30 text-amber-800 dark:text-pharaohGold font-bold text-xs px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                >
                    <span>+</span>
                    <span>إضافة رابط</span>
                </button>
            </div>

            {links.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-gray-400 text-center py-4">
                    لا توجد روابط إضافية. اضغط «إضافة رابط» لإضافة رابط وأيقونته.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="relative p-4 bg-white dark:bg-[#112240] rounded-xl border border-slate-200 dark:border-white/10 shadow-xs space-y-3"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                                <span className="w-6 h-6 rounded-lg bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs">
                                    0{index + 1}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onRemoveLink(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-500/10 px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer"
                                >
                                    حذف
                                </button>
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                    الرابط (URL) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    inputMode="url"
                                    value={link.url}
                                    onChange={e => onLinkChange(index, 'url', e.target.value)}
                                    placeholder="https://linkedin.com/in/username"
                                    className={`${inputCls} font-mono`}
                                    dir="ltr"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                    اسم الرابط (اختياري - يظهر عند المرور على الأيقونة)
                                </label>
                                <input
                                    type="text"
                                    value={link.label || ''}
                                    onChange={e => onLinkChange(index, 'label', e.target.value)}
                                    placeholder="مثال: LinkedIn"
                                    className={inputCls}
                                />
                            </div>

                            <IconField
                                label="أيقونة الرابط *"
                                value={link.icon}
                                onChange={val => onLinkChange(index, 'icon', val)}
                                presets={LINK_ICON_PRESETS}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
