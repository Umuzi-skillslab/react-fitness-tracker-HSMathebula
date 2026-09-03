import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseList from '../components/Exercise/ExerciseList';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import SearchBar from '../components/UI/SearchBar';
import { exercisesData } from '../data/exercisesData';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Brief load state stands in for a catalog fetch.
    const timer = window.setTimeout(() => setIsLoading(false), 250);
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

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <ExerciseFilter
        filters={filters}
        categories={getUniqueValues(exercisesData, 'category')}
        muscleGroups={getUniqueValues(exercisesData, 'muscleGroup')}
        difficulties={getUniqueValues(exercisesData, 'difficulty')}
        onFilterChange={setFilters}
        onReset={() => setFilters(INITIAL_FILTERS)}
      />

      {isLoading ? (
        <Loading message="Loading exercise catalog..." size={40} />
      ) : (
        <ExerciseList
          exercises={visibleExercises}
          selectedId={selectedId}
          onSelect={handleSelect}
          onAddToPlan={() => navigate('/planner')}
        />
      )}
    </section>
  );
}

export default ExercisesPage;
