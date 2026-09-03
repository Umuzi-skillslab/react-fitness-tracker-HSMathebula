import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { exercisesData } from '../data/exercisesData';
import styles from './pages.module.css';

function ExercisesPage() {
  const navigate = useNavigate();

  return (
    <section>
      <Header
        title="Exercise Library"
        subtitle={`${exercisesData.length} movements ready to train`}
      >
        <p>Browse the catalog. Search and filters arrive in the next step.</p>
      </Header>

      <div className={styles.grid}>
        {exercisesData.map((exercise) => (
          <Card key={exercise.id} title={exercise.name}>
            <div className={styles.meta}>
              <Badge label={exercise.difficulty} difficulty={exercise.difficulty} />
              <Badge label={exercise.muscleGroup} />
            </div>
            <Button onClick={() => navigate(`/exercises/${exercise.id}`)}>
              View details
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ExercisesPage;
