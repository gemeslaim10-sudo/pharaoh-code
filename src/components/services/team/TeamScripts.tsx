'use client';

import { useEffect } from 'react';

export default function TeamScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if jQuery and Swiper are loaded before running
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }
        
        window.$(document).ready(function() {
            
            // تم تحويل الضغط إلى صفحة تفاصيل الخبير كاملة، هذا الجزء معطل لمنع تداخل النافذة المنبثقة
            /*
            window.$('.team-card').click(function(this: Element) {
                const card = window.$(this);
                
                // استخلاص كامل البيانات والمهارات المخزنة بخصائص الـ Data Attributes للكارت
                const name = card.attr('data-name') ?? '';
                const role = card.attr('data-role') ?? '';
                const img = card.attr('data-img') ?? '';
                const desc = card.attr('data-desc') ?? '';
                
                const s1Name = card.attr('data-skill1-name') ?? '';
                const s1Val = card.attr('data-skill1-val') ?? '';
                const s2Name = card.attr('data-skill2-name') ?? '';
                const s2Val = card.attr('data-skill2-val') ?? '';
                const s3Name = card.attr('data-skill3-name') ?? '';
                const s3Val = card.attr('data-skill3-val') ?? '';

                const stat1Val = card.attr('data-stat1') ?? '';
                const stat1Lbl = card.attr('data-stat1-lbl') ?? '';
                const stat2Val = card.attr('data-stat2') ?? '';
                const stat2Lbl = card.attr('data-stat2-lbl') ?? '';
                
                const fb = card.attr('data-fb');
                const insta = card.attr('data-insta');

                // حقن وتبديل البيانات فورا بداخل الحاويات المخصصة لها بالـ Modal
                window.$('#modal-member-name').text(name);
                window.$('#modal-member-role-tag').text(role);
                window.$('#modal-member-img').attr('src', img);
                window.$('#modal-member-desc').text(desc);

                window.$('#modal-skill1-name').text(s1Name);
                window.$('#modal-skill1-val').text(s1Val);
                window.$('#modal-skill2-name').text(s2Name);
                window.$('#modal-skill2-val').text(s2Val);
                window.$('#modal-skill3-name').text(s3Name);
                window.$('#modal-skill3-val').text(s3Val);

                window.$('#modal-stat1-val').text(stat1Val);
                window.$('#modal-stat1-lbl').text(stat1Lbl);
                window.$('#modal-stat2-val').text(stat2Val);
                window.$('#modal-stat2-lbl').text(stat2Lbl);

                // آلية إظهار أو إخفاء الأزرار النصية للفيسبوك والإنستغرام بناءً على تعبئتها
                if(fb && fb !== '#') { window.$('#link-fb').attr('href', fb).removeClass('hidden').css('display', 'block'); } else { window.$('#link-fb').addClass('hidden'); }
                if(insta && insta !== '#') { window.$('#link-insta').attr('href', insta).removeClass('hidden').css('display', 'block'); } else { window.$('#link-insta').addClass('hidden'); }

                // فتح الشاشة المنبثقة بحركة ناعمة وتفعيل تمدد أشرطة المهارات تلقائياً
                window.$('#team-profile-modal').removeClass('hidden');
                window.$('#team-profile-modal').css('display', 'flex').hide().fadeIn(400, function() {
                    window.$('#modal-skill1-bar').css('width', s1Val);
                    window.$('#modal-skill2-bar').css('width', s2Val);
                    window.$('#modal-skill3-bar').css('width', s3Val);
                });
                
                // قفل حركة تمرير الصفحة الخلفية للموقع منعا لأي تضارب برمي
                window.$('body').css('overflow', 'hidden'); 
            });
            */

            // آلية الإغلاق وإعادة تهيئة قيم الأشرطة للصفر مجدداً
            window.$('#close-team-modal, #team-profile-modal').click(function(this: Element, e: Event) {
                const target = e.target as HTMLElement;
                if (target !== this && target.id !== 'close-team-modal') return;
                
                window.$('#modal-skill1-bar, #modal-skill2-bar, #modal-skill3-bar').css('width', '0%');
                window.$('#team-profile-modal').fadeOut(300, function(this: Element) {
                    window.$(this).addClass('hidden');
                });
                window.$('body').css('overflow', 'auto'); // استعادة حركة تصفح الموقع الطبيعية
            });
            
            // Preloader Logic
            window.$(window).on('load', function() {
                setTimeout(function() {
                    window.$('#preloader').fadeOut(800, function() {
                        window.$('body').css('overflow', 'auto');
                    });
                }, 2500);
            });

            // Mobile Menu Toggle
            window.$('#open-menu, #close-menu, .m-link').click(function() {
                window.$('#mobile-nav').toggleClass('active');
            });

            // Swiper Init
            if(window.Swiper) {
                void new window.Swiper(".heroSwiper", {
                    loop: true,
                    speed: 1000,
                    autoplay: { delay: 5000, disableOnInteraction: false },
                    pagination: { el: ".swiper-pagination", clickable: true },
                    effect: "fade",
                    fadeEffect: { crossFade: true },
                });
            }
        });
    };
    
    runScript();
    
  }, []);

  return null;
}
