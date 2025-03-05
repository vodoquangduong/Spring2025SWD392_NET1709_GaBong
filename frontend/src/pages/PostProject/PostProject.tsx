import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Select, Table } from "antd";
import React from "react";
import { set, useForm } from "react-hook-form";
import { formSchema, tableColumns } from "./schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET, POST } from "@/modules/request";
import countries from "@/mocks/countries.json";
import Back from "@/components/Back";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

dayjs.extend(utc);

type Milestone = {
  milestoneName: string;
  description: string;
  amount: number;
  deadline: string;
};

export default function PostProject() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [milestones, setMilestones] = React.useState<Milestone[]>([
    {
      milestoneName: "Init milestone",
      description: "This is the init milestone",
      amount: 10,
      deadline: new Date().toISOString(),
    },
  ]);
  const [skills, setSkills] = React.useState<string[]>([]);
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      projectName: "",
      projectDescription: "",
      estimateBudget: "",
      availableTimeRange: "",
      location: "",
    },
    resolver: zodResolver(formSchema()),
  });

  const { data: skillCategories } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await GET("/api/SkillCategory", false),
  });

  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (formData: any) => {
      const res = await POST("/api/Project/post-project", formData);
      if (res.code) throw new Error();
      return res;
    },
    onError: () => {
      message.destroy();
      message.error(
        <div>
          You dont have enough balance to create the project{" "}
          <Link to="/payment" className="underline hover:underline">
            Add funds now?
          </Link>
        </div>
      );
    },
    onSuccess: () => {
      message.destroy();
      message.success("Created successfully, please wait for approval");
      navigate("/manage/projects");
      reset();
    },
  });

  const onSubmit = async (formData: any) => {
    if (skills.length == 0) {
      setError("root.skillError", {
        message: "Please select at least one skill",
      });
      return;
    }
    // console.log(formData);
    // return;
    message.open({
      type: "loading",
      content: "Creating project ...",
      duration: 0,
    });
    const totalAmount = milestones.reduce((a, b) => a + b.amount, 0);
    milestones.forEach((milestone: Milestone) => {
      milestone.amount = (milestone.amount * 100) / totalAmount;
    });
    formData.milestones = milestones;
    formData.skillIds = skills;
    mutation.mutate(formData);
  };

  return (
    <form
      className="mx-auto grid grid-cols-12 gap-10 px-20 min-h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Back />
      <div className="grid grid-cols-2 gap-4 mb-2 col-span-6">
        <div className="font-semibold text-2xl mt-10 col-span-2">
          Create new project
        </div>
        <div className="col-span-1">
          <div className="font-semibold text-base pb-2">Name</div>
          <input
            {...register("projectName")}
            placeholder="Your project name"
            className="input-style py-[9px] px-2 text-sm"
          />
          {errors.projectName && (
            <div className="error-msg">{errors.projectName.message}</div>
          )}
        </div>
        <div className="col-span-1">
          <div className="font-semibold text-base pb-2">Location</div>
          <select className="py-2 px-2 input-style" {...register("location")}>
            <option className="input-style" value={""}>
              Select a location
            </option>
            <option className="input-style" value={"Anywhere"}>
              Anywhere
            </option>
            {countries.map((item: string) => (
              <option
                className="input-style"
                value={item}
                // selected={item.id == record.campaign_id}
              >
                {item}
              </option>
            ))}
          </select>
          {errors.location && (
            <div className="error-msg">{errors.location.message}</div>
          )}
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Estimate Budget</div>
          <div className="input-style flex gap-2 py-[10px]">
            <div className="px-1">$</div>
            <input
              {...register("estimateBudget")}
              className="no-ring grow no-scrollbar"
              placeholder="Enter estimated budget"
              type="number"
            />
            <div className="px-2">USD</div>
          </div>
          {errors.estimateBudget && (
            <div className="error-msg">{errors.estimateBudget.message}</div>
          )}
        </div>

        <div>
          <div className="font-semibold text-base pb-2">
            Available Time Range
          </div>
          <div className="input-style flex gap-2 py-[10px]">
            <input
              {...register("availableTimeRange")}
              className="no-ring grow no-scrollbar"
              placeholder="Enter estimated budget"
              type="number"
            />
            <div className="px-2">days</div>
          </div>

          {errors.availableTimeRange && (
            <div className="error-msg">{errors.availableTimeRange.message}</div>
          )}
        </div>

        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Required Skills</div>
          <Select
            className="!py-[9px]"
            maxCount={5}
            showSearch
            suffixIcon={<span>{skills.length} / 5</span>}
            filterOption={(input, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            mode="multiple"
            style={{
              width: "100%",
            }}
            options={skillCategories?.map((item: any) => ({
              value: item.skillId,
              label: item.skillName,
            }))}
            onChange={setSkills}
          />
          {errors.root?.skillError && (
            <div className="error-msg">{errors.root?.skillError?.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Description</div>
          <textarea
            {...register("projectDescription")}
            rows={5}
            placeholder="Your project description"
            className="input-style py-[9px] px-2 text-sm"
          />
          {errors.projectDescription && (
            <div className="error-msg">{errors.projectDescription.message}</div>
          )}
        </div>

        <div className="col-span-2">
          <div className="font-semibold text-2xl pb-4 mt-4 col-span-2">
            Add Milestones
          </div>
          {/* <div className="font-semibold text-base pb-2">Milestones</div> */}
          <div className="gap-2 grid grid-cols-12">
            <div className="col-span-7">
              <div className="font-semibold text-base pb-2 col-span-8">
                Name
              </div>
              <input
                id="milestoneName"
                className="input-style py-[10px] no-ring grow no-scrollbar"
                placeholder="Milestone name"
              />
            </div>
            <div className="col-span-2">
              <div className="font-semibold text-base pb-2 col-span-8">
                Percentage
              </div>
              <input
                id="milestonePercentage"
                className="input-style py-[10px] no-ring grow no-scrollbar"
                placeholder="Percentage"
                type="number"
              />
            </div>
            <div className="col-span-3">
              <div className="font-semibold text-base pb-2 col-span-8">
                Deadline
              </div>
              <input
                // min="2025-02-28T00:00"
                min={dayjs(milestones[milestones.length - 1]?.deadline)
                  .add(1, "day")
                  .format("YYYY-MM-DDTHH:mm")}
                id="milestoneDeadline"
                className="input-style py-[10px] no-ring grow no-scrollbar"
                placeholder="Enter estimated budget"
                type="datetime-local"
              />
            </div>
            <div className="col-span-12">
              <div className="font-semibold text-base pb-2 col-span-8">
                Description
              </div>
              <textarea
                id="milestoneDescription"
                rows={3}
                className="input-style py-[10px] no-ring grow no-scrollbar"
                placeholder="Milestone description"
              />
            </div>
            <div className="col-span-12 flex justify-between">
              {errors.root?.milestoneError ? (
                <div className="error-msg">
                  {errors.root?.milestoneError?.message}
                </div>
              ) : (
                <div></div>
              )}
              <Button
                type="primary"
                className="font-bold col-span-2 h-full px-4 py-2"
                icon={<FaPlus />}
                onClick={() => {
                  const milestoneName = document.getElementById(
                    "milestoneName"
                  ) as HTMLInputElement;
                  const milestoneDeadline = document.getElementById(
                    "milestoneDeadline"
                  ) as HTMLInputElement;
                  const milestonePercentage = document.getElementById(
                    "milestonePercentage"
                  ) as HTMLInputElement;
                  const milestoneDescription = document.getElementById(
                    "milestoneDescription"
                  ) as HTMLInputElement;

                  if (
                    !milestoneName.value ||
                    !milestoneDeadline.value ||
                    !milestonePercentage.value ||
                    !milestoneDescription.value
                  ) {
                    setError("root.milestoneError", {
                      message: "Please fill in the empty fields",
                    });
                    return;
                  }

                  const milestone: Milestone = {
                    milestoneName: milestoneName.value,
                    deadline: new Date(milestoneDeadline.value).toISOString(),
                    amount: parseInt(milestonePercentage.value),
                    description: milestoneDescription.value,
                  };
                  if (
                    milestones.reduce((a, b) => a + b.amount, 0) +
                      milestone.amount >
                      100 ||
                    milestone.amount > 100
                  ) {
                    setError("root.milestoneError", {
                      message: "Percentage should not exceed 100%",
                    });
                    return;
                  }

                  clearErrors("root.milestoneError");
                  // clear input
                  milestoneName.value = "";
                  milestoneDeadline.value = "";
                  milestonePercentage.value = "";
                  milestoneDescription.value = "";
                  setMilestones([...milestones, milestone]);
                }}
              >
                Add milestone
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 col-span-6">
        <div className="sticky top-10">
          <div className="font-semibold text-2xl pb-2 mt-10 col-span-2">
            Project's Milestones
          </div>
          <Table
            pagination={false}
            dataSource={milestones}
            columns={tableColumns({ setMilestones, milestones })}
          />
          <div className="flex justify-end py-4">
            <Button
              disabled={mutation.isPending}
              type="primary"
              htmlType="submit"
              className="font-bold"
              onClick={() => console.log(errors)}
            >
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

const MilestoneItem = ({
  item,
  index,
  milestones,
  setMilestones,
  message,
}: {
  item: Milestone;
  index: number;
  milestones: Milestone[];
  setMilestones: any;
  message: any;
}) => {
  return (
    <div className="gap-2 grid grid-cols-12">
      <div className="col-span-3">{item.milestoneName}</div>
      <div className="col-span-4">{item.description}</div>
      <div className="col-span-3">
        {dayjs(item.deadline).format("DD/MM/YYYY")}
      </div>
      <div className="col-span-1">{item.amount}</div>
      <div>
        <Button
          type="primary"
          className="font-bold"
          onClick={() => {
            if (milestones.length == 1) {
              message.error("Please leave at least one milestone");
              return;
            }
            const newMilestones = milestones.filter((_, i) => i !== index);
            setMilestones(newMilestones);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
