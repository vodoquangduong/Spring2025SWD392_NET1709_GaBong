import { FaCheckCircle } from "react-icons/fa";

const Verifications = () => {
  return (
    <div className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Verifications
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Identity</span>
          <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Phone</span>
          <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Email</span>
          <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
};

export default Verifications;
