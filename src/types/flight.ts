//Raw JSon Data

export interface RawflightData {
    data:{
        searchId: string;
        provider: string;
        success: boolean;
        result: {         
        journeys: Record<string, {sector: string}>;
        sectors: Record<string, Record<string, RawflightOption>>;
        searchQuery: SearchQuery;
        metaData: MetaData;
         }
    }
}


export interface SearchQuery {
        type: string;          
        className:  string;      
        ADT: string ;
        CHD: string;
        INF: string,
        noOfSegments: string,
        origin: string,
        originCountry: string,
        destination: string,
        destinationCountry: string,
        departureDate: string;
        returnDate: string;
}


export interface MetaData{
    airportDetail: Record<string, AirportInfo>;
    airlineDetail: Record<string , AirlineInfo>;
}

export interface AirportInfo{
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


export interface RawflightOption{
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

export interface FlightSegment{
    sequence: number;
                flightId: string;
                fltNo: string;
                airlineCode: string;
               departureAirport: {
  code: string;   time: string; 
               };
               arrivalAirport: {
                code: string;  
                 time: string;
               };
 durationInMin: number;
}

export interface Fare {
    fareGroup : string;
    fareIdentifiers?: {
    cabinType: string;
  };
   price: {
        pricePerAdult: string;   
    };
}


//JSon Flattend to use in ui 

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
  totalDuration: number;        
  totalStops: number;
  stopCodes: string[];          
  price: number;                
  fareType: string;             
  segments: FlightSegment[];    
  journeyType: 'outbound' | 'return';
}

export interface Filter{
    tripType: 'one way' | 'round trip'
    origin: string;
    priceRange : [number, number];
    destination: string;
    stops: number[];
    returnDate: string;
    departureDate: string;
    totalPassengers: number;
    departureTimeRange: [number, number]; // [0, 24] — hours
}


export type SortOption = 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'departure-asc' | 'departure-desc';
