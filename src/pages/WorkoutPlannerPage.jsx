import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

function WorkoutPlannerPage() {
  const navigate = useNavigate();

  return (
    <section>
      <Header
        title="Weekly Workout Planner"
        subtitle="Monday through Sunday"
      >
        <p>Assign exercises to each day. The full planner lands in a later step.</p>
      </Header>
      <Card title="Planner coming next">
        <p>Your weekly plan will live here and persist in localStorage.</p>
        <Button onClick={() => navigate('/exercises')}>Choose exercises</Button>
      </Card>
    </section>
  );
}

export default WorkoutPlannerPage;
