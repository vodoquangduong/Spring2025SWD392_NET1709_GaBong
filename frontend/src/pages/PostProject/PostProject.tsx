import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema, tableColumns } from "./schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET, POST, PUT } from "@/modules/request";
import countries from "@/mocks/countries.json";
import Back from "@/components/Back";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProjectStatus } from "@/types/project";
import { CreateMilestoneDTO } from "@/types/milestone";

export default function PostProject() {
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    watch,
    reset,
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
  const budget = watch("estimateBudget");
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const { state } = useLocation();
  const [isEditting, setIsEditting] = useState(-1);
  const [milestones, setMilestones] = useState<CreateMilestoneDTO[]>([
    {
      milestoneName: "Init milestone",
      description: "This is the init milestone",
      amount: 10,
      deadline: new Date().toISOString(),
    },
  ]);
  const [skills, setSkills] = React.useState<string[]>([]);
  const { data: skillCategories } = useQuery({
    queryKey: ["skillCategories"],
    queryFn: async () => await GET("/api/SkillCategory", false),
  });

  useEffect(() => {
    if (state?.project) {
      reset(state.project);
      setSkills(state.project.skillIds);
      setMilestones(state.project.milestones);
    }
  }, []);

  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (formData: any) => {
      if (!state?.project) {
        const res = await POST(`/api/Project/post-project`, formData);
        if (res.code) {
          throw new Error();
        }
        return res;
      } else {
        const res = await PUT(
          `/api/Project/update/${state?.project?.projectId}`,
          formData
        );
        if (res.code) {
          message.error("Not enough balance to update the project");
        }
        return res;
      }
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
    if (milestones.reduce((a, b) => a + b.amount, 0) != 100) {
      modal.confirm({
        title: "Recalculate milestone's percentage",
        content:
          "Your total milestone's percentage haven't enough 100%, do you want to automatically recalculate it?",
        okText: "Ok",
        centered: true,
        cancelText: "Cancel",
        onOk: () => {
          const totalAmount = milestones.reduce(
            (a, b) => a + Number(b.amount),
            0
          );
          const newMilestones = milestones.map((milestone) => ({
            ...milestone,
            amount: (milestone.amount * 100) / totalAmount,
          }));
          setMilestones(newMilestones);
        },
      });
      return;
    }

    message.open({
      type: "loading",
      content: "Creating project ...",
      duration: 0,
    });

    formData.milestones = milestones;
    formData.skillIds = skills;
    if (state?.project) {
      formData.status = ProjectStatus.PENDING;
    }
    mutation.mutate(formData);
  };

  return (
    <form
      className="mx-auto grid grid-cols-12 gap-10 px-20 min-h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Back />
      <div className="grid grid-cols-2 gap-4 mb-2 transition-all col-span-4 resize-x">
        <div className="font-semibold text-2xl mt-10 col-span-2">
          {!state?.project ? "Create new project" : "Edit project"}
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Name</div>
          <input
            {...register("projectName")}
            placeholder="Your project name"
            className="input-style py-[9px] px-2 text-sm resize-y"
          />
          {errors.projectName && (
            <div className="error-msg">{errors.projectName.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Location</div>
          <select className="py-2 px-2 input-style" {...register("location")}>
            <option className="input-style" value={""}>
              Select a location
            </option>
            <option className="input-style" value={"Anywhere"}>
              Anywhere
            </option>
            {countries.map((item: string) => (
              <option key={item} className="input-style" value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.location && (
            <div className="error-msg">{errors.location.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Estimate budget</div>
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
          {!errors.estimateBudget && Number(watch("estimateBudget")) > 0 && (
            <div className="info-msg">
              Your budget will be proposed in{" "}
              {(Number(watch("estimateBudget")) * 0.8).toLocaleString()} -{" "}
              {Number(watch("estimateBudget")).toLocaleString()} USD or higher
            </div>
          )}
        </div>

        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">
            Propose available timerange
          </div>
          <div className="input-style flex gap-2 py-[10px]">
            <input
              {...register("availableTimeRange")}
              className="no-ring grow no-scrollbar"
              placeholder="Enter estimated budget"
              type="number"
              step={"1"}
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
            value={skills}
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
      </div>
      <div className={`space-y-2 transition-all col-span-8`}>
        <div className="sticky top-10">
          <div className="font-semibold text-2xl pb-2 mt-10 col-span-2 flex justify-between mb-4">
            Project's Milestones
            <Button
              disabled={mutation.isPending}
              type="primary"
              // htmlType="submit"
              className="font-bold"
              icon={<FaPlus />}
              onClick={() => {
                setIsEditting(-1);
                setMilestones([
                  ...milestones,
                  {
                    milestoneName: "New milestone",
                    description: "New milestone description",
                    amount: 1,
                    deadline: new Date().toISOString(),
                  },
                ]);
              }}
            >
              Add Milestone
            </Button>
          </div>
          <Table
            pagination={false}
            // sort milestones by deadline date
            dataSource={milestones.sort((a, b) =>
              dayjs(a.deadline).isAfter(dayjs(b.deadline)) ? 1 : -1
            )}
            columns={tableColumns({
              setIsEditting,
              isEditting,
              budget,
              setMilestones,
              milestones,
              state,
            })}
          />
          <div className="flex justify-end py-4">
            <Button
              disabled={mutation.isPending}
              type="primary"
              htmlType="submit"
              className="font-bold"
              onClick={() => console.log(errors)}
            >
              {state?.project ? "Update" : "Create"} Project
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
