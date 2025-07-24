export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      ErrorFallback
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
