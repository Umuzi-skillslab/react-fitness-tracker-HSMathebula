import { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loading from './components/common/Loading';
import Badge from './components/UI/Badge';
import Button from './components/UI/Button';
import Card from './components/UI/Card';
import Modal from './components/UI/Modal';
import SearchBar from './components/UI/SearchBar';
import { exercisesData } from './data/exercisesData';
import { filterExercises } from './utils/helpers';
import styles from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const featured = filterExercises(exercisesData, { search: query }).slice(0, 3);
  const selectedExercise = exercisesData.find((exercise) => exercise.id === selectedId);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handlePreview = (exerciseId) => {
    setSelectedId(exerciseId);
    setIsModalOpen(true);
  };

  const handleSimulateLoad = () => {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className={styles.page}>
      <Header
        title="Fitness Tracker"
        subtitle={`${featured.length} featured moves`}
        align="left"
      >
        <p>Build strength, plan your week, and track progress.</p>
      </Header>

      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={handleSearchChange} />
        <Button variant={isLoading ? 'secondary' : 'primary'} onClick={handleSimulateLoad}>
          Preview loading
        </Button>
      </div>

      {isLoading ? (
        <Loading message="Fetching featured workouts..." size={40} />
      ) : featured.length === 0 ? (
        <Card title="No matches" elevated={false} padding="1.25rem">
          <p>No exercises match your search.</p>
        </Card>
      ) : (
        <section className={styles.grid}>
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
                <Button onClick={() => handlePreview(exercise.id)}>View details</Button>
                <Button variant="secondary" onClick={() => setSelectedId(exercise.id)}>
                  Select
                </Button>
              </div>
            </Card>
          ))}
        </section>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExercise ? selectedExercise.name : 'Exercise'}
        maxWidth="36rem"
      >
        {selectedExercise ? (
          <>
            <Badge
              label={selectedExercise.difficulty}
              difficulty={selectedExercise.difficulty}
              isActive
            />
            <p>{selectedExercise.instructions.join(' ')}</p>
            <Button variant="danger" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </>
        ) : null}
      </Modal>

      <Footer />
    </div>
  );
}

export default App;
