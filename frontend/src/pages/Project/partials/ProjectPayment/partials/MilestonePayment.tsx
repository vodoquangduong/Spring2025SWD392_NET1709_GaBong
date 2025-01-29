import { Dropdown, Select } from "antd";
import { FaPlus } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import CreateModal from "../../../../../components/CreateModal";
import CreateMileStoneForm from "../forms/CreateMileStoneForm";
import { BiChevronDown } from "react-icons/bi";

export default function MilestonePayment() {
  return (
    <div className="dark:bg-white/5 p-6 w-full mb-8 rounded-md shadow-md">
      <div className="text-2xl font-semibold flex justify-between items-center gap-4">
        Milestone Payments
        <CreateModal
          icon={<FaPlus />}
          children="Create Milestone"
          type="primary"
          modalTitle={"Create Milestone"}
          form={(
            setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
          ) => <CreateMileStoneForm setIsModalOpen={setIsModalOpen} />}
        />
      </div>
      <div className="text-lg font-semibold flex gap-2 items-center mt-8 mb-1">
        Created Milestones
        <GoQuestion />
      </div>
      <div className="grid grid-cols-12 gap-y-8 gap-x-4 mt-4 text-lg">
        <MilestoneHeader />
        <MilestoneItem />
        <MilestoneItem />
        <MilestoneItem />
      </div>
    </div>
  );
}

const MilestoneHeader = () => {
  return (
    <>
      <div className="col-span-2 font-semibold">Date</div>
      <div className="col-span-4 font-semibold">Description</div>
      <div className="col-span-2 font-semibold">Status</div>
      <div className="col-span-2 font-semibold">Amount</div>
      <div className="col-span-2 font-semibold"></div>
    </>
  );
};

const MilestoneItem = () => {
  return (
    <>
      <div className="col-span-2 text-base">Jan 8, 2025</div>
      <div className="col-span-4">
        Initial Milestone Payment Initial Milestone Payment Initial Milestone
      </div>
      <div className="col-span-2">Released</div>
      <div className="col-span-2">$1.00 USD</div>
      <div className="col-span-2">
        <Dropdown.Button
          menu={{
            items: [
              { key: "1", label: <div className="">View invoice</div> },
              { key: "2", label: "Cancel" },
            ],
          }}
          className="w-full !text-4xl"
          icon={<BiChevronDown />}
          placement="bottom"
        >
          Release
        </Dropdown.Button>
        {/* <Select defaultValue={"1"} className="w-full">
          <Select.Option value="1">Release</Select.Option>
          <Select.Option value="2">Cancel</Select.Option>
        </Select> */}
        {/* <Button className="font-semibold w-full py-4">Release</Button> */}
      </div>
    </>
  );
};
