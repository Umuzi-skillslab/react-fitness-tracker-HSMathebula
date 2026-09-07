import { act, render, screen } from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders nothing without a message and dismisses after the delay', () => {
    const handleClear = jest.fn();
    const { rerender } = render(<Toast message="" onClear={handleClear} duration={1000} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    rerender(<Toast message="Added squat." onClear={handleClear} duration={1000} />);
    expect(screen.getByRole('status')).toHaveTextContent(/added squat/i);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
