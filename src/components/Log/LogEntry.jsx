import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { calculateVolume, formatDisplayDate, formatVolume } from '../../utils/helpers';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ConfirmDialog from '../UI/ConfirmDialog';
import styles from './Log.module.css';

function LogEntry({ log, onDelete, onEdit }) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const volume = calculateVolume(log.sets, log.reps, log.weight);
  const loadLabel = log.weight ? `${log.weight} kg` : 'bodyweight';

  return (
    <Card title={log.exerciseName} padding="1.25rem">
      <p className={styles.entryMeta}>
        {formatDisplayDate(log.date)} · {log.sets} sets × {log.reps} reps · {loadLabel}
      </p>
      <p className={styles.entryMeta}>Volume: {formatVolume(volume)}</p>
      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={() => navigate(`/history/${log.id}`)}
        >
          View log
        </Button>
        {onEdit ? (
          <Button variant="secondary" onClick={() => onEdit(log)}>
            Edit
          </Button>
        ) : null}
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          Delete
        </Button>
      </div>
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete this log?"
        message={`This will permanently delete the ${log.exerciseName} session from ${formatDisplayDate(log.date)}.`}
        confirmLabel="Yes, delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete(log.id);
          setConfirmOpen(false);
        }}
      />
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
  onEdit: PropTypes.func,
};

export default LogEntry;
