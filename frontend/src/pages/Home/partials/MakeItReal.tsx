import { FaArrowRightLong } from "react-icons/fa6";
import Line from "./Line";

const items = [
  {
    a: "The best talent",
    b: "Discover reliable professionals by exploring their portfolios and immersing yourself in the feedback shared on their profiles.",
  },
  {
    a: "Fast bids",
    b: "Get quick, no-obligation quotes from skilled freelancers. 80% of jobs receive bids within 60 seconds. Your idea is just moments from reality.",
  },
  {
    a: "Quality work",
    b: "With Freelancer's talent pool of over 60 million professionals at your fingertips, you'll find quality talent to get what you need done.",
  },
  {
    a: "Be in control",
    b: "Stay in the loop while on the move. Chat with your freelancers and get real time updates with our mobile app. Anytime, anywhere.",
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

export default function MakeItReal() {
  return (
    <div className="mx-60 flex gap-10 py-24">
      <Line />
      <div className="grow grid grid-cols-12 gap-8">
        <div className="col-span-6">
          <div className="font-bold text-5xl">
            <div className="text-emerald-600 mb-2">Make it real</div>
            <div>with Freelancer</div>
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
          className="col-span-6 w-full bg-cover bg-no-repeat rounded-lg bg-center"
          style={{
            backgroundImage:
              "url(https://shreethemes.in/jobstack/layouts/assets/images/hero.jpg)",
          }}
        ></div>
      </div>
    </div>
  );
}
