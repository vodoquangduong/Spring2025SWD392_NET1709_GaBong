import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";
import { useState } from "react";
import { POST } from "../../../modules/request";

const LoginForm = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi gửi request

    try {
      const response = await POST("/api/Authentication/login", {
        email,
        password,
      });

      const token = response; // Lấy token từ phản hồi của API
      console.log("Token:", token);
      login(token); // Lưu token bằng authStore hoặc localStorage tùy bạn
      navigate("/"); // Chuyển hướng về trang chủ
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="w-1/2 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-zinc-100 dark:bg-zinc-950 border-0">
          <div className="p-6 mb-0 text-center border-b border-zinc-200 dark:border-zinc-800 rounded-t-2xl">
            <h5 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Welcome Back
            </h5>
          </div>

          <div className="flex-auto p-6">
            <form className="text-left" onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 mr-2"
                  />
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-500 hover:text-emerald-600"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              {/* Login Button */}
              <button
                type="button"
                className="inline-block w-full px-6 py-3 font-semibold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-sm ease-in tracking-tight-soft shadow-md hover:shadow-xs mb-4"
                // onClick={() => {
                //   login({ email: "12345", password: "12345" });
                //   navigate("/");
                // }}
                onClick={handleLogin}
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-950">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                className="inline-block w-full px-6 py-3 font-semibold text-center text-zinc-900 dark:text-white uppercase align-middle transition-all border rounded-lg cursor-pointer border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-sm ease-in tracking-tight-soft shadow-md hover:shadow-xs"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </div>
              </button>

              {/* Register Link */}
              <p className="mt-4 mb-0 text-sm text-center text-zinc-500 dark:text-zinc-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-zinc-900 dark:text-white hover:text-emerald-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
