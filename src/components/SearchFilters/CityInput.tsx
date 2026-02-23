import { useFlightContext } from '@/context/FlightContext';
import styles from './SearchFilters.module.css';

export default function CityInput() {
  const { filters, setFilters } = useFlightContext();

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>Cities</span>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.7rem', color: '#9ca3af' }}>From</label>
          <input
            type="text"
            className={styles.input}
            value={filters.origin}
            onChange={(e) => setFilters({ origin: e.target.value.toUpperCase() })}
            placeholder="DEL"
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.7rem', color: '#9ca3af' }}>To</label>
          <input
            type="text"
            className={styles.input}
            value={filters.destination}
            onChange={(e) => setFilters({ destination: e.target.value.toUpperCase() })}
            placeholder="DXB"
          />
        </div>
      </div>
    </div>
  );
}
