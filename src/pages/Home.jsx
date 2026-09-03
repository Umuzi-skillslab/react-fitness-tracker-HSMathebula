import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import SearchBar from '../components/UI/SearchBar';
import { exercisesData } from '../data/exercisesData';
import { filterExercises } from '../utils/helpers';
import styles from './pages.module.css';

function Home() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const featured = filterExercises(exercisesData, { search: query }).slice(0, 3);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <section>
      <Header
        title="Fitness Tracker"
        subtitle={`${featured.length} featured moves`}
        align="left"
      >
        <p>Build strength, plan your week, and track progress.</p>
      </Header>

      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={handleSearchChange} />
        <Button variant="secondary" onClick={() => navigate('/exercises')}>
          Browse all exercises
        </Button>
      </div>

      {featured.length === 0 ? (
        <Card title="No matches" elevated={false} padding="1.25rem">
          <p>No exercises match your search.</p>
        </Card>
      ) : (
        <div className={styles.grid}>
          {featured.map((exercise) => (
            <Card
              key={exercise.id}
              title={exercise.name}
              padding={query ? '1.15rem' : '1.5rem'}
              isSelected={selectedId === exercise.id}
            >
              <div className={styles.meta}>
                <Badge label={exercise.difficulty} difficulty={exercise.difficulty} />
                <Badge label={exercise.category} />
              </div>
              <p>{exercise.instructions[0]}</p>
              <div className={styles.actions}>
                <Button onClick={() => navigate(`/exercises/${exercise.id}`)}>
                  View details
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedId(exercise.id)}
                >
                  Select
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
