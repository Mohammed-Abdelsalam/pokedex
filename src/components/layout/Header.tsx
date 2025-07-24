import { Menu, Moon, Sun, X } from "lucide-react";
import { useContext, useState, type FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Header: FC = () => {
  const { theme, toggle } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 hover:scale-105 hover:shadow-xl hover:shadow-red-600/25"
        : "hover:bg-gray-100/70 dark:hover:bg-slate-800/70 hover:scale-105"
    }`;

  const mobileNavCls = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg mx-2 my-1 ${
      isActive
        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
    }`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200/20 dark:border-slate-700/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            onClick={closeMenu}
          >
            Poké<span className="text-blue-500">Browser</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <NavLink to="/" className={navCls} end>
              Home
            </NavLink>
            <NavLink to="/load" className={navCls}>
              Load More
            </NavLink>
          </nav>

          {/* Desktop Theme Toggle */}
          <button
            onClick={toggle}
            className="hidden md:block ml-4 p-3 rounded-full bg-gray-100/70 dark:bg-slate-800/70 hover:bg-gray-200/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-slate-700"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-full bg-gray-100/70 dark:bg-slate-800/70 hover:bg-gray-200/80 dark:hover:bg-slate-700/80 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-gray-100/70 dark:bg-slate-800/70 hover:bg-gray-200/80 dark:hover:bg-slate-700/80 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Floating Menu */}
      {isMenuOpen && (
        <div className="fixed top-20 right-4 z-50 w-[calc(100%-2rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 md:hidden overflow-hidden">
          <nav className="py-2">
            <NavLink to="/" className={mobileNavCls} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/load" className={mobileNavCls} onClick={closeMenu}>
              Load More
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
};
