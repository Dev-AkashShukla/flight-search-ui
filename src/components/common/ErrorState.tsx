
interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}
export default function ErrorState({message, onRetry}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
         <h2 className="text-lg font-semibold text-red-600">
            Something went wrong
        </h2>
         <p className="text-gray-600 text-sm">
          {message}
      </p>

      {onRetry && (
        <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Try Again ?
        </button>
      )}
    </div>
  );
}