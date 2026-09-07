import PropTypes from 'prop-types';
import { calculateVolume, groupLogsByDate } from '../../utils/helpers';
import styles from './Progress.module.css';

function ProgressChart({ logs }) {
  if (logs.length === 0) {
    return <p className={styles.empty}>Log a workout to see daily volume.</p>;
  }

  const grouped = groupLogsByDate(logs);
  const dates = Object.keys(grouped).sort();
  const volumes = dates.map((date) =>
    grouped[date].reduce(
      (total, log) => total + calculateVolume(log.sets, log.reps, log.weight),
      0
    )
  );
  const maxVolume = Math.max(...volumes, 1);

  return (
    <div className={styles.chart} role="img" aria-label="Daily workout volume">
      {dates.map((date, index) => {
        const percent = Math.max((volumes[index] / maxVolume) * 100, 4);

        return (
          <div key={date} className={styles.column}>
            <p className={styles.value}>{volumes[index]}</p>
            <div className={styles.barTrack}>
              <div
                className={styles.bar}
                style={{ '--bar-height': `${percent}%` }}
              />
            </div>
            <p className={styles.label}>{date.slice(5)}</p>
          </div>
        );
      })}
    </div>
  );
}

ProgressChart.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      sets: PropTypes.number.isRequired,
      reps: PropTypes.number.isRequired,
      weight: PropTypes.number,
    })
  ).isRequired,
};

export default ProgressChart;
