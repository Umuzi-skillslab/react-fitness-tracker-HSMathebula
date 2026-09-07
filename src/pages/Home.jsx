import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ExerciseList from '../components/Exercise/ExerciseList';
import AudioPlayer from '../components/Media/AudioPlayer';
import AddToPlanModal from '../components/Planner/AddToPlanModal';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import SearchBar from '../components/UI/SearchBar';
import Toast from '../components/UI/Toast';
import { audioTracks, exercisesData } from '../data/exercisesData';
import useNotice from '../hooks/useNotice';
import useWeeklyPlan from '../hooks/useWeeklyPlan';
import useWorkoutLogs from '../hooks/useWorkoutLogs';
import {
  countPlannedExercises,
  filterExercises,
  formatDisplayDate,
  getLastWorkoutDate,
  getWeekdayName,
} from '../utils/helpers';
import styles from './pages.module.css';

function Home() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [pendingExercise, setPendingExercise] = useState(null);
  const { notice, showNotice, clearNotice } = useNotice();
  const { plan, toggleDone } = useWeeklyPlan();
  const { logs } = useWorkoutLogs();
  const navigate = useNavigate();

  const today = getWeekdayName();
  const todaysPlan = plan[today] || [];
  const plannedCount = countPlannedExercises(plan);
  const lastWorkout = getLastWorkoutDate(logs);

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
                <strong>{plannedCount}</strong>
                Planned this week
              </li>
              <li>
                <strong>{logs.length}</strong>
                Sessions logged
              </li>
              <li>
                <strong>{lastWorkout ? formatDisplayDate(lastWorkout) : '—'}</strong>
                Last workout
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

      <Toast message={notice} onClear={clearNotice} />

      <Card title={`${today}'s session`} padding="1.25rem">
        {todaysPlan.length === 0 ? (
          <div>
            <p>Nothing planned for {today}. Add a few moves and this becomes your start line.</p>
            <div className={styles.actions}>
              <Button onClick={() => navigate('/planner')}>Plan your week</Button>
              <Button variant="secondary" onClick={() => navigate('/exercises')}>
                Browse exercises
              </Button>
            </div>
          </div>
        ) : (
          <ul className={styles.todayList}>
            {todaysPlan.map((exercise) => (
              <li
                key={exercise.id}
                className={`${styles.todayItem} ${
                  exercise.done ? styles.todayItemDone : ''
                }`}
              >
                <div>
                  <p className={styles.todayName}>{exercise.name}</p>
                  <p className={styles.todayMeta}>
                    {[exercise.muscleGroup, exercise.difficulty]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
                <div className={styles.actions}>
                  <Button
                    variant="secondary"
                    onClick={() => toggleDone(today, exercise.id)}
                  >
                    {exercise.done ? 'Undo done' : 'Mark done'}
                  </Button>
                  <Button
                    onClick={() =>
                      navigate('/history', {
                        state: {
                          exerciseId: exercise.id,
                          exerciseName: exercise.name,
                        },
                      })
                    }
                  >
                    Log
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

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

export default Home;
