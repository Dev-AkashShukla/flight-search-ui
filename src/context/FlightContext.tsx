'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Flight, Filter, SortOption, SearchQuery } from '@/types/flight';
import { fetchFlights } from '@/services/flightService';


// ============ CONTEXT TYPE ============

interface FlightContextType {
  // data
  outboundFlights: Flight[];
  returnFlights: Flight[];
  filteredOutbound: Flight[];
  filteredReturn: Flight[];

  // state
  filters: Filter;
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;
  activeJourney: 'outbound' | 'return';
  priceRange: [number, number];
  searchQuery: SearchQuery | null;
  currentPage: number;

  // actions
  setFilters: (partial: Partial<Filter>) => void;
  setSortBy: (sort: SortOption) => void;
  setActiveJourney: (type: 'outbound' | 'return') => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
  retryFetch: () => void;
}


// ============ DEFAULT FILTER (will be overridden by searchQuery) ============

const DEFAULT_FILTER: Filter = {
  tripType: 'round-trip',
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  totalPassengers: 1,
  priceRange: [0, 500000],
  stops: [],
  departureTimeRange: [0, 24],
};


// ============ FILTER LOGIC ============

function filterFlights(flights: Flight[], filters: Filter): Flight[] {
  return flights.filter((f) => {
    // price
    if (f.price < filters.priceRange[0] || f.price > filters.priceRange[1]) {
      return false;
    }

    // stops (empty = show all)
    if (filters.stops.length > 0 && !filters.stops.includes(f.totalStops)) {
      return false;
    }

    // departure time range (handles wrap-around like 21-5 for night)
    const [start, end] = filters.departureTimeRange;
    if (start !== 0 || end !== 24) {
      const hour = new Date(f.departureTime).getHours();

      if (start <= end) {
        // normal range: e.g. 5-12
        if (hour < start || hour > end) return false;
      } else {
        // wrap-around range: e.g. 21-5 means 21-23 OR 0-5
        if (hour < start && hour > end) return false;
      }
    }

    return true;
  });
}


// ============ SORT LOGIC ============

function sortFlights(flights: Flight[], sortBy: SortOption): Flight[] {
  return [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'duration-asc':
        return a.totalDuration - b.totalDuration;
      case 'duration-desc':
        return b.totalDuration - a.totalDuration;
      case 'departure-asc':
        return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
      case 'departure-desc':
        return new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
      default:
        return 0;
    }
  });
}


// ============ HELPER: build filter from searchQuery ============

function buildFilterFromQuery(query: SearchQuery, priceRange: [number, number]): Filter {
  const totalPassengers =
    parseInt(query.ADT || '1') +
    parseInt(query.CHD || '0') +
    parseInt(query.INF || '0');

  return {
    tripType: query.type === 'R' ? 'round-trip' : 'one-way',
    origin: query.origin || '',
    destination: query.destination || '',
    departureDate: query.departureDate || '',
    returnDate: query.returnDate || '',
    totalPassengers,
    priceRange,
    stops: [],
    departureTimeRange: [0, 24],
  };
}


// ============ CONTEXT ============

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export function FlightProvider({ children }: { children: ReactNode }) {
  const [outboundFlights, setOutboundFlights] = useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
  const [filteredOutbound, setFilteredOutbound] = useState<Flight[]>([]);
  const [filteredReturn, setFilteredReturn] = useState<Flight[]>([]);

  const [filters, setFiltersState] = useState<Filter>(DEFAULT_FILTER);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeJourney, setActiveJourney] = useState<'outbound' | 'return'>('outbound');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery | null>(null);
  const [currentPage, setCurrentPage] = useState(1);


  // ---- Fetch data ----
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchFlights();

      setOutboundFlights(data.outbound);
      setReturnFlights(data.returnFlights);
      setSearchQuery(data.searchQuery);

      // calculate actual price range from data
      const allPrices = [
        ...data.outbound.map((f) => f.price),
        ...data.returnFlights.map((f) => f.price),
      ];

      if (allPrices.length > 0) {
        const min = Math.floor(Math.min(...allPrices));
        const max = Math.ceil(Math.max(...allPrices));
        setPriceRange([min, max]);

        // auto-populate filters from searchQuery
        const initialFilter = buildFilterFromQuery(data.searchQuery, [min, max]);
        setFiltersState(initialFilter);
      }
    } catch {
      setError('Failed to load flights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);


  // ---- Apply filter + sort whenever they change ----
  useEffect(() => {
    const out = sortFlights(filterFlights(outboundFlights, filters), sortBy);
    const ret = sortFlights(filterFlights(returnFlights, filters), sortBy);

    setFilteredOutbound(out);
    setFilteredReturn(ret);

    // reset page to 1 when filters/sort change
    setCurrentPage(1);
  }, [filters, sortBy, outboundFlights, returnFlights]);


  // ---- Actions ----
  const setFilters = useCallback((partial: Partial<Filter>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => {
    if (searchQuery) {
      setFiltersState(buildFilterFromQuery(searchQuery, priceRange));
    } else {
      setFiltersState({ ...DEFAULT_FILTER, priceRange });
    }
  }, [searchQuery, priceRange]);

  const retryFetch = useCallback(() => {
    loadData();
  }, [loadData]);


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
        searchQuery,
        currentPage,
        setFilters,
        setSortBy,
        setActiveJourney,
        setCurrentPage,
        resetFilters,
        retryFetch,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}


// ============ HOOK ============

export function useFlightContext() {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within FlightProvider');
  }
  return context;
}
