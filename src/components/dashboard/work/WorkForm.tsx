'use client';

import WorkFormBasicInputs from './WorkFormBasicInputs';
import WorkFormSkills from './WorkFormSkills';
import WorkFormStats from './WorkFormStats';
import WorkFormMembersTable from './WorkFormMembersTable';
import { useWorkForm } from './useWorkForm';

export default function WorkForm() {
    const {
        loading,
        submitLoading,
        members,
        editingId,
        name, setName,
        nameEn, setNameEn,
        role, setRole,
        roleEn, setRoleEn,
        description, setDescription,
        descriptionEn, setDescriptionEn,
        fbUrl, setFbUrl,
        instaUrl, setInstaUrl,
        fileStatusText,
        skills,
        stats,
        handleFileChange,
        handleAddSkill, handleRemoveSkill, handleSkillChange,
        handleAddStat, handleRemoveStat, handleStatChange,
        resetForm,
        handleEdit,
        handleDelete,
        handleSubmit
    } = useWorkForm();

    return (
        <section id="team-management-section" className="py-6 relative overflow-hidden text-right" dir="rtl">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 hover:border-pharaohGold/30 shadow-md dark:shadow-2xl transition-all duration-500">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                                {editingId ? `تعديل بيانات العضو: ${name}` : "استمارة إضافة عضو جديد"}
                            </h4>
                        </div>
                        {editingId && (
                            <button onClick={resetForm} className="text-xs text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer">
                                إلغاء التعديل
                            </button>
                        )}
                    </div>

                    <form id="add-member-form-react" onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <WorkFormBasicInputs
                            name={name}
                            setName={setName}
                            nameEn={nameEn}
                            setNameEn={setNameEn}
                            role={role}
                            setRole={setRole}
                            roleEn={roleEn}
                            setRoleEn={setRoleEn}
                            editingId={editingId}
                            handleFileChange={handleFileChange}
                            fileStatusText={fileStatusText}
                            fbUrl={fbUrl}
                            setFbUrl={setFbUrl}
                            instaUrl={instaUrl}
                            setInstaUrl={setInstaUrl}
                            description={description}
                            setDescription={setDescription}
                            descriptionEn={descriptionEn}
                            setDescriptionEn={setDescriptionEn}
                        />

                        <WorkFormSkills
                            skills={skills}
                            onAddSkill={handleAddSkill}
                            onRemoveSkill={handleRemoveSkill}
                            onSkillChange={handleSkillChange}
                        />

                        <WorkFormStats
                            stats={stats}
                            onAddStat={handleAddStat}
                            onRemoveStat={handleRemoveStat}
                            onStatChange={handleStatChange}
                        />

                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={submitLoading} className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50 cursor-pointer">
                                {submitLoading ? "جاري الحفظ والرفع..." : editingId ? "حفظ التعديلات" : "إضافة العضو لفريق العمل"}
                            </button>
                        </div>
                    </form>
                </div>

                <WorkFormMembersTable
                    loading={loading}
                    members={members}
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
