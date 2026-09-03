import PropTypes from 'prop-types';
import Button from '../UI/Button';
import styles from './Exercise.module.css';

function ExerciseFilter({
  filters,
  categories,
  muscleGroups,
  difficulties,
  onFilterChange,
  onReset,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        Category
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Muscle group
        <select
          name="muscleGroup"
          value={filters.muscleGroup}
          onChange={handleChange}
          aria-label="Filter by muscle group"
        >
          <option value="">All muscles</option>
          {muscleGroups.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Difficulty
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleChange}
          aria-label="Filter by difficulty"
        >
          <option value="">All levels</option>
          {difficulties.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Sort by
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          aria-label="Sort exercises"
        >
          <option value="name">Name</option>
          <option value="difficulty">Difficulty</option>
          <option value="category">Category</option>
        </select>
      </label>

      <div className={styles.filterActions}>
        <Button variant="secondary" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}

ExerciseFilter.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    muscleGroup: PropTypes.string,
    difficulty: PropTypes.string,
    sortBy: PropTypes.string,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  muscleGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficulties: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ExerciseFilter;
