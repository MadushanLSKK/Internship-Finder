import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-400">
           Hello {user?.name} 👋
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-green-400 transition"
                >
                  Admin Dashboard
                </Link>
              )}
              {user?.role === "company" && (
                <Link
                  to="/company/dashboard"
                  className="hover:text-green-400 transition"
                >
                  Company Dashboard
                </Link>
              )}
              {user?.role === "student" && (
                <Link
                  to="/student/dashboard"
                  className="hover:text-green-400 transition"
                >
                  Student Dashboard
                </Link>
              )}
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-green-400 transition">
                Login
              </Link>
              
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none text-white"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4 shadow-lg">
          {isAuthenticated && (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={toggleMenu}
                  className="block hover:text-green-400 transition"
                >
                  Admin Dashboard
                </Link>
              )}
              {user?.role === "company" && (
                <Link
                  to="/company/dashboard"
                  onClick={toggleMenu}
                  className="block hover:text-green-400 transition"
                >
                  Company Dashboard
                </Link>
              )}
              {user?.role === "student" && (
                <Link
                  to="/student/dashboard"
                  onClick={toggleMenu}
                  className="block hover:text-green-400 transition"
                >
                  Student Dashboard
                </Link>
              )}
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block hover:text-green-400 transition"
              >
                Login
              </Link>
              
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
