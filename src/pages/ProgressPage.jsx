import { useNavigate } from 'react-router-dom';
import ProgressChart from '../components/Progress/ProgressChart';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import useWorkoutLogs from '../hooks/useWorkoutLogs';
import { computeProgressTotals, groupLogsByDate } from '../utils/helpers';
import chartStyles from '../components/Progress/Progress.module.css';
import styles from './pages.module.css';

function ProgressPage() {
  const navigate = useNavigate();
  const { logs } = useWorkoutLogs();
  const totals = computeProgressTotals(logs);
  const dayCount = Object.keys(groupLogsByDate(logs)).length;

  return (
    <section>
      <Header
        title="Fitness Progress"
        subtitle="Volume and consistency over time"
      >
        <p>Totals and daily volume come from the workouts you have logged.</p>
      </Header>

      <div className={chartStyles.stats}>
        <Card title="Workouts" padding="1.25rem">
          <p className={chartStyles.statValue}>{totals.workouts}</p>
        </Card>
        <Card title="Total volume" padding="1.25rem">
          <p className={chartStyles.statValue}>{totals.volume}</p>
        </Card>
        <Card title="Training days" padding="1.25rem">
          <p className={chartStyles.statValue}>{dayCount}</p>
        </Card>
      </div>

      <Card title="Daily volume">
        <ProgressChart logs={logs} />
        <div className={styles.actions}>
          <Button onClick={() => navigate('/history')}>Log another workout</Button>
        </div>
      </Card>
    </section>
  );
}

export default ProgressPage;
