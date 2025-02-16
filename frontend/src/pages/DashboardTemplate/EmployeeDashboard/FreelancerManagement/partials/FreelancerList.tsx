import React, { useState } from "react";
import { FaEye, FaFilter, FaSearch, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Freelancer } from "../models/types";

const mockData: Freelancer[] = [
  {
    id: "FL001",
    name: "John Doe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s",
    email: "john.doe@example.com",
    phone: "+1234567890",
    skills: ["React", "Node.js", "TypeScript"],
    rating: 4.8,
    totalProjects: 25,
    completedProjects: 23,
    status: "active",
    joinDate: "2023-01-15",
    lastActive: "2024-02-03",
  },
];

const FreelancerList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    skill: "",
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
      case "banned":
        return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300";
    }
  };

  // Filter data
  const filteredData = mockData.filter((freelancer) => {
    const matchesStatus =
      !filters.status || freelancer.status === filters.status;
    const matchesSkill =
      !filters.skill ||
      freelancer.skills.some((skill) =>
        skill.toLowerCase().includes(filters.skill.toLowerCase())
      );
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      freelancer.name.toLowerCase().includes(searchTerm) ||
      freelancer.email.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesSkill && matchesSearch;
  });

  return (
    <div className="p-6 bg-white dark:bg-[#141414]">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Freelancers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and monitor all freelancers
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-6 bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <select
            className="px-4 py-2 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 min-w-[200px]"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>

          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by skill..."
                className="w-full px-4 py-2 pl-10 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
                value={filters.skill}
                onChange={(e) =>
                  setFilters({ ...filters, skill: e.target.value })
                }
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaFilter className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search freelancers..."
                className="w-full px-4 py-2 pl-10 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch className="w-4 h-4" />
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
                  Freelancer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((freelancer) => (
                  <tr
                    key={freelancer.id}
                    className="hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          {freelancer.avatar ? (
                            <img
                              src={freelancer.avatar}
                              alt={freelancer.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                              {freelancer.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {freelancer.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {freelancer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {freelancer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FaStar className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-900 dark:text-gray-100">
                          {freelancer.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {freelancer.completedProjects}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          /{freelancer.totalProjects}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                          freelancer.status
                        )}`}
                      >
                        {freelancer.status.charAt(0).toUpperCase() +
                          freelancer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {freelancer.joinDate}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {freelancer.lastActive}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(`/employee/freelancers/${freelancer.id}`)
                        }
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
                        title="View details"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
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

export default FreelancerList;
