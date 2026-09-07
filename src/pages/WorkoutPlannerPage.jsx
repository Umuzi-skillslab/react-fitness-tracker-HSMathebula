import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import WorkoutPlanner from '../components/Planner/WorkoutPlanner';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Toast from '../components/UI/Toast';
import { exercisesData } from '../data/exercisesData';
import useNotice from '../hooks/useNotice';
import useWeeklyPlan from '../hooks/useWeeklyPlan';
import { WEEK_DAYS, countPlannedExercises, getWeekdayName } from '../utils/helpers';
import styles from '../components/Planner/Planner.module.css';
import pageStyles from './pages.module.css';

function WorkoutPlannerPage() {
  const navigate = useNavigate();
  // Plan is lifted into this hook so Home, library, and this page share one store.
  const { plan, addExercise, removeExercise, toggleDone } = useWeeklyPlan();
  const [day, setDay] = useState('Monday');
  const [exerciseId, setExerciseId] = useState('');
  const { notice, showNotice, clearNotice } = useNotice();

  const plannedCount = countPlannedExercises(plan);
  const today = getWeekdayName();

  const handleCatalogAdd = (event) => {
    event.preventDefault();
    const exercise = exercisesData.find(
      (item) => String(item.id) === String(exerciseId)
    );

    if (!exercise) {
      showNotice('Choose an exercise to add.');
      return;
    }

    addExercise(day, exercise);
    showNotice(`Added ${exercise.name} to ${day}.`);
    setExerciseId('');
  };

  return (
    <section>
      <Header
        title="Weekly Workout Planner"
        subtitle={`${plannedCount} exercises across Monday through Sunday`}
      >
        <p>Assign movements to each day. Your plan is saved in this browser.</p>
      </Header>

      <Toast message={notice} onClear={clearNotice} />

      <Card title="Add from the catalog" padding="1.25rem">
        <form className={styles.composer} onSubmit={handleCatalogAdd}>
          <label className={styles.field}>
            Day
            <select
              value={day}
              onChange={(event) => setDay(event.target.value)}
              aria-label="Planner day"
            >
              {WEEK_DAYS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            Exercise
            <select
              value={exerciseId}
              onChange={(event) => setExerciseId(event.target.value)}
              aria-label="Planner exercise"
            >
              <option value="">Select an exercise</option>
              {exercisesData.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.composerActions}>
            <Button type="submit">Add to day</Button>
          </div>
        </form>
      </Card>

      {plannedCount === 0 ? (
        <div className={pageStyles.emptyCallout}>
          <Card title="Your week is empty" padding="1.25rem">
            <p>Browse the library and add a few moves to start the week.</p>
            <Button onClick={() => navigate('/exercises')}>Browse exercises</Button>
          </Card>
        </div>
      ) : (
        <div className={pageStyles.toolbar}>
          <Button variant="secondary" onClick={() => navigate('/exercises')}>
            Browse exercises
          </Button>
        </div>
      )}

      <WorkoutPlanner
        plan={plan}
        today={today}
        onRemove={removeExercise}
        onToggleDone={toggleDone}
        onLog={(exercise) =>
          navigate('/history', {
            state: { exerciseId: exercise.id, exerciseName: exercise.name },
          })
        }
      />
    </section>
  );
}

export default WorkoutPlannerPage;
