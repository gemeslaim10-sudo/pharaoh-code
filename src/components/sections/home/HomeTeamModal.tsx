/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
export default function HomeTeamModal() {
  return (
    <>
        <div id="team-profile-modal"
            className="fixed inset-0 z-[250] hidden bg-[#0A192F]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6">

            <div
                className="w-full max-w-4xl bg-[#112240] border-t-2 border-r-2 border-[#C5A16F]/40 rounded-tr-[4rem] rounded-bl-[4rem] shadow-[0_25px_60px_rgba(197,161,111,0.15)] relative overflow-hidden max-h-[85vh] flex flex-col text-right"
                dir="rtl">

                <button id="close-team-modal"
                    className="absolute top-6 left-6 z-50 w-10 h-10 rounded-xl bg-[#0A192F] border border-[#C5A16F]/30 text-[#C5A16F] hover:rotate-90 hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-300 flex items-center justify-center font-bold text-sm shadow-md">✕</button>

                <div
                    className="p-6 md:p-12 overflow-y-auto custom-modal-scroll flex-1 relative">

                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] font-serif opacity-[0.01] text-[#C5A16F] select-none pointer-events-none">𓂀</div>

                    <div
                        className="flex flex-col md:flex-row items-center gap-8 md:gap-10 border-b border-[#C5A16F]/10 pb-8 mb-8 relative z-10">
                        <div
                            className="w-44 h-56 rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden p-1 border-2 border-[#C5A16F]/40 shadow-2xl shrink-0 bg-[#0A192F]">
                            <img id="modal-member-img"
                                className="w-full h-full object-cover rounded-tr-[2.8rem] rounded-bl-[2.8rem]" />
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <span id="modal-member-role-tag"
                                className="inline-block bg-[#C5A16F]/10 text-[#C5A16F] text-xs font-bold px-4 py-1.5 rounded-lg tracking-wider uppercase border border-[#C5A16F]/20"></span>
                            <h2 id="modal-member-name"
                                className="text-3xl md:text-4xl font-black text-white mt-4 mb-3 tracking-tight"></h2>
                            <p
                                className="text-gray-300 text-sm leading-relaxed max-w-2xl font-light"
                                id="modal-member-desc"></p>
                        </div>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

                        <div
                            className="space-y-5 bg-[#0A192F]/50 p-6 rounded-tr-[2.5rem] rounded-bl-[2.5rem] border border-white/5 shadow-inner">
                            <h4
                                className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                <span className="text-[#C5A16F] text-base">𓂀</span>
                                المهارات والخبرات الفنية
                            </h4>
                            <div>
                                <div
                                    className="flex justify-between text-xs text-gray-300 font-medium mb-2">
                                    <span id="modal-skill1-name"></span>
                                    <span id="modal-skill1-val"
                                        className="text-[#C5A16F] font-bold"></span>
                                </div>
                                <div
                                    className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden">
                                    <div id="modal-skill1-bar"
                                        className="h-full bg-[#C5A16F] transition-all duration-[1200ms] rounded-full"
                                        style={{ width: "0%" }}></div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="flex justify-between text-xs text-gray-300 font-medium mb-2">
                                    <span id="modal-skill2-name"></span>
                                    <span id="modal-skill2-val"
                                        className="text-[#C5A16F] font-bold"></span>
                                </div>
                                <div
                                    className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden">
                                    <div id="modal-skill2-bar"
                                        className="h-full bg-[#C5A16F] transition-all duration-[1200ms] rounded-full"
                                        style={{ width: "0%" }}></div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="flex justify-between text-xs text-gray-300 font-medium mb-2">
                                    <span id="modal-skill3-name"></span>
                                    <span id="modal-skill3-val"
                                        className="text-[#C5A16F] font-bold"></span>
                                </div>
                                <div
                                    className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden">
                                    <div id="modal-skill3-bar"
                                        className="h-full bg-[#C5A16F] transition-all duration-[1200ms] rounded-full"
                                        style={{ width: "0%" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className="bg-[#0A192F]/50 border border border-white/5 p-5 rounded-xl text-center shadow-md">
                                    <span id="modal-stat1-val"
                                        className="text-3xl font-black text-[#C5A16F] block mb-1"></span>
                                    <span id="modal-stat1-lbl"
                                        className="text-gray-400 text-xs"></span>
                                </div>
                                <div
                                    className="bg-[#0A192F]/50 border border border-white/5 p-5 rounded-xl text-center shadow-md">
                                    <span id="modal-stat2-val"
                                        className="text-3xl font-black text-[#C5A16F] block mb-1"></span>
                                    <span id="modal-stat2-lbl"
                                        className="text-gray-400 text-xs"></span>
                                </div>
                            </div>

                            <div className="border-t border-[#C5A16F]/10 pt-5">
                                <span
                                    className="text-gray-400 text-xs block mb-3 font-medium">
                                    تواصل </span>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a id="link-fb" href="#" target="_blank"
                                        className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] text-gray-300 hover:text-[#C5A16F] hover:border-[#C5A16F]/80 border border-white/5 transition-all text-center text-xs font-bold tracking-wide shadow-md">
                                        Facebook
                                    </a>
                                    <a id="link-insta" href="#" target="_blank"
                                        className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] text-gray-300 hover:text-[#C5A16F] hover:border-[#C5A16F]/80 border border-white/5 transition-all text-center text-xs font-bold tracking-wide shadow-md">
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <style>{`
            .custom-modal-scroll::-webkit-scrollbar { width: 6px; }
            .custom-modal-scroll::-webkit-scrollbar-track { background: #112240; }
            .custom-modal-scroll::-webkit-scrollbar-thumb { background: rgba(197, 161, 111, 0.3); border-radius: 10px; }
            .custom-modal-scroll::-webkit-scrollbar-thumb:hover { background: #C5A16F; }
        `}</style>
    </>
  );
}
