import { HiCheckCircle } from "react-icons/hi2";
import { MdPlace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getRandomInt } from "../../../../../modules/random";
import {
  App,
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
  Rate,
  Skeleton,
} from "antd";
import { FaFlag, FaStar } from "react-icons/fa6";
import CreateModal from "../../../../../components/CreateModal";
import CreateReportFreelancerForm from "../forms/CreateReportFreelancerForm";
import { useMutation } from "@tanstack/react-query";
import { POST, PUT } from "@/modules/request";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useUiStore from "@/stores/uiStore";
import useContractStore from "@/pages/MakeContract/store/contractStore";
import useAuthStore from "@/stores/authStore";
import { Role } from "@/types";
import useChatStore from "@/components/ChatPopup/stores/chatStore";
import { NotificationType } from "@/types/notification";

export default function ProposalItem({
  item,
  clientId,
}: {
  item: any;
  clientId: string;
}) {
  const navigate = useNavigate();
  const { setCurrentRoom, notifyService } = useChatStore();
  const { accountId, role } = useAuthStore();
  const { toogleChatPopup } = useUiStore();
  const { setSelected } = useContractStore();

  const { id: projectId } = useParams();
  const { message } = App.useApp();
  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (freelancerId: string) =>
      await PUT(`/api/Project/${projectId}/chooseBid`, {
        freelancerId,
      }),
    onError: () => {
      message.destroy();
      message.error("Choose freelancer failed");
    },
    onSuccess: () => {
      message.destroy();
      message.success("Choose freelancer successfully");
    },
  });

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setSelected(
              item?.bidOwnerId,
              Number(projectId) || 0,
              item?.bidOffer
            );
            navigate("/make-contract");
          }}
        >
          Choose this Freelancer
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={async () => {
            let res = await POST("/api/ChatRoom", {
              clientId: accountId,
              freelancerId: item?.bidOwnerId,
              chatRoomName: `${accountId}-${item?.bidOwnerId}`,
            });
            toogleChatPopup();
            setCurrentRoom(res);
          }}
        >
          Start chatting
        </div>
      ),
    },
  ];

  return (
    <div className="py-6 px-4 border-b dark:border-gray-700">
      <div className="flex justify-between">
        <div
          className="flex gap-4 cursor-pointer"
          onClick={() => navigate("/freelancers/1")}
        >
          <div
            className="h-16 aspect-square rounded-full bg-center bg-no-repeat bg-cover bg-white border border-black"
            style={{
              backgroundImage: `url(${item?.bidOwner?.avatarURL})`,
              // backgroundImage: `url(https://robohash.org/${item?.bidOwnerId})`,
            }}
          ></div>
          <div className="text-sm font-semibold">
            <div className="flex gap-4 items-center mb-1">
              <div className="text-lg leading-none">{item?.bidOwner?.name}</div>
              <HiCheckCircle color="green" size={20} />
            </div>
            <div className="font-normal text-[14px] my-1">
              {item?.bidOwner?.email}
              {/* Full Stack Developer | 10+ Years of Experience */}
            </div>
            <div className="flex gap-1 items-center">
              <MdPlace />
              <div className="">{item?.bidOwner?.nationality}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="font-semibold text-xl">
            ${item?.bidOffer.toLocaleString()} USD
          </div>
          <div>
            {role == Role.CLIENT && clientId == accountId + "" && (
              <Dropdown menu={{ items }}>
                <div className="p-2 rounded-full bg-slate-200 dark:bg-black/20 transition-all">
                  <HiOutlineDotsHorizontal />
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
      <div className="my-4">{item?.bidDescription}</div>
      <div className="flex items-center justify-between">
        <Rate
          defaultValue={getRandomInt(1, 5)}
          disabled
          character={<FaStar size={16} />}
        />
        <div className="space-x-4">
          <CreateModal
            icon={<FaFlag />}
            children="Report Freelancer"
            type="text"
            modalTitle={"Report this freelancer"}
            form={(
              setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
            ) => <CreateReportFreelancerForm setIsModalOpen={setIsModalOpen} />}
          />
        </div>
      </div>
    </div>
  );
}

export function ProposalItemSkeleton() {
  const navigate = useNavigate();
  return (
    <div className="py-6 px-4 border-b dark:border-gray-700">
      <div className="flex justify-between">
        <div
          className="flex gap-4 cursor-pointer"
          onClick={() => navigate("/freelancers/1")}
        >
          <Skeleton.Input active style={{ width: "100px" }} />
          <div className="text-sm font-semibold">
            <div className="flex gap-4 items-center mb-1">
              <Skeleton.Input active style={{ width: "100px" }} />
            </div>
          </div>
        </div>
        <div className="">
          <div className="font-semibold text-xl">
            <Skeleton.Input active style={{ width: "100px" }} />
          </div>
        </div>
      </div>
      <Skeleton active className="my-4" paragraph={{ rows: 3 }} />
      <div className="flex items-center justify-between">
        <Skeleton.Input active style={{ width: "100px" }} />
      </div>
    </div>
  );
}

const description = `With over a decade of experience in Full Stack Development, WordPress, Mobile App Design, and more, I have a proven track record of delivering successful projects to organizations. I am dedicated to providing top-notch support and high-quality work to nurture long-term relationships with clients. I am excited to learn more about your project requirements and discuss how we can bring your ideas to life effectively.`;
