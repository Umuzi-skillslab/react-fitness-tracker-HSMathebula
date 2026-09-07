import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import styles from './Media.module.css';

function AudioPlayer({ tracks, heading = 'Workout motivation' }) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

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

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
      audio.removeEventListener('error', handleError);
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
    // Pause the current clip before swapping the source.
    audioRef.current?.pause();
    setCurrentIndex(Number(event.target.value));
  };

  if (!track) {
    return <p className={styles.error}>No motivation tracks are available.</p>;
  }

  return (
    <div className={styles.player}>
      <p className={styles.trackLabel}>
        {heading}: {track.title}
      </p>
      <audio
        key={track.src}
        ref={audioRef}
        className={styles.audio}
        src={track.src}
        controls
        preload="metadata"
      >
        Your browser does not support audio playback. Open {track.src} to listen
        instead.
      </audio>
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
};

export default AudioPlayer;
