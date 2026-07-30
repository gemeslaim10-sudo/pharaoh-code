'use client';

interface ClientsFormFieldsProps {
    name: string;
    setName: (val: string) => void;
    websiteUrl: string;
    setWebsiteUrl: (val: string) => void;
    editingId: string | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileStatusText: string;
    description: string;
    setDescription: (val: string) => void;
}

export default function ClientsFormFields({
    name,
    setName,
    websiteUrl,
    setWebsiteUrl,
    editingId,
    handleFileChange,
    fileStatusText,
    description,
    setDescription
}: ClientsFormFieldsProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">اسم العميل أو المؤسسة</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: شركة النيل للتطوير العقاري" required className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">رابط الموقع الإلكتروني (URL)</label>
                    <input type="url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://example.com" required className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">شعار اللوجو أو هوية المؤسسة <span className="text-pharaohGold text-xs">(المقاس الموصى به: 600x350 بكسل)</span></label>
                    <div className="relative w-full h-[54px] bg-pharaohNavy border border-white/10 rounded-xl flex items-center justify-between px-4 cursor-pointer group hover:border-pharaohGold/40 transition">
                        <input type="file" onChange={handleFileChange} accept="image/*" required={!editingId} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="text-xs text-gray-500 group-hover:text-white transition" id="upload-status-text">
                            {fileStatusText}
                        </span>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-pharaohGold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-2.5 font-medium">وصف بسيط للخدمة والحلول الرقمية التي قدمناها له</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="مثال: تصميم وتطوير تطبيق الأندرويد والـ iOS للمبيعات..." required className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600"></textarea>
            </div>
        </>
    );
}
