'use client';
import { AboutFormData } from './aboutDashboardTypes';

interface AboutTabVisionMissionProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

export function AboutTabVisionMission({ form, setForm }: AboutTabVisionMissionProps) {
  const updateVM = (field: string, value: string) => {
    setForm(prev => ({ ...prev, visionMission: { ...prev.visionMission, [field]: value } }));
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <h2 className="text-xl font-bold text-amber-800 dark:text-pharaohGold border-b border-slate-200 dark:border-white/10 pb-3">الرؤية والرسالة (Vision & Mission)</h2>

      {/* Vision */}
      <div className="space-y-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <h3 className="text-md font-bold text-slate-900 dark:text-white">قسم الرؤية (Our Vision)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">عنوان الرؤية (عربي)</label>
            <input
              type="text"
              placeholder="رؤيتنا"
              value={form.visionMission.visionTitle_ar || ''}
              onChange={(e) => updateVM('visionTitle_ar', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Vision Title (English)</label>
            <input
              type="text"
              placeholder="Our Vision"
              value={form.visionMission.visionTitle_en || ''}
              onChange={(e) => updateVM('visionTitle_en', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              dir="ltr"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">نص الرؤية (عربي)</label>
            <textarea
              rows={3}
              placeholder="أن نعيد كتابة تاريخ التكنولوجيا بأيادٍ مصرية..."
              value={form.visionMission.visionText_ar || ''}
              onChange={(e) => updateVM('visionText_ar', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Vision Text (English)</label>
            <textarea
              rows={3}
              placeholder="To rewrite technology history through engineering mastery..."
              value={form.visionMission.visionText_en || ''}
              onChange={(e) => updateVM('visionText_en', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="space-y-4">
        <h3 className="text-md font-bold text-slate-900 dark:text-white">قسم الرسالة (Our Mission)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">عنوان الرسالة (عربي)</label>
            <input
              type="text"
              placeholder="رسالتنا"
              value={form.visionMission.missionTitle_ar || ''}
              onChange={(e) => updateVM('missionTitle_ar', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Mission Title (English)</label>
            <input
              type="text"
              placeholder="Our Mission"
              value={form.visionMission.missionTitle_en || ''}
              onChange={(e) => updateVM('missionTitle_en', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              dir="ltr"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">نص الرسالة (عربي)</label>
            <textarea
              rows={3}
              placeholder="تمكين طموحات عملائنا عبر تقديم حلول برمجية ذكية..."
              value={form.visionMission.missionText_ar || ''}
              onChange={(e) => updateVM('missionText_ar', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Mission Text (English)</label>
            <textarea
              rows={3}
              placeholder="Empowering our clients' ambitions through intelligent software..."
              value={form.visionMission.missionText_en || ''}
              onChange={(e) => updateVM('missionText_en', e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              dir="ltr"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
