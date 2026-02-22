import { useFlightContext } from '@/context/FlightContext';

export default function StopsFilter() {
  const { filters, setFilters } = useFlightContext();
  const stopOptions = [0, 1, 2];
    const toggleStop = (stop: number) => {
        if (filters.stops.includes(stop)) {
            setFilters({
                stops: filters.stops.filter(s => s !== stop)
            });
        }
        else {
            setFilters({
                stops: [...filters.stops, stop]
            });
        }
    };

  return (
    <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Stops</h3>
        <div className="flex flex-col gap-1">
            {stopOptions.map(stop => (
                <label key={stop} className="flex items-center gap-2">

                    <input
                        type="checkbox"
                        checked={filters.stops.includes(stop)}      
                        onChange={() => toggleStop(stop)}
                    />
                    <span>{stop === 0 ? 'Non-stop' : `${stop} stop${stop > 1 ? 's' : ''}`}</span>
                </label>
            ))}
        </div>
    </div>
  );
}