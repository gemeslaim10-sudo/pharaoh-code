'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    editIdentityIdx: number | null;
    editSecurityIdx: number | null;
    editSocialIdx: number | null;
    editSystemIdx: number | null;
    renderTables: () => void;
  }
}

export default function DashboardSettingsScriptsCore() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.$) return;

    window.$(document).ready(function() {
        window.$('#openSidebar').click(function() {
            window.$('#sidebar').removeClass('translate-x-full').addClass('translate-x-0');
            window.$('#sidebarOverlay').fadeIn(200);
        });
        window.$('#closeSidebar, #sidebarOverlay').click(function() {
            window.$('#sidebar').addClass('translate-x-full').removeClass('translate-x-0');
            window.$('#sidebarOverlay').fadeOut(200);
        });

        window.$('.section-tab-btn').click(function(this: Element) {
            window.$('.section-tab-btn').removeClass('active bg-[#112240] text-white border-pharaohGold').addClass('text-gray-400 border-transparent');
            window.$(this).addClass('active bg-[#112240] text-white border-pharaohGold').removeClass('text-gray-400 border-transparent');
            
            const targetPanel = String(window.$(this).data('target'));
            window.$('.section-panel').addClass('hidden');
            window.$(targetPanel).removeClass('hidden');
        });

        window.editIdentityIdx = null;
        window.editSecurityIdx = null;
        window.editSocialIdx = null;
        window.editSystemIdx = null;

        window.renderTables = function() {
            // 1
            window.$('#table-identity-body').empty();
            const identityData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_identity') ?? '[]') as Record<string, string>[];
            if (identityData.length === 0) {
                window.$('#table-identity-body').html('<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500">لا توجد سجلات هوية حالية. قم بملء النموذج لحفظ أول سجل.</td></tr>');
            }
            identityData.forEach((item, index) => {
                window.$('#table-identity-body').append(`
                    <tr class="border-b border-white/5 hover:bg-white/5 transition">
                        <td class="px-6 py-4 font-bold text-white">${item['name']}</td>
                        <td class="px-6 py-4 truncate max-w-[200px]">${item['title']}</td>
                        <td class="px-6 py-4 truncate max-w-[200px]">${item['keywords'] || 'لا يوجد'}</td>
                        <td class="px-6 py-4 text-center space-x-2 space-x-reverse">
                            <button class="btn-edit-identity text-xs bg-pharaohGold/10 hover:bg-pharaohGold hover:text-pharaohNavy text-pharaohGold px-3 py-1.5 rounded-lg transition" data-index="${index}">تعديل السجل</button>
                            <button class="btn-del-identity text-xs bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 px-3 py-1.5 rounded-lg transition" data-index="${index}">حذف</button>
                        </td>
                    </tr>
                `);
            });

            // 2
            window.$('#table-security-body').empty();
            const securityData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_security') ?? '[]') as Record<string, string>[];
            if (securityData.length === 0) {
                window.$('#table-security-body').html('<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500">لا توجد سجلات مشرفين حالية.</td></tr>');
            }
            securityData.forEach((item, index) => {
                window.$('#table-security-body').append(`
                    <tr class="border-b border-white/5 hover:bg-white/5 transition">
                        <td class="px-6 py-4 font-bold text-white">${item['adminName']}</td>
                        <td class="px-6 py-4">${item['email']}</td>
                        <td class="px-6 py-4">${item['phone']}</td>
                        <td class="px-6 py-4"><span class="bg-pharaohGold/10 text-pharaohGold text-xs font-bold px-2.5 py-1 rounded-md">${(item['role'] ?? '').toUpperCase()}</span></td>
                        <td class="px-6 py-4 text-center space-x-2 space-x-reverse">
                            <button class="btn-edit-security text-xs bg-pharaohGold/10 hover:bg-pharaohGold hover:text-pharaohNavy text-pharaohGold px-3 py-1.5 rounded-lg transition" data-index="${index}">تعديل</button>
                            <button class="btn-del-security text-xs bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 px-3 py-1.5 rounded-lg transition" data-index="${index}">حذف</button>
                        </td>
                    </tr>
                `);
            });

            // 3
            window.$('#table-social-body').empty();
            const socialData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_social') ?? '[]') as Record<string, string>[];
            if (socialData.length === 0) {
                window.$('#table-social-body').html('<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500">لا توجد سجلات قنوات اتصال حالية.</td></tr>');
            }
            socialData.forEach((item, index) => {
                window.$('#table-social-body').append(`
                    <tr class="border-b border-white/5 hover:bg-white/5 transition">
                        <td class="px-6 py-4 truncate max-w-[150px] text-xs">${item['fb']}</td>
                        <td class="px-6 py-4 truncate max-w-[150px] text-xs">${item['li']}</td>
                        <td class="px-6 py-4 truncate max-w-[150px] text-xs">${item['tw']}</td>
                        <td class="px-6 py-4 truncate max-w-[150px] text-xs">${item['gh']}</td>
                        <td class="px-6 py-4 text-center space-x-2 space-x-reverse">
                            <button class="btn-edit-social text-xs bg-pharaohGold/10 hover:bg-pharaohGold hover:text-pharaohNavy text-pharaohGold px-3 py-1.5 rounded-lg transition" data-index="${index}">تعديل</button>
                            <button class="btn-del-social text-xs bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 px-3 py-1.5 rounded-lg transition" data-index="${index}">حذف</button>
                        </td>
                    </tr>
                `);
            });

            // 4
            window.$('#table-system-body').empty();
            const systemData: Record<string, string>[] = JSON.parse(localStorage.getItem('pharaoh_rec_system') ?? '[]') as Record<string, string>[];
            if (systemData.length === 0) {
                window.$('#table-system-body').html('<tr><td colspan="3" class="px-6 py-8 text-center text-gray-500">لا توجد تكوينات بث حالية مسجلة.</td></tr>');
            }
            systemData.forEach((item, index) => {
                const statusBadge = item['mode'] === 'on' ? '🔴 وضع الصيانة المغلق' : '🟢 بث حي ومفتوح للجمهور';
                window.$('#table-system-body').append(`
                    <tr class="border-b border-white/5 hover:bg-white/5 transition">
                        <td class="px-6 py-4 font-bold text-white">${statusBadge}</td>
                        <td class="px-6 py-4 truncate max-w-[250px] text-gray-400">${item['msg']}</td>
                        <td class="px-6 py-4 text-center space-x-2 space-x-reverse">
                            <button class="btn-edit-system text-xs bg-pharaohGold/10 hover:bg-pharaohGold hover:text-pharaohNavy text-pharaohGold px-3 py-1.5 rounded-lg transition" data-index="${index}">تعديل</button>
                            <button class="btn-del-system text-xs bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 px-3 py-1.5 rounded-lg transition" data-index="${index}">حذف</button>
                        </td>
                    </tr>
                `);
            });
        };

        window.renderTables();
    });
  }, []);

  return null;
}
