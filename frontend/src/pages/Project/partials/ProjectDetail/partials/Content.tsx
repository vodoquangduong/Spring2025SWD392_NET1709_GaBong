import { FaClock, FaFlag } from "react-icons/fa6";
import { getRandomInt } from "../../../../../modules/random";
import Skills from "../../../../../components/Skills";
import { App, Button, Divider, Popconfirm, Skeleton } from "antd";
import CreateModal from "../../../../../components/CreateModal";
import CreateReportForm from "../forms/CreateReportForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET, PUT } from "@/modules/request";
import { useParams } from "react-router-dom";
import { ProjectDetail } from "@/types/project";
import PlaceBid from "../partials/PlaceBid";
import dayjs from "dayjs";

export default function Content() {
  const { id: projectId } = useParams();
  const { message } = App.useApp();
  const { data, isLoading } = useQuery<ProjectDetail>({
    queryKey: ["projectDetail", projectId],
    queryFn: async () => await GET(`/api/Project/${projectId}`),
  });
  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (freelancerId: string) =>
      await PUT(`/api/Project/${projectId}/makeContract`, {
        freelancerId,
      }),
    onError: () => {
      message.destroy();
      message.error("Choose freelancer failed");
    },
    onSuccess: () => {
      message.destroy();
      message.success("Choose freelancer successfully");
    },
  });

  if (isLoading) {
    return (
      <Skeleton active paragraph={{ rows: 20, className: "!space-y-6" }} />
    );
  }

  return (
    <>
      <div className="rounded-md dark:bg-white/5 p-6 w-full mb-6 shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl mr-3">Project Details</span>
          <span className="font-bold mr-3">
            Total Budget: ${data?.estimateBudget} USD
          </span>
        </div>
        <div>
          <div className="p-4 flex justify-end text-xs font-bold uppercase items-center gap-2">
            <FaClock />
            <span>
              {dayjs().isBefore(
                dayjs(data?.postDate!).add(
                  data?.availableTimeRange || 0,
                  "days"
                )
              )
                ? `Bidding ends in ${dayjs(data?.postDate!).format(
                    "MMM DD, YYYY"
                  )}`
                : "Bidding ended"}
            </span>
          </div>
        </div>
        <Divider />
        {/* <p className="text-base my-2 whitespace-pre-line">{descriptions}</p> */}
        <p className="text-base my-2 whitespace-pre-line tracking-wide">
          {data?.projectDescription}
        </p>
        <Divider />
        <div>
          <span className="font-semibold text-lg mr-3">Skills Required</span>
          <div className="mt-4">
            <Skills />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 mt-6 text-sm">
          <div className="">Project ID: 39030966</div>

          <CreateModal
            icon={<FaFlag />}
            children="Report Project"
            type="text"
            modalTitle={"Report this project"}
            form={(
              setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
            ) => <CreateReportForm setIsModalOpen={setIsModalOpen} />}
          />
        </div>
        <Divider />
      </div>
      <PlaceBid />
    </>
  );
}

const descriptions = `I'm urgently seeking an expert raw PHP developer for a 2-months project. The developer is required to work on upgrades to our existing reporting panel at our Nikaton, Dhaka, Bangladesh office. Freelancer have to work in our physical office . It's not a remote job. MS-SQL database expertise is required. The office hours are from 9 A.M. to 6 P.M., and lunch is complimentary.

The project involves:
- Implementing new features.
- Bug fixing.
- Performance optimization.

The new features to be added include:
- Customizable reports.

The level of customization for the reports includes:
- User-defined filters
- Customizable layouts
- Export options (PDF, Excel)

Ideal candidates should have:
- Extensive experience in raw PHP
- Proven track record in developing reporting panels
- Ability to work under pressure and meet deadlines
- Excellent problem-solving skills for bug fixing and performance optimization
- Experience in implementing new features in a timely manner
- Skills in developing customizable reports
- Familiarity with creating user-defined filters, customizable layouts, and export options

Freelancers who are able to start tomorrow are preferred.`;
