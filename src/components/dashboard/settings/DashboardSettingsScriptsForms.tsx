'use client';

import { useEffect } from 'react';

export default function DashboardSettingsScriptsForms() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.$) return;

    window.$(document).ready(function() {


        // 4. حفظ / تعديل وضع الصيانة والبث
        window.$('#form-system').submit(function(this: Element, e) {
            e.preventDefault();
            const systemData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_system') ?? '[]') as Record<string, string>[];
            const obj = {
                mode: window.$('#maintenance-mode').val() as string,
                msg: window.$('#maintenance-msg').val() as string
            };

            if (window.editSystemIdx !== null) {
                systemData[window.editSystemIdx] = obj;
                window.editSystemIdx = null;
                window.$('#btn-save-system').text("تحديث حالة البث").removeClass('from-amber-600').addClass('from-red-500');
                console.warn("تم تعديل وحفظ معايير البث الشامل للمنصة! 🟢🔴");
            } else {
                systemData.push(obj);
                console.warn("تم تسجيل وضبط وضعية البث الجديدة للسيرفر!");
            }

            localStorage.setItem('pharaoh_rec_system', JSON.stringify(systemData));
            (this as HTMLFormElement).reset();
            window.renderTables();
        });
    });
  }, []);

  return null;
}
