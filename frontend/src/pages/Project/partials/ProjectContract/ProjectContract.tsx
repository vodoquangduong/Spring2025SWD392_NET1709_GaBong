import Skills from "@/components/Skills";
import { defaultAvatar } from "@/modules/default";
import { GET, POST } from "@/modules/request";
import { tableColumns } from "@/pages/MakeContract/schemas";
import useContractStore from "@/pages/MakeContract/store/contractStore";
import useAuthStore from "@/stores/authStore";
import { useMutation, useQueries } from "@tanstack/react-query";
import { App, Skeleton, Spin, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { BiMailSend, BiPhone } from "react-icons/bi";
import { FaFlag } from "react-icons/fa";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function ProjectContract() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { accountId } = useAuthStore();
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (data: any) => {
      const res = await POST(`/api/Contract`, data);
      if (res.code) throw new Error();
      return res;
    },
    onError: () => {
      message.destroy();
      message.error("Choose you dont have enough money");
    },

    onSuccess: () => {
      message.destroy();
      message.success("Make contract successfully");
      navigate(`/projects/${id}/milestones`);
    },
  });

  const data = useOutletContext<any>();

  // console.log(project?.data?.value?.freelancerId);
  console.log("🚀 ~ ProjectContract ~ freelancerId:", data?.project);

  const [freelancer, client] = useQueries({
    queries: [
      {
        queryKey: ["contractFreelancer", data?.project?.freelancerId],
        queryFn: async () =>
          await GET(`/api/Account/${data?.project?.freelancerId}`),
      },
      {
        queryKey: ["client", data?.project?.clientId],
        queryFn: async () =>
          await GET(`/api/Account/${data?.project?.clientId}`),
      },
    ],
  });

  // if (
  //   accountId != project?.data?.freelancerId ||
  //   accountId != client?.data?.id
  // ) {
  //   location.href = "/";
  //   // return <Spin />;
  // }

  return (
    <div className="col-span-12 grid grid-cols-2 gap-10 text-lg">
      <div className="">
        <div className="font-bold flex justify-between p-4 pl-0 border-b border-zinc-400 dark:border-zinc-600 mb-4">
          Client Info
        </div>
        <UserItem data={client?.data?.value} />
      </div>
      <div>
        <div className="font-bold flex justify-between p-4 pl-0 border-b border-zinc-400 dark:border-zinc-600 mb-4">
          Freelancer Info
        </div>
        <UserItem data={freelancer?.data?.value} />
      </div>

      <div className="col-span-2">
        <div className="rounded-2xl">
          <div className="font-bold justify-between p-4 pl-0 border-b mb-4">
            <div>Project Information</div>
          </div>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-12 gap-x-2 gap-y-4 text-base ">
              <div className="col-span-12 flex justify-between">
                <div className="font-semibold">
                  Project:
                  <span className="ml-2 font-bold">
                    {data?.project?.projectName || <Skeleton.Input active />}
                  </span>
                </div>
                <div className="font-semibold">
                  Location:{" "}
                  {data?.project?.location || <Skeleton.Input active />}
                </div>
                <div className="font-semibold">
                  Start date: {dayjs().format("MMMM DD, YYYY")}
                </div>
              </div>
              <div className="col-span-12">
                {data?.project?.projectDescription}
              </div>
              <div className="font-semibold col-span-12">Required Skills</div>
              <div className="col-span-12">
                <Skills items={data?.project?.skills} />
              </div>
            </div>
            <div className="flex items-center gap-12 border-t mt-4 pt-4">
              <div className="mb-2 text-xl chivo">Total negotiated budget</div>
              <div className="font-bold text-3xl chivo flex items-center gap-2">
                <div>
                  ${" "}
                  {data?.isLoading ? (
                    <Skeleton.Input active />
                  ) : (
                    (data?.project?.estimateBudget).toLocaleString()
                  )}
                </div>
                <span className="text-zinc-500 text-sm">USD</span>
              </div>
            </div>
            <div className="font-bold justify-between p-4 pl-0 border-b chivo">
              <div>Milestones</div>
            </div>
            <Table
              className="pt-4"
              pagination={false}
              dataSource={data?.project?.milestones}
              columns={tableColumns(data?.project?.estimateBudget)}
            />
            <div className="font-bold justify-between p-4 pl-0 border-b chivo">
              <div>Contract policy</div>
            </div>

            <div className="col-span-4 text-base flex justify-end items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const UserItem = ({ data }: any) => {
  return (
    <div className="space-y-4 py-4">
      <div className="flex gap-4">
        <img
          className="aspect-square h-20 rounded-lg border"
          src={data?.avatarURL || defaultAvatar}
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="chivo">
            <div className="text-lg flex gap-4">
              <span className="font-semibold pr-3">{data?.name}</span>
              <span className="flex justify-center items-center gap-2">
                <FaFlag size={14} className="text-emerald-500" />
                {data?.nationality}
              </span>
            </div>
            <div className="text-base gap-8">
              <div className="flex items-center gap-1">
                <BiPhone size={20} className="text-emerald-500" />
                {data?.phone}
              </div>
              <div className="flex items-center gap-1">
                <BiMailSend size={20} className="text-emerald-500" />
                {data?.email}
              </div>
            </div>
            <div className="text-base flex gap-8"></div>
            <div className="text-base flex gap-8">
              <span className="">
                Member since {dayjs(data?.createdA).format("MMMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
