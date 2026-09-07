import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLastLogForExercise, getTodayDate } from '../../utils/helpers';
import Button from '../UI/Button';
import styles from './Log.module.css';

function LogForm({
  exercises,
  initialExerciseId = '',
  initialLog = null,
  logs = [],
  onSubmit,
}) {
  const [exerciseId, setExerciseId] = useState(
    initialLog
      ? String(initialLog.exerciseId ?? '')
      : initialExerciseId
        ? String(initialExerciseId)
        : ''
  );
  const [date, setDate] = useState(initialLog?.date || getTodayDate());
  const [sets, setSets] = useState(
    initialLog ? String(initialLog.sets) : '3'
  );
  const [reps, setReps] = useState(
    initialLog ? String(initialLog.reps) : '10'
  );
  const [weight, setWeight] = useState(
    initialLog ? String(initialLog.weight ?? 0) : '0'
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialLog) {
      setExerciseId(String(initialLog.exerciseId ?? ''));
      setDate(initialLog.date);
      setSets(String(initialLog.sets));
      setReps(String(initialLog.reps));
      setWeight(String(initialLog.weight ?? 0));
      return;
    }

    if (initialExerciseId) {
      setExerciseId(String(initialExerciseId));
    }
  }, [initialExerciseId, initialLog]);

  useEffect(() => {
    if (initialLog || !exerciseId) {
      return;
    }

    const last = getLastLogForExercise(logs, exerciseId);

    if (last) {
      setSets(String(last.sets));
      setReps(String(last.reps));
      setWeight(String(last.weight ?? 0));
    }
  }, [exerciseId, initialLog, logs]);

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

    if (!initialLog) {
      setExerciseId('');
      setDate(getTodayDate());
      setSets('3');
      setReps('10');
      setWeight('0');
    }
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
        <Button type="submit">
          {initialLog ? 'Save changes' : 'Log workout'}
        </Button>
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
  initialLog: PropTypes.shape({
    id: PropTypes.string,
    exerciseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    date: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    weight: PropTypes.number,
  }),
  logs: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
};

export default LogForm;
