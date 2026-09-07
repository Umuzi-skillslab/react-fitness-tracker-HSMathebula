import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseList from '../components/Exercise/ExerciseList';
import AudioPlayer from '../components/Media/AudioPlayer';
import AddToPlanModal from '../components/Planner/AddToPlanModal';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import SearchBar from '../components/UI/SearchBar';
import { audioTracks, exercisesData } from '../data/exercisesData';
import { filterExercises } from '../utils/helpers';
import styles from './pages.module.css';

function Home() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [pendingExercise, setPendingExercise] = useState(null);
  const [notice, setNotice] = useState('');
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

      {notice ? (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      ) : null}

      <Card title="Motivation mix" padding="1.25rem">
        <AudioPlayer tracks={audioTracks} />
      </Card>

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
        onAddToPlan={setPendingExercise}
      />

      <AddToPlanModal
        exercise={pendingExercise}
        onClose={() => setPendingExercise(null)}
        onAdded={(exercise, day, result) =>
          setNotice(
            result?.exists
              ? `${exercise.name} is already on ${day}.`
              : `Added ${exercise.name} to ${day}.`
          )
        }
      />
    </section>
  );
}

export default Home;
