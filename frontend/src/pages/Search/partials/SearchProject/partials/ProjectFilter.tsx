import { GET } from "@/modules/request";
import { useQueries } from "@tanstack/react-query";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { LuListFilter } from "react-icons/lu";
import countries from "@/mocks/countries.json";

export default function ProjectFilter({ query, setQuery }: any) {
  const [skills, setSkills] = useState<number[]>([]);

  useEffect(() => {
    console.log("🚀 ~ ProjectFilter ~ skills:", skills);
  }, []);

  const [skillCategories] = useQueries({
    queries: [
      {
        queryKey: ["skills"],
        queryFn: async () => await GET(`/api/SkillCategory`, false),
      },
    ],
  });

  const ClearFilter = ({ onClick }: any) => {
    return (
      <div
        className="text-blue-500 cursor-pointer font-semibold"
        onClick={onClick}
      >
        Clear
      </div>
    );
  };

  console.log("🚀 ~ ProjectFilter ~ query:", query);

  return (
    <form className="p-4 rounded-md dark:bg-zinc-900 shadow-xl pb-40">
      <div className="text-xl font-bold mb-8 flex gap-4 items-center">
        <LuListFilter />
        Filters
      </div>
      <div>
        <div className="flex justify-between font-bold my-4">
          Estimated Budget
          <ClearFilter
            onClick={() =>
              setQuery((prev: any) => ({
                ...prev,
                minBudget: Number.MIN_SAFE_INTEGER,
                maxBudget: Number.MAX_SAFE_INTEGER,
              }))
            }
          />
        </div>
        <div>
          <div className="">
            <label htmlFor="checkbox" className="">
              min
            </label>
            <div className="input-style flex gap-2 py-2 mt-2">
              <div className="px-1">USD</div>
              <input
                className="no-ring grow"
                type="number"
                value={query?.minBudget}
                onChange={(e) => {
                  setQuery((prev: any) => ({
                    ...prev,
                    minBudget: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="checkbox" className="">
              max
            </label>
            <div className="input-style flex gap-2 py-2 mt-2">
              <div className="px-1">USD</div>
              <input
                className="no-ring grow"
                type="number"
                value={query.maxBudget}
                onChange={(e) => {
                  setQuery((prev: any) => ({
                    ...prev,
                    maxBudget: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between font-bold mt-4 mb-0">
          Skills
          <ClearFilter
            onClick={() =>
              setQuery((prev: any) => ({
                ...prev,
                skillIds: [],
              }))
            }
          />
        </div>
        <Select
          className="!py-[9px]"
          maxCount={5}
          showSearch
          value={query?.skillIds}
          // suffixIcon={<span>{skills.length} / 5</span>}
          filterOption={(input, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          mode="multiple"
          style={{
            width: "100%",
          }}
          options={skillCategories?.data?.map((item: any) => ({
            value: item.skillId,
            label: item.skillName,
          }))}
          onChange={(skills: any) => {
            setQuery((prev: any) => ({ ...prev, skillIds: [...skills] }));
          }}
        />
      </div>
      <div>
        <div className="flex justify-between font-bold my-4">
          Project location
          <ClearFilter
            onClick={() =>
              setQuery((prev: any) => ({
                ...prev,
                location: "",
              }))
            }
          />
        </div>
        <select
          className="py-2 px-2 input-style"
          onChange={(e) =>
            setQuery((prev: any) => ({ ...prev, location: e.target.value }))
          }
          value={query?.location}
        >
          <option className="input-style" value={""}>
            Select a location
          </option>
          <option className="input-style" value={"Anywhere"}>
            Anywhere
          </option>
          {countries.map((item: string) => (
            <option className="input-style" key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
