import { CertificationsProps } from "../models/types";

const Certifications = ({ certifications }: CertificationsProps) => {
  return (
    <section className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Certifications
      </h2>

      <div className="space-y-6">
        {certifications?.map((cert, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {cert.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {cert.date}
            </p>
          </div>
        ))}

        {(!certifications || certifications.length === 0) && (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">
              No certifications added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
