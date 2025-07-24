import { memo } from 'react';

// Enhanced interface with better props
interface LoadMoreButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  text?: string;
  loadingText?: string;
}

// Loading spinner component
const LoadingSpinner = memo(() => (
  <svg 
    className="animate-spin h-5 w-5" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
      fill="none"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Optimized LoadMoreButton with better accessibility and UX
export const LoadMoreButton = memo<LoadMoreButtonProps>(({ 
  onClick, 
  disabled = false,
  isLoading = false,
  text = "Load More",
  loadingText = "Loading..."
}) => {
  const isDisabled = disabled || isLoading;
  const displayText = isLoading ? loadingText : text;

  return (
    <div className="flex justify-center mt-8 mb-4">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`
          group relative px-8 py-4 min-w-[140px] h-[56px]
          bg-gradient-to-r from-red-500 to-pink-500 
          disabled:from-gray-400 disabled:to-gray-500 
          disabled:opacity-60 text-white rounded-2xl 
          shadow-lg hover:shadow-2xl disabled:shadow-lg 
          font-semibold text-lg transition-all duration-300 
          hover:scale-105 disabled:hover:scale-100 
          hover:shadow-red-500/25 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-red-500 
          focus:ring-offset-2 active:scale-95
          ${isLoading ? 'cursor-wait' : ''}
        `}
        aria-label={isLoading ? loadingText : text}
        aria-disabled={isDisabled}
      >
        <span className="flex items-center justify-center gap-3">
          {isLoading && <LoadingSpinner />}
          <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-90' : 'opacity-100'}`}>
            {displayText}
          </span>
        </span>
        
        {/* Ripple effect overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-150 rounded-2xl" />
        </div>
      </button>
    </div>
  );
});

LoadMoreButton.displayName = 'LoadMoreButton';