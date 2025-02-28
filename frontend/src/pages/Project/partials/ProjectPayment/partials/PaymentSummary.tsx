import { Tag } from "antd";
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
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div>
          <div className="text-lg font-semibold flex gap-2 items-center mb-1">
            Total budget
            <GoQuestion />
          </div>
          <div className="text-lg">
            $
            {
              project?.bids?.find(
                (bid: any) => bid.bidOwnerId == project?.freelancerId
              )?.bidOffer
            }{" "}
            USD
          </div>
        </div>
        <div className="place-self-center">
          <div className="text-lg font-semibold flex gap-2 items-center mb-1">
            In progress
            <GoQuestion />
          </div>
          <div className="text-lg">$10,000 USD</div>
        </div>
        <div className="place-self-end">
          <div className="text-lg font-semibold flex gap-2 items-center mb-1">
            Released to freelancer
            <GoQuestion />
          </div>
          <div className="text-lg">$10,000 USD</div>
        </div>
      </div>
    </div>
  );
}
