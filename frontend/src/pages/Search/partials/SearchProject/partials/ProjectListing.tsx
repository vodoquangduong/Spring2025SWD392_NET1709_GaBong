import { Pagination, Rate, Tag } from "antd";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getRandomInt } from "../../../../../modules/random";
import { FaStar } from "react-icons/fa6";
import Skills from "../../../../../components/Skills";

const items = [
  "PHP",
  "HTML",
  "CSS",
  "JavaScript",
  "SQL",
  "React",
  "Angular",
  "Node.js",
  "Python",
  "C#",
  "C++",
  "Java",
];

const ListingItem = () => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 border-b dark:border-gray-700 hover:bg-black/10 dark:hover:bg-neutral-950 cursor-pointer"
      onClick={() => navigate(`/projects/1/details`)}
    >
      <div className="flex justify-between">
        <div className="text-xl">Urgent: Expert PHP Developer in Dhaka</div>
        <div className="flex gap-6">
          <div>{getRandomInt(1, 40)} bids</div>
          <div className="font-semibold">
            $ {getRandomInt(100, 10000).toLocaleString()} USD
            <div className="text-xs text-end">average bid</div>
          </div>
        </div>
      </div>
      <div className="text-sm">
        Budget {getRandomInt(100, 10000).toLocaleString()} USD –{" "}
        {getRandomInt(100, 10000).toLocaleString()} USD
      </div>
      <div className="mt-6">
        I'm urgently seeking an expert raw PHP developer for a 2-months project.
        The developer is required to work on upgrades to our existing reporting
        panel at our Nikaton, Dhaka, Bangladesh office. Freelancer have to work
        in our physical office . It's not a remote job. MS-SQL database
        expertise is required. The office hours are from 9 A.M. to 6 P.M., and
        lunch is complimentary.
      </div>
      <div className="mt-4">
        <Skills />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Rate disabled defaultValue={getRandomInt(1, 5)} />
        <div className="flex gap-4 items-center">
          <div className="text-sm">{getRandomInt(2, 24)} hours ago</div>
          <div className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-full cursor-pointer">
            <CiBookmark size={24} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectListing() {
  return (
    <div>
      <div className="border-b w-full p-4 flex justify-between items-center dark:border-gray-500 shadow-md">
        <div>
          <span className="font-semibold text-xl mr-3">Top result</span> 1-20 of
          186 results
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
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
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
