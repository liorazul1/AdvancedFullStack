import { LogOut, User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user, logout } = auth;

  return (
    <nav className="bg-white/98 backdrop-blur-2xl border-b border-[#2d2d2d]/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-6">
        <div className="flex items-center justify-between h-auto min-h-20 py-4 gap-4">

          <div className="flex items-center gap-6 md:gap-16">
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl md:text-[32px] font-black tracking-tight">
                <span className="text-[#2d2d2d]">Tasty</span>
                <span className="text-[#FF5733]">Match</span>
              </span>
            </Link>

            <Link
              to="/explore"
              className="text-base font-black text-[#2d2d2d]/70 hover:text-[#FF5733] transition-colors"
            >
              Explore
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-5 py-3 bg-[#FAFAFA] rounded-full hover:bg-[#FF5733]/10 transition-all"
                >
                  <User className="w-5 h-5 text-[#2d2d2d]/60" />

                  <span className="text-sm font-black text-[#2d2d2d]">
                    {user.username}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 md:px-6 py-3 rounded-full text-base font-black text-[#2d2d2d] hover:bg-[#FAFAFA] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-full text-base font-black text-[#2d2d2d] hover:bg-[#FAFAFA] transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="w-10 h-10 sm:w-auto sm:h-auto sm:px-4 md:px-6 sm:py-3 rounded-full bg-[#2d2d2d] text-white text-sm md:text-base font-black hover:bg-[#2d2d2d]/90 hover:scale-[1.02] transition-all shadow-lg whitespace-nowrap flex items-center justify-center shrink-0"
                >
                  <UserPlus className="w-4 h-4 sm:hidden" />

                  <span className="hidden sm:inline">
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;