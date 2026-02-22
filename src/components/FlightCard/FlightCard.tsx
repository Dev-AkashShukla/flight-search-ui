import { Flight } from '@/types/flight';
import { formatPrice, formatDuration, formatTime } from '@/utils/formatters';

interface FlightCardProps {
  flight: Flight;                        
  onSelect: (flightId: string) => void;  
}

export default function FlightCard ({flight, onSelect}: FlightCardProps){
  return(
 <div className="border rounded p-4 shadow-md flex flex-col gap-2">
    
      
      <h1>{flight.airlineName}</h1>
      <p>{flight.flightNumbers.join('->')}</p>
      <p>{formatTime(flight.departureTime)}</p>
       <p>{formatTime(flight.arrivalTime)}</p>
        <p>{formatDuration(flight.totalDuration)}</p>
        <p>{flight.totalStops}</p>
        <p>{flight.stopCodes.join(', ')}</p>
        <p>{formatPrice(flight.price)}</p>
        <p>{flight.origin}</p>
        <p>{flight.destination}</p>
   

    <button onClick={() => onSelect(flight.id)}>
       select
    </button>
     </div>
  )
   

}