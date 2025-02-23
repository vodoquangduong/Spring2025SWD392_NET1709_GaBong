import { Breadcrumb, Button, Tag } from "antd";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { useEffect } from "react";
import { getRandomInt } from "../../modules/random";
import { TabItem } from "../Search/Search";
import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi2";
import { MdPlace } from "react-icons/md";
import Sidebar from "./partials/Sidebar";
import Content from "./partials/Content";
import { FaRegHeart } from "react-icons/fa6";

const tabItems = [
  {
    name: "Details",
    path: "/projects/1/details",
  },
  {
    name: "Proposals",
    path: "/projects/1/proposals",
  },
];

export default function Freelancer() {
  const [id] = location.pathname.split("/").slice(2);
  const items = [
    {
      title: <Link to={`/search/freelancers`}>Freelancers</Link>,
    },
    {
      title: <Link to={`/freelancers/${id}`}>{id}</Link>,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="w-full">
        <div className="mx-container border-b dark:border-gray-500">
          <Breadcrumb
            className="pt-4 capitalize font-bold text-base"
            items={items}
          />
          <div>
            <div className="flex justify-between items-start my-8">
              <div className="text-3xl font-semibold flex gap-4 items-start">
                <div
                  className="h-20 aspect-square rounded-full bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: "url(https://picsum.photos/id/10/400/200)",
                  }}
                ></div>
                <div className="text-sm">
                  <div className="flex gap-2 items-center">
                    <div className="text-2xl leading-none">
                      Raja Ahmad Ayaz N.
                    </div>
                    <HiCheckCircle color="green" size={20} />
                  </div>
                  <div className="mt-2">
                    Full Stack Developer | 10+ Years of Experience
                  </div>
                  <div className="flex gap-2 items-center">
                    <MdPlace size={18} />
                    Talisay, Philippines – 10:18 pm local time
                    <Tag color="green" className="rounded-full !px-3 ml-2">
                      Open to work
                    </Tag>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-end">
                <div className="flex gap-3 items-center">
                  <span className="p-3 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full cursor-pointer">
                    <FaRegHeart size={24} strokeWidth={1} />
                  </span>
                  <span className="p-3 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full cursor-pointer">
                    <IoShareSocial size={24} strokeWidth={1} />
                  </span>
                </div>
                <div>
                  <Button type="primary" className="!py-5 !px-6 font-bold">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 mt-4"></div>
          </div>
        </div>
      </div>
      <div className="mx-container my-6 gap-8 grid grid-cols-12">
        <div className="col-span-3 border-r dark:border-gray-500">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <Content />
        </div>
      </div>
    </div>
  );
}
