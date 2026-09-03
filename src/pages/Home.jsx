import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseList from '../components/Exercise/ExerciseList';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import SearchBar from '../components/UI/SearchBar';
import { exercisesData } from '../data/exercisesData';
import { filterExercises } from '../utils/helpers';
import styles from './pages.module.css';

function Home() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const featured = filterExercises(exercisesData, { search: query }).slice(0, 3);

  return (
    <section>
      <Header
        title="Fitness Tracker"
        subtitle={`${featured.length} featured moves`}
        align="left"
      >
        <p>Build strength, plan your week, and track progress.</p>
      </Header>

      <div className={styles.toolbar}>
        <SearchBar
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button variant="secondary" onClick={() => navigate('/exercises')}>
          Browse all exercises
        </Button>
      </div>

      <ExerciseList
        exercises={featured}
        selectedId={selectedId}
        emptyMessage="No featured exercises match your search."
        onSelect={(exercise) => {
          setSelectedId(exercise.id);
          navigate(`/exercises/${exercise.id}`);
        }}
        onAddToPlan={() => navigate('/planner')}
      />
    </section>
  );
}

export default Home;
