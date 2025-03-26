interface OtpStepProps {
  onNext: () => void;
  onBack: () => void;
}

const SendSuccessStep = ({ onNext, onBack }: OtpStepProps) => {
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Reset Password Successfully
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          We've sent a link to your email, please check your inbox
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="mb-6">
          <a
            href="https://mail.google.com/mail/u"
            target="_blank"
            className="block text-center w-full py-3 px-4 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-colors duration-200 mb-3 hover:text-white"
          >
            Check Email
          </a>
        </div>

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

export default SendSuccessStep;
