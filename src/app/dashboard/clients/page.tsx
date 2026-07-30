'use client';

import { useState, useEffect } from 'react';
import { getClients, addClient, updateClient, deleteClient } from '@/app/actions/dashboard';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';
import ClientsFormFields from '@/components/dashboard/clients/ClientsFormFields';
import ClientsTable, { ClientItem } from '@/components/dashboard/clients/ClientsTable';

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
                        <ClientsFormFields
                            name={name}
                            setName={setName}
                            websiteUrl={websiteUrl}
                            setWebsiteUrl={setWebsiteUrl}
                            editingId={editingId}
                            handleFileChange={handleFileChange}
                            fileStatusText={fileStatusText}
                            description={description}
                            setDescription={setDescription}
                        />

                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={submitLoading} className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50">
                                {submitLoading ? "جاري الحفظ والرفع على السيرفر... 𓂀" : editingId ? "حفظ التعديلات في صرح الشركاء 𓂀" : "تنصيب الشريك في صرح شركاء النجاح 𓂀"}
                            </button>
                        </div>
                    </form>
                </div>

                <ClientsTable
                    loading={loading}
                    clients={clients}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
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
