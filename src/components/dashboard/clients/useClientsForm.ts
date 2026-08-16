'use client';

import { useState, useEffect } from 'react';
import { getClients, addClient, updateClient, deleteClient } from '@/app/actions/dashboard';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';
import { ClientItem } from './ClientsTable';

export function useClientsForm() {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [clients, setClients] = useState<ClientItem[]>([]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [existingImage, setExistingImage] = useState('');
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

  useEffect(() => { loadData(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileStatusText(`تم اختيار: ${selectedFile.name}`);
    }
  };

  const resetForm = () => {
    setEditingId(null); setName(''); setNameEn(''); setWebsiteUrl('');
    setDescription(''); setDescriptionEn(''); setExistingImage(''); setFile(null);
    setFileStatusText('اختر لوجو أو هوية العميل...');
  };

  const handleEdit = (client: ClientItem) => {
    setEditingId(client.id);
    setName(client.name || client.name_ar || '');
    setNameEn(client.name_en || '');
    setWebsiteUrl(client.websiteUrl || '');
    setDescription(client.description || client.description_ar || '');
    setDescriptionEn(client.description_en || '');
    setExistingImage(client.logo || '');
    setFile(null);
    setFileStatusText('تغيير اللوجو الحالي (اختياري)...');
    document.getElementById('client-management-section')?.scrollIntoView({ behavior: 'smooth' });
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
        if (!uploadRes.success) throw new Error(uploadRes.error);
        imageUrl = uploadRes.url || '';
      }

      const clientData = {
        name, name_ar: name, name_en: nameEn, logo: imageUrl,
        description, description_ar: description, description_en: descriptionEn, websiteUrl
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
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert("حدث خطأ أثناء الحفظ: " + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    loading, submitLoading, clients, editingId,
    name, setName, nameEn, setNameEn, websiteUrl, setWebsiteUrl,
    description, setDescription, descriptionEn, setDescriptionEn,
    fileStatusText, handleFileChange, resetForm, handleEdit, handleDelete, handleSubmit
  };
}
