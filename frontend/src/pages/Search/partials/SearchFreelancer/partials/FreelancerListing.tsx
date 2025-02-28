import { Button, Pagination, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { getRandomInt } from "../../../../../modules/random";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi2";
import { MdOutlineEmail, MdPlace } from "react-icons/md";
import Skills from "../../../../../components/Skills";
import { useQueries } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { defaultAvatar } from "@/modules/default";
import { ListingItemSkeletion } from "../../SearchProject/partials/ProjectListing";

const FreelancerItem = ({ freelancer }: { freelancer: any }) => {
  const navigate = useNavigate();
  return (
    <div
      className="py-6 px-4 border-b dark:border-gray-700 hover:bg-black/10 dark:hover:bg-neutral-950 cursor-pointer"
      onClick={() => navigate("/freelancers/1")}
    >
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div
            className="h-20 aspect-square rounded-full bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${freelancer?.avatarURL || defaultAvatar})`,
            }}
          ></div>
          <div className="text-sm font-semibold">
            <div className="flex gap-2 items-center mb-1">
              <div className="text-lg leading-none">{freelancer?.name}</div>
              <HiCheckCircle color="green" size={20} />
            </div>
            <div className="flex gap-2 items-center mb-1">
              {freelancer?.email}
            </div>
            <div className="flex gap-2 items-center">
              <MdPlace size={18} />
              <div className="">{freelancer?.nationality}</div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="font-semibold text-xl">
            ${getRandomInt(20, 100).toLocaleString()} USD
          </div>
          <div className="text-sm text-end mt-1">per hour</div>
        </div>
      </div>
      <div className="my-4">{description}</div>
      <div className="mb-1 flex justify-between">
        <div>
          <Skills />
        </div>
        {/* <span className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full cursor-pointer">
          <FaRegHeart size={20} strokeWidth={1} />
        </span> */}
      </div>
      <div className="flex items-center justify-between">
        <Rate
          defaultValue={getRandomInt(1, 5)}
          disabled
          character={<FaStar size={16} />}
        />
        <div className="flex gap-4 items-center text-xs">
          {/* <Button type="primary" className="py-4 font-bold">
            Invite to Bid
          </Button> */}
          <Button type="primary" className="py-4 font-bold">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function FreelancerListing() {
  const [freelancers] = useQueries({
    queries: [
      {
        queryKey: ["freelancers"],
        queryFn: async () => await GET("/api/Account/get-all-freelancer"),
      },
    ],
  });

  return (
    <div>
      <div className="border-b w-full p-4 flex justify-between items-center dark:border-gray-500 shadow-md">
        <div>
          <span className="font-semibold text-xl mr-3">Top result</span>{" "}
          {freelancers?.data?.items?.length} results
        </div>
        <div className="flex gap-1 items-center">
          <label htmlFor="" className="w-[100px]">
            Sort by
          </label>
          <select className="input-style py-2">
            <option value="">Newest</option>
            <option value="">Oldest</option>
            <option value="">Highest rate</option>
            <option value="">Lowest rate</option>
          </select>
        </div>
      </div>
      <div>
        {freelancers?.data?.items?.map((freelancer: any) => (
          <FreelancerItem key={freelancer?.accountId} freelancer={freelancer} />
        ))}
        {freelancers?.isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <ListingItemSkeletion key={index} />
          ))}
      </div>
      <div>
        {freelancers?.data?.items?.map((freelancer: any) => (
          <FreelancerItem freelancer={freelancer} key={freelancer?.accountId} />
        ))}
      </div>
      <div className="p-4 flex justify-end">
        <Pagination
          showTotal={(total) => `Total ${total} items`}
          defaultCurrent={1}
          total={50}
        />
      </div>
    </div>
  );
}

const description = `With over a decade of experience in Full Stack Development, WordPress, Mobile App Design, and more, I have a proven track record of delivering successful projects to organizations. I am dedicated to providing top-notch support and high-quality work to nurture long-term relationships with clients. I am excited to learn more about your project requirements and discuss how we can bring your ideas to life effectively.`;
