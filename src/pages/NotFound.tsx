import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";

const NotFound: React.FC = () => {
  return (
    <Container>
      <div className="text-center mt-20 p-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-slate-700 max-w-2xl mx-auto">
        <div className="text-8xl mb-6">🕳️</div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Sorry, the page you're looking for doesn't exist. It may have been
          deleted or moved to another location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 flex items-center gap-2"
          >
            <span>🏠</span>
            Back to Home
          </Link>

          <Link
            to="/load"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-2"
          >
            <span>⚡</span>
            Browse Pokémon
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50/50 dark:bg-slate-900/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you think this is an error, please check the URL or contact us.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
