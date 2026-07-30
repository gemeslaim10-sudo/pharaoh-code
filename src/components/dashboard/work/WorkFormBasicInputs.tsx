'use client';

interface WorkFormBasicInputsProps {
    name: string;
    setName: (val: string) => void;
    role: string;
    setRole: (val: string) => void;
    editingId: string | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileStatusText: string;
    fbUrl: string;
    setFbUrl: (val: string) => void;
    instaUrl: string;
    setInstaUrl: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
}

export default function WorkFormBasicInputs({
    name,
    setName,
    role,
    setRole,
    editingId,
    handleFileChange,
    fileStatusText,
    fbUrl,
    setFbUrl,
    instaUrl,
    setInstaUrl,
    description,
    setDescription
}: WorkFormBasicInputsProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">اسم العضو بالكامل</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: م/ أحمد إسماعيل" required className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">المسمى الوظيفي (بالإنجليزية)</label>
                    <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="مثال: Senior Full-Stack Developer" required className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">صورة العضو الشخصية <span className="text-pharaohGold text-xs">(المقاس الموصى به: 400x400 بكسل - مربع)</span></label>
                    <div className="relative w-full h-[54px] bg-pharaohNavy border border-white/10 rounded-xl flex items-center justify-between px-4 cursor-pointer group hover:border-pharaohGold/40 transition">
                        <input type="file" onChange={handleFileChange} accept="image/*" required={!editingId} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="text-xs text-gray-500 group-hover:text-white transition" id="upload-status-text">
                            {fileStatusText}
                        </span>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-pharaohGold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">رابط حساب الفيس بوك (Facebook)</label>
                    <input type="url" value={fbUrl} onChange={e => setFbUrl(e.target.value)} placeholder="https://facebook.com/username" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">رابط حساب انستجرام (Instagram)</label>
                    <input type="url" value={instaUrl} onChange={e => setInstaUrl(e.target.value)} placeholder="https://instagram.com/username" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                </div>
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-2.5 font-medium">نبذة عامة / وصف العضو لشاشة الـ Modal المنبثقة</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="اكتب ميزات المطور التنافسية وشغفه البرمجي بدقة..." required className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600"></textarea>
            </div>
        </>
    );
}
