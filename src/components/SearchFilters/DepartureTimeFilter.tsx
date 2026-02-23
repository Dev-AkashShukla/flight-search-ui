import { useFlightContext } from '@/context/FlightContext';
import styles from './SearchFilters.module.css';

const TIME_OPTIONS = [
  { label: 'Anytime',               value: '0-24' },
  { label: 'Morning (5am–12pm)',    value: '5-12' },
  { label: 'Afternoon (12pm–5pm)',  value: '12-17' },
  { label: 'Evening (5pm–9pm)',     value: '17-21' },
  { label: 'Night (9pm–5am)',       value: '21-5' },
];

export default function DepartureTimeFilter() {
  const { filters, setFilters } = useFlightContext();

  const currentValue = `${filters.departureTimeRange[0]}-${filters.departureTimeRange[1]}`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [start, end] = e.target.value.split('-').map(Number);
    setFilters({ departureTimeRange: [start, end] });
  };

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>Departure Time</span>
      <select
        className={styles.select}
        value={currentValue}
        onChange={handleChange}
      >
        {TIME_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
