import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Select } from "antd";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { reportFormSchema } from "../schemas";

export default function CreateReportForm({
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
    resolver: zodResolver(reportFormSchema()),
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
          <div className="font-semibold text-base pb-2">Reason</div>
          <textarea
            {...register("email")}
            rows={4}
            placeholder="Your project description"
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
