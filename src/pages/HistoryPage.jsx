import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import styles from './pages.module.css';

export const sampleLogs = [
  {
    id: '1',
    date: '2026-09-01',
    exerciseName: 'Push-Up',
    sets: 3,
    reps: 12,
    weight: 0,
  },
  {
    id: '2',
    date: '2026-09-02',
    exerciseName: 'Barbell Squat',
    sets: 4,
    reps: 8,
    weight: 60,
  },
];

function HistoryPage() {
  const navigate = useNavigate();

  return (
    <section>
      <Header title="Workout History" subtitle="Recent completed sessions">
        <p>Open a log to use a dynamic route. Full logging arrives later.</p>
      </Header>

      <div className={styles.grid}>
        {sampleLogs.map((log) => (
          <Card key={log.id} title={log.exerciseName}>
            <p>
              {log.date} · {log.sets} sets × {log.reps} reps
            </p>
            <Button onClick={() => navigate(`/history/${log.id}`)}>
              View log
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default HistoryPage;
