import ProjectFilter from "./partials/ProjectFilter";
import ProjectListing from "./partials/ProjectListing";

export default function SearchProject() {
  return (
    <div className="mx-container my-6 gap-6 grid grid-cols-12">
      <div className="col-span-3">
        <div className="sticky top-[80px]">
          <ProjectFilter />
        </div>
      </div>
      <div className="col-span-9 rounded-md dark:bg-zinc-900 shadow-lg">
        <ProjectListing />
      </div>
    </div>
  );
}
