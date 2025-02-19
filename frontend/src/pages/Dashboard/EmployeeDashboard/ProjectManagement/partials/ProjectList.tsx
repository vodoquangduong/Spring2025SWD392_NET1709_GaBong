import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Project } from "../models/types";
import { motion } from "motion/react";
import { PAGE_ANIMATION } from "../../../../../modules/constants";
import SearchBox from "../../../../../components/SearchBox";
import { Table } from "antd";
import { projectColumns } from "../schemas";
import { GET } from "../../../../../modules/request";
import { ProjectDetail } from "@/types/project";

const mockData: Partial<ProjectDetail>[] = [
  {
    projectId: "PRJ001",
    clientId: "CL001",
    title: "E-commerce Website Development",
    projectDescription:
      "We are looking for a highly skilled and experienced developer to build a modern, feature-rich e-commerce website that provides a seamless shopping experience for users. The ideal candidate should have expertise in developing responsive, intuitive, and visually appealing websites, with a focus on user interface design, performance optimization, and integration with payment gateways. This website will need to support a wide range of products, enable secure transactions, and include essential e-commerce features such as a shopping cart, order tracking, customer reviews, and product recommendations. Additionally, experience with SEO optimization, website security, and analytics integration is a must. If you're passionate about creating high-quality, user-friendly e-commerce platforms and have a strong portfolio to showcase your work, we'd love to collaborate with you on this exciting project.",
    type: "fixed",
    budget: {
      min: 2000,
      max: 5000,
      currency: "USD",
    },
    duration: {
      value: 2,
      unit: "months",
    },
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    status: "open",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
    client: {
      id: "CL001",
      name: "John Smith",
      avatar: "https://www.webiconio.com/_upload/255/image_255.svg",
    },
  },
];

// const ProjectList: React.FC = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filters, setFilters] = useState({
//     status: "",
//     type: "",
//     search: "",
//   });

//   const handleChangePage = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case "open":
//         return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200";
//       case "in_progress":
//         return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
//       case "completed":
//         return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
//       case "cancelled":
//         return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
//       default:
//         return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
//     }
//   };

//   const formatBudget = (budget: Project["budget"]) => {
//     return `${
//       budget.currency
//     } ${budget.min.toLocaleString()} - ${budget.max.toLocaleString()}`;
//   };

//   const formatDuration = (duration: Project["duration"]) => {
//     return `${duration.value} ${duration.unit}`;
//   };

//   // Filter data
//   const filteredData = mockData.filter((project) => {
//     const matchesStatus = !filters.status || project.status === filters.status;
//     const matchesType = !filters.type || project.type === filters.type;
//     const searchTerm = filters.search.toLowerCase();
//     const matchesSearch =
//       !searchTerm ||
//       project.title.toLowerCase().includes(searchTerm) ||
//       project.description.toLowerCase().includes(searchTerm);

//     return matchesStatus && matchesType && matchesSearch;
//   });

//   return (
//     <div className="p-6 bg-gray-100 dark:bg-[#141414]">
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//               Project Management
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Manage and monitor all projects in the system
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/employee/pending-services")}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
//           >
//             <FaEye className="mr-2 h-4 w-4" /> View Pending Services
//           </button>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 mb-6">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="flex flex-col md:flex-row gap-4 flex-1">
//             <div className="relative">
//               <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//               <select
//                 value={filters.status}
//                 onChange={(e) =>
//                   setFilters({ ...filters, status: e.target.value })
//                 }
//                 className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full md:w-48 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
//               >
//                 <option value="">All Status</option>
//                 <option value="open">Open</option>
//                 <option value="in_progress">In Progress</option>
//                 <option value="completed">Completed</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//             </div>

//             <div className="relative flex-1">
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search by project title or description"
//                 value={filters.search}
//                 onChange={(e) =>
//                   setFilters({ ...filters, search: e.target.value })
//                 }
//                 className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//               />
//             </div>
//           </div>

//           <button
//             className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
//             onClick={() => navigate("/employee/projects/add")}
//           >
//             <FaPlus className="mr-2" /> Add Project
//           </button>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-zinc-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Project
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Client
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Budget
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Duration
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredData.map((project) => (
//                 <tr
//                   key={project.id}
//                   className="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900 dark:text-white">
//                         {project.title}
//                       </div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         {project.description}
//                       </div>
//                       <div className="mt-2 flex flex-wrap gap-2">
//                         {project.skills.map((skill, index) => (
//                           <span
//                             key={index}
//                             className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <img
//                         src={project.client.avatar}
//                         alt={project.client.name}
//                         className="h-10 w-10 rounded-full object-cover"
//                         onError={(e) => {
//                           e.currentTarget.src =
//                             "https://via.placeholder.com/40?text=Client";
//                         }}
//                       />
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900 dark:text-white">
//                           {project.client.name}
//                         </div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           {project.client.id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
//                     {formatBudget(project.budget)}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
//                     {formatDuration(project.duration)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
//                         project.status
//                       )}`}
//                     >
//                       {project.status.charAt(0).toUpperCase() +
//                         project.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium">
//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() =>
//                           navigate(`/employee/projects/${project.id}`)
//                         }
//                         className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
//                       >
//                         <FaEye className="w-5 h-5" />
//                       </button>
//                       <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300">
//                         <FaEdit className="w-5 h-5" />
//                       </button>
//                       <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
//                         <FaTrash className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 bg-gray-50 dark:bg-zinc-700 border-t border-gray-200 dark:border-gray-700">
//           <select
//             value={rowsPerPage}
//             onChange={handleChangeRowsPerPage}
//             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
//           >
//             <option value={5}>5 per page</option>
//             <option value={10}>10 per page</option>
//             <option value={25}>25 per page</option>
//           </select>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => handleChangePage(page - 1)}
//               disabled={page === 0}
//               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700 dark:text-gray-300">
//               Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
//             </span>
//             <button
//               onClick={() => handleChangePage(page + 1)}
//               disabled={
//                 page >= Math.ceil(filteredData.length / rowsPerPage) - 1
//               }
//               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// tôi xài component bảng này cho gọn, anh Tiến tham khảo thử, tôi thấy anh Tiến tự code tay cái bảng cũng hơi đuối @@
// cái component bảng này chỉ cần define những trường trong cái cột của bảng thôi, đỡ phải code tay lại nhé

export default function ProjectList() {
  const [listData, setListData] = useState<Partial<ProjectDetail>[]>([]);
  useEffect(() => {
    (async () => {
      // const { data } = await GET("/api/project");
      // setListData(data);
      console.log(mockData);
      setListData(mockData);
    })();
  }, []);
  return (
    <motion.div {...PAGE_ANIMATION}>
      <div className="flex justify-between mb-4 items-center">
        <SearchBox />
      </div>
      <Table
        columns={projectColumns()}
        dataSource={listData as ProjectDetail[]}
        rowKey={(record: ProjectDetail) => record?.projectId}
      />
    </motion.div>
  );
}
