import { useNavigate, useParams } from 'react-router-dom';
import ExerciseDetail from '../components/Exercise/ExerciseDetail';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { exercisesData } from '../data/exercisesData';
import { getExerciseById } from '../utils/helpers';
import styles from './pages.module.css';

function ExerciseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exercise = getExerciseById(exercisesData, id);

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
    <ExerciseDetail
      exercise={exercise}
      onAddToPlan={() => navigate('/planner')}
      onBack={() => navigate('/exercises')}
    />
  );
}

export default ExerciseDetailPage;
