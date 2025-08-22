import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

interface FormErrors {
  fullname?: string;
  email?: string;
  password?: string;
  form?: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const signupMutation = useSignup();

  const patterns = {
    fullname: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  };

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "fullname":
        if (!patterns.fullname.test(value)) {
          return "Full name must be 2-50 characters (letters and spaces only)";
        }
        break;
      case "email":
        if (!patterns.email.test(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "password":
        if (!patterns.password.test(value)) {
          return "Password must be 8+ characters with uppercase, lowercase, and number";
        }
        break;
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await signupMutation.mutateAsync(formData, {
          onSuccess: () => {
            setIsSubmitted(true);
            setTimeout(() => {
              navigate("/account");
            }, 1500);
          },
          onError: (err: any) => {
            const message =
              err?.response?.data?.message ||
              err?.message ||
              "Something went wrong. Please try again.";
            if (message.toLowerCase().includes("password")) {
              setErrors({ password: message });
            } else if (message.toLowerCase().includes("email")) {
              setErrors({ email: message });
            } else {
              setErrors({ form: message });
            }
          },
        });
      } catch (err) {
        console.error("Signup error: ", err);
      }
    }
  };

  const isLoading = signupMutation.isPending;

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm bg-white/10">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Account Created!</h2>
            <p className="text-white/80">Welcome aboard, {formData.fullname}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Glassmorphism Background */}
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

      {/* Signup Form starts from here...*/}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
              <p className="text-white/70">Create your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    errors.fullname
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/30 focus:border-white/60"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullname && (
                  <p className="text-red-300 text-sm mt-1">{errors.fullname}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
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
                  <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    errors.password
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/30 focus:border-white/60"
                  }`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="text-red-300 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  isLoading
                    ? "bg-white/20 text-white/50 cursor-not-allowed"
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              {errors.form && (
                <p className="text-red-300 text-sm mt-2 text-center">
                  {errors.form}
                </p>
              )}
            </form>

            <div className="mt-6 text-center">
              <Link to={"/login"}>
                <p className="text-white/60 text-sm">
                  Already have an account?{" "}
                  <span className="text-white font-medium cursor-pointer hover:underline transition-all duration-300">
                    Sign In
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

export default Signup;
