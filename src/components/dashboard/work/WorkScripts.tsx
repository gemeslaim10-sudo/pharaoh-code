'use client';

import { useEffect } from 'react';

export default function WorkScripts() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.$) return;
    
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }

        window.$(document).ready(function() {
            // 1. منطق رفع الصورة وتحديث اسمها
            window.$('#m-file').change(function(e) {
                const input = e.target as HTMLInputElement;
                if(input.files && input.files.length > 0) {
                    const name = input.files[0]?.name ?? '';
                    window.$('#upload-status-text').text("تم اختيار: " + name).addClass('text-pharaohGold');
                }
            });

            // 2. توليد حقل مهارة جديد عند الضغط على الزر مع زر للحذف
            window.$('#add-skill-btn').click(function() {
                const newSkillHtml = `
                    <div class="space-y-2 relative p-3 bg-[#112240] rounded-xl border border-white/5 animate-fade-in">
                        <input type="text" placeholder="اسم المهارة" required class="w-full bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none">
                        <input type="text" placeholder="النسبة" required class="w-full bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none">
                        <button type="button" class="remove-btn absolute top-1 left-2 text-red-400 hover:text-red-600 text-xs font-bold p-1">إزالة</button>
                    </div>
                `;
                window.$('#skills-container').append(newSkillHtml);
            });

            // 3. توليد حقل إحصائية جديد عند الضغط على الزر مع زر للحذف
            window.$('#add-stat-btn').click(function() {
                const newStatHtml = `
                    <div class="flex gap-2 p-3 bg-[#112240] rounded-xl border border-white/5 relative animate-fade-in">
                        <input type="text" placeholder="الرقم" required class="w-1/3 bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none">
                        <input type="text" placeholder="التسمية" required class="w-2/3 bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none">
                        <button type="button" class="remove-btn absolute top-1 left-2 text-red-400 hover:text-red-600 text-[10px] font-bold p-1">إزالة</button>
                    </div>
                `;
                window.$('#stats-container').append(newStatHtml);
            });

            // 4. حذف الحقل المولد عند الضغط على زر إزالة المخصص له
            window.$(document).on('click', '.remove-btn', function(this: Element) {
                window.$(this).parent().remove();
            });

            // 5. أكشن إرسال الفورم
            window.$('#add-member-form').submit(function(e) {
                e.preventDefault();
                console.warn("تمت معالجة كافة الحقول الافتراضية والديناميكية المضافة بنجاح!");
            });
            
            window.$('#openSidebar').click(function() {
                window.$('#sidebar').removeClass('translate-x-full').addClass('translate-x-0');
                window.$('#sidebarOverlay').fadeIn(200);
            });

            // آلية إغلاق السايدبار في الموبايل
            window.$('#closeSidebar, #sidebarOverlay').click(function() {
                window.$('#sidebar').removeClass('translate-x-0').addClass('translate-x-full');
                window.$('#sidebarOverlay').fadeOut(200);
            });
        });
    };
    
    runScript();

  }, []);

  return null;
}
