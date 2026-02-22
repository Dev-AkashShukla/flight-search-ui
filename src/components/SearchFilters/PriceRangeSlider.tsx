import { useFlightContext } from '@/context/FlightContext';
import { useState } from 'react';

export default function PriceRangeSlider() {
  const { filters, setFilters, priceRange } = useFlightContext();
    const [localRange, setLocalRange] = useState<[number, number]>(filters.priceRange);
const minPrice = priceRange[0];   
const maxPrice = priceRange[1];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = Number(e.target.value);   
        const newRange: [number, number] = [...localRange] as [number, number];
        newRange[index] = value;
        setLocalRange(newRange);
    };

    const applyFilter = () => {
        setFilters({ priceRange: localRange });
    }

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Price Range</h3>
            <div className="flex items-center gap-2">
                <input

                    type="number"
                    value={localRange[0]}
                    min={minPrice}
                    max={localRange[1]}
                    onChange={(e) => handleChange(e, 0)}
                    className="w-24 p-1 border rounded"
                />
                <span>to</span>
                <input

                    type="number"
                    value={localRange[1]}
                    min={localRange[0]}


                    max={maxPrice}
                    onChange={(e) => handleChange(e, 1)}
                    className="w-24 p-1 border rounded"
/>
                <button
                    onClick={applyFilter}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Apply
                </button>   
            </div>
            <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={localRange[0]}
                onChange={(e) => handleChange(e, 0)}
                className="w-full"
            />
            <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={localRange[1]}
                onChange={(e) => handleChange(e, 1)}
                className="w-full"
            />
        </div>
    );
}
