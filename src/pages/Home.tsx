import { memo, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { Pagination } from "../components/Pagination";
import { PokemonCard } from "../components/pokemon/PokemonCard";
import { PokemonCardSkeleton } from "../components/pokemon/PokemonCardSkeleton";
import { usePageValidation } from "../hooks/usePageValidation";
import { usePokemonList } from "../hooks/usePokemonList";
import type { PokemonListResponse } from "../types";
import NotFound from "./NotFound";

const GRID_CLS = "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

const Home = () => {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  // load more or pagination mode
  const isLoadMore = pathname === "/load" || params.get("view") === "load";
  const page = Number(params.get("page") ?? 1);

  // Fetch Pokémon list data
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonList(isLoadMore ? "load-more" : "pagination", page);

  // Calculate total pages based on the count from the API
  const totalPages = useMemo(() => {
    if (!data) return 0;
    if (isLoadMore && "pages" in data) {
      // For infinite query, get count from the first page
      return data.pages.length > 0 ? Math.ceil(data.pages[0].count / 10) : 0;
    }
    // For regular query, access count directly
    return Math.ceil((data as PokemonListResponse).count / 10);
  }, [data, isLoadMore]);

  // Calculate results based on the data type
  const results = useMemo(() => {
    if (!data) return [];
    if (isLoadMore && "pages" in data) {
      // For infinite query, flatten all pages
      return (data.pages as PokemonListResponse[]).flatMap((pg) => pg.results);
    }
    // For regular query, access results directly
    return (data as PokemonListResponse).results;
  }, [data, isLoadMore]);

  // Validate the current page
  const { isValidPage } = usePageValidation({
    currentPage: page,
    totalPages,
    isLoading,
    isError,
  });

  // If the page is not valid, redirect to 404
  if (isError) return <NotFound />;

  if (!isLoadMore && !isLoading && !isValidPage) return <NotFound />;

  return (
    <Container>
      {/* Grid */}
      <div className={GRID_CLS}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))
          : results.map((p) => <PokemonCard key={p.name} pokemon={p} />)}
      </div>

      {/* Pagination */}
      {!isLoadMore && data && isValidPage && (
        <Pagination
          page={page}
          total={totalPages}
          onChange={(p) =>
            setParams({ view: "pagination", page: p.toString() })
          }
        />
      )}

      {/* Infinite Load More */}
      {isLoadMore && (
        <LoadMoreButton
          onClick={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        />
      )}
    </Container>
  );
};

export default memo(Home);
