import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import useWorkoutLogs from '../hooks/useWorkoutLogs';
import { calculateVolume } from '../utils/helpers';
import styles from './pages.module.css';

function HistoryDetailPage() {
  const { logId } = useParams();
  const navigate = useNavigate();
  const { logs, deleteLog } = useWorkoutLogs();
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
      <Header title={log.exerciseName} subtitle={`Logged on ${log.date}`} />
      <Card title={`Workout log #${logId}`}>
        <p>
          {log.sets} sets × {log.reps} reps · {loadLabel}
        </p>
        <p>Volume: {volume}</p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => navigate('/history')}>
            Back to history
          </Button>
          <Button onClick={() => navigate('/progress')}>See progress</Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteLog(log.id);
              navigate('/history');
            }}
          >
            Delete log
          </Button>
        </div>
      </Card>
    </section>
  );
}

export default HistoryDetailPage;
