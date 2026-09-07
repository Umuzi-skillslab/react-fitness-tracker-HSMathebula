import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import useWorkoutLogs from '../hooks/useWorkoutLogs';
import { calculateVolume, formatDisplayDate, formatVolume } from '../utils/helpers';
import styles from './pages.module.css';

function HistoryDetailPage() {
  const { logId } = useParams();
  const navigate = useNavigate();
  const { logs, deleteLog } = useWorkoutLogs();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const log = logs.find((entry) => entry.id === logId);

  if (!log) {
    return (
      <section>
        <Header title="Log not found" subtitle={`No history item matches ${logId}`} />
        <Card>
          <Button onClick={() => navigate('/history')}>Back to history</Button>
        </Card>
      </section>
    );
  }

  const volume = calculateVolume(log.sets, log.reps, log.weight);
  const loadLabel = log.weight ? `${log.weight} kg` : 'bodyweight';

  return (
    <section>
      <Header
        title={log.exerciseName}
        subtitle={`Logged on ${formatDisplayDate(log.date)}`}
      />
      <Card title={`Workout log #${logId}`}>
        <p>
          {log.sets} sets × {log.reps} reps · {loadLabel}
        </p>
        <p>Volume: {formatVolume(volume)}</p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => navigate('/history')}>
            Back to history
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              navigate('/history', { state: { editLogId: log.id } })
            }
          >
            Edit log
          </Button>
          <Button onClick={() => navigate('/progress')}>See progress</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Delete log
          </Button>
        </div>
      </Card>
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete this log?"
        message={`This will permanently delete the ${log.exerciseName} session.`}
        confirmLabel="Yes, delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          deleteLog(log.id);
          navigate('/history');
        }}
      />
    </section>
  );
}

export default HistoryDetailPage;
