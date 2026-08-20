'use client';

import ClientsFormFields from '@/components/dashboard/clients/ClientsFormFields';
import ClientsTable from '@/components/dashboard/clients/ClientsTable';
import { useClientsForm } from '@/components/dashboard/clients/useClientsForm';

export default function DashboardClients() {
    const {
        loading,
        submitLoading,
        clients,
        editingId,
        name, setName,
        nameEn, setNameEn,
        websiteUrl, setWebsiteUrl,
        description, setDescription,
        descriptionEn, setDescriptionEn,
        fileStatusText,
        handleFileChange,
        resetForm,
        handleEdit,
        handleDelete,
        handleSubmit
    } = useClientsForm();

    return (
        <section id="client-management-section" className="py-10 bg-pharaohNavy relative overflow-hidden text-right" dir="rtl">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pharaohGold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500">

                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                            <h4 className="text-xl font-bold text-white">
                                {editingId ? `تعديل بيانات الشريك: ${name}` : "استمارة إضافة شريك نجاح جديد"}
                            </h4>
                        </div>
                        {editingId && (
                            <button onClick={resetForm} className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer">
                                إلغاء التعديل
                            </button>
                        )}
                    </div>

                    <form id="add-client-form-react" onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <ClientsFormFields
                            name={name}
                            setName={setName}
                            nameEn={nameEn}
                            setNameEn={setNameEn}
                            websiteUrl={websiteUrl}
                            setWebsiteUrl={setWebsiteUrl}
                            editingId={editingId}
                            handleFileChange={handleFileChange}
                            fileStatusText={fileStatusText}
                            description={description}
                            setDescription={setDescription}
                            descriptionEn={descriptionEn}
                            setDescriptionEn={setDescriptionEn}
                        />

                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={submitLoading} className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50 cursor-pointer">
                                {submitLoading ? "جاري الحفظ والرفع..." : editingId ? "حفظ التعديلات" : "إضافة الشريك لقائمة شركاء النجاح"}
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
