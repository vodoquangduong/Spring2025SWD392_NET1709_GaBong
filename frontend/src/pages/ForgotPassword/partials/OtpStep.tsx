interface OtpStepProps {
  onNext: () => void;
  onBack: () => void;
}

const OtpStep = ({ onNext, onBack }: OtpStepProps) => {
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Enter Verification Code
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          We've sent a code to your email
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="mb-6">
          <div className="flex gap-2 justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xl font-semibold focus:border-emerald-500 focus:ring-emerald-500"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-colors duration-200 mb-3"
        >
          Verify Code
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 px-4 text-zinc-900 dark:text-white bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg font-semibold transition-colors duration-200"
        >
          Back
        </button>

        <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Didn't receive the code?{" "}
          <button className="text-emerald-500 hover:text-emerald-600 font-medium">
            Resend
          </button>
        </p>
      </form>
    </div>
  );
};

export default OtpStep;
