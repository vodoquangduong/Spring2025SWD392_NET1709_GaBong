import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Select } from "antd";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { formSchema } from "../schemas";
import { POST } from "@/modules/request";
import countries from "@/mocks/countries.json";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateProjectForm({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { message } = App.useApp();
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
      setIsModalOpen(false);
      reset();
    },
  });

  const onSubmit = async (formData: any) => {
    message.open({
      type: "loading",
      content: "Creating project ...",
      duration: 0,
    });
    mutation.mutate(formData);
  };

  return (
    <form className="overflow-y-scroll" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4 mb-2 max-h-[500px] overflow-y-scroll pr-4">
        <div className="col-span-2">
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
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Description</div>
          <textarea
            {...register("projectDescription")}
            rows={4}
            placeholder="Your project description"
            className="input-style py-[9px] px-2 text-sm"
          />
          {errors.projectDescription && (
            <div className="error-msg">{errors.projectDescription.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Required Skills</div>
          <Select
            className="!py-[9px] text-sm"
            mode="multiple"
            style={{
              width: "100%",
            }}
            options={options}
          />
        </div>
        <div className="col-span-2">
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
      </div>
      <div className="flex justify-end pt-4">
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

const options = [
  { value: "HTML" },
  { value: "CSS" },
  { value: "JavaScript" },
  { value: "SQL" },
  { value: "React" },
  { value: "Angular" },
  { value: "Node.js" },
  { value: "Python" },
  { value: "C#" },
  { value: "C++" },
  { value: "Java" },
];
