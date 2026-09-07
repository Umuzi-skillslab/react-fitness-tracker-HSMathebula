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

function AudioPlayer({
  tracks,
  heading = 'Workout motivation',
  variant = 'default',
}) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = tracks[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () =>
      setError('This audio track could not be loaded.');
    const handleTime = () => setCurrentTime(audio.currentTime || 0);
    const handleMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('loadedmetadata', handleMeta);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('loadedmetadata', handleMeta);
    };
  }, [track?.src]);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      return;
    }

    audio.pause();
  };

  const handleTrackChange = (event) => {
    setError('');
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    // Pause the current clip before swapping the source.
    audioRef.current?.pause();
    setCurrentIndex(Number(event.target.value));
  };

  if (!track) {
    return <p className={styles.error}>No motivation tracks are available.</p>;
  }

  return (
    <div
      className={`${styles.player} ${
        variant === 'hero' ? styles.playerHero : ''
      }`}
    >
      <p className={styles.trackLabel}>
        {heading}: {track.title}
      </p>
      <audio
        key={track.src}
        ref={audioRef}
        className={`${styles.audio} ${styles.nativeHidden}`}
        src={track.src}
        preload="metadata"
      >
        Your browser does not support audio playback. Open {track.src} to listen
        instead.
      </audio>
      <div className={styles.scrubber}>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          aria-label="Audio progress"
          onChange={(event) => {
            const next = Number(event.target.value);
            if (audioRef.current) {
              audioRef.current.currentTime = next;
            }
            setCurrentTime(next);
          }}
        />
        <p className={styles.time}>
          {formatClock(currentTime)} / {formatClock(duration)}
        </p>
      </div>
      {tracks.length > 1 ? (
        <label className={styles.trackPicker}>
          Track
          <select
            className={styles.trackSelect}
            value={currentIndex}
            onChange={handleTrackChange}
            aria-label="Select motivation track"
          >
            {tracks.map((item, index) => (
              <option key={item.id} value={index}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <div className={styles.controls}>
        <Button onClick={togglePlayback}>
          {isPlaying ? 'Pause audio' : 'Play audio'}
        </Button>
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
  heading: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'hero']),
};

export default AudioPlayer;
