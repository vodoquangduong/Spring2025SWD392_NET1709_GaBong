import Back from "@/components/Back";
import { setCookie } from "@/modules/cookie";
import { POST } from "@/modules/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { App } from "antd";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const ResetStep = () => {
  const { message } = App.useApp();
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.searchParams);
  const decoded = jwtDecode(params.get("token") || "") as any;
  setCookie("accessToken", params.get("token") || "", 7);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: { email: decoded?.email, password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: any) => {
    console.log("Form data:", formData);
    const res = await POST(
      "/api/Authentication/confirm-password",
      formData,
      false
    );
    message.loading("Please wait...", 0);
    if (res?.token) {
      setCookie("accessToken", res.token, 7);
      location.href = "/login";
    } else {
      setError("email", {
        type: "manual",
        message: "Email not found!",
      });
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pattern-chevron opacity-[0.03] dark:opacity-[0.025]"></div>
      <div className="w-full max-w-md">
        <div className="relative z-0 flex flex-col break-words border-0">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Reset Password
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Create your new password
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                  New Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Your new password"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.password && (
                  <span className="error-msg">{errors.password.message}</span>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.confirmPassword && (
                  <span className="error-msg">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-colors duration-200 mb-3"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <Back />
    </main>
  );
};

export default ResetStep;
