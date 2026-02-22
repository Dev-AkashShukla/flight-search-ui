'use client';
import { FlightProvider } from '@/context/FlightContext';
import SearchFilters from '@/components/SearchFilters/SearchFilters';
import SortBar from '@/components/SortBar/SortBar';
import FlightList from '@/components/FlightList/FlightList';


export default function FlightsPage() {
    return (    
        <FlightProvider>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <SearchFilters />
                    <div className="flex-1 flex flex-col gap-4">
                        <SortBar />
                        <FlightList />
                    </div>
                </div>
            </div>  
        </FlightProvider>
    );
}