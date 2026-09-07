import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { calculateVolume } from '../../utils/helpers';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './Log.module.css';

function LogEntry({ log, onDelete }) {
  const navigate = useNavigate();
  const volume = calculateVolume(log.sets, log.reps, log.weight);
  const loadLabel = log.weight ? `${log.weight} kg` : 'bodyweight';

  return (
    <Card title={log.exerciseName} padding="1.25rem">
      <p className={styles.entryMeta}>
        {log.date} · {log.sets} sets × {log.reps} reps · {loadLabel}
      </p>
      <p className={styles.entryMeta}>Volume: {volume}</p>
      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={() => navigate(`/history/${log.id}`)}
        >
          View log
        </Button>
        <Button variant="danger" onClick={() => onDelete(log.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

LogEntry.propTypes = {
  log: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    exerciseName: PropTypes.string.isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    weight: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LogEntry;
