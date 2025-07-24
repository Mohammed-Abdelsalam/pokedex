import {
  ArrowLeft,
  Heart,
  Ruler,
  Shield,
  Star,
  Sword,
  Weight,
  Zap,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import fallback from "../assets/fallback-pokemon.webp";
import { Container } from "../components/layout/Container";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import type { PokemonAbility, PokemonStat } from "../types";

const PokemonDetail: React.FC = () => {
  const { name = "" } = useParams();
  const { data, isLoading } = usePokemonDetails(name);

  // handle case where Pokémon is not found
  if (isLoading)
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="relative">
            <div className="animate-spin h-16 w-16 border-4 border-transparent border-t-red-500 border-r-pink-500 rounded-full" />
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-xl" />
          </div>
        </div>
      </Container>
    );

  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };
    return typeColors[type.toLowerCase()] || "#68A090"; // Default color for unknown types
  };

  const TypeBadge: React.FC<{ type: string }> = ({ type }) => {
    const backgroundColor = getTypeColor(type);
    return (
      <span
        className="px-4 py-2 rounded-full text-sm font-bold tracking-wide capitalize text-white shadow-lg transform hover:scale-105 transition-all duration-300"
        style={{
          backgroundColor,
          boxShadow: `0 4px 15px ${backgroundColor}4D`,
        }}
      >
        {type}
      </span>
    );
  };

  const StatBar: React.FC<{
    label: string;
    value: number;
    maxValue?: number;
    icon: React.ReactNode;
  }> = ({ label, value, maxValue = 200, icon }) => {
    const percentage = (value / maxValue) * 100;
    const getStatColor = (val: number) => {
      if (val >= 100) return "from-green-400 to-green-600";
      if (val >= 70) return "from-yellow-400 to-orange-500";
      return "from-red-400 to-red-600";
    };

    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
        <div className="text-gray-600 dark:text-gray-300">{icon}</div>
        <div className="flex-1">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span className="text-gray-700 dark:text-gray-300">{label}</span>
            <span className="text-gray-900 dark:text-gray-100 font-bold">
              {value}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${getStatColor(
                value
              )} transition-all duration-500`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const AbilityCard: React.FC<{ ability: PokemonAbility }> = ({ ability }) => (
    <div
      className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
        ability.is_hidden
          ? "bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border-purple-300 dark:border-purple-600"
          : "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 dark:border-blue-600"
      }`}
    >
      <div className="flex items-center gap-2">
        {ability.is_hidden && (
          <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        )}
        <span className="font-semibold text-sm capitalize text-gray-800 dark:text-gray-200">
          {ability.ability.name.replace("-", " ")}
        </span>
      </div>
      {ability.is_hidden && (
        <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
          Hidden Ability
        </span>
      )}
    </div>
  );

  return (
    <Container>
      {/* Back Button */}
      <Link
        to="/"
        className="group flex items-center gap-2 text-sm hover:text-red-500 dark:hover:text-red-400 mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 hover:scale-105 w-fit"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*Pokemon Image & Basic Info */}
        <div className="lg:col-span-1">
          <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50 h-full">
            {/* Decoration */}
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-red-400/30 to-pink-400/30 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-yellow-300/30 to-orange-400/30 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center p-8">
              <div className="relative group mb-6">
                <img
                  loading="lazy"
                  src={
                    data.sprites.other["official-artwork"].front_default ||
                    fallback
                  }
                  alt={data.name}
                  className="h-48 w-48 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10" />
              </div>

              {/* Pokemon Name & ID */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold capitalize bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {data.name}
                </h1>
                <div className="text-gray-500 dark:text-gray-400 font-mono text-lg">
                  #{data.id.toString().padStart(3, "0")}
                </div>
              </div>

              {/* Types */}
              <div className="flex gap-3 flex-wrap justify-center mb-6">
                {data.types.map((t: { type: { name: string } }) => (
                  <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-4 text-center border border-gray-200 dark:border-slate-600 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
                      Height
                    </p>
                  </div>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {(data.height / 10).toFixed(1)}m
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-4 text-center border border-gray-200 dark:border-slate-600 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Weight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
                      Weight
                    </p>
                  </div>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {(data.weight / 10).toFixed(1)}kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Base Stats */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              Base Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.stats.map((stat: PokemonStat) => {
                const icons = {
                  hp: <Heart className="w-4 h-4" />,
                  attack: <Sword className="w-4 h-4" />,
                  defense: <Shield className="w-4 h-4" />,
                  "special-attack": <Zap className="w-4 h-4" />,
                  "special-defense": <Shield className="w-4 h-4" />,
                  speed: <Zap className="w-4 h-4" />,
                };
                return (
                  <StatBar
                    key={stat.stat.name}
                    label={stat.stat.name.replace("-", " ").toUpperCase()}
                    value={stat.base_stat}
                    icon={icons[stat.stat.name as keyof typeof icons]}
                  />
                );
              })}
            </div>
          </div>

          {/* Abilities and Base Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Abilities */}
            <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-slate-700/50">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                  <Star className="w-6 h-6 text-white" />
                </div>
                Abilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.abilities.map(
                  (ability: PokemonAbility, index: number) => (
                    <AbilityCard key={index} ability={ability} />
                  )
                )}
              </div>
            </div>

            {/* Base Experience Card */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-slate-700/50">
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-600"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#expGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${
                        (data.base_experience / 400) * 251.2
                      } 251.2`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient
                        id="expGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#d97706", stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {data.base_experience}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Base EXP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default PokemonDetail;
