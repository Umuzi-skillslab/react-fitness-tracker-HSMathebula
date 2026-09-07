import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExerciseDetail from '../components/Exercise/ExerciseDetail';
import AddToPlanModal from '../components/Planner/AddToPlanModal';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { exercisesData } from '../data/exercisesData';
import { getExerciseById } from '../utils/helpers';
import styles from './pages.module.css';

function ExerciseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pendingExercise, setPendingExercise] = useState(null);
  const [notice, setNotice] = useState('');
  const exercise = getExerciseById(exercisesData, id);

  // Dynamic /exercises/:id still needs a fallback when the id is not in the catalog.
  if (!exercise) {
    return (
      <section>
        <Header title="Exercise not found" subtitle={`No exercise matches id ${id}`} />
        <Card>
          <p>That movement is not in the catalog.</p>
          <div className={styles.actions}>
            <Button onClick={() => navigate('/exercises')}>Back to library</Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <>
      {notice ? (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      ) : null}
      <ExerciseDetail
        exercise={exercise}
        onAddToPlan={setPendingExercise}
        onBack={() => navigate('/exercises')}
      />
      <AddToPlanModal
        exercise={pendingExercise}
        onClose={() => setPendingExercise(null)}
        onAdded={(item, day, result) =>
          setNotice(
            result?.exists
              ? `${item.name} is already on ${day}.`
              : `Added ${item.name} to ${day}.`
          )
        }
      />
    </>
  );
}

export default ExerciseDetailPage;
