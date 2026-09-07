import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import styles from './pages.module.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className={styles.notFound}>
      <Header title="404" subtitle="Page not found" align="center" />
      <Card padding="1.75rem">
        <p>That route is not part of FitTrack.</p>
        <div className={styles.actionsCenter}>
          <Button onClick={() => navigate('/')}>Go home</Button>
          <Button variant="secondary" onClick={() => navigate('/exercises')}>
            Browse exercises
          </Button>
        </div>
      </Card>
    </section>
  );
}

export default NotFound;
