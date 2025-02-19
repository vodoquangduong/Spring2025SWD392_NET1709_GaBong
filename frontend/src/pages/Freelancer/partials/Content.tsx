import { Pagination, Rate, Timeline } from "antd";
import Skills from "../../../components/Skills";
import { FaStar } from "react-icons/fa6";
import { getRandomInt } from "../../../modules/random";

export default function Content() {
  return (
    <div>
      <div>
        <div>
          <div className="text-2xl font-bold mb-8">Description</div>
          <p className="text-base my-2 whitespace-pre-line tracking-wide">
            {description}
          </p>
        </div>
        <div>
          <div className="text-2xl font-bold mt-12 mb-8">Reviews</div>
          <div>
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mt-12 mb-8">Experiences</div>
          <div>
            <Timeline
              items={[
                {
                  children: <ExperienceItem />,
                },
                {
                  children: <ExperienceItem />,
                },
                {
                  children: <ExperienceItem />,
                },
                {
                  children: <ExperienceItem />,
                },
                {
                  children: <ExperienceItem />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ReviewItem = () => {
  return (
    <div className="py-6 border-b dark:border-gray-700">
      <div className="text-xl font-semibold">
        Redesign for Be Happy in LIFE site
      </div>
      <div className="text-sm pt-2 pb-4">Jul 23, 2024 - Aug 2, 2024</div>
      <div>
        Christian is an experienced tax accountant. His workpapers are stellar.
        He communicates well and strives to complete tasks on time. He learned
        our systems quickly and we really enjoyed working with him. We were sad
        to learn he was unavailable for more work with us
      </div>
      <div className="flex items-center justify-between mt-4">
        <Rate
          defaultValue={getRandomInt(1, 5)}
          disabled
          character={<FaStar size={16} />}
        />
        <div className="flex gap-4 items-center text-xs"></div>
      </div>
    </div>
  );
};

const ExperienceItem = () => {
  return (
    <>
      <div className="text-2xl font-semibold">
        Financial Planning & Analysis Accountant | Almarai Company
      </div>
      <div className="my-2">March 2013 - February 2016</div>
      <div className="text-base pb-8">
        Responsible for the production of weekly Flash Financial Statements,
        monthly Rolling Forecasts, annual Budget and Five Year Plan of the
        company. Manages profitability of company's subsidiaries thru transfer
        pricing. Lead major systems implementation, i.e., SAP BPC 7.5, SAP BPC
        10.0 and SAP S&OP.
      </div>
    </>
  );
};

const description = `TAFSOL TECHNOLOGIES Group!!

Aiming to deliver $10M+ Projects in 2024-2025

32nd profound member of the OpenJS Foundation among other tech giants including Google, Microsoft, IBM, Uber and Coinbase, etc.

Actively contributing to Official WordPress, the platform behind millions of websites.

"Honoured WWF Corporate Member, Because saving the world is just a side gig!"

TAFSOL Technologies is an Award-Winning Digital Agency Recognized by Clutch.co and Manifest as:

1. TOP B2B (Business-to-Business) SERVICES by Clutch.co in the Mobile App Development category.
2. MOST REVIEWED COMPANIES by The Manifest in the Software Development category.`;
