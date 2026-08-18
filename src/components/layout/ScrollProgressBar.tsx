'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[#9E7D47] via-[#DFB77D] to-[#C5A16F] origin-left shadow-[0_0_12px_rgba(197,161,111,0.8),0_0_24px_rgba(197,161,111,0.4)]"
        style={{ scaleX }}
      />
    </div>
  );
}
