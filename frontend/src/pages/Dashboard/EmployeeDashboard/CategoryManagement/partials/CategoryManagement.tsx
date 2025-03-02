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
import { Pagination, Table } from "antd";
import { categoryColumns } from "../schemas";
import { GET } from "../../../../../modules/request";
import { ProjectDetail } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import useQueryParams from "@/hooks/useQueryParams";
import CreateModal from "@/components/CreateModal";
import CreateCategoryForm from "../forms/CreateCategoryForm";
import useUiStore from "@/stores/uiStore";

export default function CategoryManagement() {
  const { page } = useQueryParams();
  const navigate = useNavigate();
  const { revalidate } = useUiStore();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["skillCategories", revalidate],
    queryFn: async () => await GET(`/api/SkillCategory`),
  });
  console.log(data);

  return (
    <motion.div {...PAGE_ANIMATION}>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Category Management
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          Manage and monitor all category in the system
        </div>
      </div>
      <div className="flex justify-between mb-4 items-center gap-4">
        <SearchBox widthClass="w-full" />
        <div>
          <CreateModal
            // type="default"
            icon={<FaPlus size={12} />}
            children={"Add Category"}
            modalTitle={"Add Category"}
            form={(
              setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
            ) => <CreateCategoryForm setIsModalOpen={setIsModalOpen} />}
          />
        </div>
      </div>
      <Table
        loading={isLoading || isRefetching}
        columns={categoryColumns()}
        dataSource={data}
        rowKey={(record) => record?.skillId + "skill"}
      />
    </motion.div>
  );
}
