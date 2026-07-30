'use client';

import { useState, useEffect } from 'react';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/app/actions/dashboard/team';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';
import { TeamMember } from './WorkFormMembersTable';

export interface Skill {
    name: string;
    value: string;
}

export interface Stat {
    value: string;
    label: string;
}

export function useWorkForm() {
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>([]);
    
    // Form States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [role, setRole] = useState('');
    const [roleEn, setRoleEn] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
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
        setNameEn('');
        setRole('');
        setRoleEn('');
        setDescription('');
        setDescriptionEn('');
        setFbUrl('');
        setInstaUrl('');
        setExistingImage('');
        setSkills([{ name: '', value: '' }]);
        setStats([{ value: '', label: '' }]);
        setFile(null);
        setFileStatusText('اختر صورة المطور من جهازك...');
    };

    const handleEdit = (member: any) => {
        setEditingId(member.id);
        setName(member.name || member.name_ar || '');
        setNameEn(member.name_en || '');
        setRole(member.role || member.role_ar || '');
        setRoleEn(member.role_en || '');
        setDescription(member.description || member.description_ar || '');
        setDescriptionEn(member.description_en || '');
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
                name_ar: name,
                name_en: nameEn,
                role,
                role_ar: role,
                role_en: roleEn,
                image: imageUrl,
                description,
                description_ar: description,
                description_en: descriptionEn,
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

    return {
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
    };
}
