import { MilestoneStatus } from "@/types/milestone";
import { Skeleton, Tag } from "antd";
import { GoDownload, GoQuestion } from "react-icons/go";

export default function PaymentSummary({ project }: { project: any }) {
  console.log("🚀 ~ PaymentSummary ~ project:", project);
  // a.find()

  return (
    <div className="dark:bg-white/5 p-6 w-full mb-6 rounded-md shadow-md">
      <div className="text-2xl font-semibold flex items-center gap-4">
        Payment Summary
        <Tag className="px-4 !font-bold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-600 cursor-pointer">
          Invoice Summary
        </Tag>
      </div>
      {!project?.estimateBudget ? (
        <div>
          <Skeleton.Input className="mt-4" active style={{ width: 300 }} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div>
            <div className="text-base font-semibold flex gap-2 items-center mb-1">
              Negotiate Budget
              <GoQuestion />
            </div>
            <div className="font-bold text-2xl chivo flex items-center gap-2">
              ${project?.estimateBudget.toLocaleString()}
              <span className="text-zinc-500 text-sm">USD</span>
            </div>
          </div>
          <div className="place-self-center">
            <div className="text-base font-semibold flex gap-2 items-center mb-1">
              Released
              <GoQuestion />
            </div>
            <div className="font-bold text-2xl chivo flex items-center gap-2">
              $
              {project?.milestones
                ?.reduce((a: any, b: any) => {
                  if (b.status == MilestoneStatus.COMPLETED) {
                    return a + (b.payAmount / 100) * project?.estimateBudget;
                  }
                  return a;
                }, 0)
                .toLocaleString()}{" "}
              <span className="text-zinc-500 text-sm">USD</span>
            </div>
          </div>
          <div className="place-self-end">
            <div className="text-base font-semibold flex gap-2 items-center mb-1">
              Remain
              <GoQuestion />
            </div>
            <div className="font-bold text-2xl chivo flex items-center gap-2">
              $
              {(
                project?.estimateBudget -
                project?.milestones?.reduce((a: any, b: any) => {
                  if (b.status == MilestoneStatus.COMPLETED) {
                    return a + (b.payAmount / 100) * project?.estimateBudget;
                  }
                  return a;
                }, 0)
              ).toLocaleString()}{" "}
              <span className="text-zinc-500 text-sm">USD</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
