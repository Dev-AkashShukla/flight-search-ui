import flightData from '@/data/flightData.json';
import {RawflightData, Flight, RawflightOption} from '@/types/flight'

const data = flightData as unknown as RawflightData;


function getAirlineName(code: string ): string{
    const airlines= data.data.result.metaData.airlineDetail;
    return airlines[code]?.name || code ;
}

function getAirportCity(code: string): string{
    const airports= data.data.result.metaData.airportDetail;
    return airports[code]?.city || code;
}


export function flattenFlights(): {
    outbound: Flight[];
    returnFlights: Flight[];
    searchQuery: typeof data.data.result.searchQuery;
 }{ const result = data.data.result;
const journeys = result.journeys;
const sectors = result.sectors;
const outbound: Flight[] = [];           
const returnFlights: Flight[] = []; 

    Object.entries(journeys).forEach(([journeyKey, jouuney])=>{
       const sectorKey=jouuney.sector;
       const sectorFlights=sectors[sectorKey]
       const isReturn = journeyKey === 'J2';  

       Object.values(sectorFlights).forEach((option: RawflightOption)=>{
        const segments = option.flights;
        const firstSegment = segments[0]
        const  lastSegment = segments[segments.length - 1]

      const flightNumbers = segments.map(
        (seg) => `${seg.airlineCode}-${seg.fltNo}`
      );

const stopCodes: string[] = [];
for (let i = 0; i < segments.length - 1; i++) {
    stopCodes.push(segments[i].arrivalAirport.code);
}

        const flight: Flight ={
            id:              option.flUnqiueId,
            airlineCode:     option.otherDetails.airline[0],
            airlineName:     getAirlineName(option.otherDetails.airline[0]),
            flightNumbers,
            origin:          firstSegment.departureAirport.code,
            originCity:      getAirportCity(firstSegment.departureAirport.code),
            destination:     lastSegment.arrivalAirport.code,
            destinationCity: getAirportCity(lastSegment.arrivalAirport.code),
            departureTime:   firstSegment.departureAirport.time,
            arrivalTime:     lastSegment.arrivalAirport.time,
            totalDuration: Math.round(
    (new Date(lastSegment.arrivalAirport.time).getTime() -
     new Date(firstSegment.departureAirport.time).getTime()) / (1000 * 60)
),
            totalStops:      option.otherDetails.totalStops,
            stopCodes,
            price: parseFloat(option.otherDetails.lowestPrice),
           fareType: option.fares[0]?.fareIdentifiers?.cabinType || 'ECONOMY',
           segments,
            journeyType: isReturn ? 'return' : 'outbound',
      };
        

      if(isReturn){
        returnFlights.push(flight);
      }else{
         outbound.push(flight);
      }
});
});

return {
    outbound,
    returnFlights,
    searchQuery: result.searchQuery,
  };
}


export async function fetchFlights(): Promise<{
    outbound: Flight[];
    returnFlights: Flight[];
    searchQuery: any;
}> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(flattenFlights());
        }, 800);
    });
}