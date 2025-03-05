import { App } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUseCase } from "../usecases/registerUseCase";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 3, // Mặc định là client
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
    console.log("Role changed to:", value); // Debug log
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 50
    ) {
      message.error("Full name must be between 2 and 50 characters");
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      message.error("Invalid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      // Loại bỏ confirmPassword
      const { confirmPassword, ...registerData } = formData;

      message.open({
        type: "loading",
        content: "Creating your account...",
        duration: 0,
      });
      const response = await registerUseCase.register(registerData);
      console.log("Register success:", response);

      message.destroy(); // Đóng loading message
      message.success("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      message.destroy();
      console.error("Registration failed:", err);

      if (err?.message) {
        if (err.message.includes("System.InvalidOperationException")) {
          message.error("Remote database return 500 again 😥");
        } else {
          const errorMessage = err.message.replace("Error: ", "");
          message.error(errorMessage);
        }
      } else {
        message.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-1/2 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-zinc-100 dark:bg-zinc-950 border-0">
          <div className="p-6 mb-0 text-center border-b border-zinc-200 dark:border-zinc-800 rounded-t-2xl">
            <h5 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Create Account
            </h5>
          </div>

          <div className="flex-auto p-6">
            <form className="text-left" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

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
                  placeholder="example@email.com"
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
                  placeholder="••••••••"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-3">
                  I want to be a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className="flex items-center justify-center p-4 border rounded-lg cursor-pointer 
                    border-zinc-200 dark:border-zinc-700 
                    bg-zinc-50 dark:bg-zinc-800
                    hover:bg-zinc-100 dark:hover:bg-zinc-700
                    hover:border-emerald-500 dark:hover:border-emerald-500 
                    [&:has(input:checked)]:border-emerald-500 [&:has(input:checked)]:border-2
                    transition-all duration-200"
                  >
                    <input
                      type="radio"
                      name="role"
                      value="3"
                      checked={formData.role === 3}
                      onChange={handleRoleChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <span className="block text-zinc-900 dark:text-white font-medium">
                        Client
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        I want to hire
                      </span>
                    </div>
                  </label>

                  <label
                    className="flex items-center justify-center p-4 border rounded-lg cursor-pointer 
                    border-zinc-200 dark:border-zinc-700 
                    bg-zinc-50 dark:bg-zinc-800
                    hover:bg-zinc-100 dark:hover:bg-zinc-700
                    hover:border-emerald-500 dark:hover:border-emerald-500 
                    [&:has(input:checked)]:border-emerald-500 [&:has(input:checked)]:border-2
                    transition-all duration-200"
                  >
                    <input
                      type="radio"
                      name="role"
                      value="2"
                      checked={formData.role === 2}
                      onChange={handleRoleChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <span className="block text-zinc-900 dark:text-white font-medium">
                        Freelancer
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        I want to work
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="min-h-6 mb-0.5 block">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 rounded-md cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 mr-2"
                  />
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-zinc-900 dark:text-white hover:text-emerald-500"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-zinc-900 dark:text-white hover:text-emerald-500"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="inline-block w-full px-6 py-3 font-semibold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-sm ease-in tracking-tight-soft shadow-md hover:shadow-xs"
                >
                  Create Account
                </button>
              </div>

              <p className="mt-4 mb-0 text-sm text-center text-zinc-500 dark:text-zinc-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-zinc-900 dark:text-white hover:text-emerald-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
