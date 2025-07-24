import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
// import { ThemeProvider } from './contexts/ThemeContext'
import { queryClient } from "./api/queryClient";
import { ErrorFallback } from "./components/ErrorFallback";
import "./index.css";
import { router } from "./router/routes";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider> */}
        <RouterProvider router={router} />
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
