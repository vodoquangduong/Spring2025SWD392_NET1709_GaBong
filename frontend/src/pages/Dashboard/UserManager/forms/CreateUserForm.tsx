import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { schema } from "../schemas";

const CreateUserForm = ({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  record?: any;
}) => {
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
        <div>
          <div className="font-semibold text-base pb-2">Name</div>
          <input
            {...register("name")}
            placeholder="Your name"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Email</div>
          <input
            {...register("email")}
            placeholder="Your email address"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Address</div>
          <input
            placeholder="Your home address"
            className="input-style py-[9px] px-2 text-xs"
          />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Phone</div>
          <input
            placeholder="Your phonenumber"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-2">
        <div>
          <div className="font-semibold text-base pb-2">DOB</div>
          <DatePicker className="w-full py-2" />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">School</div>
          <input type="text" className="input-style py-[9px] px-2 text-sm" />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Major</div>
          <input type="text" className="input-style py-[9px] px-2 text-sm" />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Degre</div>
          <input type="text" className="input-style py-[9px] px-2 text-sm" />
        </div>
      </div>
      <div className="font-semibold text-base pb-2">Description</div>
      <div className="flex justify-end">
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
};

export default CreateUserForm;
