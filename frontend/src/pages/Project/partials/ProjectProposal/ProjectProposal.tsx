import { Pagination } from "antd";
import ProposalItem from "./partials/ProposalItem";

export default function ProjectProposal() {
  return (
    <>
      <div className="grid grid-cols-1 mb-8 shadow-md rounded-md dark:bg-white/5">
        <ProposalItem />
        <ProposalItem />
        <ProposalItem />
        <ProposalItem />
      </div>
      <div className="flex justify-end">
        <Pagination total={50} />
      </div>
    </>
  );
}
