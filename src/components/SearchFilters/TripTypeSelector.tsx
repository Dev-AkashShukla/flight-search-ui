import { useFlightContext } from '@/context/FlightContext';
import { useState } from 'react';

export default function TripTypeSelector() {
    const { filters, setFilters } = useFlightContext();
    const [localTripType, setLocalTripType] = useState(filters.tripType);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTripType(e.target.value as 'one way' | 'round trip');
    }  
    const applyFilter = () => {
        setFilters({ tripType: localTripType });
    }   
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Trip Type</h3>    
            <div className="flex items-center gap-2">
                <select
                    value={localTripType}
                    onChange={handleChange}
                    className="p-1 border rounded"
                >           
                    <option value="one way">One Way</option>
                    <option value="round trip">Round Trip</option>
                </select>   
                <button

                    onClick={applyFilter}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >   
                    Apply Filter
                </button>
            </div>
        </div>
    );
}