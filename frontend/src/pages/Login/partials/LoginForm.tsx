import { Role } from "@/types";
import { App } from "antd";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUseCase } from "../usecases/loginUseCase";

const LoginForm = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.email || !formData.password) {
      message.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      message.error("Invalid email address");
      return;
    }

    try {
      console.log("Login data:", formData);
      message.open({
        type: "loading",
        content: "Logging in...",
        duration: 0,
      });
      const response = await loginUseCase.login(formData);
      console.log("Login success:", response);
      message.destroy();
      message.success("Login successful!");
      const decoded: any = jwtDecode(response.token);
      if (decoded?.role == Role.ADMIN || decoded?.role == Role.STAFF) {
        navigate("/employee");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      message.destroy();

      if (err?.message) {
        if (err.message.includes("System.InvalidOperationException")) {
          message.error("Remote database return 500 again 😥");
        } else {
          const errorMessage = err.message.replace("Error: ", "");
          message.error(errorMessage);
        }
      } else {
        message.error("Login failed. Please try again.");
      }
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
            <form className="text-left" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-4">
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
                  className="text-sm text-zinc-900 dark:text-white hover:text-emerald-500"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="inline-block w-full px-6 py-3 font-semibold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-sm ease-in tracking-tight-soft shadow-md hover:shadow-xs"
                >
                  Sign In
                </button>
              </div>

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
