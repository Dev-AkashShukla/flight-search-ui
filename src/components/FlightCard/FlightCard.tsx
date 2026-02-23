import { Flight } from '@/types/flight';
import { formatPrice, formatDuration, formatTime, formatStops } from '@/utils/formatters';
import styles from './FlightCard.module.css';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flightId: string) => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const isNonstop = flight.totalStops === 0;

  return (
    <div className={styles.card}>

      {/* ---- Airline Info ---- */}
      <div className={styles.airlineSection}>
        <div className={styles.airlineLogo}>✈️</div>
        <div>
          <div className={styles.airlineName}>{flight.airlineName}</div>
          <div className={styles.flightNumber}>
            {flight.flightNumbers.join(' → ')}
          </div>
        </div>
      </div>

      {/* ---- Time / Route ---- */}
      <div className={styles.timeSection}>
        {/* Departure */}
        <div className={styles.timeBlock}>
          <div className={styles.time}>{formatTime(flight.departureTime)}</div>
          <div className={styles.code}>
            {flight.origin} · {flight.originCity}
          </div>
        </div>

        {/* Duration line */}
        <div className={styles.routeLine}>
          <span className={styles.duration}>
            {formatDuration(flight.totalDuration)}
          </span>
          <div className={styles.line} />
          <span className={isNonstop ? styles.nonstop : styles.stops}>
            {formatStops(flight.totalStops)}
          </span>
          {flight.stopCodes.length > 0 && (
            <span className={styles.stopCodes}>
              via {flight.stopCodes.join(', ')}
            </span>
          )}
        </div>

        {/* Arrival */}
        <div className={styles.timeBlock}>
          <div className={styles.time}>{formatTime(flight.arrivalTime)}</div>
          <div className={styles.code}>
            {flight.destination} · {flight.destinationCity}
          </div>
        </div>
      </div>

      {/* ---- Price & Select ---- */}
      <div className={styles.priceSection}>
        <div className={styles.price}>{formatPrice(flight.price)}</div>
        <div className={styles.perPerson}>per adult</div>
        <span
          className={
            flight.refundable ? styles.fareTag : `${styles.fareTag} ${styles.fareTagNonRefund}`
          }
        >
          {flight.refundable ? 'Refundable' : 'Non-Refundable'}
        </span>
        <button
          className={styles.selectBtn}
          onClick={() => onSelect(flight.id)}
        >
          Select
        </button>
      </div>
    </div>
  );
}
