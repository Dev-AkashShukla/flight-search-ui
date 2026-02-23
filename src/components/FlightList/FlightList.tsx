import { useFlightContext } from '@/context/FlightContext';
import FlightCard from '@/components/FlightCard/FlightCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import styles from './FlightList.module.css';

const FLIGHTS_PER_PAGE = 10;

export default function FlightList() {
  const {
    filteredOutbound,
    filteredReturn,
    isLoading,
    error,
    activeJourney,
    currentPage,
    setCurrentPage,
    retryFetch,
  } = useFlightContext();

  // pick which list to show
  const flights = activeJourney === 'outbound' ? filteredOutbound : filteredReturn;

  const totalPages = Math.ceil(flights.length / FLIGHTS_PER_PAGE);
  const startIdx = (currentPage - 1) * FLIGHTS_PER_PAGE;
  const currentFlights = flights.slice(startIdx, startIdx + FLIGHTS_PER_PAGE);

  // ---- States ----
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={retryFetch} />;
  if (flights.length === 0) return <EmptyState />;

  return (
    <div className={styles.container}>
      <div className={styles.resultCount}>
        Showing {startIdx + 1}–{Math.min(startIdx + FLIGHTS_PER_PAGE, flights.length)} of{' '}
        {flights.length} flights
      </div>

      {currentFlights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          onSelect={(id) => alert(`Selected: ${id}`)}
        />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
