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

  test('notifies parent focus and blur handlers', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <>
        <SearchBar value="" onChange={jest.fn()} onFocus={handleFocus} onBlur={handleBlur} />
        <button type="button">Away</button>
      </>
    );

    await user.click(screen.getByRole('searchbox'));
    expect(handleFocus).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /away/i }));
    expect(handleBlur).toHaveBeenCalled();
  });

  test('clears the query when Escape is pressed', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<SearchBar value="squat" onChange={handleChange} />);

    screen.getByRole('searchbox').focus();
    await user.keyboard('{Escape}');

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '' } })
    );
  });
});
