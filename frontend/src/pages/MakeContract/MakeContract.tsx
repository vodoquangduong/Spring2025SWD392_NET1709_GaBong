import Back from "@/components/Back";
import Logo from "@/components/Logo";
import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MakeContract() {
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-screen w-screen mx-container flex justify-center">
      <Back />
      <div className="w-2/3">
        <div className="flex justify-end py-4">
          <Logo />
        </div>
        <div className=" grid grid-cols-2 gap-10 text-lg">
          <div>
            <div className="rounded-2xl bg-zinc-200 dark:bg-white/10">
              <div className="font-bold justify-between p-4 border-b border-zinc-400 dark:border-zinc-600">
                <div>Enter your card information</div>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-12 gap-x-2 gap-y-4 text-base ">
                  <div className="col-span-8">
                    <div>Card number:</div>
                    <input
                      className="mt-1 h-10 input-style no-ring"
                      type="number"
                    />
                  </div>
                  <div className="col-span-4">
                    <div>Expiry date:</div>
                    <input
                      className="mt-1 h-10 input-style no-ring"
                      type="date"
                    />
                  </div>
                  <div className="col-span-8">
                    <div>Cardholder name:</div>
                    <input
                      className="mt-1 h-10 input-style no-ring"
                      type="number"
                    />
                  </div>
                  <div className="col-span-4">
                    <div>CVC/CVV:</div>
                    <input
                      className="mt-1 h-10 input-style no-ring"
                      type="number"
                    />
                  </div>
                </div>
                <CardImages />
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-zinc-200 dark:bg-white/10">
            <div className="font-bold flex justify-between p-4 border-b border-zinc-400 dark:border-zinc-600">
              <div>Select amount</div>
              <div>USD</div>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between gap-10">
                <div className="min-w-28 ">Amount</div>
                <div className="sm-input-style flex gap-2 py-2 mt-2">
                  <div className="px-1">$</div>
                  <input
                    className="no-ring grow"
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAmount(parseInt(e.target.value, 10))
                    }
                  />
                  <div className="px-2">USD</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">Total due</div>
                <div>{amount} USD</div>
              </div>
              <div className="flex justify-between border-b pb-4 border-zinc-400 dark:border-zinc-600">
                <div className="">Processing fee</div>
                <div>{Math.floor(amount * 0.1)} USD</div>
              </div>
              <div className="flex justify-between">
                <div className="">Payment due</div>
                <div>{Math.floor(amount * 1.1)} USD</div>
              </div>
              <Button
                type="primary"
                className="my-4 py-8 w-full text-xl font-semibold"
              >
                Confirm and pay {Math.floor(amount * 1.1)} USD
              </Button>
              <div className="text-sm py-2">
                You agree to authorize the use of your card for this deposit and
                future payments, and agree to be bound to the{" "}
                <Link to={"/policy"} className="font-semibold text-emerald-500">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CardImages = () => {
  return (
    <div className="flex gap-2 pt-6 pb-4">
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/visa.svg"
      />
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/mastercard.svg"
      />
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/amex.svg"
      />
      <img
        className="w-14"
        src="https://www.f-cdn.com/assets/main/en/assets/payments/cc/jcb.svg"
      />
    </div>
  );
};
