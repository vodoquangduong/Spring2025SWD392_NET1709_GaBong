import { Button } from "antd";

export default function PlaceBid() {
  return (
    <div className="rounded-md mt-6 mb-10">
      <div className="w-full flex justify-between items-center dark:border-gray-500">
        <span className="font-semibold text-2xl mb-3">
          Place a bid on this project
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          You will be able to edit your bid until the project is awarded to
          someone.
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <label htmlFor="checkbox" className="my-1 font-bold">
              Bid Amount
            </label>
            <div className="input-style flex gap-2 py-2 mt-2">
              <div className="px-1">$</div>
              <input
                className="no-ring grow"
                type="number"
                name="checkbox"
                id="checkbox"
              />
              <div className="px-2">USD</div>
            </div>
          </div>
          <div className="col-span-5">
            <label htmlFor="checkbox" className="my-1 font-bold">
              This project will be delivered in
            </label>
            <div className="input-style flex gap-2 py-2 mt-2">
              <input
                className="no-ring grow"
                type="number"
                name="checkbox"
                id="checkbox"
              />
              <div className="px-2">Days</div>
            </div>
          </div>
        </div>
        <div>Paid to you: $200.00 - $20.00 fee = $180.00</div>
        <div>
          <div className="flex justify-between items-center">
            <div className="font-bold">
              Describe your proposal (minimum 100 characters)
            </div>
            <Button type="primary" className="py-4 font-bold">
              Place Bid
            </Button>
          </div>
          <textarea
            rows={4}
            className="input-style w-full p-2 mt-4 text-sm"
            placeholder="What makes you the best candidate for this project?"
          />
        </div>
      </div>
    </div>
  );
}
