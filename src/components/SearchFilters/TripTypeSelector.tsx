import { useFlightContext } from '@/context/FlightContext';
import styles from './SearchFilters.module.css';

export default function TripTypeSelector() {
  const { filters, setFilters } = useFlightContext();

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>Trip Type</span>
      <div className={styles.radioRow}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="tripType"
            checked={filters.tripType === 'one-way'}
            onChange={() => setFilters({ tripType: 'one-way' })}
          />
          One Way
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="tripType"
            checked={filters.tripType === 'round-trip'}
            onChange={() => setFilters({ tripType: 'round-trip' })}
          />
          Round Trip
        </label>
      </div>
    </div>
  );
}
