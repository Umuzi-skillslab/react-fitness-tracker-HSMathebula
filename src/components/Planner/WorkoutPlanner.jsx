import PropTypes from 'prop-types';
import { WEEK_DAYS } from '../../utils/helpers';
import DayCard from './DayCard';
import styles from './Planner.module.css';

function WorkoutPlanner({ plan, onRemove, onLog }) {
  return (
    <div className={styles.week}>
      {WEEK_DAYS.map((day) => (
        <DayCard
          key={day}
          day={day}
          exercises={plan[day] || []}
          onRemove={onRemove}
          onLog={onLog}
        />
      ))}
    </div>
  );
}

WorkoutPlanner.propTypes = {
  plan: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onLog: PropTypes.func,
};

export default WorkoutPlanner;
