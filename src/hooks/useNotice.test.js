import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useNotice from './useNotice';

function NoticeProbe() {
  const { notice, showNotice, clearNotice } = useNotice();

  return (
    <div>
      <p>{notice || 'empty'}</p>
      <button type="button" onClick={() => showNotice('Saved.')}>
        Show
      </button>
      <button type="button" onClick={clearNotice}>
        Clear
      </button>
    </div>
  );
}

describe('useNotice', () => {
  test('shows and clears a notice', async () => {
    const user = userEvent.setup();
    render(<NoticeProbe />);

    expect(screen.getByText('empty')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /show/i }));
    expect(screen.getByText('Saved.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByText('empty')).toBeInTheDocument();
  });
});
