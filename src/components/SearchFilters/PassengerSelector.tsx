
import { useFlightContext } from '@/context/FlightContext';
import { useState } from 'react';

export default function PassengerSelector() {
    const { filters, setFilters } = useFlightContext();
    const [localPassengers, setLocalPassengers] = useState(filters.totalPassengers);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setLocalPassengers(value);
    };

    const applyFilter = () => {
        setFilters({ totalPassengers: localPassengers });
    }

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Passengers</h3>
            <div className="flex items-center gap-2">
                <input

                    type="number"
                    value={localPassengers}
                    min={1}
                    max={10}
                    onChange={handleChange}
                    className="w-24 p-1 border rounded"
                />
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