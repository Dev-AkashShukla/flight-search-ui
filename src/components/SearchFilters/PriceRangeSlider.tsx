import { useFlightContext } from '@/context/FlightContext';
import { formatPrice } from '@/utils/formatters';
import styles from './SearchFilters.module.css';

export default function PriceRangeSlider() {
  const { filters, setFilters, priceRange } = useFlightContext();

  const [minPrice, maxPrice] = priceRange;
  const [currentMin, currentMax] = filters.priceRange;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), currentMax);
    setFilters({ priceRange: [val, currentMax] });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), currentMin);
    setFilters({ priceRange: [currentMin, val] });
  };

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>Price Range</span>

      <div className={styles.rangeValues}>
        <span>{formatPrice(currentMin)}</span>
        <span>{formatPrice(currentMax)}</span>
      </div>

      <input
        type="range"
        className={styles.slider}
        min={minPrice}
        max={maxPrice}
        value={currentMin}
        onChange={handleMinChange}
      />
      <input
        type="range"
        className={styles.slider}
        min={minPrice}
        max={maxPrice}
        value={currentMax}
        onChange={handleMaxChange}
      />

      {/* number inputs for precision */}
      <div className={styles.rangeRow}>
        <input
          type="number"
          className={styles.inputSmall}
          value={currentMin}
          min={minPrice}
          max={currentMax}
          onChange={handleMinChange}
        />
        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>to</span>
        <input
          type="number"
          className={styles.inputSmall}
          value={currentMax}
          min={currentMin}
          max={maxPrice}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}
