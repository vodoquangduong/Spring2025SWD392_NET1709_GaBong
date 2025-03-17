import { FaPlus, FaTrash } from "react-icons/fa";
// import { CertificationsProps } from "../models/types";

const EditCertifications = ({ certifications }: any) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Certifications</h2>
        <button className="text-emerald-600 hover:text-emerald-700">
          <FaPlus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {certifications?.map((cert, index) => (
          <div
            key={index}
            className="flex justify-between items-start p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-medium">{cert.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {cert.date}
              </p>
            </div>
            <button className="text-red-500 hover:text-red-700">
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add New Form */}
        <div className="grid grid-cols-1 gap-4 mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="Certification Name"
          />
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="Issuing Organization"
          />
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="Issue Year"
          />
          <div className="flex justify-end">
            <button className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCertifications;
