"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    if (isRegister && !name) {
      alert("Please enter your name.");
      return;
    }

    // Demo login/register
    localStorage.setItem(
      "soilSmartUser",
      JSON.stringify({
        name: name || "Farmer",
        email,
      })
    );

    alert(
      isRegister
        ? "Registration successful!"
        : "Login successful!"
    );

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl">🌱</div>

          <h1 className="text-3xl font-bold text-green-800 mt-3">
            SoilSmart
          </h1>

          <p className="text-gray-600 mt-2">
            AI-Powered Soil & Crop Analytics
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-green-800 text-center">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-gray-600 text-center mt-2">
            {isRegister
              ? "Create your farmer account"
              : "Login to continue to SoilSmart"}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* Name */}
            {isRegister && (
              <div>
                <label className="block font-semibold text-gray-800 mb-2">
                  👤 Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                📧 Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                🔒 Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
              />
            </div>

            {/* Remember me */}
            {!isRegister && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4"
                />

                <label
                  htmlFor="remember"
                  className="text-gray-700"
                >
                  Remember me
                </label>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition"
            >
              {isRegister
                ? "Create Account 🌱"
                : "Login 🌱"}
            </button>

          </form>

          {/* Switch Login/Register */}
          <div className="text-center mt-6">

            <p className="text-gray-600">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>

            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-green-700 font-bold mt-1 hover:underline"
            >
              {isRegister
                ? "Login here"
                : "Create an account"}
            </button>

          </div>

          {/* Continue without login */}
          <button
            onClick={() => router.push("/")}
            className="w-full mt-5 border border-green-700 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Continue as Guest
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          🌾 Smart decisions for better crop management
        </p>

      </div>

    </main>
  );
}
