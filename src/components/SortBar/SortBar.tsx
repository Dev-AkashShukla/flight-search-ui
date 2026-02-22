'use client';
import { useFlightContext } from '@/context/FlightContext';
import { SortOption } from '@/types/flight'

export default function SortBar() {
  const { 
    sortBy, 
    setSortBy, 
    activeJourney, 
    setActiveJourney, 
    filteredOutbound, 
    filteredReturn 
} = useFlightContext();
    const options: { value: SortOption; label: string }[] = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'duration-asc', label: 'Duration: Short to Long' },
    { value: 'duration-desc', label: 'Duration: Long to Short' },
    { value: 'departure-asc', label: 'Departure: Earliest First' },
    { value: 'departure-desc', label: 'Departure: Latest First' },
  ];

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <button
            onClick={() => setActiveJourney('outbound')}
            className={`px-4 py-2 rounded ${activeJourney === 'outbound' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
            Outbound ({filteredOutbound.length})
        </button>
        <button
            onClick={() => setActiveJourney('return')}
            className={`ml-2 px-4 py-2 rounded ${activeJourney === 'return' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
            >
            Return ({filteredReturn.length})
            </button>
        </div>
        <div className="flex items-center">
        <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </div>
        <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
            Sort By:
        </label>
    </div>
);  

}

