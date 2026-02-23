import flightData from '@/data/flightData.json';
import { RawFlightData, Flight, RawFlightOption, SearchQuery } from '@/types/flight';

const data = flightData as unknown as RawFlightData;


// ---- Helper: get airline name from code ----
function getAirlineName(code: string): string {
  const airlines = data.data.result.metaData.airlineDetail;
  return airlines[code]?.name || code;
}

// ---- Helper: get airport city from code ----
function getAirportCity(code: string): string {
  const airports = data.data.result.metaData.airportDetail;
  return airports[code]?.city || code;
}

// ---- Helper: parse one raw option into a Flight ----
function parseFlightOption(
  option: RawFlightOption,
  isReturn: boolean
): Flight {
  const segments = option.flights;
  const first = segments[0];
  const last = segments[segments.length - 1];

  // flight numbers like ["QR-4771", "QR-1060"]
  const flightNumbers = segments.map(
    (seg) => `${seg.airlineCode}-${seg.fltNo}`
  );

  // intermediate stop airport codes
  const stopCodes: string[] = [];
  for (let i = 0; i < segments.length - 1; i++) {
    stopCodes.push(segments[i].arrivalAirport.code);
  }

  // total duration from first departure to last arrival
  const depMs = new Date(first.departureAirport.time).getTime();
  const arrMs = new Date(last.arrivalAirport.time).getTime();
  const totalDuration = Math.round((arrMs - depMs) / (1000 * 60));

  // first fare details
  const firstFare = option.fares[0];

  return {
    id: option.flUnqiueId,
    airlineCode: option.otherDetails.airline[0],
    airlineName: getAirlineName(option.otherDetails.airline[0]),
    flightNumbers,
    origin: first.departureAirport.code,
    originCity: getAirportCity(first.departureAirport.code),
    destination: last.arrivalAirport.code,
    destinationCity: getAirportCity(last.arrivalAirport.code),
    departureTime: first.departureAirport.time,
    arrivalTime: last.arrivalAirport.time,
    totalDuration,
    totalStops: option.otherDetails.totalStops,
    stopCodes,
    price: parseFloat(option.otherDetails.lowestPrice),
    fareType: firstFare?.fareIdentifiers?.cabinType || 'ECONOMY',
    refundable: firstFare?.refundable ?? false,
    seatsAvailable: firstFare?.fareIdentifiers?.availableSeatCount ?? 0,
    segments,
    journeyType: isReturn ? 'return' : 'outbound',
  };
}


// ---- Main: flatten all journeys into Flight[] ----
export function flattenFlights(): {
  outbound: Flight[];
  returnFlights: Flight[];
  searchQuery: SearchQuery;
} {
  const result = data.data.result;
  const journeys = result.journeys;
  const sectors = result.sectors;

  const outbound: Flight[] = [];
  const returnFlights: Flight[] = [];

  Object.entries(journeys).forEach(([journeyKey, journey]) => {
    const sectorKey = journey.sector;
    const sectorFlights = sectors[sectorKey];
    const isReturn = journeyKey === 'J2';

    Object.values(sectorFlights).forEach((option) => {
      const flight = parseFlightOption(option as RawFlightOption, isReturn);

      if (isReturn) {
        returnFlights.push(flight);
      } else {
        outbound.push(flight);
      }
    });
  });

  return { outbound, returnFlights, searchQuery: result.searchQuery };
}


// ---- Simulated API call with delay ----
export async function fetchFlights(): Promise<{
  outbound: Flight[];
  returnFlights: Flight[];
  searchQuery: SearchQuery;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(flattenFlights());
    }, 800);
  });
}
