import { Route, Routes } from 'react-router-dom';
import Footer from './components/common/Footer';
import Navbar from './components/Navigation/Navbar';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import ExercisesPage from './pages/ExercisesPage';
import HistoryDetailPage from './pages/HistoryDetailPage';
import HistoryPage from './pages/HistoryPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProgressPage from './pages/ProgressPage';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import styles from './App.module.css';

function App() {
  // Navbar and footer wrap every route so layout stays consistent.
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.page}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
          <Route path="/planner" element={<WorkoutPlannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:logId" element={<HistoryDetailPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div className={styles.footerWrap}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
