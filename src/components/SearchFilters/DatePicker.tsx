
import { useFlightContext } from '@/context/FlightContext';
import { useState } from 'react';

export default function DatePicker() {
    const { filters, setFilters } = useFlightContext();
    const [localDeparture, setLocalDeparture] = useState(filters.departureDate);
    const [localReturn, setLocalReturn] = useState(filters.returnDate);     
    const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalDeparture(e.target.value);
    };

    const handleReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalReturn(e.target.value);
    };

    const applyFilter = () => {
        setFilters({ departureDate: localDeparture, returnDate: localReturn });
    }   

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Dates</h3>
            <div className="flex items-center gap-2">
                <div className="flex flex-col">
                    <label className="text-sm">Departure</label>
                    <input
                        type="date"
                        value={localDeparture}
                        onChange={handleDepartureChange}
                        className="p-1 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Return</label>
                    <input
                        type="date"
                        value={localReturn}
                        onChange={handleReturnChange}
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