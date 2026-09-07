import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogForm from '../components/Log/LogForm';
import WorkoutLog from '../components/Log/WorkoutLog';
import Header from '../components/common/Header';
import Card from '../components/UI/Card';
import Toast from '../components/UI/Toast';
import { exercisesData } from '../data/exercisesData';
import useNotice from '../hooks/useNotice';
import useWorkoutLogs from '../hooks/useWorkoutLogs';
import styles from './pages.module.css';

function HistoryPage() {
  const location = useLocation();
  const { logs, addLog, deleteLog, updateLog } = useWorkoutLogs();
  const { notice, showNotice, clearNotice } = useNotice();
  const [editingLog, setEditingLog] = useState(null);

  useEffect(() => {
    if (location.state?.editLogId) {
      const found = logs.find((log) => log.id === location.state.editLogId);
      if (found) {
        setEditingLog(found);
      }
    }
  }, [location.state, logs]);

  const handleSubmit = (entry) => {
    if (editingLog) {
      updateLog(editingLog.id, entry);
      showNotice(`Updated ${entry.exerciseName}.`);
      setEditingLog(null);
      return;
    }

    addLog(entry);
    showNotice(`Logged ${entry.exerciseName}.`);
  };

  return (
    <section>
      <Header
        title="Workout History"
        subtitle={`${logs.length} completed ${logs.length === 1 ? 'session' : 'sessions'}`}
      >
        <p>Record sets, reps, and weight. Logs stay in this browser.</p>
      </Header>

      <Toast message={notice} onClear={clearNotice} />

      <div className={styles.stack}>
        <Card
          title={editingLog ? `Edit ${editingLog.exerciseName}` : 'Log a workout'}
          padding="1.25rem"
        >
          <LogForm
            key={editingLog?.id || location.state?.exerciseId || 'create'}
            exercises={exercisesData}
            logs={logs}
            // Planner "Log workout" navigates here with the chosen exercise id.
            initialExerciseId={location.state?.exerciseId}
            initialLog={editingLog}
            onSubmit={handleSubmit}
          />
        </Card>

        <WorkoutLog
          logs={logs}
          onDelete={(logId) => {
            deleteLog(logId);
            showNotice('Workout log deleted.');
            if (editingLog?.id === logId) {
              setEditingLog(null);
            }
          }}
          onEdit={setEditingLog}
        />
      </div>
    </section>
  );
}

export default HistoryPage;
