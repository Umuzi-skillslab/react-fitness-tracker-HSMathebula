import PropTypes from 'prop-types';
import { WEEK_DAYS, getWeekdayName } from '../../utils/helpers';
import DayCard from './DayCard';
import styles from './Planner.module.css';

function WorkoutPlanner({
  plan,
  onRemove,
  onLog,
  onToggleDone,
  today = getWeekdayName(),
}) {
  return (
    <div className={styles.week}>
      {WEEK_DAYS.map((day) => (
        <DayCard
          key={day}
          day={day}
          exercises={plan[day] || []}
          onRemove={onRemove}
          onLog={onLog}
          onToggleDone={onToggleDone}
          isToday={day === today}
        />
      ))}
    </div>
  );
}

WorkoutPlanner.propTypes = {
  plan: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onLog: PropTypes.func,
  onToggleDone: PropTypes.func,
  today: PropTypes.string,
};

export default WorkoutPlanner;
