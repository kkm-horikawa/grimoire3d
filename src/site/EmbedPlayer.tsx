import { Play } from "lucide-react";
import { type JSX, useState } from "react";
import type { VideoEmbed } from "../../cli/video-url.js";

export function EmbeddedVideo({
  title,
  original,
  video,
  loadLabel,
  openLabel,
}: {
  title: string;
  original: string;
  video: VideoEmbed;
  loadLabel: string;
  openLabel: string;
}): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className="paper-embed">
      {loaded ? (
        <iframe
          src={video.source}
          title={title}
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      ) : (
        <button type="button" onClick={() => setLoaded(true)}>
          <Play size={21} aria-hidden /> {loadLabel} · {video.provider}
        </button>
      )}
      <a href={original} target="_blank" rel="noreferrer">
        {openLabel}
      </a>
    </span>
  );
}
