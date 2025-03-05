import { useState } from "react";
import ProjectFilter from "./partials/ProjectFilter";
import ProjectListing from "./partials/ProjectListing";
import SearchBox from "@/components/SearchBox";
import { Button } from "antd";

export default function SearchProject() {
  const [query, setQuery] = useState<any>({});
  return (
    <div>
      <div
        className="relative w-full text-secondary dark:text-primary pb-6 h-[240px] flex items-center"
        // style={{
        //   backgroundImage: "url(/bg.jpg)",
        // }}
      >
        <div className="absolute bg-black top-0 left-0 w-full pb-6 h-full flex items-center z-10"></div>
        <div className="mx-container space-y-4 z-10">
          <div className="text-3xl font-bold">Browse</div>
          <div className="">
            <SearchBox
              placeholder="Search Projects ..."
              widthClass="w-full py-2"
              className="!bg-gray-100 py-2 dark:!bg-zinc-800"
              value={query?.keyword}
              onChange={(e) => {
                setQuery((prev: any) => ({ ...prev, keyword: e.target.value }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="mx-container my-6 gap-6 grid grid-cols-12">
        <div className="col-span-3">
          <div className="sticky top-[80px]">
            <ProjectFilter query={query} setQuery={setQuery} />
          </div>
        </div>
        <div className="col-span-9 rounded-md dark:bg-zinc-900 shadow-lg">
          <ProjectListing query={query} />
        </div>
      </div>
    </div>
  );
}
