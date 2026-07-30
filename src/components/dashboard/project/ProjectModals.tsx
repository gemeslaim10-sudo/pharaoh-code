import { useState } from 'react';

export default function ProjectModals({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: (reason: string) => void }) {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-pharaohCard border border-white/10 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
                <h5 className="font-black text-white text-base flex items-center gap-2">⚠️ تحديد سبب رفض الطلب</h5>
                <p className="text-xs text-gray-400">يرجى كتابة سبب حقيقي لرفض هذا المشروع لحفظه في أرشيف التقارير:</p>
                <textarea 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3} 
                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3 text-xs text-white focus:border-pharaohGold focus:ring-0 resize-none" 
                    placeholder="مثال: الميزانية المطروحة أقل من الحد الأدنى للشركة..."
                />
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { onConfirm(reason); setReason(''); }} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-xl text-xs transition-all">❌ تأكيد الرفض والحذف</button>
                    <button onClick={() => { onClose(); setReason(''); }} className="bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-2 rounded-xl text-xs transition-all border border-white/10">إلغاء</button>
                </div>
            </div>
        </div>
    );
}

