/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
export default function HomeTeamModal() {
  return (
    <>
      <div 
        id="team-profile-modal"
        className="fixed inset-0 z-[250] hidden bg-[#0A192F]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
      >
        <div
          className="w-full max-w-4xl bg-[#112240] border-t-2 border-r-2 border-[#C5A16F]/40 rounded-3xl md:rounded-tr-[4rem] md:rounded-bl-[4rem] shadow-[0_25px_60px_rgba(197,161,111,0.15)] relative overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col text-right"
          dir="rtl"
        >
          <button 
            id="close-team-modal"
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0A192F] border border-[#C5A16F]/30 text-[#C5A16F] hover:rotate-90 hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-300 flex items-center justify-center font-bold text-xs sm:text-sm shadow-md"
          >
            ✕
          </button>

          <div className="p-4 sm:p-8 md:p-12 overflow-y-auto custom-modal-scroll flex-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] sm:text-[18rem] font-serif opacity-[0.015] text-[#C5A16F] select-none pointer-events-none">
              ✦
            </div>

            {/* Header section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-right gap-5 sm:gap-8 md:gap-10 border-b border-[#C5A16F]/10 pb-6 sm:pb-8 mb-6 sm:mb-8 relative z-10">
              <div className="w-32 h-40 sm:w-44 sm:h-56 rounded-2xl sm:rounded-tr-[3rem] sm:rounded-bl-[3rem] overflow-hidden p-1 border-2 border-[#C5A16F]/40 shadow-2xl shrink-0 bg-[#0A192F]">
                <img 
                  id="modal-member-img"
                  className="w-full h-full object-cover rounded-xl sm:rounded-tr-[2.8rem] sm:rounded-bl-[2.8rem]" 
                  alt="Member"
                />
              </div>
              <div className="flex-1">
                <span 
                  id="modal-member-role-tag"
                  className="inline-block bg-[#C5A16F]/10 text-[#C5A16F] text-[10px] sm:text-xs font-bold px-3.5 py-1 sm:py-1.5 rounded-lg tracking-wider uppercase border border-[#C5A16F]/20 shadow-sm"
                />
                <h2 
                  id="modal-member-name"
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3 sm:mt-4 mb-2 sm:mb-3 tracking-tight"
                />
                <p
                  className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-light"
                  id="modal-member-desc"
                />
              </div>
            </div>

            {/* Skills & Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
              <div className="space-y-4 sm:space-y-5 bg-[#0A192F]/50 p-4 sm:p-6 rounded-2xl sm:rounded-tr-[2.5rem] sm:rounded-bl-[2.5rem] border border-white/5 shadow-inner">
                <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="text-[#C5A16F] text-base">✦</span>
                  المهارات والخبرات الفنية
                </h4>
                <div>
                  <div className="flex justify-between text-xs text-gray-300 font-medium mb-1.5">
                    <span id="modal-skill1-name"></span>
                    <span id="modal-skill1-val" className="text-[#C5A16F] font-bold"></span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden">
                    <div id="modal-skill1-bar" className="h-full bg-[#C5A16F] transition-all duration-[1200ms] rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-300 font-medium mb-1.5">
                    <span id="modal-skill2-name"></span>
                    <span id="modal-skill2-val" className="text-[#C5A16F] font-bold"></span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden">
                    <div id="modal-skill2-bar" className="h-full bg-[#C5A16F] transition-all duration-[1200ms] rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-300 font-medium mb-1.5">
                    <span id="modal-skill3-name"></span>
                    <span id="modal-skill3-val" className="text-[#C5A16F] font-bold"></span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden">
                    <div id="modal-skill3-bar" className="h-full bg-[#C5A16F] transition-all duration-[1200ms] rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-5 sm:gap-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-[#0A192F]/50 border border-white/5 p-3.5 sm:p-5 rounded-xl text-center shadow-md">
                    <span id="modal-stat1-val" className="text-2xl sm:text-3xl font-black text-[#C5A16F] block mb-0.5 sm:mb-1"></span>
                    <span id="modal-stat1-lbl" className="text-gray-400 text-[11px] sm:text-xs"></span>
                  </div>
                  <div className="bg-[#0A192F]/50 border border-white/5 p-3.5 sm:p-5 rounded-xl text-center shadow-md">
                    <span id="modal-stat2-val" className="text-2xl sm:text-3xl font-black text-[#C5A16F] block mb-0.5 sm:mb-1"></span>
                    <span id="modal-stat2-lbl" className="text-gray-400 text-[11px] sm:text-xs"></span>
                  </div>
                </div>

                <div className="border-t border-[#C5A16F]/10 pt-4 sm:pt-5">
                  <span className="text-gray-400 text-xs block mb-2.5 sm:mb-3 font-medium">تواصل :</span>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    <a 
                      id="link-fb" 
                      href="#" 
                      target="_blank"
                      className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-[#0A192F] text-gray-200 hover:text-[#C5A16F] hover:border-[#C5A16F]/80 border border-white/10 transition-all text-center text-xs font-bold tracking-wide shadow-md"
                    >
                      Facebook
                    </a>
                    <a 
                      id="link-insta" 
                      href="#" 
                      target="_blank"
                      className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-[#0A192F] text-gray-200 hover:text-[#C5A16F] hover:border-[#C5A16F]/80 border border-white/10 transition-all text-center text-xs font-bold tracking-wide shadow-md"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
