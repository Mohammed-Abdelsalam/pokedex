import { Bug, RotateCw } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div
      role="alert"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl text-gray-800 dark:text-gray-100"
    >
      <div className="flex items-center gap-3 mb-6 text-red-500">
        <Bug className="w-8 h-8" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Something went wrong
        </h1>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 dark:border-slate-700/50 p-6 mb-6 max-w-2xl">
        <pre className="text-sm text-red-700 dark:text-red-300 overflow-x-auto whitespace-pre-wrap font-mono">
          {error?.message}
        </pre>
      </div>
      {/* Reload Button */}
      <button
        onClick={resetErrorBoundary}
        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 font-medium"
      >
        <RotateCw size={16} />
        <span>Try Again</span>
      </button>
    </div>
  );
};
