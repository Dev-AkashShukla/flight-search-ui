import CityInput from './CityInput';
import DatePicker from './DatePicker';
import DepartureTimeFilter from './DepartureTimeFilter';
import PassengerSelector from './PassengerSelector';
import PriceRangeSlider from './PriceRangeSlider';
import TripTypeSelector from './TripTypeSelector';
import StopsFilter from './StopsFilter';

export default function SearchFilters() {
    return (
        <aside className="flex flex-col gap-6 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Filters</h2>
            <TripTypeSelector />
            <CityInput />
            <DatePicker />
            <PassengerSelector />
            <PriceRangeSlider />
            <StopsFilter />
            <DepartureTimeFilter />
        </aside>
    );
}