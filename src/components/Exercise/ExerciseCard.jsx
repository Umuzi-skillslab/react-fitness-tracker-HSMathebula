import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './Exercise.module.css';

function ExerciseCard({
  exercise,
  onSelect,
  onAddToPlan,
  isSelected = false,
  showPreview = true,
}) {
  const preview = exercise.instructions?.[0] || 'Form notes coming soon.';

  return (
    <Card
      title={exercise.name}
      isSelected={isSelected}
      padding={isSelected ? '1.25rem' : '1.5rem'}
    >
      <div className={styles.meta}>
        <Badge label={exercise.difficulty} difficulty={exercise.difficulty} />
        <Badge label={exercise.category} />
        <Badge label={exercise.muscleGroup} />
      </div>
      {showPreview ? <p className={styles.preview}>{preview}</p> : null}
      <div className={styles.actions}>
        <Button onClick={() => onSelect(exercise)}>View details</Button>
        {onAddToPlan ? (
          <Button variant="secondary" onClick={() => onAddToPlan(exercise)}>
            Add to planner
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroup: PropTypes.string,
    difficulty: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func,
  isSelected: PropTypes.bool,
  showPreview: PropTypes.bool,
};

export default ExerciseCard;
