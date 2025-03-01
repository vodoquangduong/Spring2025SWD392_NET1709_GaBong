import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Select } from "antd";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { schema } from "../schemas";
import { useEffect } from "react";
import useUiStore from "@/stores/uiStore";
import { PUT } from "@/modules/request";
import { useParams } from "react-router-dom";

export default function CreateMilestoneForm({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  record?: any;
}) {
  const { message } = App.useApp();
  const { id: projectId } = useParams();
  console.log(projectId);

  const { requestRevalidate } = useUiStore();

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
      milestoneName: "",
      deadline: "",
      description: "",
      amount: "",
    },
    resolver: zodResolver(schema()),
  });

  useEffect(() => {
    reset({
      milestoneName: record?.milestoneName,
      deadline: dayjs(record?.deadlineDate).format("YYYY-MM-DD HH:mm"),
      description: record?.milestoneDescription,
      amount: record?.payAmount,
    });
  }, []);

  const onSubmit = async (formData: any) => {
    formData.status = record?.status;
    formData.deadline = dayjs(formData.deadline).toISOString();
    message.open({
      type: "loading",
      content: "Updating milestone ...",
      duration: 0,
    });
    await PUT(
      `/api/Milestone/update-milestone/${record?.milestoneId}`,
      formData
    );
    message.destroy();
    requestRevalidate();
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
            {...register("milestoneName")}
            className="input-style no-ring grow py-[10px] px-2 text-sm"
            placeholder="Enter milestone name"
          />
          {errors.milestoneName && (
            <div className="error-msg">{errors.milestoneName.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Description</div>
          <textarea
            {...register("description")}
            rows={2}
            placeholder="Your project description"
            className="input-style py-[9px] px-2 text-sm"
          />
          {errors.description && (
            <div className="error-msg">{errors.description.message}</div>
          )}
        </div>
        {/* <div>
          <div className="font-semibold text-base pb-2">Percent</div>
          <div className="input-style flex gap-2 py-[10px]">
            <input
              {...register("amount")}
              className="no-ring grow"
              placeholder="Enter percent amount"
              type="number"
            />
            <div className="px-2">%</div>
          </div>
        </div> */}
        <div>
          <div className="font-semibold text-base pb-2">Deadline</div>
          <input
            {...register("deadline")}
            type="datetime-local"
            placeholder="Enter milestone deadline"
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
          {record ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
