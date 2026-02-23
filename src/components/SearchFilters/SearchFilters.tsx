'use client';
import { useState } from 'react';
import { useFlightContext } from '@/context/FlightContext';
import TripTypeSelector from './TripTypeSelector';
import CityInput from './CityInput';
import DatePicker from './DatePicker';
import PassengerSelector from './PassengerSelector';
import PriceRangeSlider from './PriceRangeSlider';
import StopsFilter from './StopsFilter';
import DepartureTimeFilter from './DepartureTimeFilter';
import styles from './SearchFilters.module.css';

export default function SearchFilters() {
  const { resetFilters } = useFlightContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  // on desktop filtersBody is always visible via CSS
  // on mobile it toggles via filtersBodyOpen class
  const bodyClass = mobileOpen ? styles.filtersBodyOpen : styles.filtersBody;

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>🔍 Filters</h2>

      {/* mobile toggle button */}
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? 'Hide Filters ▲' : 'Show Filters ▼'}
      </button>

      <div className={bodyClass}>
        <TripTypeSelector />
        <hr className={styles.divider} />
        <CityInput />
        <hr className={styles.divider} />
        <DatePicker />
        <hr className={styles.divider} />
        <PassengerSelector />
        <hr className={styles.divider} />
        <PriceRangeSlider />
        <hr className={styles.divider} />
        <StopsFilter />
        <hr className={styles.divider} />
        <DepartureTimeFilter />
        <hr className={styles.divider} />

        <button className={styles.resetBtn} onClick={resetFilters}>
          ↺ Reset All Filters
        </button>
      </div>
    </aside>
  );
}
