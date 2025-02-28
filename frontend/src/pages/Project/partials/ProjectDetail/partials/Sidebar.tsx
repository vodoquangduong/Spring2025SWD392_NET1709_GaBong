import { GET } from "@/modules/request";
import { useQuery } from "@tanstack/react-query";
import { Rate } from "antd";
import dayjs from "dayjs";
import { FaClock, FaFlag, FaPhone, FaUser } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { IoCard, IoMail } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";

export default function Sidebar({ clientId }: { clientId: any }) {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["clientId", clientId],
    queryFn: async () => await GET(`/api/Account/${clientId}`),
  });
  console.log("🚀 ~ Sidebar ~ data:", data);

  return (
    <div className="px-8 py-4">
      <div className="font-bold mb-8 text-lg flex items-center gap-3">
        About the Client
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <img
            className="rounded-lg h-16 w-16"
            src={data?.value?.avatarURL}
            alt=""
          />
          {data?.value?.name}
        </div>
        <div className="flex gap-3 items-center">
          <FaFlag />
          {data?.value?.nationality}
        </div>
        <div className="flex gap-3 items-center">
          <FaUser />
          <Rate defaultValue={4} disabled />
        </div>
        <div className="flex gap-3 items-center">
          <FaClock />
          Member since {"   "}
          {dayjs(data?.value?.createdAt).format("MMM DD, YYYY")}
        </div>
      </div>
      <div className="font-bold mt-8 mb-2 text-lg">Client Verification</div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <HiIdentification color="green" />
          Identity verified
        </div>
        <div className="flex gap-3 items-center">
          <RiShieldCheckFill color="green" />
          Payment verified
        </div>
        <div className="flex gap-3 items-center">
          <IoCard color="green" />
          Deposit made
        </div>
        {data?.value?.email && (
          <div className="flex gap-3 items-center">
            <IoMail color="green" />
            Email verified
          </div>
        )}
        <div className="flex gap-3 items-center">
          <FaUser color="green" />
          Profile completed
        </div>
        {data?.value?.phone && (
          <div className="flex gap-3 items-center">
            <FaPhone color="green" />
            Phone verified
          </div>
        )}
      </div>
    </div>
  );
}
