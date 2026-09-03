import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('uses the default placeholder and reports typed text', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    await user.type(screen.getByRole('searchbox'), 'squat');
    expect(handleChange).toHaveBeenCalled();
    expect(screen.getByPlaceholderText(/search exercises/i)).toBeInTheDocument();
  });
});
