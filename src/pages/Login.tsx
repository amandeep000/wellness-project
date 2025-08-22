import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  form?: string;
}

const Login = () => {
  const loginMutation = useLogin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  const isLoading = loginMutation.isPending;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;

  const validateField = (name: keyof LoginData, value: string): string => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!emailRegex.test(value))
          return "Please enter a valid email address.";
        break;
      case "password":
        if (!value.trim()) return "Password is required.";
        if (!passwordRegex.test(value))
          return "Password must be at least 8 characters.";
        break;
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: LoginErrors = {};
    (Object.keys(formData) as (keyof LoginData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const userData = await loginMutation.mutateAsync(formData);

      queryClient.setQueryData(["currentUser"], userData);

      navigate("/account/profile", { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      const fieldErrors: LoginErrors = {};
      if (message.toLowerCase().includes("password"))
        fieldErrors.password = message;
      if (message.toLowerCase().includes("email")) fieldErrors.email = message;
      if (!fieldErrors.email && !fieldErrors.password)
        fieldErrors.form = message;

      setErrors(fieldErrors);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-48 h-48 bg-white/15 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-24 h-24 bg-white/25 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-10 right-1/3 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Login Form starts here...*/}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-white/70">Sign in to your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="loginEmail"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    errors.email
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/30 focus:border-white/60"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="loginPassword"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    errors.password
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/30 focus:border-white/60"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {errors.form && (
                <p className="text-red-400 text-sm text-center mb-4">
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  isLoading
                    ? "bg-white/20 text-white/50 cursor-not-allowed"
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50"
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to={"/signup"}>
                <p className="text-white/60 text-sm">
                  Don't have an account?{" "}
                  <span className="text-white font-medium cursor-pointer hover:underline transition-all duration-300">
                    Sign Up
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
