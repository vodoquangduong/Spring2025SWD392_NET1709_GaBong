import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Select } from "antd";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { schema } from "../schemas";

export default function CreateReportFreelancerForm({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  record?: any;
}) {
  const { message } = App.useApp();
  console.log(record);

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
      name: record?.name,
      email: record?.email,
    },
    resolver: zodResolver(schema()),
  });

  const onSubmit = async () => {
    message.success(`${record ? "Update" : "Create"} Successfully`);
    setIsModalOpen(false);
  };

  // const [logo, setLogo] = useState("");
  return (
    <form
      className="overflow-y-scroll small-scrollbar h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Name</div>
          <input
            {...register("name")}
            placeholder="Your project name"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Description</div>
          <textarea
            {...register("email")}
            rows={4}
            placeholder="Your project description"
            className="input-style py-[9px] px-2 text-sm"
          />
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
        <div>
          <div className="font-semibold text-base pb-2">Estimated Budget</div>
          <div className="input-style flex gap-2 py-[10px]">
            <div className="px-1">$</div>
            <input
              {...register("name")}
              className="no-ring grow"
              placeholder="Enter estimated budget"
              type="number"
            />
            <div className="px-2">USD</div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Bidding Deadline</div>
          <input
            {...register("name")}
            type="date"
            placeholder="Enter bidding deadline"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold"
          onClick={() => console.log(errors)}
        >
          {record ? "Update" : "Create"}
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
