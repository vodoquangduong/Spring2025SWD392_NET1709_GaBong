import { Empty, Pagination, Rate, Skeleton, Tag } from "antd";
import { CiBookmark, CiClock1, CiLock } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { getRandomInt } from "../../../../../modules/random";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import Skills from "../../../../../components/Skills";
import { useQueries, useQuery } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { formatTimeAgo } from "@/modules/formatTimeAgo";
import useQueryParams from "@/hooks/useQueryParams";
import dayjs from "dayjs";
import { getQueryString } from "@/modules/getQueryString";
import { FaClock } from "react-icons/fa";

export default function ProjectListing({ query }: { query: any }) {
  const navigate = useNavigate();
  const [skillCategory] = useQueries({
    queries: [
      {
        queryKey: ["skills", query],
        queryFn: async () => await GET(`/api/SkillCategory`),
      },
    ],
  });

  const [projects] = useQueries({
    queries: [
      {
        queryKey: ["publicProjects", query],
        queryFn: async () =>
          await GET(`/api/Project/verified?${getQueryString(query)}`, false),
      },
    ],
  });

  return (
    <div className="">
      <div className="border-b w-full p-4 flex justify-between items-center dark:border-gray-500 shadow-md">
        <div className="flex items-center">
          <span className="font-semibold text-lg mr-3 ">Top result:</span>
          {!projects.isLoading && projects?.data?.value?.items?.length >= 0 ? (
            `${projects?.data?.value?.items?.length} result`
          ) : (
            <Skeleton.Input active />
          )}
        </div>
        <div className="flex gap-1 items-center">
          {/* <label htmlFor="" className="w-[100px]">
            Sort by
          </label>
          <select className="input-style py-2">
            <option value="">Newest</option>
            <option value="">Oldest</option>
            <option value="">Highest rate</option>
            <option value="">Lowest rate</option>
          </select> */}
        </div>
      </div>
      <div>
        {projects?.data?.value?.items?.map((project: ProjectDetail) => (
          // project.status == ProjectStatus.OPEN &&
          <ListingItem
            key={project.projectId}
            project={project}
            skillCategory={skillCategory?.data}
          />
        ))}
        {projects.isLoading &&
          [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10].map((item, index) => (
            <ListingItemSkeletion key={index} />
          ))}
        {!projects.isLoading && projects?.data?.value?.items?.length == 0 ? (
          <Empty
            className="mt-48"
            description="No projects found"
            // image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <div className="p-4 flex justify-end">
            <Pagination
              showTotal={(total) => `Total ${total} items`}
              defaultCurrent={projects?.data?.value?.pageNumber}
              total={projects?.data?.value?.totalCount}
              onChange={(page) => {
                navigate(`/search/projects?page=${page}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const ListingItem = ({
  project,
  skillCategory,
}: {
  project: any;
  skillCategory: any;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 border-b dark:border-gray-700 hover:bg-black/10 dark:hover:bg-neutral-950 cursor-pointer transition-all"
      onClick={() => navigate(`/projects/${project?.projectId}/details`)}
    >
      <div className="flex justify-between">
        <div className="text-xl line-clamp-2">{project?.projectName}</div>
        <div className="flex gap-6">
          <div>
            {project?.bids?.length} {project?.bids?.length > 1 ? "bids" : "bid"}
          </div>
          <div className="font-semibold">
            {project?.bids?.length
              ? (
                  project?.bids?.reduce((a: any, b: any) => a + b.bidOffer, 0) /
                  project?.bids?.length
                ).toLocaleString()
              : 0}{" "}
            USD
            <div className="text-xs text-end">average bid</div>
          </div>
        </div>
      </div>
      <div className="text-sm chivo">
        Estimate Budget:{" "}
        <span className="ml-2 font-semibold text-xl">
          {project.estimateBudget.toLocaleString()} USD
        </span>
      </div>
      <div className="mt-6 line-clamp-3">{project?.projectDescription}</div>
      <div className="mt-4">
        <Skills
          items={skillCategory?.filter((skill: any) => {
            return project?.skillIds.includes(skill.skillId);
          })}
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className={"py-2 flex gap-2 items-center geist"}>
          <FaLocationDot className="text-emerald-500" />
          {project?.location}
        </div>
        {/* <Rate disabled defaultValue={getRandomInt(1, 5)} /> */}
        <div className="flex gap-4 items-center">
          <div className="text-sm flex gap-3 items-center">
            <FaClock size={14} />
            Posted{" "}
            {formatTimeAgo(
              dayjs(project?.postDate, "DD-MM-YYYY").toISOString()
            )}
          </div>
          {/* <div className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-full cursor-pointer">
            <CiBookmark size={24} strokeWidth={1} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export const ListingItemSkeletion = () => {
  return (
    <div className="p-4 border-b dark:border-gray-700">
      <Skeleton.Input active style={{ width: "600px" }} />
      <div className="text-sm pt-8">
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
