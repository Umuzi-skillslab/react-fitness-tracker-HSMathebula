import PropTypes from 'prop-types';
import { groupLogsByDate } from '../../utils/helpers';
import Card from '../UI/Card';
import LogEntry from './LogEntry';
import styles from './Log.module.css';

function WorkoutLog({ logs, onDelete }) {
  if (logs.length === 0) {
    return (
      <Card title="No workouts yet" elevated={false}>
        <p>Log a session to start your history.</p>
      </Card>
    );
  }

  const grouped = groupLogsByDate(logs);
  const dates = Object.keys(grouped).sort().reverse();

  return (
    <div className={styles.groups}>
      {dates.map((date) => (
        <section key={date}>
          <h3 className={styles.groupTitle}>{date}</h3>
          {grouped[date].map((log) => (
            <LogEntry key={log.id} log={log} onDelete={onDelete} />
          ))}
        </section>
      ))}
    </div>
  );
}

WorkoutLog.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WorkoutLog;
