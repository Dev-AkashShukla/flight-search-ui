'use client';
import { FlightProvider } from '@/context/FlightContext';
import SearchFilters from '@/components/SearchFilters/SearchFilters';
import SortBar from '@/components/SortBar/SortBar';
import FlightList from '@/components/FlightList/FlightList';
import styles from './page.module.css';

export default function FlightsPage() {
  return (
    <FlightProvider>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>✈️ Flight Search</h1>

        <div className={styles.layout}>
          <SearchFilters />

          <div className={styles.mainContent}>
            <SortBar />
            <FlightList />
          </div>
        </div>
      </div>
    </FlightProvider>
  );
}
