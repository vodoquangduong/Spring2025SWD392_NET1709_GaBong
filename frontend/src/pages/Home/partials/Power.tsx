import { FaArrowRightLong } from "react-icons/fa6";
import Line from "./Line";

const items = [
  {
    a: "Freelancer Enterprise",
    b: "Company budget? Get more done for less. Use our workforce of millions to help your business achieve more.",
  },
  {
    a: "Freelancer Community",
    b: "Millions of professionals on demand. Why hire people when you can simply integrate our talented cloud workforce instead?",
  },
];

const Item = ({ item }: any) => {
  return (
    <div>
      <div className="text-3xl font-bold mb-4">{item.a}</div>
      <div className="text-xl">{item.b}</div>
      <div className="text-lg text-emerald-600 mt-2 flex gap-4 items-center font-bold">
        Get started now <FaArrowRightLong />
      </div>
    </div>
  );
};

export default function Power() {
  return (
    <div className="mx-container flex gap-10 py-24">
      <Line />
      <div className="grow grid grid-cols-12 gap-16">
        <div className="col-span-6">
          <div className="font-bold text-5xl">
            <div>Power your organisation's</div>
            <div className="text-emerald-600 mb-2">competitive advantage</div>
          </div>
          <div className="grid grid-cols-1 gap-12 mt-12">
            {items.map((item) => (
              <Item key={item.a} item={item} />
            ))}
          </div>
        </div>
        <div
          className="col-span-6 w-full bg-cover bg-no-repeat rounded-lg bg-right"
          style={{
            backgroundImage:
              "url(https://www.f-cdn.com/assets/main/en/assets/hire/hero/2560x1440/hero-01.jpg)",
          }}
        ></div>
      </div>
    </div>
  );
}
