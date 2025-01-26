import { Rate } from "antd";
import { FaClock, FaFlag, FaPhone, FaUser } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { IoCard, IoMail } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";

export default function Sidebar() {
  return (
    <div className="px-8 py-4">
      <div className="font-bold mb-8 text-lg">About the Client</div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <MdPlace />
          Dhaka
        </div>
        <div className="flex gap-3 items-center">
          <FaFlag />
          Bangladesh
        </div>
        <div className="flex gap-3 items-center">
          <FaUser />
          <Rate defaultValue={4} disabled />
        </div>
        <div className="flex gap-3 items-center">
          <FaClock />
          Member since Jul 4, 2023
        </div>
      </div>
      <div className="font-bold mt-8 mb-2 text-lg">Client Verification</div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <HiIdentification color="green" />
          Identity verified
        </div>
        <div className="flex gap-3 items-center">
          <RiShieldCheckFill color="green" />
          Payment verified
        </div>
        <div className="flex gap-3 items-center">
          <IoCard color="green" />
          Deposit made
        </div>
        <div className="flex gap-3 items-center">
          <IoMail color="green" />
          Email verified
        </div>

        <div className="flex gap-3 items-center">
          <FaUser color="green" />
          Profile completed
        </div>
        <div className="flex gap-3 items-center">
          <FaPhone color="green" />
          Phone verified
        </div>
      </div>
    </div>
  );
}
