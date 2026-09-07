import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ExerciseDetailPage from './ExerciseDetailPage';

describe('ExerciseDetailPage', () => {
  test('shows an error state for an unknown exercise', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/exercises/999']}>
        <Routes>
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
          <Route path="/exercises" element={<p>Library page</p>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /exercise not found/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /back to library/i }));
    expect(screen.getByText(/library page/i)).toBeInTheDocument();
  });

  test('adds a catalog exercise to the planner', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/exercises/2']}>
        <Routes>
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /add to planner/i }));
    await user.click(screen.getByRole('button', { name: /add to monday/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/added push-up to monday/i);

    await user.click(screen.getByRole('button', { name: /add to planner/i }));
    await user.click(screen.getByRole('button', { name: /keep on monday/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/already on monday/i);
  });

  test('loads a different demonstration video for each exercise', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/exercises/1']}>
        <Routes>
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const squatSrc = document.querySelector('video').getAttribute('src');
    unmount();

    render(
      <MemoryRouter initialEntries={['/exercises/2']}>
        <Routes>
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const pushUpSrc = document.querySelector('video').getAttribute('src');
    expect(squatSrc).toBeTruthy();
    expect(pushUpSrc).toBeTruthy();
    expect(squatSrc).not.toEqual(pushUpSrc);
  });
});
