import React, { useState } from "react";
import { FaEdit, FaEye, FaStar, FaTrash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Service } from "../models/types";

const mockData: Service[] = [
  {
    id: "SRV001",
    name: "Website Development",
    description: "Professional website development services",
    category: "Development",
    price: 500,
    status: "active",
    rating: 4.8,
    totalReviews: 125,
    createdBy: {
      id: "USR001",
      name: "John Developer",
      avatar: "https://example.com/avatar.jpg",
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
  },
];

const categories = ["Development", "Design", "Marketing", "Writing", "Other"];
const statuses = ["active", "inactive", "pending"];

const ServiceList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
  });

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300";
      case "inactive":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300";
      case "pending":
        return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300";
    }
  };

  // Filter data
  const filteredData = mockData.filter((service) => {
    const matchesCategory =
      !filters.category || service.category === filters.category;
    const matchesStatus = !filters.status || service.status === filters.status;
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 bg-white dark:bg-[#141414]">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Services
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and monitor all services
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-6 bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <select
            className="px-4 py-2 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 min-w-[200px]"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 min-w-[200px]"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full px-4 py-2 pl-10 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-700">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {service.createdBy.avatar ? (
                          <img
                            src={service.createdBy.avatar}
                            alt={service.name}
                            className="w-full h-full rounded-md object-cover"
                          />
                        ) : (
                          <FaUser className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {service.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      ${service.price}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {service.rating}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        ({service.totalReviews})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                        service.status
                      )}`}
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/employee/services/${service.id}`)
                        }
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        title="Edit service"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete service"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="px-2 py-1 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={
                page >= Math.ceil(filteredData.length / rowsPerPage) - 1
              }
              className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
