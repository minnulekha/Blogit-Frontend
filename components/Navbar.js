// frontend/components/Navbar.js
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <div className="text-2xl font-cursive text-pink-600 tracking-wide">
          <Link href="/">BlogIt</Link>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>

          {user && (
            <Link href="/create" className="hover:text-pink-600 transition">
              Create Post
            </Link>
          )}

          {!user ? (
            <>
              {/* You can remove Login/Signup here if not needed */}
              <Link href="/login" className="hover:text-pink-600 transition">Login</Link>
              <Link
                href="/signup"
                className="bg-pink-400 hover:bg-pink-500 px-4 py-1 rounded text-white transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="bg-pink-500 hover:bg-pink-600 px-4 py-1 rounded text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
