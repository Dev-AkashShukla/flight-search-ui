export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
         <h1>✈️ No flights found</h1>
         <p className="text-gray-600 text-sm">
          Try adjusting your filters
      </p>

    </div>
  );
}