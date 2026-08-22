'use client';

interface ClientsFormFieldsProps {
    name: string;
    setName: (val: string) => void;
    nameEn: string;
    setNameEn: (val: string) => void;
    websiteUrl: string;
    setWebsiteUrl: (val: string) => void;
    editingId: string | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileStatusText: string;
    description: string;
    setDescription: (val: string) => void;
    descriptionEn: string;
    setDescriptionEn: (val: string) => void;
}

export default function ClientsFormFields({
    name,
    setName,
    nameEn,
    setNameEn,
    websiteUrl,
    setWebsiteUrl,
    editingId,
    handleFileChange,
    fileStatusText,
    description,
    setDescription,
    descriptionEn,
    setDescriptionEn
}: ClientsFormFieldsProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-slate-700 dark:text-gray-400 text-sm mb-2.5 font-medium">اسم العميل أو المؤسسة (بالعربية)</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: شركة النيل للتطوير العقاري" required className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-gray-400 text-sm mb-2.5 font-medium">اسم العميل (بالإنجليزية - Name EN)</label>
                    <input type="text" value={nameEn} onChange={e => setNameEn(e.target.value)} placeholder="e.g. Nile Real Estate Corp" className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600" dir="ltr" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-slate-700 dark:text-gray-400 text-sm mb-2.5 font-medium">رابط الموقع الإلكتروني (URL)</label>
                    <input type="url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://example.com" required className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600" dir="ltr" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-gray-400 text-sm mb-2.5 font-medium">شعار اللوجو أو هوية المؤسسة <span className="text-amber-800 dark:text-pharaohGold text-xs">(600x350 بكسل)</span></label>
                    <div className="relative w-full h-[54px] bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between px-4 cursor-pointer group hover:border-pharaohGold/40 transition">
                        <input type="file" onChange={handleFileChange} accept="image/*" required={!editingId} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="text-xs text-slate-600 dark:text-gray-400 group-hover:text-amber-800 dark:group-hover:text-white transition truncate" id="upload-status-text">
                            {fileStatusText}
                        </span>
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-pharaohGold transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-slate-700 dark:text-gray-400 text-sm mb-2.5 font-medium">وصف الخدمة والحلول (بالعربية)</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="مثال: تصميم وتطوير تطبيق الأندرويد والـ iOS للمبيعات..." required className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600"></textarea>
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-gray-400 text-sm mb-2.5 font-medium">وصف الخدمة (بالإنجليزية - Description EN)</label>
                    <textarea value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={3} placeholder="Write service description in English..." className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600" dir="ltr"></textarea>
                </div>
            </div>
        </>
    );
}
