import CreateModal from "@/components/CreateModal";
import { mapMilestoneStatusToTag } from "@/modules/mapUiStatus";
import { PUT } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import useUiStore from "@/stores/uiStore";
import { Role } from "@/types";
import { MilestoneStatus } from "@/types/milestone";
import { App, Button, Dropdown, Popconfirm, Select } from "antd";
import dayjs from "dayjs";
import { z } from "zod";
import { FaPen } from "react-icons/fa";
import CreateMilestoneForm from "../forms/CreateMilestoneForm";
import InvoiceModal from "@/pages/Project/partials/ProjectPayment/partials/InvoiceModal";

export const schema = () => {
  return z.object({
    milestoneName: z.string().optional(),
    description: z.string().optional(),
    amount: z.coerce.number().optional(),
    deadline: z.string().optional(),
  });
};

export const tableColumns = (project: any) => {
  const milestones = project?.milestones;
  const { message } = App.useApp();
  const { role } = useAuthStore();
  const { requestRevalidate } = useUiStore();

  const updateMilestone = async (milestoneId: string, data: any) => {
    message.open({
      type: "loading",
      content: "Updating milestone ...",
      duration: 0,
    });
    await PUT(`/api/Milestone/update-milestone/${milestoneId}`, data);
    message.destroy();
    message.success("Milestone updated successfully");
    requestRevalidate();
  };

  // get first not started milestone
  const firstNotStartedMilestone = milestones?.filter(
    (milestone: any) => milestone.status == MilestoneStatus.NOT_STARTED
  )[0];

  return [
    {
      title: "No.",
      dataIndex: "index",
      key: "description",
      render: (text: string, _: any, index: number) => index + 1,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: string, record: any) => {
        return (
          <div>
            <div className="font-semibold text-lg">{record.milestoneName}</div>
            <div>{record.milestoneDescription}</div>
          </div>
        );
      },
    },
    {
      title: "Deadline",
      dataIndex: "deadlineDate",
      key: "deadline",
      render: (deadline: string) => {
        return <div>{dayjs(deadline).format("DD-MM-YYYY HH:mm")}</div>;
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: MilestoneStatus) => {
        return <div>{mapMilestoneStatusToTag(status)}</div>;
      },
    },
    {
      title: "Percentage",
      dataIndex: "payAmount",
      key: "amount",
      render: (amount: number) => {
        return <div>{Number(amount).toLocaleString()}%</div>;
      },
    },
    {
      title: "Budget Amount",
      dataIndex: "Budget Amount",
      key: "amount",
      render: (amount: number, record: any) => {
        return (
          <div>
            {Number(
              (project?.estimateBudget * record?.payAmount) / 100
            ).toLocaleString()}{" "}
            USD
          </div>
        );
      },
    },
    {
      title: "",
      key: "amount",
      render: (_: number, record: any) => {
        return (
          <>
            {role == Role.FREELANCER &&
              record?.status == MilestoneStatus.NOT_STARTED &&
              !milestones?.some(
                (milestone: any) =>
                  milestone.status == MilestoneStatus.IN_PROGRESS ||
                  milestone.status == MilestoneStatus.SUBMITTED
              ) &&
              record.milestoneId == firstNotStartedMilestone.milestoneId && (
                <Popconfirm
                  title="Start Milestone"
                  description={<div>Are you sure to start this milestone?</div>}
                  onConfirm={async () => {
                    updateMilestone(record.milestoneId, {
                      milestoneName: record.milestoneName,
                      deadline: record.deadlineDate,
                      description: record.milestoneDescription,
                      amount: record.payAmount,
                      status: MilestoneStatus.IN_PROGRESS,
                    });
                  }}
                >
                  <Button type="default">Start milestone</Button>
                </Popconfirm>
              )}

            {role == Role.FREELANCER &&
              record?.status == MilestoneStatus.IN_PROGRESS && (
                <Popconfirm
                  title="Request Review"
                  description={
                    <div className="pr-4">
                      Have you done this milestone?
                      <br />
                      Request for review to the client.
                    </div>
                  }
                  onConfirm={async () => {
                    updateMilestone(record.milestoneId, {
                      milestoneName: record.milestoneName,
                      deadline: record.deadlineDate,
                      description: record.milestoneDescription,
                      amount: record.payAmount,
                      status: MilestoneStatus.SUBMITTED,
                    });
                  }}
                >
                  <Button type="default">Request Review</Button>
                </Popconfirm>
              )}
            {role == Role.CLIENT &&
              record?.status == MilestoneStatus.SUBMITTED && (
                <>
                  <Select
                    className="w-[100px]"
                    defaultValue={"Review"}
                    onChange={async (value: any) => {
                      message.open({
                        type: "loading",
                        content: "Updating milestone ...",
                        duration: 0,
                      });

                      const data = {
                        milestoneName: record.milestoneName,
                        deadline: record.deadlineDate,
                        description: record.milestoneDescription,
                        amount: record.payAmount,
                        status: record.status,
                      };
                      if (value == 1) {
                        await PUT(`/api/Milestone/finish-milestone`, {
                          milestoneId: record.milestoneId,
                          milestoneStatus: MilestoneStatus.COMPLETED,
                          updateDate: dayjs().toISOString(),
                        });
                      } else {
                        data.status = MilestoneStatus.IN_PROGRESS;
                        await PUT(
                          `/api/Milestone/update-milestone/${record.milestoneId}`,
                          data
                        );
                      }
                      message.destroy();
                      message.success("Milestone updated successfully");
                      requestRevalidate();
                    }}
                  >
                    <div key={"1"}>Approve</div>
                    <div key={"2"}>Reject</div>
                  </Select>
                </>
              )}

            {role == Role.CLIENT &&
              record?.status == MilestoneStatus.NOT_STARTED && (
                <CreateModal
                  type="default"
                  children={<FaPen />}
                  modalTitle={"Update Milestone"}
                  form={(
                    setIsModalOpen: React.Dispatch<
                      React.SetStateAction<boolean>
                    >
                  ) => (
                    <CreateMilestoneForm
                      setIsModalOpen={setIsModalOpen}
                      record={record}
                    />
                  )}
                />
              )}

            {record?.status == MilestoneStatus.COMPLETED && (
              <InvoiceModal project={project} milestone={record} />
            )}
          </>
        );
      },
    },
  ];
};
