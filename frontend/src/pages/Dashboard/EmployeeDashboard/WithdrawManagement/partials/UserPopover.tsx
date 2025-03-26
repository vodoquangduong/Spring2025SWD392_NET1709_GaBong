import { defaultAvatar } from "@/modules/default";
import { GET } from "@/modules/request";
import { AccountDetail } from "@/types/account";
import { ResultServerResponse } from "@/types/serverResponse";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const UserPopover = ({ accountId }: { accountId: string }) => {
  const { data } = useQuery({
    queryKey: ["account", accountId],
    queryFn: async (): Promise<ResultServerResponse<AccountDetail>> => {
      const data = await GET(`/api/Account/${accountId}`);
      return data;
    },
  });

  return (
    <div className="bg-white p-2 rounded-md">
      <div className="flex items-start">
        <img
          src={data?.value?.avatar || defaultAvatar}
          alt="avatar"
          className="aspect-square h-16 rounded-full"
        />
        <div className="ml-4">
          <div className="text-lg font-semibold">{data?.value?.name}</div>
          <div className="text-gray-600">{data?.value?.email}</div>
          <div className="text-gray-600 flex items-center">
            <FaPhone className="w-4 h-4 mr-2" />
            {data?.value?.phone}
          </div>
          <div className="text-gray-600 flex items-center">
            <FaMapMarkerAlt className="w-4 h-4 mr-2" />
            {data?.value?.nationality}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPopover;
