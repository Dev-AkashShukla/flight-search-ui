import { useFlightContext } from '@/context/FlightContext';
import styles from './SearchFilters.module.css';

export default function DatePicker() {
  const { filters, setFilters } = useFlightContext();

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>Travel Dates</span>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Departure</label>
          <input
            type="date"
            className={styles.input}
            value={filters.departureDate}
            onChange={(e) => setFilters({ departureDate: e.target.value })}
          />
        </div>

        {filters.tripType === 'round-trip' && (
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Return</label>
            <input
              type="date"
              className={styles.input}
              value={filters.returnDate}
              onChange={(e) => setFilters({ returnDate: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
