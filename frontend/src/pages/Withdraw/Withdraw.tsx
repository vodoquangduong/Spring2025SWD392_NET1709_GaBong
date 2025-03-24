import Back from "@/components/Back";
import Logo from "@/components/Logo";
import { App, Button, Skeleton } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { GET, POST, PUT } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueries } from "@tanstack/react-query";
import PaymentSuccess from "./partials/PaymentSuccess";
import { AccountDetail } from "@/types/account";
import { ResultServerResponse } from "@/types/serverResponse";
import { TransactionStatus, TransactionType } from "@/types/transaction";

const schema = z.object({
  amount: z.coerce
    .number()
    .min(10, "Minimum amount is $10")
    .max(1000000, "Maximum amount is $1,000,000")
    .refine(
      (val) => {
        const strVal = String(val);
        return val === 0 || !strVal.startsWith("0");
      },
      {
        message: "Number cannot have leading zeros",
      }
    ),
});

export default function Withdraw() {
  const navigate = useNavigate();
  let transactionId = 0;
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { amount: "" },
    resolver: zodResolver(schema),
  });
  const { message } = App.useApp();
  const [agree, setAgree] = useState(false);
  const { accountId, name } = useAuthStore();
  const amount = watch("amount");

  const [profileDetail] = useQueries({
    queries: [
      {
        queryKey: ["profile"],
        queryFn: async (): Promise<ResultServerResponse<AccountDetail>> =>
          GET(`/api/Account/${accountId}`),
      },
    ],
  });

  const getCurrentBalance = () => {
    return profileDetail?.data
      ? profileDetail?.data?.value?.totalCredit -
          profileDetail?.data?.value?.lockCredit
      : 0;
  };

  const createWithdrawRequest = async () => {
    const accountData = await GET(`/api/Account/${accountId}`);
    console.log("accountData: ", accountData);
    if (
      accountData?.value?.totalCredit - accountData?.value?.lockCredit >
      Number(amount)
    ) {
      const response = await POST("/api/Transaction", {
        accountId: accountId,
        amount: Number(amount),
        type: TransactionType.WITHDRAWAL,
        status: TransactionStatus.PENDING,
      });
      message.error("Withdraw request sent successfully");
      navigate("/manage/transaction-history");
      console.log("response: ", response);
    } else {
      message.error("You don't have enough balance");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center">
      <Back />
      <div className="grid grid-cols-3 text-lg">
        <div></div>
        <div className="mt-36 col-span-1">
          <div className="geist">
            <div className="font-semibold text-3xl mb-3">
              Withdraw your balance
            </div>
            <div className="text-base">Review your request and send.</div>
          </div>
          <div className="mt-4 flex justify-between gap-y-4">
            <div>
              <div className="font-semibold">User Information</div>
              <div>{name}</div>
            </div>
            <div>
              <div className="font-semibold">Transaction date</div>
              <div>{dayjs().format("MMMM DD, YYYY")}</div>
            </div>
          </div>
          <div className="rounded-2xl py-4">
            <div className="space-y-8">
              <div className="flex items-center justify-between gap-10">
                <div className="min-w-28">Withdraw Amount</div>
                <div>
                  <input
                    {...register("amount")}
                    className="input-style no-ring py-2"
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      // Remove leading zeros and convert to number, falling back to empty string if empty
                      const cleanedValue = value.replace(/^0+(?!$)/, "") || "";
                      setValue("amount", cleanedValue, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  {getCurrentBalance() < Number(amount) && (
                    <div className="error-msg">
                      You don't have enough balance
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">Total amount</div>
                <div className="font-bold text-xl chivo flex items-center gap-2">
                  <div>${Number(amount)?.toLocaleString() || 0}</div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">Current balance</div>
                <div className="font-bold text-xl chivo flex items-center gap-2">
                  <div>
                    $
                    {profileDetail.isLoading ? (
                      <Skeleton.Input className="mx-1" active />
                    ) : (
                      getCurrentBalance().toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between border-t pt-4">
                <div className="mb-2">Balance after withdraw</div>
                <div className="font-bold text-3xl chivo flex items-center gap-2">
                  <div>
                    $
                    {profileDetail.isLoading ? (
                      <Skeleton.Input className="mx-1" active />
                    ) : (
                      (getCurrentBalance() > Number(amount)
                        ? getCurrentBalance() - Number(amount)
                        : 0
                      ).toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  disabled={Number(amount) == 0}
                  type="checkbox"
                  id="agree"
                  onChange={() => setAgree((prev) => !prev)}
                />
                <label htmlFor="agree" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
              <Button
                className={`text-lg font-bold transition-all hover:scale-105 py-6 flex items-center justify-center w-full h-0 mt-4 ${
                  agree ? "" : "hidden"
                }`}
                type="primary"
                onClick={() => createWithdrawRequest()}
              >
                Request Withdraw
              </Button>
              <div className="text-sm pt-2">
                You agree to authorize the use of your card for this deposit and
                future payments, and agree to be bound to the{" "}
                <Link to={"/policy"} className="font-semibold text-emerald-500">
                  Terms & Conditions
                </Link>
              </div>
              <div className="flex justify-between">
                <Logo />
                <CardImages />
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
    <div className="flex gap-2 pt-2 pb-4">
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
