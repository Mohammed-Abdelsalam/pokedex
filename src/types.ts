export interface PokemonListItem {
  id: number;
  name: string;
  sprite: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonGameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  back_default?: string;
  front_shiny?: string;
  back_shiny?: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  game_indices: PokemonGameIndex[];
  sprites: PokemonSprites;
}

export interface SkeletonProps {
  className?: string;
}

export interface UsePageValidationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}
