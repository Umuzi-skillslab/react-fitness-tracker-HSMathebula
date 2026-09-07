import PropTypes from 'prop-types';
import Card from '../UI/Card';
import ExerciseCard from './ExerciseCard';
import styles from './Exercise.module.css';

function ExerciseList({
  exercises,
  onSelect,
  onAddToPlan,
  selectedId,
  emptyMessage = 'No exercises match your search.',
}) {
  if (exercises.length === 0) {
    // Search and filter can yield zero results; keep the layout with an empty card.
    return (
      <Card title="No matches" elevated={false} padding="1.25rem">
        <p>{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className={styles.grid}>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          isSelected={exercise.id === selectedId}
          showPreview={exercise.instructions?.length > 0}
          onSelect={onSelect}
          onAddToPlan={onAddToPlan}
        />
      ))}
    </div>
  );
}

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      muscleGroup: PropTypes.string,
      difficulty: PropTypes.string,
      instructions: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func,
  selectedId: PropTypes.number,
  emptyMessage: PropTypes.string,
};

export default ExerciseList;
