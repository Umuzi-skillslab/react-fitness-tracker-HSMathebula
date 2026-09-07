import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogForm from '../components/Log/LogForm';
import WorkoutLog from '../components/Log/WorkoutLog';
import Header from '../components/common/Header';
import Card from '../components/UI/Card';
import { exercisesData } from '../data/exercisesData';
import useWorkoutLogs from '../hooks/useWorkoutLogs';
import styles from './pages.module.css';

function HistoryPage() {
  const location = useLocation();
  const { logs, addLog, deleteLog } = useWorkoutLogs();
  const [notice, setNotice] = useState('');

  const handleSubmit = (entry) => {
    addLog(entry);
    setNotice(`Logged ${entry.exerciseName}.`);
  };

  return (
    <section>
      <Header
        title="Workout History"
        subtitle={`${logs.length} completed ${logs.length === 1 ? 'session' : 'sessions'}`}
      >
        <p>Record sets, reps, and weight. Logs stay in this browser.</p>
      </Header>

      {notice ? (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      ) : null}

      <div className={styles.stack}>
        <Card title="Log a workout" padding="1.25rem">
          <LogForm
            exercises={exercisesData}
            initialExerciseId={location.state?.exerciseId}
            onSubmit={handleSubmit}
          />
        </Card>

        <WorkoutLog logs={logs} onDelete={deleteLog} />
      </div>
    </section>
  );
}

export default HistoryPage;
