import React from "react";
import { TabItem } from "../../../Search/Search";
import SearchBox from "../../../../components/SearchBox";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import { tableColumns } from "./schemas";

export default function MyProject() {
  const { accountId } = useAuthStore();
  const [projects] = useQueries({
    queries: [
      {
        queryKey: ["projects"],
        queryFn: async () => await GET("/api/Project"),
      },
    ],
  });
  console.log(accountId);

  console.log(projects?.data?.value);

  return (
    <div>
      <div className="text-3xl font-bold mt-8">My Projects</div>

      <div className="flex items-center gap-4 mt-4">
        <SearchBox
          placeholder="Search Projects..."
          widthClass="w-full py-2"
          className="!bg-gray-100 py-2 dark:!bg-zinc-800"
          value={""}
        />
      </div>
      <Table
        loading={projects.isLoading}
        className="mt-4"
        dataSource={projects?.data?.value?.filter(
          (p: any) => p.clientId == accountId || p.freelancerId == accountId
        )}
        columns={tableColumns()}
      />
    </div>
  );
}
