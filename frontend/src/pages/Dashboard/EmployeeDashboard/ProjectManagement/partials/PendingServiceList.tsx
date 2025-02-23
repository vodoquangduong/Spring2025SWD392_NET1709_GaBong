import React, { useState } from "react";
import {
  FaCalendar,
  FaCheck,
  FaClock,
  FaEye,
  FaFilter,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PendingService } from "../models/types";

const mockData: PendingService[] = [
  {
    id: "SRV001",
    title: "Web Development Service",
    description: "Professional web development service using React and Node.js",
    freelancer: {
      id: "FL001",
      name: "John Doe",
      avatar: "https://www.webiconio.com/_upload/255/image_255.svg",
    },
    category: "Web Development",
    price: {
      amount: 500,
      currency: "USD",
    },
    submittedAt: "2024-02-20",
    waitingTime: "2 days",
    status: "pending",
  },
  {
    id: "SRV002",
    title: "UI/UX Design Service",
    description: "Professional UI/UX design service for web and mobile apps",
    freelancer: {
      id: "FL002",
      name: "Jane Smith",
      avatar: "https://www.webiconio.com/_upload/255/image_255.svg",
    },
    category: "Design",
    price: {
      amount: 300,
      currency: "USD",
    },
    submittedAt: "2024-02-19",
    waitingTime: "3 days",
    status: "pending",
  },
];

const PendingServiceList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    category: "",
    freelancer: "",
    dateRange: "",
    search: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "submittedAt",
    direction: "desc",
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

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter and sort data
  const filteredAndSortedData = mockData
    .filter((service) => {
      const matchesCategory =
        !filters.category || service.category === filters.category;
      const matchesFreelancer =
        !filters.freelancer ||
        service.freelancer.name
          .toLowerCase()
          .includes(filters.freelancer.toLowerCase());
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesFreelancer && matchesSearch;
    })
    .sort((a, b) => {
      if (sortConfig.key === "submittedAt") {
        return sortConfig.direction === "asc"
          ? new Date(a.submittedAt).getTime() -
              new Date(b.submittedAt).getTime()
          : new Date(b.submittedAt).getTime() -
              new Date(a.submittedAt).getTime();
      }
      if (sortConfig.key === "title") {
        return sortConfig.direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortConfig.key === "freelancer") {
        return sortConfig.direction === "asc"
          ? a.freelancer.name.localeCompare(b.freelancer.name)
          : b.freelancer.name.localeCompare(a.freelancer.name);
      }
      return 0;
    });

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#141414]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pending Services
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and manage pending service submissions
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search services..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
              <FaFilter className="mr-2 h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Service List */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  Service Details
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("freelancer")}
                >
                  Freelancer
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("submittedAt")}
                >
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Waiting Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {service.title}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {service.description}
                        </span>
                        <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                          {service.price.currency} {service.price.amount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={service.freelancer.avatar}
                          alt={service.freelancer.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {service.freelancer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {service.freelancer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendar className="mr-2 h-4 w-4" />
                        {service.submittedAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaClock className="mr-2 h-4 w-4" />
                        {service.waitingTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            navigate(`/employee/services/${service.id}`)
                          }
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
                        >
                          <FaEye className="h-5 w-5" />
                        </button>
                        <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300">
                          <FaCheck className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                          <FaTimes className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-zinc-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={
                (page + 1) * rowsPerPage >= filteredAndSortedData.length
              }
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-medium">{page * rowsPerPage + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(
                    (page + 1) * rowsPerPage,
                    filteredAndSortedData.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredAndSortedData.length}
                </span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 0}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleChangePage(page + 1)}
                  disabled={
                    (page + 1) * rowsPerPage >= filteredAndSortedData.length
                  }
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingServiceList;
