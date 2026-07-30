'use client';

import { useState, useEffect } from 'react';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/app/actions/dashboard/team';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';
import WorkFormBasicInputs from './WorkFormBasicInputs';
import WorkFormSkills from './WorkFormSkills';
import WorkFormStats from './WorkFormStats';
import WorkFormMembersTable, { TeamMember } from './WorkFormMembersTable';

interface Skill {
    name: string;
    value: string;
}

interface Stat {
    value: string;
    label: string;
}

export default function WorkForm() {
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>([]);
    
    // Form States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [fbUrl, setFbUrl] = useState('');
    const [instaUrl, setInstaUrl] = useState('');
    const [existingImage, setExistingImage] = useState('');
    const [skills, setSkills] = useState<Skill[]>([{ name: '', value: '' }]);
    const [stats, setStats] = useState<Stat[]>([{ value: '', label: '' }]);
    
    // File upload
    const [file, setFile] = useState<File | null>(null);
    const [fileStatusText, setFileStatusText] = useState('اختر صورة المطور من جهازك...');
    
    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getTeamMembers();
            setMembers(data as TeamMember[]);
        } catch (error) {
            console.error("Failed to load team members:", error);
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

    const handleAddSkill = () => setSkills(prev => [...prev, { name: '', value: '' }]);
    const handleRemoveSkill = (index: number) => setSkills(prev => prev.filter((_, i) => i !== index));
    const handleSkillChange = (index: number, field: keyof Skill, val: string) => {
        setSkills(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
    };

    const handleAddStat = () => setStats(prev => [...prev, { value: '', label: '' }]);
    const handleRemoveStat = (index: number) => setStats(prev => prev.filter((_, i) => i !== index));
    const handleStatChange = (index: number, field: keyof Stat, val: string) => {
        setStats(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
    };

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setRole('');
        setDescription('');
        setFbUrl('');
        setInstaUrl('');
        setExistingImage('');
        setSkills([{ name: '', value: '' }]);
        setStats([{ value: '', label: '' }]);
        setFile(null);
        setFileStatusText('اختر صورة المطور من جهازك...');
    };

    const handleEdit = (member: TeamMember) => {
        setEditingId(member.id);
        setName(member.name);
        setRole(member.role);
        setDescription(member.description);
        setFbUrl(member.social?.facebook || '');
        setInstaUrl(member.social?.instagram || '');
        setExistingImage(member.image);
        setSkills(member.skills && member.skills.length > 0 ? member.skills : [{ name: '', value: '' }]);
        setStats(member.stats && member.stats.length > 0 ? member.stats : [{ value: '', label: '' }]);
        setFile(null);
        setFileStatusText('تغيير الصورة الحالية (اختياري)...');
        
        const formSec = document.getElementById('team-management-section');
        if (formSec) {
            formSec.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذا الخبير من صرح التيم؟ ❌")) return;
        
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await deleteTeamMember(token, id);
            alert("تم حذف العضو بنجاح.");
            await loadData();
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الحذف.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editingId && !file) {
            alert("يرجى اختيار صورة للعضو الجديد!");
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

            const memberData = {
                name,
                role,
                image: imageUrl,
                description,
                skills: skills.filter(s => s.name && s.value),
                stats: stats.filter(s => s.value && s.label),
                social: {
                    facebook: fbUrl,
                    instagram: instaUrl
                }
            };

            if (editingId) {
                await updateTeamMember(token, editingId, memberData);
                alert("تم تحديث بيانات الخبير بنجاح! 👑");
            } else {
                await addTeamMember(token, memberData);
                alert("تم تنصيب الخبير بنجاح في صرح التيم! 𓂀");
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
        <section id="team-management-section" className="py-10 bg-pharaohNavy relative overflow-hidden text-right" dir="rtl">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pharaohGold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                            <h4 className="text-xl font-bold text-white">
                                {editingId ? `تعديل بيانات الخبير: ${name} 𓂀` : "استمارة تنصيب خبير جديد 𓂀"}
                            </h4>
                        </div>
                        {editingId && (
                            <button onClick={resetForm} className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition">
                                إلغاء التعديل ✕
                            </button>
                        )}
                    </div>

                    <form id="add-member-form-react" onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <WorkFormBasicInputs
                            name={name}
                            setName={setName}
                            role={role}
                            setRole={setRole}
                            editingId={editingId}
                            handleFileChange={handleFileChange}
                            fileStatusText={fileStatusText}
                            fbUrl={fbUrl}
                            setFbUrl={setFbUrl}
                            instaUrl={instaUrl}
                            setInstaUrl={setInstaUrl}
                            description={description}
                            setDescription={setDescription}
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
                            <button type="submit" disabled={submitLoading} className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50">
                                {submitLoading ? "جاري الحفظ والرفع على السيرفر... 𓂀" : editingId ? "حفظ التعديلات في صرح التيم 𓂀" : "تنصيب الخبير في صرح التيم 𓂀"}
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
