'use client';

import { useState, useEffect } from 'react';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/app/actions/dashboard/team';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';

interface Skill {
    name: string;
    value: string;
}

interface Stat {
    value: string;
    label: string;
}

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    description: string;
    skills: Skill[];
    stats: Stat[];
    social: {
        facebook: string;
        instagram: string;
    };
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

    const handleAddSkill = () => {
        setSkills(prev => [...prev, { name: '', value: '' }]);
    };

    const handleRemoveSkill = (index: number) => {
        setSkills(prev => prev.filter((_, i) => i !== index));
    };

    const handleSkillChange = (index: number, field: keyof Skill, val: string) => {
        setSkills(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
    };

    const handleAddStat = () => {
        setStats(prev => [...prev, { value: '', label: '' }]);
    };

    const handleRemoveStat = (index: number) => {
        setStats(prev => prev.filter((_, i) => i !== index));
    };

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
        
        // Scroll to form nicely
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
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pharaohGold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
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

                        <div className="bg-pharaohNavy/50 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="text-pharaohGold font-bold text-xs uppercase tracking-wider">𓂀 القدرات والمهارات البرمجية والفنية</h5>
                                <button type="button" onClick={handleAddSkill} className="bg-pharaohGold/10 hover:bg-pharaohGold/20 border border-pharaohGold/30 text-pharaohGold font-bold text-xs px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1">
                                    <span>+</span> إضافة مهارة أخرى
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className="space-y-2 relative p-3 bg-[#112240] rounded-xl border border-white/5">
                                        <input type="text" value={skill.name} onChange={e => handleSkillChange(index, 'name', e.target.value)} placeholder="اسم المهارة (مثال: Figma)" required className="w-full bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                                        <input type="text" value={skill.value} onChange={e => handleSkillChange(index, 'value', e.target.value)} placeholder="النسبة (مثال: 95%)" required className="w-full bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                                        {skills.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveSkill(index)} className="absolute top-1 left-2 text-red-400 hover:text-red-600 text-[10px] font-bold p-1">إزالة</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-pharaohNavy/50 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="text-pharaohGold font-bold text-xs uppercase tracking-wider">𓂀 الإحصائيات الرقمية للـ Modal</h5>
                                <button type="button" onClick={handleAddStat} className="bg-pharaohGold/10 hover:bg-pharaohGold/20 border border-pharaohGold/30 text-pharaohGold font-bold text-xs px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1">
                                    <span>+</span> إضافة إحصائية أخرى
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex gap-2 p-3 bg-[#112240] rounded-xl border border-white/5 relative">
                                        <input type="text" value={stat.value} onChange={e => handleStatChange(index, 'value', e.target.value)} placeholder="الرقم (25+)" required className="w-1/3 bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                                        <input type="text" value={stat.label} onChange={e => handleStatChange(index, 'label', e.target.value)} placeholder="التسمية (مشروع ناجح)" required className="w-2/3 bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                                        {stats.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveStat(index)} className="absolute top-1 left-2 text-red-400 hover:text-red-600 text-[10px] font-bold p-1">إزالة</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={submitLoading} className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50">
                                {submitLoading ? "جاري الحفظ والرفع على السيرفر... 𓂀" : editingId ? "حفظ التعديلات في صرح التيم 𓂀" : "تنصيب الخبير في صرح التيم 𓂀"}
                            </button>
                        </div>
                    </form>

                </div>

                {/* القائمة الحالية لفريق العمل */}
                <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500 mt-10">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                        <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                        <h4 className="text-xl font-bold text-white">خبراء الصرح الحاليين 📜</h4>
                    </div>

                    {loading ? (
                        <div className="text-center text-pharaohGold py-10 font-bold">جاري تحميل كتيبة العمل... 𓂀</div>
                    ) : members.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">لا يوجد أعضاء في قاعدة البيانات حالياً.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-right text-sm text-gray-400">
                                <thead className="text-xs uppercase bg-pharaohNavy text-pharaohGold font-bold border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4">العضو</th>
                                        <th className="px-6 py-4">المسمى الوظيفي</th>
                                        <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map((member) => (
                                        <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-pharaohGold/30" />
                                                <span className="font-bold text-white">{member.name}</span>
                                            </td>
                                            <td className="px-6 py-4">{member.role}</td>
                                            <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                                <button onClick={() => handleEdit(member)} className="text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1.5 rounded-full hover:bg-pharaohGold hover:text-[#0A192F] transition">
                                                    تعديل ✏️
                                                </button>
                                                <button onClick={() => handleDelete(member.id)} className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full hover:bg-red-400 hover:text-white transition">
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
