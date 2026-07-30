'use client';

import { useEffect } from 'react';

export default function DashboardSettingsScriptsHandlers() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.$) return;

    window.$(document).ready(function() {
        // أ. عمليات تعديل وحذف [ قسم الهوية ]
        window.$(document).on('click', '.btn-edit-identity', function(this: Element) {
            const index = Number(window.$(this).data('index'));
            const identityData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_identity') ?? '[]') as Record<string, string>[];
            const item = identityData[index];
            if (!item) return;

            window.$('#site-name').val(item['name'] ?? '');
            window.$('#site-title').val(item['title'] ?? '');
            window.$('#site-keywords').val(item['keywords'] ?? '');
            window.$('#site-desc').val(item['desc'] ?? '');

            window.editIdentityIdx = index;
            window.$('#btn-save-identity').text("حفظ التعديل الحالي للسجل ✏️");
            const offset = window.$('#form-identity').offset();
            window.$('html, body').animate({ scrollTop: (offset?.top ?? 100) - 100 }, 400);
        });

        window.$(document).on('click', '.btn-del-identity', function(this: Element) {
            if((console.warn('هل تود حذف سجل الهوية هذا نهائياً؟'), true)) {
                const index = Number(window.$(this).data('index'));
                const identityData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_identity') ?? '[]') as Record<string, string>[];
                identityData.splice(index, 1);
                localStorage.setItem('pharaoh_rec_identity', JSON.stringify(identityData));
                window.renderTables();
            }
        });

        // ب. عمليات تعديل وحذف [ قسم الحساب والأمان ]
        window.$(document).on('click', '.btn-edit-security', function(this: Element) {
            const index = Number(window.$(this).data('index'));
            const securityData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_security') ?? '[]') as Record<string, string>[];
            const item = securityData[index];
            if (!item) return;

            window.$('#admin-name').val(item['adminName'] ?? '');
            window.$('#admin-email').val(item['email'] ?? '');
            window.$('#admin-phone').val(item['phone'] ?? '');
            window.$('#admin-role').val(item['role'] ?? '');

            window.editSecurityIdx = index;
            window.$('#btn-save-security').text("حفظ تعديل بيانات الحساب ✏️");
            const offset = window.$('#form-security').offset();
            window.$('html, body').animate({ scrollTop: (offset?.top ?? 100) - 100 }, 400);
        });

        window.$(document).on('click', '.btn-del-security', function(this: Element) {
            if((console.warn('هل تود حذف حساب المسؤول هذا نهائياً من الصلاحيات؟'), true)) {
                const index = Number(window.$(this).data('index'));
                const securityData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_security') ?? '[]') as Record<string, string>[];
                securityData.splice(index, 1);
                localStorage.setItem('pharaoh_rec_security', JSON.stringify(securityData));
                window.renderTables();
            }
        });

        // ج. عمليات تعديل وحذف [ قسم السوشيال ميديا ]
        window.$(document).on('click', '.btn-edit-social', function(this: Element) {
            const index = Number(window.$(this).data('index'));
            const socialData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_social') ?? '[]') as Record<string, string>[];
            const item = socialData[index];
            if (!item) return;

            window.$('#social-fb').val(item['fb'] ?? '');
            window.$('#social-li').val(item['li'] ?? '');
            window.$('#social-tw').val(item['tw'] ?? '');
            window.$('#social-gh').val(item['gh'] ?? '');

            window.editSocialIdx = index;
            window.$('#btn-save-social').text("حفظ تعديل قنوات التواصل ✏️");
            const offset = window.$('#form-social').offset();
            window.$('html, body').animate({ scrollTop: (offset?.top ?? 100) - 100 }, 400);
        });

        window.$(document).on('click', '.btn-del-social', function(this: Element) {
            if((console.warn('هل تريد مسح سجل قنوات الاتصال هذا؟'), true)) {
                const index = Number(window.$(this).data('index'));
                const socialData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_social') ?? '[]') as Record<string, string>[];
                socialData.splice(index, 1);
                localStorage.setItem('pharaoh_rec_social', JSON.stringify(socialData));
                window.renderTables();
            }
        });

        // د. عمليات تعديل وحذف [ قسم حالة المنصة والبث ]
        window.$(document).on('click', '.btn-edit-system', function(this: Element) {
            const index = Number(window.$(this).data('index'));
            const systemData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_system') ?? '[]') as Record<string, string>[];
            const item = systemData[index];
            if (!item) return;

            window.$('#maintenance-mode').val(item['mode'] ?? '');
            window.$('#maintenance-msg').val(item['msg'] ?? '');

            window.editSystemIdx = index;
            window.$('#btn-save-system').text("حفظ تعديل حالة البث الحالية ✏️").removeClass('from-red-500').addClass('from-amber-600');
            const offset = window.$('#form-system').offset();
            window.$('html, body').animate({ scrollTop: (offset?.top ?? 100) - 100 }, 400);
        });

        window.$(document).on('click', '.btn-del-system', function(this: Element) {
            if((console.warn('هل ترغب في التخلص من سجل حالة النظام هذا؟'), true)) {
                const index = Number(window.$(this).data('index'));
                const systemData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_system') ?? '[]') as Record<string, string>[];
                systemData.splice(index, 1);
                localStorage.setItem('pharaoh_rec_system', JSON.stringify(systemData));
                window.renderTables();
            }
        });
    });
  }, []);

  return null;
}
