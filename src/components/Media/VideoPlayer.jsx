import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import styles from './Media.module.css';

function VideoPlayer({
  src,
  title = 'Exercise demonstration',
  poster,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () =>
      setError('This demonstration video could not be loaded.');

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handlePause);
      video.removeEventListener('error', handleError);
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
        controls
        preload="metadata"
      >
        Your browser does not support embedded videos. Open {src} to watch the
        demonstration instead.
      </video>
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
