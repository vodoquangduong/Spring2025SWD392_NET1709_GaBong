import Back from "@/components/Back";
import { GET, POST } from "@/modules/request";
import { useMutation, useQueries } from "@tanstack/react-query";
import { App, Button, Popconfirm, Skeleton, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useContractStore from "./store/contractStore";
import { defaultAvatar } from "@/modules/default";
import dayjs from "dayjs";
import { FaFlag } from "react-icons/fa";
import useAuthStore from "@/stores/authStore";
import { tableColumns } from "./schemas";
import Skills from "@/components/Skills";

export default function MakeContract() {
  const navigate = useNavigate();
  const { accountId } = useAuthStore();
  const { message } = App.useApp();
  const { freelancerId, projectId, bidTotal } = useContractStore();

  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (data: any) => {
      const check = await GET(`/api/Project/${projectId}`);
      console.log(check);
      if (check?.freelancerId) {
        message.destroy();
        message.error("This project is already contracted");
        return;
      }
      //let res = "";
      const res = await POST(`/api/Contract`, data);
      //if (res.code) throw new Error();
      return res;
    },
    onError: () => {
      message.destroy();
      message.error("Choose you dont have enough money");
    },

    onSuccess: () => {
      message.destroy();
      message.success("Make contract successfully");
      navigate(`/projects/${projectId}/contract`);
    },
  });

  const [freelancer, client, project] = useQueries({
    queries: [
      {
        queryKey: ["selectedFreelancer"],
        queryFn: async () => await GET(`/api/Account/${freelancerId}`),
      },
      {
        queryKey: ["client"],
        queryFn: async () => await GET(`/api/Account/${accountId}`),
      },
      {
        queryKey: ["selectedProject"],
        queryFn: async () => await GET(`/api/Project/${projectId}`),
      },
    ],
  });

  if (!freelancerId || !projectId) {
    location.href = "/";
  }

  return (
    <div className="h-screen w-screen flex justify-center">
      <Back />
      <div className="mx-container my-8">
        <div className=" grid grid-cols-3 gap-10 text-lg">
          <div className="col-span-2">
            <div className="rounded-2xl">
              <div className="font-bold justify-between p-4 pl-0 border-b mb-4">
                <div>Your project information</div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-12 gap-x-2 gap-y-4 text-base ">
                  <div className="col-span-12 flex justify-between">
                    <div className="font-semibold">
                      Project:
                      <span className="ml-2 font-bold">
                        {project.data?.value?.projectName || (
                          <Skeleton.Input active />
                        )}
                      </span>
                    </div>
                    <div className="font-semibold">
                      Location:{" "}
                      {project.data?.value?.location || (
                        <Skeleton.Input active />
                      )}
                    </div>
                    <div className="font-semibold">
                      Start date: {dayjs().format("MMMM DD, YYYY")}
                    </div>
                  </div>
                  <div className="col-span-12">
                    {project?.data?.value?.projectDescription}
                  </div>
                  <div className="font-semibold col-span-12">
                    Required Skills
                  </div>
                  <div className="col-span-12">
                    <Skills items={project?.data?.value?.skills} />
                    {/* {project?.data} */}
                    {/* {project?.data} */}
                  </div>
                </div>
                <div className="font-bold justify-between p-4 pl-0 border-b chivo">
                  <div>Milestones</div>
                </div>
                <Table
                  className="pt-4"
                  pagination={false}
                  dataSource={project?.data?.value?.milestones}
                  columns={tableColumns(project?.data?.value?.estimateBudget)}
                />
                <div className="font-bold justify-between p-4 pl-0 border-b chivo">
                  <div>Contract policy</div>
                </div>
                <textarea
                  id="contractPolicy"
                  rows={8}
                  className="py-2 input-style no-ring !mt-8"
                />

                <div className="col-span-4 text-base flex justify-end items-center"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="sticky top-8">
              <div className="font-bold flex justify-between p-4 pl-0 border-b border-zinc-400 dark:border-zinc-600 mb-4">
                Client Info
              </div>
              <UserItem data={client?.data?.value} />
              <div className="font-bold flex justify-between p-4 pl-0 border-b border-zinc-400 dark:border-zinc-600 mb-4">
                Freelancer Info
              </div>
              <UserItem data={freelancer?.data?.value} />
              <div className="font-bold flex justify-between mt-4 p-4 pl-0 border-b border-zinc-400 dark:border-zinc-600 mb-4">
                Project Budget Information
              </div>
              <div className="flex justify-between pt-4">
                <div className="mb-2">Estimated Budget</div>
                <div className="font-bold text-xl chivo flex items-center gap-2">
                  <div>
                    ${" "}
                    {project.isLoading ? (
                      <Skeleton.Input active />
                    ) : (
                      project?.data?.value?.estimateBudget.toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <div className="mb-2">Negotiate Budget:</div>
                <div className="font-bold text-xl chivo flex items-center gap-2">
                  <div>
                    $ {project.isLoading ? <Skeleton.Input active /> : bidTotal}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <div className="mb-2">System fee</div>
                <div className="font-bold text-xl chivo flex items-center gap-2">
                  <div>
                    ${" "}
                    {project.isLoading ? (
                      <Skeleton.Input active />
                    ) : (
                      (bidTotal * 0.1).toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between border-t mt-4 pt-4">
                <div className="mb-2 text-2xl chivo">Total fee</div>
                <div className="font-bold text-3xl chivo flex items-center gap-2">
                  <div>
                    ${" "}
                    {project.isLoading ? (
                      <Skeleton.Input active />
                    ) : (
                      (bidTotal * 1.1).toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <div className="mb-2 text-xl chivo">Current balance</div>
                <div className="font-bold text-2xl chivo flex items-center gap-2">
                  <div
                    className={`${
                      client?.data?.value?.totalCredit < bidTotal
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    ${" "}
                    {client.isLoading ? (
                      <Skeleton.Input active />
                    ) : (
                      (client?.data?.value?.totalCredit).toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="mt-4 pt-4">
                <Popconfirm
                  title="Approve the freelancer"
                  description="Are you sure to approve this freelancer?"
                  onConfirm={async () => {
                    message.open({
                      type: "loading",
                      content: "Creating contract ...",
                      duration: 0,
                    });
                    const contractPolicy = (
                      document.querySelector(
                        "#contractPolicy"
                      ) as HTMLInputElement
                    )?.value;
                    let data = { freelancerId, projectId, contractPolicy };
                    mutation.mutate(data);
                  }}
                >
                  <Button
                    type="primary"
                    className="py-6 text-base font-semibold w-full uppercase"
                  >
                    Confirm and Create
                  </Button>
                </Popconfirm>
              </div>
            </div>
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
          className="h-20 rounded-lg border"
          src={data?.avatarURL || defaultAvatar}
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="chivo">
            <div className="text-lg flex gap-4 mb-2">
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
