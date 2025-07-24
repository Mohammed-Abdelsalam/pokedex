import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import type { PokemonListItem } from '../../types';
import fallback from '../../assets/fallback-pokemon.webp';

interface Props {
    pokemon: PokemonListItem;
}

export const PokemonCard = memo(({ pokemon }: Props) => {
    // avoid creating a new function on every render
    const [src, setSrc] = useState(pokemon.sprite);
    const handleError = useCallback(() => setSrc(fallback), []);

    return (
        <Link
            to={`/pokemon/${pokemon.name}`}
            aria-label={`View details for ${pokemon.name}`}
            className={clsx(
                'group flex flex-col items-center p-6 rounded-3xl border shadow-lg transition-transform duration-300',
                'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm',
                'border-gray-200/50 dark:border-slate-700/50',
                'hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 dark:hover:shadow-red-500/20',
                'hover:border-red-300/50 dark:hover:border-red-500/30'
            )}
        >
            {/* Image */}
            <div className="relative mb-4 transition-transform duration-300 group-hover:scale-110">
                <img
                    src={src}
                    onError={handleError}
                    alt={pokemon.name}
                    width={112}
                    height={112}
                    decoding="async"
                    loading="lazy"
                    className="h-28 w-28 object-contain drop-shadow-lg"
                />
                <div className="absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-red-400/20 to-pink-400/20" />
            </div>

            {/* Name & ID */}
            <span className="capitalize font-semibold text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300 group-hover:text-red-500 dark:group-hover:text-red-400">
                {pokemon.name}
            </span>
            <div className="font-mono text-lg text-gray-500 dark:text-gray-400">
                #{pokemon.id.toString().padStart(3, '0')}
            </div>
        </Link>
    );
});
PokemonCard.displayName = 'PokemonCard';
