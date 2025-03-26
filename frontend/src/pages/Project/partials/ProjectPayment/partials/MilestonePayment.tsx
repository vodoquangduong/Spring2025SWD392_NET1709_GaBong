import { Dropdown, Select, Table } from "antd";
import { FaPlus } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { BiChevronDown } from "react-icons/bi";
import { useQueries } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { tableColumns } from "../schemas";
import useUiStore from "@/stores/uiStore";
import PaymentSummary from "./PaymentSummary";

export default function MilestonePayment() {
  const { id: projectId } = useParams();
  const { revalidate } = useUiStore();
  const [projectDetail] = useQueries({
    queries: [
      {
        queryKey: ["projectDetail", projectId, revalidate],
        queryFn: async () => await GET(`/api/Project/${projectId}`),
      },
    ],
  });

  return (
    <>
      <PaymentSummary project={projectDetail.data} />
      <div className="dark:bg-white/5 p-6 w-full mb-8 rounded-md shadow-md">
        <div className="text-2xl font-semibold flex justify-between items-center gap-4">
          Milestone Payments
          {/* <CreateModal
            icon={<FaPlus />}
            children="Create Milestone"
            type="primary"
            modalTitle={"Create Milestone"}
            form={(
              setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
            ) => <CreateMilestoneForm setIsModalOpen={setIsModalOpen} />}
          /> */}
        </div>
        {/* <div className="text-lg font-semibold flex gap-2 items-center mt-8 mb-1">
          Created Milestones
          <GoQuestion />
        </div> */}
        <div className="">
          <Table
            loading={projectDetail.isLoading || projectDetail.isRefetching}
            className="pt-10"
            dataSource={projectDetail?.data?.value?.milestones.sort(
              (a: any, b: any) => {
                return a.deadlineDate.localeCompare(b.deadlineDate);
              }
            )}
            columns={tableColumns(projectDetail?.data?.value)}
            rowKey={(record: any) => record.milestoneId}
          />
        </div>
      </div>
    </>
  );
}
