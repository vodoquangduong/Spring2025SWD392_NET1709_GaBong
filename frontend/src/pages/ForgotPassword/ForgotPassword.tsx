import Back from "../../components/Back";
import "./forgotPassword.css";
import ForgotPasswordForm from "./partials/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Simple chevron pattern background */}
      <div className="absolute inset-0 pattern-chevron opacity-[0.03] dark:opacity-[0.025]"></div>

      <ForgotPasswordForm />
      <Back />
    </main>
  );
};

export default ForgotPassword;
