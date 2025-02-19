import { FaArrowRightLong } from "react-icons/fa6";
import Line from "./Line";

const items = [
  "Website Design",
  "Mobile Apps",
  "Android Apps",
  "iPhone Apps",
  "Software Architecture",
  "Graphic Design",
  "Logo Design",
  "Public Relations",
  "Logistics",
  "Proofreading",
  "Translation",
  "Research",
  "Research Writing",
  "Article Writing",
  "Web Scraping",
  "HTML",
  "CSS",
  "HTML 5",
  "Javascript",
  "Data Processing",
  "Python",
  "Wordpress",
  "Web Search",
  "Finance",
  "Legal",
  "Linux",
  "Manufacturing",
  "Data Entry",
  "Content Writing",
  "Marketing",
  "Excel",
  "Ghostwriting",
  "Copywriting",
  "Accounting",
  "MySQL",
  "C++ Programming",
  "Banner Design",
  "Illustration",
  "Link Building",
  "C# Programming",
  "PHP",
  "3D Modelling",
  "Photoshop",
  "Technical Writing",
  "Blogging",
  "Internet Marketing",
  "eCommerce",
];

export default function Category() {
  return (
    <div className="mx-container flex gap-10 py-24">
      <Line />
      <div className="grow grid grid-cols-3 gap-6">
        <div className="">
          <div className="font-bold text-5xl flex gap-4 flex-col">
            <div>Get work done in</div>
            <div>
              <span className="text-emerald-600 ">over 2700</span> different
            </div>
            <div>categories</div>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-4 pl-8 gap-y-6 text-lg font-semibold">
          {items.map((item) => (
            <a href="#" key={item}>
              {item}
            </a>
          ))}
          <div className="text-emerald-600 flex gap-4 items-center">
            View more <FaArrowRightLong />
          </div>
        </div>
      </div>
    </div>
  );
}
