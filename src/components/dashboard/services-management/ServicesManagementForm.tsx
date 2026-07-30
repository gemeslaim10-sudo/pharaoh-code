'use client';

import ServiceFormBasicInputs from './ServiceFormBasicInputs';
import ServiceFormDescriptions from './ServiceFormDescriptions';
import { useServiceForm } from './useServiceForm';

interface Props {
    editingService: any;
    setEditingService: (service: any) => void;
    onSuccess: () => void;
}

export default function ServicesManagementForm({ editingService, setEditingService, onSuccess }: Props) {
    const {
        loading,
        title, setTitle,
        titleEn, setTitleEn,
        type, setType,
        typeCustom, setTypeCustom,
        price, setPrice,
        badge, setBadge,
        btnText, setBtnText,
        svg, setSvg,
        desc, setDesc,
        descEn, setDescEn,
        detailPageUrl, setDetailPageUrl,
        imageFile, imageUrl,
        availablePages,
        handleFileChange,
        handleSubmit
    } = useServiceForm(editingService, setEditingService, onSuccess);

    return (
        <div className="max-w-6xl mx-auto bg-[#112240] p-8 md:p-12 rounded-[2.5rem] border border-white/5 hover:border-[#C5A16F]/20 shadow-2xl transition-all duration-500 mb-20">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                    <h4 id="form-mode-title" className="text-xl font-bold text-white">
                        {editingService ? "تعديل بند خدمة مضاف 𓂀" : "تنصيب بند خدمة جديد 𓂀"}
                    </h4>
                </div>
                <button 
                    type="button" 
                    id="cancel-edit-btn" 
                    onClick={() => setEditingService(null)}
                    className={`${editingService ? "block" : "hidden"} text-xs text-red-400 hover:text-red-500 border border-red-500/20 px-3 py-1 rounded-lg bg-red-500/5 transition`}
                >
                    إلغاء التعديل
                </button>
            </div>

            <form id="pharaoh-adv-service-form" className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" id="editing-service-id" value={editingService?.id || ""} />

                <ServiceFormBasicInputs
                    title={title}
                    setTitle={setTitle}
                    titleEn={titleEn}
                    setTitleEn={setTitleEn}
                    type={type}
                    setType={setType}
                    typeCustom={typeCustom}
                    setTypeCustom={setTypeCustom}
                    detailPageUrl={detailPageUrl}
                    setDetailPageUrl={setDetailPageUrl}
                    availablePages={availablePages}
                    price={price}
                    setPrice={setPrice}
                    badge={badge}
                    setBadge={setBadge}
                    imageFile={imageFile}
                    imageUrl={imageUrl}
                    handleFileChange={handleFileChange}
                    btnText={btnText}
                    setBtnText={setBtnText}
                    svg={svg}
                    setSvg={setSvg}
                />

                <ServiceFormDescriptions
                    desc={desc}
                    setDesc={setDesc}
                    descEn={descEn}
                    setDescEn={setDescEn}
                    loading={loading}
                    editingService={editingService}
                />
            </form>
        </div>
    );
}
