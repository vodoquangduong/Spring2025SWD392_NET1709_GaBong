import { GET } from "@/modules/request";
import { useQueries } from "@tanstack/react-query";
import { Button, Select } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import countries from "@/mocks/countries.json";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  minBudget: z.coerce.number().min(0, "Min budget must be greater than 0"),
  maxBudget: z.coerce.number().min(0, "Max budget must be greater than 0"),
  // .refine((val: any, ctx: any) => {
  //   if (ctx.parent.minBudget && val <= ctx.parent.minBudget) {
  //     ctx.addIssue({
  //       code: "custom",
  //       message: "Max budget must be greater than min budget",
  //     });
  //   }
  //   return true;
  // }),
});

export default function ProjectFilter({ query, setQuery }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      minBudget: 0,
      maxBudget: 0,
    },
    mode: "onChange",
  });
  const [skills, setSkills] = useState<number[]>([]);
  const [skillCategories] = useQueries({
    queries: [
      {
        queryKey: ["skills"],
        queryFn: async () => await GET(`/api/SkillCategory`),
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
              <div className="px-1">$</div>
              <input
                className="no-ring grow"
                type="number"
                value={query?.minBudget < 0 ? "" : query?.minBudget}
                onChange={(e) => {
                  setQuery((prev: any) => ({
                    ...prev,
                    minBudget: e.target.value,
                  }));
                }}
              />
              <div className="px-2">USD</div>
            </div>
            {errors.minBudget && (
              <div className="text-red-500 text-xs">
                {errors?.minBudget?.message}
              </div>
            )}
          </div>
          <div className="mt-2">
            <label htmlFor="checkbox" className="">
              max
            </label>
            <div className="input-style flex gap-2 py-2 mt-2">
              <div className="px-1">$</div>
              <input
                className="no-ring grow"
                type="number"
                value={
                  query?.maxBudget < 0
                    ? ""
                    : query.maxBudget == Number.MAX_SAFE_INTEGER
                    ? ""
                    : query?.maxBudget
                }
                onChange={(e) => {
                  setQuery((prev: any) => ({
                    ...prev,
                    maxBudget: e.target.value,
                  }));
                }}
              />
              <div className="px-2">USD</div>
            </div>
            {errors.maxBudget && (
              <div className="text-red-500 text-xs">
                {errors.maxBudget.message}
              </div>
            )}
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
