import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseList from '../components/Exercise/ExerciseList';
import AddToPlanModal from '../components/Planner/AddToPlanModal';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import SearchBar from '../components/UI/SearchBar';
import Toast from '../components/UI/Toast';
import { exercisesData } from '../data/exercisesData';
import useNotice from '../hooks/useNotice';
import {
  filterExercises,
  getUniqueValues,
  sortExercises,
} from '../utils/helpers';
import styles from './pages.module.css';

const INITIAL_FILTERS = {
  category: '',
  muscleGroup: '',
  difficulty: '',
  sortBy: 'name',
};

function ExercisesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedId, setSelectedId] = useState(null);
  const [pendingExercise, setPendingExercise] = useState(null);
  const { notice, showNotice, clearNotice } = useNotice();
  const [isLoading, setIsLoading] = useState(true);

  const chips = [
    search
      ? { key: 'search', label: search, clear: () => setSearch('') }
      : null,
    filters.category
      ? {
          key: 'category',
          label: filters.category,
          clear: () => setFilters((current) => ({ ...current, category: '' })),
        }
      : null,
    filters.muscleGroup
      ? {
          key: 'muscle',
          label: filters.muscleGroup,
          clear: () => setFilters((current) => ({ ...current, muscleGroup: '' })),
        }
      : null,
    filters.difficulty
      ? {
          key: 'difficulty',
          label: filters.difficulty,
          clear: () => setFilters((current) => ({ ...current, difficulty: '' })),
        }
      : null,
  ].filter(Boolean);

  useEffect(() => {
    // Brief load state stands in for a catalog fetch.
    const timer = window.setTimeout(
      () => setIsLoading(false),
      process.env.JEST_WORKER_ID ? 0 : 250
    );
    return () => window.clearTimeout(timer);
  }, []);

  // Search and filter siblings share this parent state, then we sort before render.
  const visibleExercises = sortExercises(
    filterExercises(exercisesData, { search, ...filters }),
    filters.sortBy
  );

  const handleSelect = (exercise) => {
    setSelectedId(exercise.id);
    navigate(`/exercises/${exercise.id}`);
  };

  return (
    <section>
      <Header
        title="Exercise Library"
        subtitle={`${visibleExercises.length} of ${exercisesData.length} movements`}
      >
        <p>Search, filter, and sort the catalog, then open a movement for form cues.</p>
      </Header>

      <Toast message={notice} onClear={clearNotice} />

      <div className={styles.controls}>
        <SearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {chips.length ? (
          <div className={styles.chips} aria-label="Active filters">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className={styles.chip}
                onClick={chip.clear}
              >
                {chip.label} ×
              </button>
            ))}
          </div>
        ) : null}
        <ExerciseFilter
          filters={filters}
          categories={getUniqueValues(exercisesData, 'category')}
          muscleGroups={getUniqueValues(exercisesData, 'muscleGroup')}
          difficulties={getUniqueValues(exercisesData, 'difficulty')}
          onFilterChange={setFilters}
          onReset={() => {
            setSearch('');
            setFilters(INITIAL_FILTERS);
          }}
        />
      </div>

      {isLoading ? (
        <Loading message="Loading exercise catalog..." size={40} />
      ) : (
        <ExerciseList
          exercises={visibleExercises}
          selectedId={selectedId}
          onSelect={handleSelect}
          onAddToPlan={setPendingExercise}
        />
      )}

      <AddToPlanModal
        exercise={pendingExercise}
        onClose={() => setPendingExercise(null)}
        onAdded={(exercise, day, result) =>
          showNotice(
            result?.exists
              ? `${exercise.name} is already on ${day}.`
              : `Added ${exercise.name} to ${day}.`
          )
        }
      />
    </section>
  );
}

export default ExercisesPage;
