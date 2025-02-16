import { FaCertificate, FaPlus } from "react-icons/fa";
import { CertificationsProps } from "../models/types";

const Certifications = ({ certifications }: CertificationsProps) => {
  return (
    <section className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Certifications
        </h2>
        <button className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
          <FaPlus className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5"
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <FaCertificate className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {cert.name}
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {cert.issuer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {cert.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
