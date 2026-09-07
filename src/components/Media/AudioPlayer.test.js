import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayer from './AudioPlayer';

const tracks = [
  { id: 1, title: 'Power Up', src: '/assets/audio/power-up.mp3' },
  { id: 2, title: 'Stay Strong', src: '/assets/audio/stay-strong.mp3' },
];

describe('AudioPlayer', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  test('renders the selected track and play control', () => {
    render(<AudioPlayer tracks={tracks} />);

    expect(screen.getByText(/workout motivation: power up/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play audio/i })).toBeInTheDocument();
  });

  test('plays audio and switches tracks', async () => {
    const user = userEvent.setup();

    render(<AudioPlayer tracks={tracks} />);

    await user.click(screen.getByRole('button', { name: /play audio/i }));
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

    const audio = document.querySelector('audio');
    act(() => {
      audio.dispatchEvent(new Event('play'));
    });
    const pauseButton = await screen.findByRole('button', { name: /pause audio/i });
    Object.defineProperty(audio, 'paused', {
      configurable: true,
      get: () => false,
    });
    await user.click(pauseButton);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();

    await user.selectOptions(
      screen.getByLabelText(/select motivation track/i),
      '1'
    );
    expect(screen.getByText(/workout motivation: stay strong/i)).toBeInTheDocument();
  });

  test('shows a fallback when there are no tracks', () => {
    render(<AudioPlayer tracks={[]} />);
    expect(screen.getByText(/no motivation tracks are available/i)).toBeInTheDocument();
  });

  test('shows an error when audio cannot load', () => {
    render(<AudioPlayer tracks={tracks} />);
    act(() => {
      document.querySelector('audio').dispatchEvent(new Event('error'));
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/could not be loaded/i);
  });
});
