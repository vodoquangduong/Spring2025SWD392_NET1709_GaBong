import { Pagination, Rate, Skeleton, Tag } from "antd";
import { CiBookmark } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { getRandomInt } from "../../../../../modules/random";
import { FaStar } from "react-icons/fa6";
import Skills from "../../../../../components/Skills";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { formatTimeAgo } from "@/modules/formatTimeAgo";
import useQueryParams from "@/hooks/useQueryParams";

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

const ListingItem = ({ project }: { project: ProjectDetail }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 border-b dark:border-gray-700 hover:bg-black/10 dark:hover:bg-neutral-950 cursor-pointer"
      onClick={() => navigate(`/projects/${project?.projectId}/details`)}
    >
      <div className="flex justify-between">
        <div className="text-xl">{project?.projectName}</div>
        <div className="flex gap-6">
          <div>{getRandomInt(1, 40)} bids</div>
          <div className="font-semibold">
            $ {getRandomInt(100, 10000).toLocaleString()} USD
            <div className="text-xs text-end">average bid</div>
          </div>
        </div>
      </div>
      <div className="text-sm">
        Budget: {project.estimateBudget.toLocaleString()} USD
      </div>
      <div className="mt-6">{project?.projectDescription}</div>
      <div className="mt-4">
        <Skills />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div></div>
        {/* <Rate disabled defaultValue={getRandomInt(1, 5)} /> */}
        <div className="flex gap-4 items-center">
          <div className="text-sm">{formatTimeAgo(project?.postDate)}</div>
          <div className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-full cursor-pointer">
            <CiBookmark size={24} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingItemSkeletion = () => {
  return (
    <div className="p-4 border-b dark:border-gray-700">
      <Skeleton.Input active style={{ width: "600px" }} />
      <div className="text-sm text-red-600 pt-8">
        <Skeleton active style={{ width: "100%" }} paragraph={{ rows: 3 }} />
      </div>
      <div className="pt-4 flex justify-between items-center">
        <Skeleton.Input active />
        {/* <Rate disabled defaultValue={getRandomInt(1, 5)} /> */}
        <div className="flex gap-4 items-center">
          <Skeleton.Input active />
        </div>
      </div>
    </div>
  );
};

export default function ProjectListing() {
  const { page } = useQueryParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["publicProjects", page],
    queryFn: async () =>
      await GET(
        `/api/Project/get-all-verified-project?pageNumber=${page || 1}`,
        false
      ),
  });
  console.log("🚀 ~ ProjectListing ~ value:", data);

  return (
    <div>
      <div className="border-b w-full p-4 flex justify-between items-center dark:border-gray-500 shadow-md">
        <div>
          <span className="font-semibold text-xl mr-3">Top result</span> 1-20 of
          {data?.value?.items?.length} results
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
        {data?.value?.items?.map((project: ProjectDetail) => (
          // project.status == ProjectStatus.OPEN &&
          <ListingItem key={project.projectId} project={project} />
        ))}
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <ListingItemSkeletion key={index} />
          ))}
      </div>
      <div className="p-4 flex justify-end">
        <Pagination
          showTotal={(total) => `Total ${total} items`}
          defaultCurrent={data?.value?.pageNumber}
          total={data?.value?.totalCount}
          onChange={(page) => {
            navigate(`/search/projects?page=${page}`);
          }}
        />
      </div>
    </div>
  );
}
