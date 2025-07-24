import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ErrorFallback } from "../components/ErrorFallback";
import { Home } from "../pages/Home";
import { LoadMore } from "../pages/LoadMore";
import { NotFound } from "../pages/NotFound";
import { PokemonDetail } from "../pages/PokemonDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <ErrorFallback
        error={new Error("Route error")}
        resetErrorBoundary={() => location.reload()}
      />
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/load", element: <LoadMore /> },
      { path: "/pokemon/:name", element: <PokemonDetail /> },
      //   { path: '/404', element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
