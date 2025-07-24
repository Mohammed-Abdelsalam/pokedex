import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ErrorFallback } from "../components/ErrorFallback";
import Home from "../pages/Home";
import LoadMore from "../pages/LoadMore";
import NotFound from "../pages/NotFound";
import PokemonDetail from "../pages/PokemonDetail";

const reload = () => window.location.reload();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <ErrorFallback
        error={new Error("Route error")}
        resetErrorBoundary={reload}
      />
    ),
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: (
          <ErrorFallback
            error={new Error("Home page error")}
            resetErrorBoundary={reload}
          />
        ),
      },
      {
        path: "/load",
        element: <LoadMore />,
        errorElement: (
          <ErrorFallback
            error={new Error("Load more page error")}
            resetErrorBoundary={reload}
          />
        ),
      },
      {
        path: "/pokemon/:name",
        element: <PokemonDetail />,
        errorElement: <NotFound />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
