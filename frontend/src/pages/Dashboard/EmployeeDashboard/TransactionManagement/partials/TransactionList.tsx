import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { PAGE_ANIMATION } from "@/modules/constants";
import SearchBox from "@/components/SearchBox";
import { Pagination, Table } from "antd";
import { transactionColumns } from "../schemas";
import { GET } from "@/modules/request";
import { useQuery } from "@tanstack/react-query";
import useQueryParams from "@/hooks/useQueryParams";
import useUiStore from "@/stores/uiStore";
import { Transaction } from "@/types/transaction";

export default function TransactionList() {
  const { page } = useQueryParams();
  const navigate = useNavigate();
  const { revalidate } = useUiStore();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["transactions", revalidate, page],
    queryFn: async () =>
      await GET(`/api/Transaction?pageNumber=${page || 1}&pageSize=10`),
  });

  return (
    <motion.div {...PAGE_ANIMATION}>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Transaction Management
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          Manage and monitor all transactions in the system
        </div>
      </div>
      <div className="flex justify-between mb-4 items-center">
        <SearchBox widthClass="w-full" />
      </div>
      <Table
        pagination={false}
        loading={isLoading || isRefetching}
        columns={transactionColumns()}
        dataSource={data?.items as Transaction[]}
        rowKey={(record: Transaction) => record?.transactionId}
      />
      <div className="flex justify-end">
        <Pagination
          showSizeChanger={false}
          className="py-8"
          showTotal={(total) => `Total ${total} items`}
          defaultCurrent={data?.pageNumber}
          total={data?.totalCount}
          onChange={(page) => {
            navigate(`/employee/transactions?page=${page}`);
          }}
        />
      </div>
    </motion.div>
  );
}
