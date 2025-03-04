import { App, Button, Popconfirm } from "antd";
import { bidFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { GET, POST } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import useChatStore from "@/components/ChatPopup/stores/chatStore";
import { NotificationStatus, NotificationType } from "@/types/notification";

export default function PlaceBid({ project }: { project: any }) {
  const { message } = App.useApp();
  const { accountId, name } = useAuthStore();
  const { notifyService } = useChatStore();
  let { id } = useParams();
  let navigate = useNavigate();

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
      bidOffer: "",
      bidDescription: "",
      projectId: "",
    },
    resolver: zodResolver(bidFormSchema()),
  });

  const mutation = useMutation({
    mutationFn: async (formData: any) => await POST("/api/Bid", formData),
    onError: () => {
      message.destroy();
      message.error(
        <div>
          You dont have enough balance to place this bid{" "}
          <Link
            to="/payment"
            className="underline hover:underline text-blue-500"
          >
            Add funds now?
          </Link>
        </div>
      );
    },
    onSuccess: async () => {
      message.destroy();
      message.success("Placed bid successfully");
      reset();
      await POST(`/api/Notification`, {
        accountId: project?.clientId,
        notificationType: NotificationType.GENERAL_ANNOUNCEMENT,
        status: NotificationStatus.UNREAD,
        content: `${name} has bidded on your project ${project?.projectName} (#${project?.projectId})`,
        time: new Date().toISOString(),
      });
      notifyService?.sendNotification(
        Number(project?.clientId),
        NotificationType.GENERAL_ANNOUNCEMENT,
        ""
      );
      navigate(`/projects/${id}/proposals`);
      scrollTo(0, 0);
    },
  });

  const onSubmit = async (formData: any) => {
    const res = await GET(`/api/Bid/freelancer/${accountId}`, false);
    try {
      if (
        res?.some(
          (item: any) => item.bidOwnerId == accountId && item.projectId == id
        )
      ) {
        message.error("You have already placed a bid");
        navigate(`/projects/${id}/proposals`);
        return;
      }
    } catch (error) {}

    formData.projectId = id;
    message.open({
      type: "loading",
      content: "Placing bid ...",
      duration: 0,
    });
    mutation.mutate(formData);
  };

  return (
    <div className="rounded-md dark:bg-white/5 p-6 w-full mb-6 shadow-md">
      {/* <div className="rounded-md mt-6 mb-10"> */}
      <div className="w-full flex justify-between items-center dark:border-gray-500">
        <span className="font-semibold text-2xl mb-3">
          Place a bid on this project
        </span>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          You will be able to edit your bid until the project is awarded to
          someone.
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <label htmlFor="checkbox" className="my-1 font-bold">
              Bid Amount
            </label>
            <div className="input-style flex gap-2 py-2 mt-2">
              <div className="px-1">$</div>
              <input
                {...register("bidOffer")}
                className="no-ring grow"
                type="number"
              />
              <div className="px-2">USD</div>
            </div>
            {errors.bidOffer && (
              <div className="error-msg">{errors.bidOffer.message}</div>
            )}
          </div>
        </div>
        <div>Paid to you: $200.00 - $20.00 fee = $180.00</div>
        <div>
          <div className="flex justify-between items-center">
            <div className="font-bold">
              Describe your proposal (minimum 100 characters)
            </div>
            <Button type="primary" className="py-4 font-bold" htmlType="submit">
              Place Bid
            </Button>
          </div>
          <textarea
            {...register("bidDescription")}
            rows={4}
            className="input-style w-full p-2 mt-4 text-sm"
            placeholder="What makes you the best candidate for this project?"
          />
          {errors.bidDescription && (
            <div className="error-msg">{errors.bidDescription.message}</div>
          )}
        </div>
      </form>
    </div>
  );
}
