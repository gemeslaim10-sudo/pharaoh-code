'use client';

import { useState, useEffect } from 'react';
import { getClients, addClient, updateClient, deleteClient } from '@/app/actions/dashboard';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';

interface ClientItem {
    id: string;
    name: string;
    logo: string;
    description: string;
    websiteUrl: string;
}

export default function DashboardClients() {
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [clients, setClients] = useState<ClientItem[]>([]);
    
    // Form States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [description, setDescription] = useState('');
    const [existingImage, setExistingImage] = useState('');
    
    // File upload
    const [file, setFile] = useState<File | null>(null);
    const [fileStatusText, setFileStatusText] = useState('اختر لوجو أو هوية العميل...');

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getClients();
            setClients(data as ClientItem[]);
        } catch (error) {
            console.error("Failed to load clients:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileStatusText(`تم اختيار: ${selectedFile.name}`);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setWebsiteUrl('');
        setDescription('');
        setExistingImage('');
        setFile(null);
        setFileStatusText('اختر لوجو أو هوية العميل...');
    };

    const handleEdit = (client: ClientItem) => {
        setEditingId(client.id);
        setName(client.name);
        setWebsiteUrl(client.websiteUrl || '');
        setDescription(client.description);
        setExistingImage(client.logo);
        setFile(null);
        setFileStatusText('تغيير اللوجو الحالي (اختياري)...');
        
        // Scroll to form nicely
        const formSec = document.getElementById('client-management-section');
        if (formSec) {
            formSec.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذا العميل من صرح شركاء النجاح؟ ❌")) return;
        
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await deleteClient(token, id);
            alert("تم حذف العميل بنجاح.");
            await loadData();
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الحذف.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editingId && !file) {
            alert("يرجى اختيار صورة لوجو للعميل الجديد!");
            return;
        }

        setSubmitLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            let imageUrl = existingImage;
            
            // Upload to Cloudinary if new file is selected
            if (file) {
                const uploadData = new FormData();
                uploadData.append('file', file);
                const uploadRes = await uploadImage(token, uploadData);
                if (!uploadRes.success) {
                    throw new Error(uploadRes.error);
                }
                imageUrl = uploadRes.url || '';
            }

            const clientData = {
                name,
                logo: imageUrl,
                description,
                websiteUrl
            };

            if (editingId) {
                await updateClient(token, editingId, clientData);
                alert("تم تحديث بيانات الشريك بنجاح! 👑");
            } else {
                await addClient(token, clientData);
                alert("تم تنصيب الشريك بنجاح في صرح العملاء! 𓂀");
            }

            resetForm();
            await loadData();
        } catch (error: any) {
            console.error(error);
            alert("حدث خطأ أثناء الحفظ: " + error.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <section id="client-management-section" className="py-10 bg-pharaohNavy relative overflow-hidden text-right" dir="rtl">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pharaohGold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500">

                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                            <h4 className="text-xl font-bold text-white">
                                {editingId ? `تعديل بيانات العميل: ${name} 𓂀` : "استمارة تنصيب شريك نجاح جديد 𓂀"}
                            </h4>
                        </div>
                        {editingId && (
                            <button onClick={resetForm} className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition">
                                إلغاء التعديل ✕
                            </button>
                        )}
                    </div>

                    <form id="add-client-form-react" onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pharaohGold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2.5 font-medium">وصف بسيط للخدمة والحلول الرقمية التي قدمناها له</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="مثال: تصميم وتطوير تطبيق الأندرويد والـ iOS للمبيعات..." required className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600"></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={submitLoading} className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50">
                                {submitLoading ? "جاري الحفظ والرفع على السيرفر... 𓂀" : editingId ? "حفظ التعديلات في صرح الشركاء 𓂀" : "تنصيب الشريك في صرح شركاء النجاح 𓂀"}
                            </button>
                        </div>
                    </form>

                </div>

                {/* القائمة الحالية للعملاء */}
                <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500 mt-10">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                        <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                        <h4 className="text-xl font-bold text-white">قائمة شركاء النجاح الحاليين 📜</h4>
                    </div>

                    {loading ? (
                        <div className="text-center text-pharaohGold py-10 font-bold">جاري تحميل قائمة الشركاء... 𓂀</div>
                    ) : clients.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">لا يوجد عملاء مضافين في قاعدة البيانات حالياً.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-right text-sm text-gray-400">
                                <thead className="text-xs uppercase bg-pharaohNavy text-pharaohGold font-bold border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4">العميل / الشريك</th>
                                        <th className="px-6 py-4">رابط الموقع</th>
                                        <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => (
                                        <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <img src={client.logo} alt={client.name} className="w-14 h-10 rounded-lg object-cover border border-white/10 bg-[#0A192F]" />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white">{client.name}</span>
                                                    <span className="text-[10px] text-gray-500 line-clamp-1">{client.description}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs">
                                                    {client.websiteUrl}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                                <button onClick={() => handleEdit(client)} className="text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1.5 rounded-full hover:bg-pharaohGold hover:text-[#0A192F] transition">
                                                    تعديل ✏️
                                                </button>
                                                <button onClick={() => handleDelete(client.id)} className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full hover:bg-red-400 hover:text-white transition">
                                                    حذف ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>
        </section>
    );
}
