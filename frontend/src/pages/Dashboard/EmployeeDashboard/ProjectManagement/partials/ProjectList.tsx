import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { PAGE_ANIMATION } from "../../../../../modules/constants";
import SearchBox from "../../../../../components/SearchBox";
import { Pagination, Table } from "antd";
import { projectColumns } from "../schemas";
import { GET } from "../../../../../modules/request";
import { ProjectDetail } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import useQueryParams from "@/hooks/useQueryParams";
import useUiStore from "@/stores/uiStore";

export default function ProjectList() {
  const { page } = useQueryParams();
  const navigate = useNavigate();
  const { revalidate } = useUiStore();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["pendingProjects", revalidate],
    queryFn: async () =>
      await GET(`/api/Project/pending?pageNumber=${page || 1}&pageSize=10`),
  });

  return (
    <motion.div {...PAGE_ANIMATION}>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Project Management
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          Manage and monitor all projects in the system
        </div>
      </div>
      <div className="flex justify-between mb-4 items-center">
        <SearchBox widthClass="w-full" />
      </div>
      <Table
        pagination={false}
        loading={isLoading || isRefetching}
        columns={projectColumns()}
        dataSource={data?.value?.items as ProjectDetail[]}
        rowKey={(record: ProjectDetail) => record?.projectId}
      />
      <div className="flex justify-end">
        <Pagination
          className="py-8"
          showTotal={(total) => `Total ${total} items`}
          defaultCurrent={data?.value?.pageNumber}
          total={data?.value?.totalCount}
          onChange={(page) => {
            navigate(`/employee/projects?page=${page}`);
          }}
        />
      </div>
    </motion.div>
  );
}
