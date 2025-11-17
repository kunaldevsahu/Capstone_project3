import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User, AlertCircle } from "lucide-react";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (tab === "login") {
        await login({
          email: credentials.email,
          password: credentials.password,
        });
        navigate("/dashboard")
      } else {
        await register({
          name: credentials.username,
          email: credentials.email,
          password: credentials.password,
        });
        navigate("/dashboard")
      }

    } catch (err) {
      console.log("ERR:", err);
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/gym-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md p-8 bg-gray-900/70 border border-gray-700 rounded-2xl shadow-xl">
        <h1 className="text-center text-3xl font-bold text-orange-400 mb-6">
          FITQUEST Gym Login
        </h1>

        {/* Tabs */}
        <div className="flex bg-gray-800 rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 ${
              tab === "login"
                ? "bg-orange-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 ${
              tab === "signup"
                ? "bg-orange-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-900/40 p-3 rounded-lg border border-red-700 flex items-center gap-2 text-red-300">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {tab === "signup" && (
            <InputField
              icon={<User className="text-gray-400" />}
              name="username"
              placeholder="Your Name"
              value={credentials.username}
              onChange={handleChange}
            />
          )}

          <InputField
            icon={<Mail className="text-gray-400" />}
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />

          <InputField
            icon={<Lock className="text-gray-400" />}
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
          >
            {loading ? "Please wait..." : tab === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
      <input
        {...props}
        className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}
