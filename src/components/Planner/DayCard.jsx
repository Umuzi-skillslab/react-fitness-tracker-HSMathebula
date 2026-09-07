import { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ConfirmDialog from '../UI/ConfirmDialog';
import styles from './Planner.module.css';

function DayCard({
  day,
  exercises,
  onRemove,
  onLog,
  onToggleDone,
  isToday = false,
}) {
  const [pendingRemove, setPendingRemove] = useState(null);
  const countLabel = `${exercises.length} ${
    exercises.length === 1 ? 'exercise' : 'exercises'
  }`;

  return (
    <div className={isToday ? styles.todayWrap : undefined}>
      <Card title={day} padding="1.25rem" isSelected={isToday}>
        <div className={styles.dayHeader}>
          <p className={styles.count}>{countLabel}</p>
          {isToday ? <span className={styles.todayBadge}>Today</span> : null}
        </div>

        {/* Empty days still render so the full week is visible. */}
        {exercises.length === 0 ? (
          <p className={styles.empty}>No exercises planned.</p>
        ) : (
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`${styles.item} ${exercise.done ? styles.itemDone : ''}`}
            >
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
                {onToggleDone ? (
                  <Button
                    variant="secondary"
                    onClick={() => onToggleDone(day, exercise.id)}
                    ariaLabel={`${exercise.done ? 'Undo' : 'Mark'} ${exercise.name} done on ${day}`}
                  >
                    {exercise.done ? 'Undo done' : 'Mark done'}
                  </Button>
                ) : null}
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
                  onClick={() => setPendingRemove(exercise)}
                  ariaLabel={`Remove ${exercise.name} from ${day}`}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>

      <ConfirmDialog
        isOpen={Boolean(pendingRemove)}
        title={`Remove ${pendingRemove?.name || 'exercise'}?`}
        message={`This will remove ${pendingRemove?.name || 'this exercise'} from ${day}.`}
        confirmLabel="Yes, remove"
        onClose={() => setPendingRemove(null)}
        onConfirm={() => {
          if (pendingRemove) {
            onRemove(day, pendingRemove.id);
          }
          setPendingRemove(null);
        }}
      />
    </div>
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
      done: PropTypes.bool,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onLog: PropTypes.func,
  onToggleDone: PropTypes.func,
  isToday: PropTypes.bool,
};

export default DayCard;
