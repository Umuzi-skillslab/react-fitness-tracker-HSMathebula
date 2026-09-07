import { act, render, screen } from '@testing-library/react';
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
});
