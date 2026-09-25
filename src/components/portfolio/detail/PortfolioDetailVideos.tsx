'use client';

import { type DetailTheme } from './detailHelpers';

interface Props {
  videos: string[];
  theme: DetailTheme;
}

/** Project videos: a single video is shown full width, several go into a two-column grid. */
export function PortfolioDetailVideos({ videos, theme }: Props) {
  return (
    <div className={`grid gap-5 ${videos.length > 1 ? 'md:grid-cols-2' : ''}`}>
      {videos.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`relative rounded-3xl p-2 border ${theme.card}`}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
            <video
              src={src}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
