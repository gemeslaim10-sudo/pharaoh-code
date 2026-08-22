'use client';

import { useState, useEffect } from 'react';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/app/actions/dashboard/team';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';
import { TeamMember } from './WorkFormMembersTable';
import { Skill, Stat } from './workFormTypes';
import { useWorkSkillsAndStats } from './useWorkSkillsAndStats';

export type { Skill, Stat };

export function useWorkForm() {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
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
  const [file, setFile] = useState<File | null>(null);
  const [fileStatusText, setFileStatusText] = useState('اختر صورة المطور من جهازك...');
  const statsHook = useWorkSkillsAndStats();

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

  useEffect(() => { loadData(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileStatusText(`تم اختيار: ${selectedFile.name}`);
    }
  };

  const resetForm = () => {
    setEditingId(null); setName(''); setNameEn(''); setRole(''); setRoleEn('');
    setDescription(''); setDescriptionEn(''); setFbUrl(''); setInstaUrl('');
    setExistingImage(''); setFile(null); setFileStatusText('اختر صورة المطور من جهازك...');
    statsHook.resetSkillsAndStats();
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name || member.name_ar || '');
    setNameEn(member.name_en || '');
    setRole(member.role || member.role_ar || '');
    setRoleEn(member.role_en || '');
    setDescription(member.description || member.description_ar || '');
    setDescriptionEn(member.description_en || '');
    setFbUrl(member.social?.facebook || '');
    setInstaUrl(member.social?.instagram || '');
    setExistingImage(member.image || '');
    statsHook.setSkills(
      member.skills && member.skills.length > 0 
        ? member.skills.map((s: any) => ({
            name: s.name || s.name_ar || '',
            name_ar: s.name_ar || s.name || '',
            name_en: s.name_en || (s.name && !/[\u0600-\u06FF]/.test(s.name) ? s.name : ''),
            value: s.value || ''
          }))
        : [{ name: '', name_en: '', value: '' }]
    );
    statsHook.setStats(
      member.stats && member.stats.length > 0 
        ? member.stats.map((st: any) => ({
            value: st.value || '',
            label: st.label || st.label_ar || '',
            label_ar: st.label_ar || st.label || '',
            label_en: st.label_en || (st.label && !/[\u0600-\u06FF]/.test(st.label) ? st.label : '')
          }))
        : [{ value: '', label: '', label_en: '' }]
    );
    setFile(null);
    setFileStatusText('تغيير الصورة الحالية (اختياري)...');
    document.getElementById('team-management-section')?.scrollIntoView({ behavior: 'smooth' });
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
        if (!uploadRes.success) throw new Error(uploadRes.error);
        imageUrl = uploadRes.url || '';
      }
      const memberData = {
        name,
        name_ar: name,
        name_en: nameEn || name,
        role,
        role_ar: role,
        role_en: roleEn || role,
        image: imageUrl,
        description,
        description_ar: description,
        description_en: descriptionEn || description,
        skills: statsHook.skills
          .filter(s => (s.name || s.name_en) && s.value)
          .map(s => ({
            name: s.name || s.name_en || '',
            name_ar: s.name || s.name_en || '',
            name_en: s.name_en || s.name || '',
            value: s.value
          })),
        stats: statsHook.stats
          .filter(s => s.value && (s.label || s.label_en))
          .map(st => ({
            value: st.value,
            label: st.label || st.label_en || '',
            label_ar: st.label || st.label_en || '',
            label_en: st.label_en || st.label || ''
          })),
        social: { facebook: fbUrl, instagram: instaUrl }
      };
      if (editingId) {
        await updateTeamMember(token, editingId, memberData);
        alert("تم تحديث بيانات عضو الفريق بنجاح!");
      } else {
        await addTeamMember(token, memberData);
        alert("تمت إضافة عضو الفريق بنجاح!");
      }
      resetForm();
      await loadData();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert("حدث خطأ أثناء الحفظ: " + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    loading, submitLoading, members, editingId,
    name, setName, nameEn, setNameEn, role, setRole, roleEn, setRoleEn,
    description, setDescription, descriptionEn, setDescriptionEn,
    fbUrl, setFbUrl, instaUrl, setInstaUrl, fileStatusText,
    skills: statsHook.skills, stats: statsHook.stats,
    handleFileChange, handleAddSkill: statsHook.handleAddSkill,
    handleRemoveSkill: statsHook.handleRemoveSkill, handleSkillChange: statsHook.handleSkillChange,
    handleAddStat: statsHook.handleAddStat, handleRemoveStat: statsHook.handleRemoveStat,
    handleStatChange: statsHook.handleStatChange, resetForm, handleEdit, handleDelete, handleSubmit
  };
}
