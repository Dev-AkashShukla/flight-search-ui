'use client';
import { useFlightContext } from '@/context/FlightContext';
import { SortOption } from '@/types/flight';
import styles from './SortBar.module.css';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price-asc',      label: 'Price: Low → High' },
  { value: 'price-desc',     label: 'Price: High → Low' },
  { value: 'duration-asc',   label: 'Duration: Shortest' },
  { value: 'duration-desc',  label: 'Duration: Longest' },
  { value: 'departure-asc',  label: 'Departure: Earliest' },
  { value: 'departure-desc', label: 'Departure: Latest' },
];

export default function SortBar() {
  const {
    sortBy,
    setSortBy,
    activeJourney,
    setActiveJourney,
    filteredOutbound,
    filteredReturn,
  } = useFlightContext();

  return (
    <div className={styles.bar}>
      {/* Journey Tabs */}
      <div className={styles.journeyTabs}>
        <button
          className={activeJourney === 'outbound' ? styles.tabActive : styles.tab}
          onClick={() => setActiveJourney('outbound')}
        >
          Outbound
          <span className={styles.tabCount}>({filteredOutbound.length})</span>
        </button>
        <button
          className={activeJourney === 'return' ? styles.tabActive : styles.tab}
          onClick={() => setActiveJourney('return')}
        >
          Return
          <span className={styles.tabCount}>({filteredReturn.length})</span>
        </button>
      </div>

      {/* Sort Dropdown - label BEFORE select */}
      <div className={styles.sortSection}>
        <label className={styles.sortLabel} htmlFor="sortSelect">
          Sort by:
        </label>
        <select
          id="sortSelect"
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
