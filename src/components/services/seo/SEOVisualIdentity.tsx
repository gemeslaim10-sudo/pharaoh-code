'use client';

import SEOVisualIdentityHeader from './SEOVisualIdentityHeader';
import SEOVisualIdentityFeatures from './SEOVisualIdentityFeatures';
import SEOVisualIdentityStrategy from './SEOVisualIdentityStrategy';
import SEOVisualIdentityIncluded from './SEOVisualIdentityIncluded';

export default function SEOVisualIdentity() {
    return (
        <section id="visual-identity" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-pharaohNavy overflow-hidden" dir="rtl">

            <style>{`
        .pharaoh-3d-icon {
            background: #0D1E36;
            border: 2px solid #1A2F4C;
            box-shadow: 
                inset 2px 2px 5px rgba(255, 255, 255, 0.03),
                inset -4px -4px 10px rgba(0, 0, 0, 0.7),
                4px 6px 18px rgba(0, 0, 0, 0.55),
                0 0 0 1px rgba(197, 161, 111, 0.15);
            position: relative;
            z-index: 1;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .pharaoh-3d-icon::before {
            content: '';
            position: absolute;
            inset: 3px;
            border-radius: 14px;
            border: 1px solid rgba(197, 161, 111, 0.25);
            background: linear-gradient(135deg, rgba(197, 161, 111, 0.08) 0%, rgba(0, 0, 0, 0) 100%);
            box-shadow: inset 1px 1px 3px rgba(197, 161, 111, 0.15);
            pointer-events: none;
            z-index: -1;
        }

        /* أنيميشن الطفو الفخم المخصص للتصميم */
        @media (min-width: 768px) {
            @keyframes pharaohBrandFloat {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-10px) scale(1.02); }
            }
            .pharaoh-brand-animation {
                animation: pharaohBrandFloat 5s ease-in-out infinite;
            }
        }
    `}</style>

            <div className="absolute inset-0 opacity-[0.02] md:opacity-5 pointer-events-none flex items-center justify-center select-none overflow-hidden">
                <span className="text-[20vw] font-black text-pharaohGold tracking-[1rem] md:tracking-[3rem] uppercase">PHARAOH</span>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SEOVisualIdentityHeader />
                <SEOVisualIdentityFeatures />
                <SEOVisualIdentityStrategy />
                <SEOVisualIdentityIncluded />
            </div>
        </section>
    );
}
