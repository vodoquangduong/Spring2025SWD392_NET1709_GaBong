import { defaultAvatar } from "@/modules/default";
import { GET } from "@/modules/request";
import { useQuery } from "@tanstack/react-query";
import { Rate, Skeleton } from "antd";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa";
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

  return (
    <div className="px-8 py-4">
      <div className="font-bold mb-8 text-lg flex items-center gap-3">
        About the Client
      </div>
      <div className="flex flex-col">
        <div className="flex gap-3 items-start">
          {data?.value?.avatarURL ? (
            <img
              className="border rounded-lg h-16 w-16"
              src={data?.value?.avatarURL}
              alt=""
            />
          ) : (
            <img className="rounded-lg h-16 w-16" src={defaultAvatar} alt="" />
          )}
          <div className="flex flex-col text-sm">
            <div className="flex gap-1 items-center font-semibold">
              {data?.value?.name ? (
                <>
                  <FaUser
                    size={14}
                    color="green"
                    className="text-emerald-500"
                  />
                  {data?.value?.name}
                </>
              ) : (
                <Skeleton.Input style={{ height: "20px" }} />
              )}
            </div>
            {data?.value?.name ? (
              data?.value?.email
            ) : (
              <Skeleton.Input className="mt-2" style={{ height: "20px" }} />
            )}
            {data?.value?.name && (
              <div className="flex gap-3 items-center">
                <Rate
                  defaultValue={4}
                  disabled
                  character={<FaStar size={14} />}
                />
              </div>
            )}
          </div>
        </div>
        {data?.value?.name && (
          <>
            <div className="flex gap-2 items-center mt-4">
              <FaFlag />
              {data?.value?.nationality}
            </div>
            <div className="flex gap-3 items-center">
              <FaClock />
              Member since {"   "}
              {dayjs(data?.value?.createdAt).format("MMM DD, YYYY")}
            </div>
          </>
        )}
      </div>
      <div className="font-bold mt-8 mb-2 text-lg">Client Verification</div>
      {data?.value?.name ? (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <HiIdentification color="green" />
            Identity verified
          </div>
          {/* <div className="flex gap-3 items-center">
            <RiShieldCheckFill color="green" />
            Payment verified
          </div> */}
          {data?.value?.email && (
            <div className="flex gap-3 items-center">
              <IoMail color="green" />
              Email verified
            </div>
          )}
          {data?.value?.phone && (
            <div className="flex gap-3 items-center">
              <FaPhone color="green" />
              Phone verified
            </div>
          )}
          <div className="flex gap-3 items-center">
            <FaUser color="green" />
            Profile completed
          </div>
        </div>
      ) : (
        <Skeleton className="mt-8" />
      )}
    </div>
  );
}
