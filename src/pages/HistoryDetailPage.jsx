import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { sampleLogs } from './HistoryPage';
import styles from './pages.module.css';

function HistoryDetailPage() {
  const { logId } = useParams();
  const navigate = useNavigate();
  const log = sampleLogs.find((entry) => entry.id === logId);

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

  return (
    <section>
      <Header title={log.exerciseName} subtitle={`Logged on ${log.date}`} />
      <Card title={`Workout log #${logId}`}>
        <p>
          {log.sets} sets × {log.reps} reps
          {log.weight ? ` at ${log.weight} kg` : ' bodyweight'}
        </p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => navigate('/history')}>
            Back to history
          </Button>
          <Button onClick={() => navigate('/progress')}>See progress</Button>
        </div>
      </Card>
    </section>
  );
}

export default HistoryDetailPage;
