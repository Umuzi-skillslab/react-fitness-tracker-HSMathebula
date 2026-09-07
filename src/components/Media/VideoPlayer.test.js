import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  test('shows fallback copy when no source is provided', () => {
    render(<VideoPlayer />);
    expect(screen.getByText(/no demonstration video/i)).toBeInTheDocument();
  });

  test('plays and pauses the video from custom controls', async () => {
    const user = userEvent.setup();

    render(<VideoPlayer src="/assets/videos/exercise-demo.mp4" />);

    const playButton = screen.getByRole('button', { name: /play video/i });
    await user.click(playButton);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

    const video = document.querySelector('video');
    act(() => {
      video.dispatchEvent(new Event('play'));
    });
    const pauseButton = await screen.findByRole('button', { name: /pause video/i });
    Object.defineProperty(video, 'paused', {
      configurable: true,
      get: () => false,
    });
    await user.click(pauseButton);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  test('updates the playhead from the custom scrubber', () => {
    render(<VideoPlayer src="/assets/videos/exercise-demo.mp4" />);
    const video = document.querySelector('video');
    Object.defineProperty(video, 'duration', { configurable: true, value: 40 });
    Object.defineProperty(video, 'currentTime', {
      configurable: true,
      writable: true,
      value: 0,
    });

    act(() => {
      video.dispatchEvent(new Event('loadedmetadata'));
    });

    fireEvent.change(screen.getByLabelText(/video progress/i), {
      target: { value: '9' },
    });
    expect(video.currentTime).toBe(9);

    Object.defineProperty(video, 'currentTime', {
      configurable: true,
      writable: true,
      value: 12,
    });
    act(() => {
      video.dispatchEvent(new Event('timeupdate'));
      video.dispatchEvent(new Event('ended'));
    });
    expect(screen.getByText(/0:12/)).toBeInTheDocument();
  });

  test('shows an error when the video cannot load', () => {
    render(<VideoPlayer src="/assets/videos/exercise-demo.mp4" />);
    act(() => {
      document.querySelector('video').dispatchEvent(new Event('error'));
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/could not be loaded/i);
  });
});
