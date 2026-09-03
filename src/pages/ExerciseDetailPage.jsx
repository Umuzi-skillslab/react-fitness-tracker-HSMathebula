import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Badge from '../components/UI/Badge';
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
    <section>
      <Header title={exercise.name} subtitle={exercise.muscleGroup}>
        <div className={styles.meta}>
          <Badge label={exercise.difficulty} difficulty={exercise.difficulty} isActive />
          <Badge label={exercise.category} />
        </div>
      </Header>

      <Card title="Form cues">
        {exercise.instructions.map((step) => (
          <p key={step}>{step}</p>
        ))}
        <div className={styles.actions}>
          <Button onClick={() => navigate('/planner')}>Add to planner</Button>
          <Button variant="secondary" onClick={() => navigate('/exercises')}>
            Back to library
          </Button>
        </div>
      </Card>
    </section>
  );
}

export default ExerciseDetailPage;
