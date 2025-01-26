interface ResetStepProps {
  onBack: () => void;
}

const ResetStep = ({ onBack }: ResetStepProps) => {
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Reset Password
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          Create your new password
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/login";
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-colors duration-200 mb-3"
        >
          Reset Password
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 px-4 text-zinc-900 dark:text-white bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg font-semibold transition-colors duration-200"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default ResetStep;
