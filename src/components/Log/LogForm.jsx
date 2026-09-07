import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTodayDate } from '../../utils/helpers';
import Button from '../UI/Button';
import styles from './Log.module.css';

function LogForm({ exercises, initialExerciseId = '', onSubmit }) {
  const [exerciseId, setExerciseId] = useState(
    initialExerciseId ? String(initialExerciseId) : ''
  );
  const [date, setDate] = useState(getTodayDate());
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [weight, setWeight] = useState('0');
  const [error, setError] = useState('');

  useEffect(() => {
    // Prefill when the user arrives from the planner "Log workout" action.
    if (initialExerciseId) {
      setExerciseId(String(initialExerciseId));
    }
  }, [initialExerciseId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const selected = exercises.find(
      (exercise) => String(exercise.id) === String(exerciseId)
    );
    const nextSets = Number(sets);
    const nextReps = Number(reps);
    const nextWeight = Number(weight);

    if (!selected) {
      setError('Choose an exercise.');
      return;
    }

    if (!date) {
      setError('Choose a date.');
      return;
    }

    if (nextSets < 1 || nextReps < 1) {
      setError('Sets and reps must be at least 1.');
      return;
    }

    if (Number.isNaN(nextWeight) || nextWeight < 0) {
      setError('Weight cannot be negative.');
      return;
    }

    setError('');
    onSubmit({
      exerciseId: selected.id,
      exerciseName: selected.name,
      date,
      sets: nextSets,
      reps: nextReps,
      weight: nextWeight,
    });
  };

  // noValidate lets our error messages run instead of the browser's min/required UI.
  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={`${styles.field} ${styles.wide}`}>
        Exercise
        <select
          value={exerciseId}
          onChange={(event) => setExerciseId(event.target.value)}
          aria-label="Exercise to log"
        >
          <option value="">Select an exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Date
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-label="Workout date"
        />
      </label>

      <label className={styles.field}>
        Sets
        <input
          type="number"
          min="1"
          value={sets}
          onChange={(event) => setSets(event.target.value)}
          aria-label="Sets"
        />
      </label>

      <label className={styles.field}>
        Reps
        <input
          type="number"
          min="1"
          value={reps}
          onChange={(event) => setReps(event.target.value)}
          aria-label="Reps"
        />
      </label>

      <label className={styles.field}>
        Weight (kg)
        <input
          type="number"
          min="0"
          step="0.5"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          aria-label="Weight in kilograms"
        />
      </label>

      {error ? (
        <p className={`${styles.error} ${styles.wide}`} role="alert">
          {error}
        </p>
      ) : null}

      <div className={`${styles.actions} ${styles.wide}`}>
        <Button type="submit">Log workout</Button>
      </div>
    </form>
  );
}

LogForm.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialExerciseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSubmit: PropTypes.func.isRequired,
};

export default LogForm;
