import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import styles from './Exercise.module.css';

function ExerciseDetail({ exercise, onAddToPlan, onBack }) {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const stepCount = exercise.instructions.length;

  return (
    <section>
      <Header title={exercise.name} subtitle={exercise.muscleGroup}>
        <div className={styles.meta}>
          <Badge
            label={exercise.difficulty}
            difficulty={exercise.difficulty}
            isActive
          />
          <Badge label={exercise.category} />
        </div>
      </Header>

      <Card title="Form cues">
        <ol className={styles.steps}>
          {exercise.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className={styles.actions}>
          <Button onClick={onAddToPlan}>Add to planner</Button>
          <Button variant="secondary" onClick={() => setIsChecklistOpen(true)}>
            Open checklist
          </Button>
          <Button variant="secondary" onClick={onBack}>
            Back to library
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        title={`${exercise.name} checklist`}
        maxWidth={stepCount > 3 ? '40rem' : '32rem'}
      >
        <ol className={styles.steps}>
          {exercise.instructions.map((step, index) => (
            <li key={step}>
              Step {index + 1}: {step}
            </li>
          ))}
        </ol>
        <Button variant="danger" onClick={() => setIsChecklistOpen(false)}>
          Close
        </Button>
      </Modal>
    </section>
  );
}

ExerciseDetail.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroup: PropTypes.string,
    difficulty: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAddToPlan: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ExerciseDetail;
