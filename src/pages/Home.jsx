import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseList from '../components/Exercise/ExerciseList';
import AudioPlayer from '../components/Media/AudioPlayer';
import AddToPlanModal from '../components/Planner/AddToPlanModal';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
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

  // Home only highlights three matches so the catalog stays the full library.
  const featured = filterExercises(exercisesData, { search: query }).slice(0, 3);

  return (
    <section>
      <section className={styles.hero} aria-label="Fitness Tracker">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.liveDot} aria-hidden="true" />
              Train today
            </p>
            <Header
              title="Fitness Tracker"
              subtitle={`${featured.length} featured moves`}
              align="left"
              variant="plain"
            >
              <p className={styles.heroLead}>
                Build strength, plan your week, and track progress.
              </p>
            </Header>
            <div className={styles.heroActions}>
              <Button variant="accent" onClick={() => navigate('/exercises')}>
                Start training
              </Button>
              <Button variant="secondary" onClick={() => navigate('/planner')}>
                Plan your week
              </Button>
            </div>
            <ul className={styles.heroStats}>
              <li>
                <strong>{featured.length}</strong>
                Featured moves
              </li>
              <li>
                <strong>7</strong>
                Day planner
              </li>
              <li>
                <strong>Log</strong>
                Track volume
              </li>
            </ul>
          </div>

          <aside className={styles.heroMix}>
            <p className={styles.mixKicker}>
              <span className={styles.eq} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              Now playing
            </p>
            <h2 className={styles.mixTitle}>Motivation mix</h2>
            <AudioPlayer tracks={audioTracks} variant="hero" />
          </aside>
        </div>
      </section>

      {notice ? (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      ) : null}

      <div className={styles.catalogHead}>
        <h2 className={styles.sectionTitle}>Featured moves</h2>
        <div className={styles.toolbar}>
          <SearchBar
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button variant="secondary" onClick={() => navigate('/exercises')}>
            Browse all exercises
          </Button>
        </div>
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
