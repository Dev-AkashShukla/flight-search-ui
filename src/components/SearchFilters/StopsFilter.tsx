import { useFlightContext } from '@/context/FlightContext';
import styles from './SearchFilters.module.css';

const STOP_OPTIONS = [
  { value: 0, label: 'Non-stop' },
  { value: 1, label: '1 Stop' },
  { value: 2, label: '2+ Stops' },
];

export default function StopsFilter() {
  const { filters, setFilters } = useFlightContext();

  const toggleStop = (stop: number) => {
    const current = filters.stops;
    const updated = current.includes(stop)
      ? current.filter((s) => s !== stop)
      : [...current, stop];

    setFilters({ stops: updated });
  };

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>Stops</span>

      {STOP_OPTIONS.map((opt) => (
        <label key={opt.value} className={styles.checkRow}>
          <input
            type="checkbox"
            checked={filters.stops.includes(opt.value)}
            onChange={() => toggleStop(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
