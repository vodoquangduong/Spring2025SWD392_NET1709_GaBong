import { App } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUseCase } from "../usecases/registerUseCase";
//overflow rieng
const RegisterForm = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    gender: 0,
    role: 3, // Mặc định là client
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender" || name === "role" ? parseInt(value) : value,
    }));
  };

  const handleRoleChange = (role: number) => {
    setFormData((prev) => ({
      ...prev,
      role: role,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Kiểm tra password match
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      // Loại bỏ confirmPassword và format dữ liệu
      const { confirmPassword, ...rest } = formData;

      // Format birthday thành ISO string
      const registerData = {
        ...rest,
        birthday: new Date(rest.birthday).toISOString(),
      };

      console.log("register data:", registerData);
      const response = await registerUseCase.register(registerData);
      console.log("Register success!!!!:", response);
      message.success("Register successfully");
      // Nếu đăng ký thành công, chuyển đến trang login
      navigate("/login");
    } catch (err: any) {
      console.error("Registration failed!!!!:", err);
      // Hiển thị thông báo lỗi từ server hoặc thông báo mặc định
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
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
              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}
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
                  htmlFor="phone"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+84 123456789"
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Your address"
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
                  htmlFor="birthday"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Birthday
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-zinc-900 dark:text-white mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="input-style h-11 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                >
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                  <option value={2}>Other</option>
                </select>
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
                      checked={formData.role === 3}
                      onChange={() => handleRoleChange(3)}
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
                      checked={formData.role === 2}
                      onChange={() => handleRoleChange(2)}
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
