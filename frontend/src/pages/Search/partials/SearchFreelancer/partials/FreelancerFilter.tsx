import { IoSearch } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";

const ClearFilter = () => {
  return (
    <div className="text-blue-500 cursor-pointer font-semibold">Clear</div>
  );
};

export default function FreelancerFilter() {
  return (
    <div className="p-4 rounded-md dark:bg-zinc-900 shadow-xl pb-56">
      <div className="text-xl font-bold mb-8 flex gap-4 items-center">
        <LuListFilter />
        Filters
      </div>
      <div>
        <div className="flex justify-between font-bold my-4">
          Skills
          <ClearFilter />
        </div>
        <div>
          <div className="">
            <div className="input-style flex gap-2 py-2 items-center">
              <IoSearch size={18} />
              <input
                className="ml-1 no-ring grow dark:bg-secondary-foreground"
                type="text"
                name="checkbox"
                id="checkbox"
                placeholder="Search skills"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between font-bold my-4">
          Freelancer's country
          <ClearFilter />
        </div>
        <div>
          <div className="">
            <div className="input-style flex gap-2 py-2 items-center">
              <IoSearch size={18} />
              <input
                className="ml-1 no-ring grow"
                type="text"
                name="checkbox"
                id="checkbox"
                placeholder="Search countries"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between font-bold my-4">
          Languages
          <ClearFilter />
        </div>
        <div>
          <div className="">
            <div className="input-style flex gap-2 py-2 items-center">
              <IoSearch size={18} />
              <input
                className="ml-1 no-ring grow"
                type="text"
                name="checkbox"
                id="checkbox"
                placeholder="Search languages"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
