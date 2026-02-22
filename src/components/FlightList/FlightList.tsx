import { useState } from 'react';
import { useFlightContext } from '@/context/FlightContext';
import FlightCard from '@/components/FlightCard/FlightCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';

export default function FlightList() {
  const {
    filteredOutbound,
    filteredReturn,
    isLoading,
    error,
    activeJourney,
  } = useFlightContext();

  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

  const flightsToShow = activeJourney === 'outbound' ? filteredOutbound : filteredReturn;
   
  const totalPages = Math.ceil(flightsToShow.length / flightsPerPage);
  const startIndex = (currentPage - 1) * flightsPerPage;
  const currentFlights = flightsToShow.slice(startIndex, startIndex + flightsPerPage);  

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (flightsToShow.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col gap-4">
      {currentFlights.map(flight => (
        <FlightCard 
        key={flight.id} 
        flight={flight} 
        onSelect={() => alert(`Selected flight ID: ${flight.id}`)} />
      ))}

        {/* Pagination Controls */} 
        <div className="flex justify-center gap-2 mt-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
            </span>
            <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
            Next
            </button>
        </div>
    </div>
    );
}