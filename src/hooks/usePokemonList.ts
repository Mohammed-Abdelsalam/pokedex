import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { api } from "../api/axios";
import { pokemonListMapper } from "../utils/helpers";

const LIMIT = 10 as const;

const fetchPokemonPage = async (page: number) => {
  const offset = page * LIMIT;
  const { data } = await api.get(`pokemon?limit=${LIMIT}&offset=${offset}`);
  return pokemonListMapper(data);
};

type PaginationReturn = UseQueryResult<ReturnType<typeof pokemonListMapper>> & {
  isFetchingNextPage: false;
  fetchNextPage: () => void;
  hasNextPage: false;
};

type InfiniteReturn = UseInfiniteQueryResult<
  InfiniteData<ReturnType<typeof pokemonListMapper>>
>;

type UsePokemonListReturn = PaginationReturn | InfiniteReturn;

export const usePokemonList = (
  mode: "pagination" | "load-more",
  page: number = 1
): UsePokemonListReturn => {
  const paginationQuery = useQuery({
    queryKey: ["pokemon", "page", page],
    queryFn: () => fetchPokemonPage(page - 1),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    enabled: mode === "pagination",
    throwOnError: true,
  });

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["pokemon", "infinite"],
    queryFn: ({ pageParam = 0 }) => fetchPokemonPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    staleTime: 60_000,
    enabled: mode === "load-more",
    throwOnError: true,
  });

  if (mode === "pagination") {
    return {
      ...paginationQuery,
      isFetchingNextPage: false,
      fetchNextPage: () => {},
      hasNextPage: false,
    };
  }

  return infiniteQuery;
};
