'use client';

import { useEffect } from 'react';

export default function PortfolioScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if jQuery and Swiper are loaded before running
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }
        
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                // تغيير الـ Active Class للأزرار
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active', 'bg-pharaohGold', 'text-pharaohNavy');
                    btn.classList.add('text-pharaohGold');
                });
                button.classList.add('active', 'bg-pharaohGold', 'text-pharaohNavy');

                const filter = button.getAttribute('data-filter');
                const items = document.querySelectorAll('.portfolio-item');

                items.forEach((item: Element) => {
                    const el = item as HTMLElement;
                    if (filter === 'all' || el.classList.contains(filter ?? '')) {
                        el.style.display = 'block';
                        setTimeout(() => el.style.opacity = '1', 10);
                    } else {
                        el.style.opacity = '0';
                        setTimeout(() => el.style.display = 'none', 500);
                    }
                });
            });
        });
        
        // Preloader Logic
        window.$(window).on('load', function() {
            setTimeout(function() {
                window.$('#preloader').fadeOut(800, function() {
                    window.$('body').css('overflow', 'auto');
                });
            }, 2500);
        });

        window.$(document).ready(function() {
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
