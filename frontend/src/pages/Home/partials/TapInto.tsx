import { FaArrowRightLong } from "react-icons/fa6";
import Line from "./Line";

const items = [
  {
    a: "Post your job",
    b: "It's free and easy! Get lots of competitive bids that suit your budget in minutes. Start making your dreams reality.",
  },
  {
    a: "Choose freelancers",
    b: "No job is too big or complex. We've got freelancers for jobs of any size or budget, across 2700+ skills. Let our talent bring your ideas to life.",
  },
  {
    a: "Pay safely",
    b: "Only pay for work when you are 100% satisfied with the outcome. Our milestone payment system protects you every step of the way.",
  },
  {
    a: "We're here to help",
    b: "Your time is precious. Let our team of expert recruiters and co-pilots save you time finding talent, even managing your job if needed.",
  },
];

const Item = ({ item }: any) => {
  return (
    <div>
      <div className="text-3xl font-bold mb-4">{item.a}</div>
      <div className="text-base">{item.b}</div>
    </div>
  );
};

export default function TapInto() {
  return (
    <div className="mx-container flex gap-10 py-24">
      <Line />
      <div className="grow grid grid-cols-12 gap-8">
        <div className="col-span-6">
          <div className="font-bold text-5xl">
            <div className="text-emerald-600 mb-2">Tap into a</div>
            <div>global talent network</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-12">
            {items.map((item) => (
              <Item key={item.a} item={item} />
            ))}
          </div>
          <div className="font-bold mt-12">
            <div className="text-3xl">Make your dreams a reality.</div>
            <div className="text-2xl text-emerald-600 mt-2 flex gap-4 items-center">
              Get started now <FaArrowRightLong />
            </div>
          </div>
        </div>
        <div
          className="col-span-6 w-full bg-contain bg-no-repeat rounded-lg bg-center"
          style={{
            backgroundImage:
              "url(https://www.f-cdn.com/assets/main/en/assets/home/global-talent/global-talent-cards-ld.png)",
          }}
        ></div>
      </div>
    </div>
  );
}
