import { useFlightContext } from '@/context/FlightContext';
import styles from './SearchFilters.module.css';

export default function PassengerSelector() {
  const { filters, setFilters } = useFlightContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Math.min(10, Number(e.target.value)));
    setFilters({ totalPassengers: val });
  };

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>Passengers</span>
      <input
        type="number"
        className={styles.inputSmall}
        value={filters.totalPassengers}
        min={1}
        max={10}
        onChange={handleChange}
      />
    </div>
  );
}
