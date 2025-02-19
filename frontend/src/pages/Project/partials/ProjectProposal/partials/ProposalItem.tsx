import { HiCheckCircle } from "react-icons/hi2";
import { MdPlace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getRandomInt } from "../../../../../modules/random";
import { Rate } from "antd";
import { FaFlag, FaStar } from "react-icons/fa6";
import CreateModal from "../../../../../components/CreateModal";
import CreateReportFreelancerForm from "../forms/CreateReportFreelancerForm";

export default function ProposalItem() {
  const navigate = useNavigate();
  return (
    <div className="py-6 px-4 border-b dark:border-gray-700 hover:bg-black/10 dark:hover:bg-neutral-950">
      <div className="flex justify-between">
        <div
          className="flex gap-4 cursor-pointer"
          onClick={() => navigate("/freelancers/1")}
        >
          <div
            className="h-20 aspect-square rounded-full bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url(https://picsum.photos/id/10/400/200)",
            }}
          ></div>
          <div className="text-sm font-semibold">
            <div className="flex gap-4 items-center mb-1">
              <div className="text-lg leading-none">Raja Ahmad Ayaz N.</div>
              <HiCheckCircle color="green" size={20} />
            </div>
            <div className="font-normal text-[14px] my-1">
              Full Stack Developer | 10+ Years of Experience
            </div>
            <div className="flex gap-1 items-center">
              <MdPlace />
              <div className="">England</div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="font-semibold text-xl">
            ${getRandomInt(1000, 10000).toLocaleString()} USD
          </div>
          <div className="text-sm text-end mt-1">
            in {getRandomInt(2, 30).toLocaleString()} days
          </div>
        </div>
      </div>
      <div className="my-4">{description}</div>
      <div className="flex items-center justify-between">
        <Rate
          defaultValue={getRandomInt(1, 5)}
          disabled
          character={<FaStar size={16} />}
        />
        <CreateModal
          icon={<FaFlag />}
          children="Report Freelancer"
          type="text"
          modalTitle={"Report this freelancer"}
          form={(
            setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
          ) => <CreateReportFreelancerForm setIsModalOpen={setIsModalOpen} />}
        />
      </div>
    </div>
  );
}

const description = `With over a decade of experience in Full Stack Development, WordPress, Mobile App Design, and more, I have a proven track record of delivering successful projects to organizations. I am dedicated to providing top-notch support and high-quality work to nurture long-term relationships with clients. I am excited to learn more about your project requirements and discuss how we can bring your ideas to life effectively.`;
