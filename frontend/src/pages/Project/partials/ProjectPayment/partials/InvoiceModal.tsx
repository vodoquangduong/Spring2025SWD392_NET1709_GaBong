import Logo from "@/components/Logo";
import { GET } from "@/modules/request";
import { useQueries } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";
import dayjs from "dayjs";
import React, { useRef } from "react";
import {
  BiPhone,
  BiSolidMessageDetail,
  BiSolidPhone,
  BiSolidUser,
} from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { invoiceColumns } from "../schemas/invoiceColumns";
import { IoMail } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";

export default function InvoiceModal({
  project,
  milestone,
}: {
  project: any;
  milestone: any;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [open, setOpen] = React.useState<boolean>(false);

  const [client, freelancer] = useQueries({
    queries: [
      {
        queryKey: ["clientDetail", project.milestoneId],
        queryFn: async () => await GET(`/api/Account/${project.clientId}`),
      },
      {
        queryKey: ["freelancerDetail", project.milestoneId],
        queryFn: async () => await GET(`/api/Account/${project.freelancerId}`),
      },
    ],
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>View Invoice</Button>
      <Modal
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button
              type="primary"
              onClick={() => {
                reactToPrintFn();
              }}
            >
              Export Invoice
            </Button>
          </>
        }
        loading={client.isLoading || freelancer.isLoading}
        width={800}
        centered
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div className="chivo" ref={contentRef}>
          <div className="p-8">
            <p className="text-2xl uppercase chivo">
              Milestone Invoice #{milestone?.milestoneId}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
              <div className="text-base">
                <div className="font-bold uppercase mb-1">
                  Client: {client?.data?.value?.name}
                </div>
                <div className="uppercase"></div>
                <div className="flex gap-2 items-center">
                  <IoMail />
                  {client?.data?.value?.email}
                </div>
                <div className="flex gap-2 items-center">
                  <BiSolidPhone />
                  {client?.data?.value?.phone}
                </div>
                <div className="flex gap-2 items-center">
                  <FaLocationDot size={14} />
                  {client?.data?.value?.address}
                </div>
              </div>
              <div className="text-base">
                <div className="font-bold uppercase mb-1">
                  Freelancer: {freelancer?.data?.value?.name}
                </div>
                <div className="flex gap-2 items-center">
                  <IoMail />
                  {freelancer?.data?.value?.email}
                </div>
                <div className="flex gap-2 items-center">
                  <BiSolidPhone />
                  {freelancer?.data?.value?.phone}
                </div>
                <div className="flex gap-2 items-center">
                  <FaLocationDot size={14} />
                  {freelancer?.data?.value?.address}
                </div>
              </div>
            </div>
            <Table
              className="pt-8"
              columns={invoiceColumns(project)}
              dataSource={[milestone]}
              rowKey={(record: any) => record.milestoneId}
              pagination={false}
            />
            <div className="mt-8"></div>
            <div className="gap-y-4">
              <div className="flex justify-between">
                <div className="">Sub Total</div>
                <div className="font-bold text-xl chivo flex items-center gap-2">
                  <div>
                    $
                    {Number(
                      (milestone?.payAmount / 100) * project?.estimateBudget
                    )?.toLocaleString() || 0}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">System fee</div>
                <div className="font-bold text-xl chivo flex items-center gap-2">
                  <div>${Number(0)?.toLocaleString() || 0}</div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between border-t pt-4 mt-2 mb-4">
                <div className="text-xl font-semibold">Total amount</div>
                <div className="font-bold text-3xl chivo flex items-center gap-2">
                  <div>
                    ${" "}
                    {Number(
                      (milestone?.payAmount / 100) * project?.estimateBudget
                    )?.toLocaleString() || 0}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
