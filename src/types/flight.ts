// ============ RAW JSON TYPES ============

export interface RawFlightData {
  data: {
    searchId: string;
    provider: string;
    success: boolean;
    result: {
      journeys: Record<string, { sector: string }>;
      sectors: Record<string, Record<string, RawFlightOption>>;
      searchQuery: SearchQuery;
      metaData: MetaData;
    };
  };
}

export interface SearchQuery {
  type: string;           // "R" = round trip, "O" = one way
  className: string;
  ADT: string;
  CHD: string;
  INF: string;
  noOfSegments: string;
  origin: string;
  originCountry: string;
  destination: string;
  destinationCountry: string;
  departureDate: string;
  returnDate: string;
}

export interface MetaData {
  airportDetail: Record<string, AirportInfo>;
  airlineDetail: Record<string, AirlineInfo>;
}

export interface AirportInfo {
  code: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
}

export interface AirlineInfo {
  code: string;
  name: string;
}

export interface RawFlightOption {
  flUnqiueId: string;
  flights: FlightSegment[];
  otherDetails: {
    totalStops: number;
    lowestPrice: string;
    departureTime: string;
    airline: string[];
  };
  fares: Fare[];
}

export interface FlightSegment {
  sequence: number;
  flightId: string;
  fltNo: string;
  aircraftType: string;
  airlineCode: string;
  departureAirport: {
    code: string;
    terminal?: { name: string; gate: string };
    zoneId?: string;
    time: string;
  };
  arrivalAirport: {
    code: string;
    terminal?: { name: string; gate: string };
    zoneId?: string;
    time: string;
  };
  durationInMin: number;
}

export interface Fare {
  fareId?: string;
  fareGroup: string;
  fareIdentifiers?: {
    cabinType: string;
    availableSeatCount?: number;
    brandName?: string;
  };
  price: {
    CTC?: string;
    pricePerAdult: string;
  };
  refundable?: boolean;
}


// ============ FLATTENED UI TYPES ============

export interface Flight {
  id: string;
  airlineCode: string;
  airlineName: string;
  flightNumbers: string[];
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  totalDuration: number;       // in minutes
  totalStops: number;
  stopCodes: string[];
  price: number;               // lowestPrice per adult
  fareType: string;
  refundable: boolean;
  seatsAvailable: number;
  segments: FlightSegment[];
  journeyType: 'outbound' | 'return';
}


// ============ FILTER & SORT ============

export interface Filter {
  tripType: 'one-way' | 'round-trip';
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  totalPassengers: number;
  priceRange: [number, number];
  stops: number[];
  departureTimeRange: [number, number];   // [startHour, endHour]
}

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'duration-asc'
  | 'duration-desc'
  | 'departure-asc'
  | 'departure-desc';
