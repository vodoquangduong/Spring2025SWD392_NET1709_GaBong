interface EmailStepProps {
  onNext: () => void;
}

const EmailStep = ({ onNext }: EmailStepProps) => {
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Forgot Password?
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          Enter your email to receive a verification code
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-colors duration-200"
        >
          Send Verification Code
        </button>

        <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-emerald-500 hover:text-emerald-600 font-medium"
          >
            Back to login
          </a>
        </p>
      </form>
    </div>
  );
};

export default EmailStep;
