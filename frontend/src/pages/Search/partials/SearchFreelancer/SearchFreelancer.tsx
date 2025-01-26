import FreelancerFilter from "./partials/FreelancerFilter";
import FreelancerListing from "./partials/FreelancerListing";

export default function SearchFreelancer() {
  return (
    <div className="mx-container my-6 gap-6 grid grid-cols-12">
      <div className="col-span-3">
        <div className="sticky top-[80px]">
          <FreelancerFilter />
        </div>
      </div>
      <div className="col-span-9 rounded-md dark:bg-zinc-900 shadow-lg">
        <FreelancerListing />
      </div>
    </div>
  );
}
