import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Select } from "antd";
import React from "react";
import { set, useForm } from "react-hook-form";
import { formSchema } from "./schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET, POST } from "@/modules/request";
import countries from "@/mocks/countries.json";
import Back from "@/components/Back";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

type Milestone = {
  milestoneName: string;
  description: string;
  amount: number;
  deadline: string;
};

export default function PostProject() {
  const { message } = App.useApp();
  const [milestones, setMilestones] = React.useState<Milestone[]>([]);
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
  } = useForm({
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
    mutationFn: async (formData: any) =>
      await POST("/api/Project/post-project", formData),
    onError: () => {
      message.destroy();
      message.error("Create Failed");
    },
    onSuccess: () => {
      message.destroy();
      message.success("Created successfully, please wait for approval");
      reset();
    },
  });

  const handleChangeSkill = (value: any) => {
    setSkills(value);
  };

  const onSubmit = async (formData: any) => {
    message.open({
      type: "loading",
      content: "Creating project ...",
      duration: 0,
    });
    formData.milestones = milestones;
    formData.skillIds = skills;
    mutation.mutate(formData);
    console.log(formData);
    // console.log(skills);
    // console.log(milestones);
  };

  return (
    <form
      className="mx-container flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Back />
      <div className="grid grid-cols-2 gap-4 mb-2 max-w-[1000px]">
        <div className="font-semibold text-3xl pb-2 mt-10 col-span-2">
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
            mode="multiple"
            style={{
              width: "100%",
            }}
            options={skillCategories?.map((item: any) => ({
              value: item.skillId,
              label: item.skillName,
            }))}
            onChange={handleChangeSkill}
          />
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
          <div className="font-semibold text-3xl pb-2 mt-4 col-span-2">
            Milestones
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
            <div className="col-span-3">
              <div className="font-semibold text-base pb-2 col-span-8">
                Deadline
              </div>
              <input
                id="milestoneDeadline"
                className="input-style py-[10px] no-ring grow no-scrollbar"
                placeholder="Enter estimated budget"
                type="datetime-local"
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
            <Button
              type="primary"
              className="font-bold col-span-2 h-full px-8 py-2"
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
                  message.error("Percentage should not exceed 100%");
                  return;
                }
                setMilestones([...milestones, milestone]);
              }}
            >
              + Add
            </Button>
          </div>
        </div>

        <div className="col-span-2 space-y-2">
          {milestones?.length > 0 && (
            <div className="gap-2 grid grid-cols-12 font-semibold">
              <div className="col-span-3">Name</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-3">Deadline</div>
              <div className="col-span-1">Percent</div>
            </div>
          )}
          {milestones?.map((item: Milestone, index: number) => (
            <MilestoneItem
              item={item}
              index={index}
              milestones={milestones}
              setMilestones={setMilestones}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end py-4">
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold"
          onClick={() => console.log(errors)}
        >
          Create
        </Button>
      </div>
    </form>
  );
}

const MilestoneItem = ({
  item,
  index,
  milestones,
  setMilestones,
}: {
  item: Milestone;
  index: number;
  milestones: Milestone[];
  setMilestones: any;
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
