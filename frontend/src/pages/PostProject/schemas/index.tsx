import { App, Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaCheck, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import { text } from "stream/consumers";
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
  setIsEditting,
  isEditting,
  budget,
  setMilestones,
  milestones,
  state,
}: any) => {
  const { message } = App.useApp();
  const [updateMilestone, setUpdateMilestone] = useState<any>({});

  return [
    {
      title: "Name",
      dataIndex: "milestoneName",
      key: "1",
      render: (text: string, _: any, index: number) =>
        index == isEditting ? (
          <input
            className="py-1 bg-transparent no-ring"
            value={index != isEditting ? text : updateMilestone.milestoneName}
            onChange={(e: any) => {
              setUpdateMilestone({
                ...updateMilestone,
                milestoneName: e.target.value,
              });
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Description",
      dataIndex: state?.project ? "milestoneDescription" : "description",
      key: "2",
      render: (text: string, record: any, index: number) =>
        index == isEditting ? (
          <textarea
            className="bg-transparent no-ring"
            rows={2}
            value={index != isEditting ? text : updateMilestone.description}
            onChange={(e: any) => {
              setUpdateMilestone({
                ...updateMilestone,
                description: e.target.value,
              });
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Percentage",
      dataIndex: state?.project ? "payAmount" : "amount",
      key: "3",
      render: (text: string, record: any, index: number) =>
        index == isEditting ? (
          <input
            type="number"
            className="bg-transparent no-ring"
            value={index != isEditting ? text : updateMilestone.amount}
            onChange={(e: any) => {
              setUpdateMilestone({
                ...updateMilestone,
                amount: e.target.value,
              });
            }}
          />
        ) : (
          Number(text).toLocaleString() + "%"
        ),
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
      render: (text: string, record: any, index: number) =>
        index != isEditting ? (
          dayjs(text).format("DD-MM-YYYY HH:mm")
        ) : (
          <input
            type="datetime-local"
            className="input-style"
            value={dayjs(updateMilestone.deadline).format("YYYY-MM-DDTHH:mm")}
            onChange={(e: any) => {
              setUpdateMilestone({
                ...updateMilestone,
                deadline: e.target.value,
              });
            }}
          />
        ),
    },
    !state?.project
      ? {
          title: "",
          dataIndex: "delete",
          key: "5",
          render: (text: string, record: any, index: number) => (
            <div className="min-w-20">
              {isEditting == index ? (
                <Button
                  onClick={() => {
                    if (
                      !updateMilestone.milestoneName ||
                      !updateMilestone.description ||
                      updateMilestone.deadline < new Date().getTime()
                    ) {
                      message.error("Please fill in all fields");
                      return;
                    }
                    const totalPercent = milestones
                      .map((milestone: any, i: number) =>
                        i == index ? updateMilestone : milestone
                      )
                      .reduce((a: any, b: any) => a + Number(b.amount), 0);
                    console.log("totalPercent", totalPercent);

                    if (totalPercent > 100) {
                      message.error("Percentage should not exceed 100%");
                      return;
                    }

                    setIsEditting(-1);
                    // update milestone at index
                    setMilestones(
                      milestones.map((milestone: any, i: number) =>
                        i == index ? updateMilestone : milestone
                      )
                    );
                  }}
                  icon={<FaCheck />}
                ></Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsEditting(index);
                    setUpdateMilestone(record);
                  }}
                  icon={<LuPenLine />}
                ></Button>
              )}

              <Button
                className="ml-2"
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
            </div>
          ),
        }
      : {},
  ];
};
