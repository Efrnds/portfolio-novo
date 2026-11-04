import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import PropTypes from "prop-types";
import { useLanguage } from "../i18n/LanguageContext";
import ConstructionSurface from "./construction/ConstructionSurface";

function ConstructedPoster({ activeBeat, project, progress, alt }) {
  const [frames, setFrames] = useState({ previous: activeBeat, current: activeBeat });
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    setFrames((previous) => previous.current === activeBeat ? previous : { previous: previous.current, current: activeBeat });
  }, [activeBeat]);
  const source = (index) => project.film.frames[index] || project.film.poster;

  return (
    <div className="story-film__frames">
      {frames.previous !== frames.current && <div className="story-film__shot" aria-hidden="true">
        <ConstructionSurface src={source(frames.previous)} alt="" kind={project.slug} progress={progress} />
      </div>}
      <motion.div key={frames.current} className="story-film__shot"
        initial={reduced || frames.previous === frames.current ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
        <ConstructionSurface src={source(frames.current)} alt={alt} kind={project.slug} progress={progress} />
      </motion.div>
    </div>
  );
}

ConstructedPoster.propTypes = { activeBeat: PropTypes.number.isRequired, project: PropTypes.object.isRequired, progress: PropTypes.object.isRequired, alt: PropTypes.string.isRequired };

const videoFiles = import.meta.glob("../assets/videos/*.{mp4,webm}", {
  eager: true,
  import: "default",
  query: "?url",
});

function getVideoSources(id) {
  if (!id) return [];

  return Object.entries(videoFiles)
    .filter(([path]) => path.endsWith(`/${id}.mp4`) || path.endsWith(`/${id}.webm`))
    .map(([path, src]) => ({
      src,
      type: path.endsWith(".webm") ? "video/webm" : "video/mp4",
    }))
    .sort((a) => (a.type === "video/webm" ? -1 : 1));
}

export default function StoryFilm({ activeBeat = 0, className = "", posterFallback = true, project, constructionProgress }) {
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const sources = useMemo(() => getVideoSources(project.film?.id), [project.film?.id]);
  const hasVideo = sources.length > 0 && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !video.ended) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [hasVideo, reduced]);

  if (!hasVideo && !posterFallback) return null;

  const video = <video ref={videoRef} controls muted playsInline poster={project.film.poster} preload="metadata"
    onError={() => setVideoFailed(true)} aria-label={`${copy.homeCases.film}: ${project.title}`}>
    {sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
  </video>;

  return (
    <div
      className={`story-film ${hasVideo ? "has-video" : "has-poster"} ${className}`}
    >
      {hasVideo ? (
        video
      ) : (
        constructionProgress ? <ConstructedPoster activeBeat={activeBeat} project={project} progress={constructionProgress} alt={`${project.title}: ${copy.homeCases.filmSurface}`} /> : <div className="story-film__frames">
          {project.film.frames.map((frame, index) => (
            <img
              key={frame}
              className={activeBeat === index ? "is-active" : ""}
              src={frame}
              alt={activeBeat === index ? `${project.title}: ${copy.homeCases.filmSurface}` : ""}
              aria-hidden={activeBeat !== index}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}

      <div className="story-film__meta" aria-hidden="true">
        <span>{hasVideo ? copy.homeCases.film : copy.homeCases.filmSurface}</span>
        {hasVideo && <span>{project.film.duration}</span>}
      </div>
    </div>
  );
}

StoryFilm.propTypes = {
  activeBeat: PropTypes.number,
  constructionProgress: PropTypes.object,
  className: PropTypes.string,
  posterFallback: PropTypes.bool,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string,
    film: PropTypes.shape({
      duration: PropTypes.string.isRequired,
      frames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      id: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
