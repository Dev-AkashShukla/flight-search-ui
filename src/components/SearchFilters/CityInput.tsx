
import { useFlightContext } from '@/context/FlightContext';
import { useState } from 'react';

export default function CityInput() {
    const { filters, setFilters } = useFlightContext();
    const [localDeparture, setLocalDeparture] = useState(filters.origin);
    const [localArrival, setLocalArrival] = useState(filters.destination);  
    const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalDeparture(e.target.value);
    };

    const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalArrival(e.target.value);
    };  

    const applyFilter = () => {
        setFilters({ origin: localDeparture, destination: localArrival });
    }

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Cities</h3>
            <div className="flex items-center gap-2">
                <div className="flex flex-col">
                    <label className="text-sm">Departure</label>
                    <input

                        type="text"
                        value={localDeparture}
                        onChange={handleDepartureChange}
                        className="p-1 border rounded"
                    />  
                </div>

                <div className="flex flex-col">
                    <label className="text-sm">Arrival</label>
                    <input

                        type="text"
                        value={localArrival}
                        onChange={handleArrivalChange}
                        className="p-1 border rounded"
                    />
                </div>
                <button

                    onClick={applyFilter}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}