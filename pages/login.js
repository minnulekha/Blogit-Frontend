import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      router.push("/");
    } catch (error) {
      setErr(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-pink-100">
          <h1 className="text-3xl font-bold text-center text-pink-500 mb-6">
            Login
          </h1>

          <form onSubmit={submit} className="space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
            />

            {err && (
              <p className="text-red-500 text-sm font-medium text-center">
                {err}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
