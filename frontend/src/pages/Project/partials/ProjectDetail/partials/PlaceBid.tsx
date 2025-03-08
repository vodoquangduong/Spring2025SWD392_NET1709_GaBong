import { App, Button, Popconfirm } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueries } from "@tanstack/react-query";
import { GET, POST } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import useChatStore from "@/components/ChatPopup/stores/chatStore";
import { NotificationStatus, NotificationType } from "@/types/notification";
import { z } from "zod";
import useUiStore from "@/stores/uiStore";

export default function PlaceBid({ project }: { project: any }) {
  const { message } = App.useApp();
  const { accountId, name } = useAuthStore();
  const { notifyService } = useChatStore();
  const { revalidate } = useUiStore();

  let { id } = useParams();
  let navigate = useNavigate();

  const bidFormSchema = () => {
    return z.object({
      projectId: z.string().optional(),
      bidOffer: z.coerce
        .number()
        .min(
          project?.estimateBudget * 0.8,
          "Offer must be greater than the 80% of the project budget"
        )
        .max(10000000, "Bid must be less than 1,000,000 USD"),
      bidDescription: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(100, "Description must be less than 100 characters"),
    });
  };

  const [user] = useQueries({
    queries: [
      {
        queryKey: ["user", revalidate],
        queryFn: async () => await GET(`/api/Account/${accountId}`),
      },
    ],
  });

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
          You dont have enough balance to send proposal{" "}
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
    if (user?.data?.value?.phone?.trim()?.length == 0) {
      message.info("Please update your profile first");
      navigate("/profile/edit");
      scrollTo(0, 0);
      return;
    }
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
          Place a proposal on this project
        </span>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div>You must have a minimum of $2 USD to place a proposal.</div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <label htmlFor="checkbox" className="my-1 font-bold">
              Offer Amount
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
        {/* <div>Paid to you: $200.00 - $20.00 fee = $180.00</div> */}
        <div>
          <div className="flex justify-between items-center">
            <div className="font-bold">
              Describe your proposal (minimum 100 characters)
            </div>
            <Button
              disabled={mutation.isPending}
              htmlType="submit"
              type="primary"
              className="py-4 text-base font-bold"
            >
              Send proposal
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
