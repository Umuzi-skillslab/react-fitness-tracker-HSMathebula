import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

function ProgressPage() {
  const navigate = useNavigate();

  return (
    <section>
      <Header title="Fitness Progress" subtitle="Volume and consistency over time">
        <p>Charts and totals will read from saved workout logs.</p>
      </Header>
      <Card title="Progress coming next">
        <p>Completed sessions from History will feed this view.</p>
        <Button onClick={() => navigate('/history')}>Open history</Button>
      </Card>
    </section>
  );
}

export default ProgressPage;
