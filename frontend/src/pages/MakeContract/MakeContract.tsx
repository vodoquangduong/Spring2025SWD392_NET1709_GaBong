import Back from "@/components/Back";
import Logo from "@/components/Logo";
import { GET, POST, PUT } from "@/modules/request";
import { useQueries, useQuery } from "@tanstack/react-query";
import { App, Button, Popconfirm, Skeleton } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContractStore from "./store/contractStore";
import { defaultAvatar } from "@/modules/default";

export default function MakeContract() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const { message } = App.useApp();
  const { freelancerId, projectId, bidTotal } = useContractStore();
  const [freelancer, project] = useQueries({
    queries: [
      {
        queryKey: ["selectedFreelancer"],
        queryFn: async () => await GET(`/api/Account/${freelancerId}`),
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
  console.log(freelancer, project);

  return (
    <div className="h-screen w-screen mx-container flex justify-center">
      <Back />
      <div className="mx-container">
        <div className="flex justify-end py-4">
          <Logo />
        </div>
        <div className=" grid grid-cols-3 gap-6 text-lg">
          <div className="col-span-2">
            <div className="rounded-2xl bg-zinc-200 dark:bg-white/10">
              <div className="font-bold justify-between p-4 border-b border-zinc-400 dark:border-zinc-600">
                <div>Edit your contract information</div>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-12 gap-x-2 gap-y-4 text-base ">
                  <div className="col-span-12 flex justify-between">
                    <div className="font-semibold">
                      Project:
                      <span className="ml-2 font-semibold text-xl">
                        {project.data?.value?.projectName || (
                          <Skeleton.Input active />
                        )}
                      </span>
                    </div>
                    <div className="font-semibold">
                      Total Budget:
                      <span className="ml-2 text-2xl">{bidTotal}</span> USD
                    </div>
                  </div>
                </div>
                <div className="col-span-4 text-base">
                  <div className="font-semibold mb-4">Contract policy:</div>
                  <textarea
                    id="contractPolicy"
                    rows={10}
                    className="py-2 mt-1 input-style no-ring"
                  />
                </div>
                <div className="col-span-4 text-base flex justify-end items-center">
                  <Popconfirm
                    title="Approve the freelancer"
                    description="Are you sure to approve this freelancer?"
                    onConfirm={async () => {
                      message.open({
                        type: "loading",
                        content: "Creating contract ...",
                        duration: 0,
                      });
                      const response = await PUT(
                        "/api/Project/choose-freelancer",
                        {
                          freelancerId,
                          projectId,
                        }
                      );

                      const contractPolicy = (
                        document.querySelector(
                          "#contractPolicy"
                        ) as HTMLInputElement
                      )?.value;
                      let data = { projectId, contractPolicy };

                      const response2 = await POST("/api/Contract", data);
                      message.destroy();
                      message.success("Contract created successfully");
                      navigate("/");
                    }}
                  >
                    <Button
                      type="primary"
                      className="py-6 text-lg font-semibold"
                    >
                      Confirm and Create
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-2xl bg-zinc-200 dark:bg-white/10">
              <div className="font-bold flex justify-between p-4 border-b border-zinc-400 dark:border-zinc-600">
                Freelancer Info
              </div>
              <div className="space-y-4 p-4">
                <div className="flex gap-4">
                  <img
                    className="h-20 rounded-full"
                    src={freelancer?.data?.value?.avatarURL || defaultAvatar}
                  />
                  <div>
                    <div className="text-xl font-semibold">
                      {freelancer?.data?.value?.name}
                    </div>
                    <div className="text-xl">
                      {freelancer?.data?.value?.email}
                    </div>
                  </div>
                </div>

                <div className="text-sm py-2">
                  You agree to authorize the use of your card for this deposit
                  and future payments, and agree to be bound to the{" "}
                  <Link
                    to={"/policy"}
                    className="font-semibold text-emerald-500"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CardImages = () => {
  return (
    <div className="flex gap-2 pt-6 pb-4">
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/visa.svg"
      />
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/mastercard.svg"
      />
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/amex.svg"
      />
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/jcb.svg"
      />
    </div>
  );
};
