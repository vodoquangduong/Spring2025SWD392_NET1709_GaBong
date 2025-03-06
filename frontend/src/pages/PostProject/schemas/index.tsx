import { App, Button } from "antd";
import dayjs from "dayjs";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { z } from "zod";

export const formSchema = () => {
  return z.object({
    projectName: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters"),
    projectDescription: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(1000, "Description must be less than 1000 characters"),
    location: z.string().min(1, "Required"),
    skillsRequired: z.string().optional(),
    estimateBudget: z.coerce
      .number()
      .min(100, "Budget must be at least 100$")
      .max(1000000, "Budget must be less than 1000000$"),
    availableTimeRange: z.coerce
      .number()
      .min(10, "Range must be at least 10 days")
      .max(30, "Range must be less than 30 days"),
  });
};

export const tableColumns = ({
  budget,
  setMilestones,
  milestones,
  state,
}: any) => {
  const { message } = App.useApp();

  return [
    {
      title: "Name",
      dataIndex: "milestoneName",
      key: "1",
      render: (text: string) => text,
    },
    {
      title: "Description",
      dataIndex: state?.project ? "milestoneDescription" : "description",
      key: "2",
      render: (text: string, record: any) => (
        <Link to={`/projects/${record.projectId}/details`} className="">
          {text}
        </Link>
      ),
    },
    {
      title: "Percentage",
      dataIndex: state?.project ? "payAmount" : "amount",
      key: "3",
      render: (text: string, record: any) => text + "%",
    },
    {
      title: "Milestone Budget",
      dataIndex: state?.project ? "payAmount" : "amount",
      key: "3",
      render: (text: number, record: any) =>
        Number((text / 100) * budget).toLocaleString() + " USD",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "4",
      render: (text: string) => dayjs(text).format("DD-MM-YYYY HH:mm"),
    },
    !state?.project
      ? {
          title: "",
          dataIndex: "delete",
          key: "5",
          render: (text: string, record: any, index: number) => (
            <Button
              onClick={() => {
                if (milestones.length == 1) {
                  message.error("Project must have at least one milestone");
                  return;
                }
                const newMilestones = milestones.filter(
                  (_: any, i: number) => i !== index
                );
                setMilestones(newMilestones);
              }}
              icon={<FaRegTrashAlt />}
            ></Button>
          ),
        }
      : {},
  ];
};
