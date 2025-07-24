import clsx from "clsx";
import type { SkeletonProps } from "../../types";

export const PokemonCardSkeleton = ({ className }: SkeletonProps) => (
  <div
    className={clsx(
      "animate-pulse flex flex-col items-center p-6 rounded-3xl border backdrop-blur-sm",
      "bg-gray-100/80 dark:bg-slate-700/80 border-gray-200/50 dark:border-slate-600/50",
      className
    )}
  >
    <div className="h-24 w-24 mb-4 rounded-full shadow-lg bg-gradient-to-br from-gray-300 to-gray-400 dark:from-slate-600 dark:to-slate-500" />
    <div className="h-5 w-20 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-slate-600 dark:to-slate-500" />
  </div>
);
