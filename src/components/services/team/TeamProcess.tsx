'use client';

export default function TeamProcess() {
  return (
    <section id="our-process" className="py-24 bg-[#0A192F] relative overflow-hidden text-right" dir="rtl">
        <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <circle cx="400" cy="400" r="300" stroke="#C5A16F" strokeWidth="0.5" fill="none" />
                <circle cx="400" cy="400" r="200" stroke="#C5A16F" strokeWidth="0.5" fill="none" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-[#C5A16F] font-bold tracking-[0.3em] uppercase text-xs mb-4">How We Master</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    عقلية <span className="text-[#C5A16F]">الفريق الواحد</span> <br /> في بناء صرحك الرقمي
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative group">
                    <div className="bg-[#112240] p-10 rounded-[3rem] border-b-4 border-transparent group-hover:border-[#C5A16F] transition-all duration-500 h-full">
                        <div className="text-6xl font-black text-[#C5A16F]/10 absolute top-6 left-10 group-hover:text-[#C5A16F]/20 transition-all">01</div>
                        <div className="w-16 h-16 bg-[#C5A16F]/10 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h4 className="text-white text-2xl font-bold mb-4">اندماج العقول (Brain-Sync)</h4>
                        <p className="text-gray-400 leading-relaxed">
                            هنا لا نجلس كشركة وعميل، بل كفريق واحد. نجتمع بكل خبراتنا (مصممين، مطورين، ومحللين) لنفهم رؤيتك ونحولها إلى استراتيجية تقنية متكاملة.
                        </p>
                    </div>
                </div>

                <div className="relative group">
                    <div className="bg-[#112240] p-10 rounded-[3rem] border-b-4 border-transparent group-hover:border-[#C5A16F] transition-all duration-500 h-full">
                        <div className="text-6xl font-black text-[#C5A16F]/10 absolute top-6 left-10 group-hover:text-[#C5A16F]/20 transition-all">02</div>
                        <div className="w-16 h-16 bg-[#C5A16F]/10 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h4 className="text-white text-2xl font-bold mb-4">النحت الرقمي (Precision Coding)</h4>
                        <p className="text-gray-400 leading-relaxed">
                            فريق المطورين لدينا يعملون بتناغم "خلية النحل"؛ حيث نكتب أكواداً نظيفة وقابلة للتوسع، مع مراجعة جماعية لكل سطر برمجي لضمان الصفر أخطاء.
                        </p>
                    </div>
                </div>

                <div className="relative group">
                    <div className="bg-[#112240] p-10 rounded-[3rem] border-b-4 border-transparent group-hover:border-[#C5A16F] transition-all duration-500 h-full">
                        <div className="text-6xl font-black text-[#C5A16F]/10 absolute top-6 left-10 group-hover:text-[#C5A16F]/20 transition-all">03</div>
                        <div className="w-16 h-16 bg-[#C5A16F]/10 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <h4 className="text-white text-2xl font-bold mb-4">إطلاق الصرح (The Grand Reveal)</h4>
                        <p className="text-gray-400 leading-relaxed">
                            نحن لا نسلمك ملفات ونرحل، بل نطلق المشروع مع دعم فني مستمر وتطوير دائم، كأننا شركاؤك في النجاح ولسنا مجرد منفذين.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
