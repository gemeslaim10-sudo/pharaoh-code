'use client';

import { useEffect, useState } from 'react';
import ProjectRequests from './ProjectRequests';
import ProjectActive from './ProjectActive';
import ProjectRejected from './ProjectRejected';
import ProjectModals from './ProjectModals';
import { getProjectRequests, updateOrderStatus, deleteOrder } from '@/app/actions/dashboard/orders';
import { auth } from '@/lib/firebase/config';

export default function ProjectDashboardManager() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedProjectForReject, setSelectedProjectForReject] = useState<any>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const data = await getProjectRequests(token);
                    setProjects(data);
                } catch (error) {
                    console.error('Error loading projects:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleAccept = async (project: any) => {
        if (!confirm(`هل توافق على قبول طلب (${project.service}) المقدم من: ${project.name} ونقله للتنفيذ؟`)) return;

        try {
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            await updateOrderStatus(token, project.id, 'contacted');
            
            setProjects(prev => prev.map(p => p.id === project.id ? { ...p, status: 'contacted' } : p));
            setToastMessage(`طلب أ/ ${project.name} أصبح بكامل تفاصيله في قسم التنفيذ.`);
            
            setTimeout(() => setToastMessage(null), 5000);
        } catch (error) {
            console.error('Error accepting project:', error);
            alert('حدث خطأ أثناء قبول المشروع.');
        }
    };

    const handleRejectClick = (project: any) => {
        setSelectedProjectForReject(project);
        setRejectModalOpen(true);
    };

    const confirmReject = async (reason: string) => {
        if (!selectedProjectForReject) return;

        try {
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            // We might want to save the reject reason in the order too
            await updateOrderStatus(token, selectedProjectForReject.id, 'rejected'); // We need a way to pass rejectReason, let's update updateOrderStatus later or just keep status
            
            setProjects(prev => prev.map(p => p.id === selectedProjectForReject.id ? { ...p, status: 'rejected', rejectReason: reason } : p));
            setRejectModalOpen(false);
            setSelectedProjectForReject(null);
        } catch (error) {
            console.error('Error rejecting project:', error);
            alert('حدث خطأ أثناء رفض المشروع.');
        }
    };

    const handleDelete = async (project: any) => {
        if (!confirm(`هل أنت متأكد من حذف طلب (${project.service}) نهائياً من قاعدة البيانات؟ لا يمكن التراجع عن هذا الإجراء.`)) return;

        try {
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            await deleteOrder(token, project.id);
            
            setProjects(prev => prev.filter(p => p.id !== project.id));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('حدث خطأ أثناء حذف المشروع.');
        }
    };

    const pendingProjects = projects.filter(p => p.status === 'pending');
    const activeProjects = projects.filter(p => p.status === 'contacted' || p.status === 'in_progress');
    const rejectedProjects = projects.filter(p => p.status === 'rejected');

    if (loading) {
        return <div className="text-center py-10 text-gray-400">جاري تحميل بيانات المشاريع...</div>;
    }

    return (
        <div className="space-y-6">
            <ProjectRequests projects={pendingProjects} onAccept={handleAccept} onReject={handleRejectClick} onDelete={handleDelete} />
            <ProjectActive projects={activeProjects} onDelete={handleDelete} />
            <ProjectRejected projects={rejectedProjects} />
            <ProjectModals 
                isOpen={rejectModalOpen} 
                onClose={() => setRejectModalOpen(false)} 
                onConfirm={confirmReject} 
            />

            {toastMessage && (
                <div id="go-to-project-toast" className="fixed bottom-5 left-5 bg-white dark:bg-[#112240] border-2 border-amber-500 dark:border-pharaohGold p-4 rounded-2xl shadow-2xl z-50 max-w-sm space-y-3 transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/10 text-amber-800 dark:text-pharaohGold flex items-center justify-center shrink-0 font-bold">
                            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h6 className="text-xs font-black text-slate-900 dark:text-white">تم قبول ونقل المشروع للتنفيذ!</h6>
                            <p className="text-[11px] text-slate-600 dark:text-gray-400">{toastMessage}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => document.getElementById('active-projects-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full bg-pharaohGold hover:bg-white text-[#0A192F] font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span>اذهب لمتابعة التنفيذ الآن</span>
                    </button>
                </div>
            )}
        </div>
    );
}
