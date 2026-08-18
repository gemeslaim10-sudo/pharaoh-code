'use client';

import { useState, useEffect } from 'react';

interface HeroTypingTitleProps {
  part1: string;
  part2: string;
  part3?: string;
  accentClass?: string;
  theme?: string;
  holdTime?: number; // 1500ms
  typingSpeed?: number; // 60ms
  deletingSpeed?: number; // 35ms
}

export function HeroTypingTitle({
  part1,
  part2,
  part3 = '',
  accentClass = 'text-pharaohGold',
  holdTime = 1500,
  typingSpeed = 70,
  deletingSpeed = 35,
}: HeroTypingTitleProps) {
  // Construct the full string with markers or calculate length indices
  const cleanPart1 = part1.trim();
  const cleanPart2 = part2.trim();
  const cleanPart3 = part3 ? part3.trim() : '';

  // Calculate segment boundaries
  const text1 = cleanPart1 ? `${cleanPart1} ` : '';
  const text2 = cleanPart2 ? `${cleanPart2}` : '';
  const text3 = cleanPart3 ? ` ${cleanPart3}` : '';
  const fullText = `${text1}${text2}${text3}`.trim();

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase (positive typing)
      if (displayedLength < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedLength((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Full text reached -> pause/hold for 1.5 seconds (1500ms)
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, holdTime);
      }
    } else {
      // Deleting phase (negative typing)
      if (displayedLength > 0) {
        timeout = setTimeout(() => {
          setDisplayedLength((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        // Fully deleted -> pause briefly before typing again
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedLength, isDeleting, fullText, holdTime, typingSpeed, deletingSpeed]);

  // Reset when text changes (e.g. language change)
  useEffect(() => {
    setDisplayedLength(0);
    setIsDeleting(false);
  }, [fullText]);

  // Calculate slices for each segment based on displayedLength
  const part1End = text1.length;
  const part2End = text1.length + text2.length;

  const currentPart1 = fullText.slice(0, Math.min(displayedLength, part1End));
  const currentPart2 = displayedLength > part1End ? fullText.slice(part1End, Math.min(displayedLength, part2End)) : '';
  const currentPart3 = displayedLength > part2End ? fullText.slice(part2End, displayedLength) : '';

  return (
    <span className="inline">
      {/* Part 1 */}
      <span>{currentPart1}</span>

      {/* Part 2 (Accented with Gold / Preset Class) */}
      {currentPart2 && (
        <span className={`${accentClass} transition-colors duration-300`}>
          {currentPart2}
        </span>
      )}

      {/* Part 3 */}
      {currentPart3 && <span>{currentPart3}</span>}

      {/* Smooth Pulsing Golden Cursor */}
      <span
        aria-hidden="true"
        className="inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.9em] bg-gradient-to-b from-[#DFB77D] via-[#C5A16F] to-[#9E7D47] rounded-sm mx-1 align-middle animate-[pulse_0.8s_ease-in-out_infinite] shadow-[0_0_10px_rgba(197,161,111,0.9),0_0_20px_rgba(197,161,111,0.5)]"
      />
    </span>
  );
}
