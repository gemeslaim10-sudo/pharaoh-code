'use client';

interface WorkFormBasicInputsProps {
    name: string;
    setName: (val: string) => void;
    nameEn: string;
    setNameEn: (val: string) => void;
    role: string;
    setRole: (val: string) => void;
    roleEn: string;
    setRoleEn: (val: string) => void;
    editingId: string | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileStatusText: string;
    fbUrl: string;
    setFbUrl: (val: string) => void;
    instaUrl: string;
    setInstaUrl: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    descriptionEn: string;
    setDescriptionEn: (val: string) => void;
}

export default function WorkFormBasicInputs({
    name,
    setName,
    nameEn,
    setNameEn,
    role,
    setRole,
    roleEn,
    setRoleEn,
    editingId,
    handleFileChange,
    fileStatusText,
    fbUrl,
    setFbUrl,
    instaUrl,
    setInstaUrl,
    description,
    setDescription,
    descriptionEn,
    setDescriptionEn
}: WorkFormBasicInputsProps) {
    return (
        <div className="space-y-6">
            {/* Panel 1: Identity (Arabic vs English) */}
            <div className="bg-slate-50 dark:bg-pharaohNavy/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
                <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-amber-800 dark:text-pharaohGold">👤</span>
                        <span>بيانات الهوية والمسمى الوظيفي (Member Identity & Role)</span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">الاسم والمنصب الوظيفي باللغتين العربية والإنجليزية.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Arabic Identity */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
                                <span>🇸🇦</span>
                                <span>البيانات بالعربية</span>
                            </span>
                            <span className="text-[10px] text-slate-400">RTL</span>
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                اسم العضو (بالعربية) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="مثال: م/ أحمد إسماعيل"
                                required
                                className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                المسمى الوظيفي (بالعربية) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                placeholder="مثال: كبير مبرمجي الأنظمة الشاملة"
                                required
                                className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                            />
                        </div>
                    </div>

                    {/* English Identity */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                                <span>🇬🇧</span>
                                <span>English Details</span>
                            </span>
                            <span className="text-[10px] text-slate-400">LTR</span>
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                Member Full Name (English)
                            </label>
                            <input
                                type="text"
                                value={nameEn}
                                onChange={e => setNameEn(e.target.value)}
                                placeholder="e.g. Eng. Ahmed Ismail"
                                className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                Job Role / Title (English)
                            </label>
                            <input
                                type="text"
                                value={roleEn}
                                onChange={e => setRoleEn(e.target.value)}
                                placeholder="e.g. Senior Full-Stack Developer"
                                className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel 2: Avatar & Social Links */}
            <div className="bg-slate-50 dark:bg-pharaohNavy/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
                <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-amber-800 dark:text-pharaohGold">🖼️</span>
                        <span>صورة المطور وروابط التواصل (Media & Social Presence)</span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">الصورة الشخصية وحسابات فيسبوك وانستجرام.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                            صورة العضو الشخصية <span className="text-amber-800 dark:text-pharaohGold text-[10px]">(400x400 بكسل)</span>
                        </label>
                        <div className="relative w-full h-[46px] bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between px-3 cursor-pointer group hover:border-pharaohGold/40 transition shadow-xs">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                required={!editingId}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <span className="text-xs text-slate-600 dark:text-gray-400 group-hover:text-amber-800 dark:group-hover:text-white transition truncate" id="upload-status-text">
                                {fileStatusText}
                            </span>
                            <svg className="w-4 h-4 text-slate-400 group-hover:text-pharaohGold transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                            حساب فيسبوك (Facebook URL)
                        </label>
                        <input
                            type="url"
                            value={fbUrl}
                            onChange={e => setFbUrl(e.target.value)}
                            placeholder="https://facebook.com/username"
                            className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 shadow-xs"
                            dir="ltr"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                            حساب انستجرام (Instagram URL)
                        </label>
                        <input
                            type="url"
                            value={instaUrl}
                            onChange={e => setInstaUrl(e.target.value)}
                            placeholder="https://instagram.com/username"
                            className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 shadow-xs"
                            dir="ltr"
                        />
                    </div>
                </div>
            </div>

            {/* Panel 3: Bio Description */}
            <div className="bg-slate-50 dark:bg-pharaohNavy/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
                <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-amber-800 dark:text-pharaohGold">📝</span>
                        <span>نبذة العضو والوصف التعريفي (Member Bio & Description)</span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">الوصف التفصيلي لخبرات وإنجازات المطور باللغتين.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
                                <span>🇸🇦</span>
                                <span>النبذة بالعربية</span>
                            </span>
                            <span className="text-[10px] text-slate-400">RTL</span>
                        </div>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            placeholder="اكتب ميزات المطور التنافسية وشغفه البرمجي بدقة..."
                            required
                            className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                        />
                    </div>

                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2" dir="ltr">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                                <span>🇬🇧</span>
                                <span>Bio in English</span>
                            </span>
                            <span className="text-[10px] text-slate-400">LTR</span>
                        </div>
                        <textarea
                            value={descriptionEn}
                            onChange={e => setDescriptionEn(e.target.value)}
                            rows={3}
                            placeholder="Write member description and achievements in English..."
                            className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
