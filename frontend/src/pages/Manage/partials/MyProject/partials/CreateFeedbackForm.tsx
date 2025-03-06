import { defaultAvatar } from "@/modules/default";
import { GET } from "@/modules/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueries } from "@tanstack/react-query";
import { App, Button, DatePicker, Rate } from "antd";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { FaFlag } from "react-icons/fa";
import { z } from "zod";

const schema = z.object({
  comment: z
    .string()
    .min(10, "Feedback must be at least 10 characters")
    .max(500, "Feedback must be less than 500 characters"),
  rating: z.number().min(1, "Please rate the freelancer").max(5),
});

const CreateFeedbackForm = ({
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
      comment: "",
      rating: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    message.success(`${record ? "Update" : "Create"} Successfully`);
    setIsModalOpen(false);
  };

  const [freelancer] = useQueries({
    queries: [
      {
        queryKey: ["freelancer", record?.freelancerId],
        queryFn: () => GET(`/api/Account/${record?.freelancerId}`),
      },
    ],
  });

  // const [logo, setLogo] = useState("");
  return (
    <form
      className="overflow-y-scroll small-scrollbar h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-3 gap-4 mb-2">
        <UserItem data={freelancer?.data?.value} />
        <div>
          <div className="font-semibold text-base pb-2">Rating</div>
          <Rate onChange={(value) => setValue("rating", value)} />
          {errors.rating && (
            <div className="error-msg">{errors.rating.message}</div>
          )}
        </div>
      </div>
      <div>
        <div className="font-semibold text-base pb-2">Comment</div>
        <textarea
          className="input-style py-[9px] px-2 text-sm"
          rows={4}
          {...register("comment")}
        />
        {errors.comment && (
          <div className="error-msg">{errors.comment.message}</div>
        )}
      </div>
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

export default CreateFeedbackForm;

const UserItem = ({ data }: any) => {
  return (
    <div className="space-y-4 py-4 col-span-3">
      <div className="flex gap-4">
        <img
          className="h-28 rounded-lg border"
          src={data?.avatarURL || defaultAvatar}
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="chivo">
            <div className="text-lg flex gap-8 mb-2">
              <span className="font-semibold pr-3">{data?.name}</span>
              <span className="flex justify-center items-center gap-2">
                <FaFlag size={14} className="text-emerald-500" />
                {data?.nationality}
              </span>
            </div>
            <div className="text-base flex gap-8">
              <span>{data?.phone}</span>
              <span>{data?.email}</span>
            </div>
            <span>{data?.address}</span>
            <div className="text-base flex gap-8"></div>
            <div className="text-base flex gap-8">
              <span>
                Member since {dayjs(data?.createdAt).format("MMMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
