import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './Planner.module.css';

function DayCard({ day, exercises, onRemove, onLog }) {
  const countLabel = `${exercises.length} ${
    exercises.length === 1 ? 'exercise' : 'exercises'
  }`;

  return (
    <Card title={day} padding="1.25rem">
      <div className={styles.dayHeader}>
        <p className={styles.count}>{countLabel}</p>
      </div>

      {exercises.length === 0 ? (
        <p className={styles.empty}>No exercises planned.</p>
      ) : (
        exercises.map((exercise) => (
          <div key={exercise.id} className={styles.item}>
            <p className={styles.itemName}>{exercise.name}</p>
            <div>
              {exercise.difficulty ? (
                <Badge
                  label={exercise.difficulty}
                  difficulty={exercise.difficulty}
                />
              ) : null}
              {exercise.muscleGroup ? (
                <Badge label={exercise.muscleGroup} />
              ) : null}
            </div>
            <div className={styles.itemActions}>
              {onLog ? (
                <Button
                  variant="secondary"
                  onClick={() => onLog(exercise)}
                  ariaLabel={`Log ${exercise.name} from ${day}`}
                >
                  Log workout
                </Button>
              ) : null}
              <Button
                variant="danger"
                onClick={() => onRemove(day, exercise.id)}
                ariaLabel={`Remove ${exercise.name} from ${day}`}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      )}
    </Card>
  );
}

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      difficulty: PropTypes.string,
      muscleGroup: PropTypes.string,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onLog: PropTypes.func,
};

export default DayCard;
