import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";

const RegisterForm = () => {
  const { login } = useAuthStore();

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
            <form className="text-left">
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+84 123456789"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
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
                  type="email"
                  placeholder="example@email.com"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
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
                  type="password"
                  placeholder="••••••••"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
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
                    transition-all duration-200"
                  >
                    <input
                      type="radio"
                      name="role"
                      value="client"
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
                    transition-all duration-200"
                  >
                    <input
                      type="radio"
                      name="role"
                      value="freelancer"
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
                  type="button"
                  className="inline-block w-full px-6 py-3 font-semibold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-sm ease-in tracking-tight-soft shadow-md hover:shadow-xs"
                  onClick={() => {
                    login({ email: "12345", password: "12345" });
                    window.location.href = "/";
                  }}
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
