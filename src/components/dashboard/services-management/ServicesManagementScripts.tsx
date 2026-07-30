'use client';

import { useEffect } from 'react';

export default function ServicesManagementScripts() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.$) return;
    
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }

        window.$('#openSidebar').click(function() {
            window.$('#sidebar').removeClass('translate-x-full').addClass('translate-x-0');
            window.$('#sidebarOverlay').fadeIn(200);
        });

        // آلية إغلاق السايدبار في الموبايل
        window.$('#closeSidebar, #sidebarOverlay').click(function() {
            window.$('#sidebar').removeClass('translate-x-0').addClass('translate-x-full');
            window.$('#sidebarOverlay').fadeOut(200);
        });
    };
    
    runScript();

  }, []);

  return null;
}
