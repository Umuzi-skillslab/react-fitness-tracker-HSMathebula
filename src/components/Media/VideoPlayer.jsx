import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import styles from './Media.module.css';

function formatClock(seconds) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const mins = Math.floor(total / 60);
  const secs = String(total % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function VideoPlayer({
  src,
  title = 'Exercise demonstration',
  poster,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    setError('');
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () =>
      setError('This demonstration video could not be loaded.');
    const handleTime = () => setCurrentTime(video.currentTime || 0);
    const handleMeta = () => setDuration(video.duration || 0);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTime);
    video.addEventListener('loadedmetadata', handleMeta);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTime);
      video.removeEventListener('loadedmetadata', handleMeta);
    };
  }, [src]);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      await video.play();
      return;
    }

    video.pause();
  };

  if (!src) {
    return <p className={styles.error}>No demonstration video is available.</p>;
  }

  return (
    <div className={styles.player}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        title={title}
        preload="metadata"
      >
        Your browser does not support embedded videos. Open {src} to watch the
        demonstration instead.
      </video>
      <div className={styles.scrubber}>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          aria-label="Video progress"
          onChange={(event) => {
            const next = Number(event.target.value);
            if (videoRef.current) {
              videoRef.current.currentTime = next;
            }
            setCurrentTime(next);
          }}
        />
        <p className={styles.time}>
          {formatClock(currentTime)} / {formatClock(duration)}
        </p>
      </div>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <div className={styles.controls}>
        <Button onClick={togglePlayback}>
          {isPlaying ? 'Pause video' : 'Play video'}
        </Button>
      </div>
    </div>
  );
}

VideoPlayer.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
};

export default VideoPlayer;
