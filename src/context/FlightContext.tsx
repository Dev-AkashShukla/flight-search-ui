'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Flight, Filter, SortOption } from '@/types/flight';
import { fetchFlights } from '@/services/flightService';

interface FlightContextType {
  outboundFlights: Flight[];
  returnFlights: Flight[];
  filteredOutbound: Flight[];
  filteredReturn: Flight[];
  filters: Filter;
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;
  activeJourney: 'outbound' | 'return';
  priceRange: [number, number];
  setFilters: (filters: Partial<Filter>) => void;
  setSortBy: (sort: SortOption) => void;
  setActiveJourney: (type: 'outbound' | 'return') => void;
  resetFilters: () => void;
}


const DefaultFilter: Filter = {
  tripType: 'round trip',
  origin: 'DEL',
  destination: 'DXB',
  departureDate: '2026-03-02',
  returnDate: '2026-03-05',
  totalPassengers: 5,
  priceRange: [0, 200000],
  stops: [],
  departureTimeRange: [0, 24],
};


function filterFlights(flights: Flight[], filters: Filter): Flight[] {
  let result = [...flights];

  // Price filter
  result = result.filter(
    f => f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1]
  );

  // Stops filter (empty = show all)
  if (filters.stops.length > 0) {
    result = result.filter(f => filters.stops.includes(f.totalStops));
  }

  // Departure time filter
  if (filters.departureTimeRange[0] !== 0 || filters.departureTimeRange[1] !== 24) {
    result = result.filter(f => {
      const hour = new Date(f.departureTime).getHours();
      return hour >= filters.departureTimeRange[0] && hour <= filters.departureTimeRange[1];
    });
  }

  return result;
}

function sortFlights(flights: Flight[], sortBy: SortOption): Flight[] {
  return [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'duration-asc': return a.totalDuration - b.totalDuration;
      case 'duration-desc': return b.totalDuration - a.totalDuration;
      case 'departure-asc':
        return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
      case 'departure-desc':
        return new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
      default: return 0;
    }
  });
}


const FlightContext = createContext<FlightContextType | undefined>(undefined);

export function FlightProvider({ children }: { children: ReactNode }) {

  const [outboundFlights, setOutboundFlights] = useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
  const [filteredOutbound, setFilteredOutbound] = useState<Flight[]>([]);
  const [filteredReturn, setFilteredReturn] = useState<Flight[]>([]);
  const [filters, setFiltersState] = useState<Filter>(DefaultFilter);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeJourney, setActiveJourney] = useState<'outbound' | 'return'>('outbound');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const data = await fetchFlights();
        setOutboundFlights(data.outbound);
        setReturnFlights(data.returnFlights);

        const allPrices = [
          ...data.outbound.map(f => f.price),
          ...data.returnFlights.map(f => f.price),
        ];

        const min = Math.floor(Math.min(...allPrices));
        const max = Math.ceil(Math.max(...allPrices));
        setPriceRange([min, max]);

      } catch (err) {
        setError('Failed to load flights');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    let updatedOutbound = filterFlights(outboundFlights, filters);
    let updatedReturn = filterFlights(returnFlights, filters);

    updatedOutbound = sortFlights(updatedOutbound, sortBy);
    updatedReturn = sortFlights(updatedReturn, sortBy);

    setFilteredOutbound(updatedOutbound);
    setFilteredReturn(updatedReturn);
  }, [filters, sortBy, outboundFlights, returnFlights]);


  // Actions — components ye call karenge
  const setFilters = useCallback((newFilters: Partial<Filter>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState({ ...DefaultFilter, priceRange: priceRange });
  }, [priceRange]);



  return (
    <FlightContext.Provider
      value={{
        outboundFlights,
        returnFlights,
        filteredOutbound,
        filteredReturn,
        filters,
        sortBy,
        isLoading,
        error,
        activeJourney,
        priceRange,
        setFilters,
        setSortBy,
        setActiveJourney,
        resetFilters,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}


//Hook
export function useFlightContext() {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within FlightProvider');
  }
  return context;
}