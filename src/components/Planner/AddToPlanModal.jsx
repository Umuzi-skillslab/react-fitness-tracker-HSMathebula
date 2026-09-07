import { useState } from 'react';
import PropTypes from 'prop-types';
import useWeeklyPlan from '../../hooks/useWeeklyPlan';
import { WEEK_DAYS } from '../../utils/helpers';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import styles from './Planner.module.css';

function AddToPlanModal({ exercise, onClose, onAdded }) {
  const [day, setDay] = useState('Monday');
  const { plan, addExercise } = useWeeklyPlan();

  if (!exercise) {
    return null;
  }

  const alreadyPlanned = (plan[day] || []).some((item) => item.id === exercise.id);

  const handleAdd = () => {
    addExercise(day, exercise);
    onAdded?.(exercise, day, { exists: alreadyPlanned });
    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`Add ${exercise.name} to your week`}
    >
      <label className={styles.field}>
        Choose a day
        <select
          className={styles.daySelect}
          value={day}
          onChange={(event) => setDay(event.target.value)}
          aria-label="Choose a day"
        >
          {WEEK_DAYS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <p>
        {alreadyPlanned
          ? `${exercise.name} is already on ${day}.`
          : `This will add ${exercise.name} to ${day}.`}
      </p>
      <div className={styles.itemActions}>
        <Button onClick={handleAdd}>
          {alreadyPlanned ? `Keep on ${day}` : `Add to ${day}`}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

AddToPlanModal.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onAdded: PropTypes.func,
};

export default AddToPlanModal;
