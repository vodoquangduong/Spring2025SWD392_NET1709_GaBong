import Back from "@/components/Back";
import Logo from "@/components/Logo";
import { App, Button, Skeleton } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { GET, POST, PUT } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueries } from "@tanstack/react-query";
import PaymentSuccess from "./partials/PaymentSuccess";

async function createOrder(amount: number) {
  const response = await fetch("/api/paypal/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const data = await response.json();
  window.location.href = data.approvalUrl;
}
async function captureOrder(
  orderId: number,
  accountId: number,
  amount: number
) {
  const response = await fetch("/api/paypal/capture-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, accountId, amount }),
  });
  const data = await response.text();
  alert(data);
}

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

export default function Payment() {
  const { message } = App.useApp();
  const [agree, setAgree] = useState(false);
  const { accountId, name } = useAuthStore();

  const [profileDetail] = useQueries({
    queries: [
      {
        queryKey: ["profile"],
        queryFn: async () => GET(`/api/Account/${accountId}`),
      },
    ],
  });

  let transactionId = 0;

  const {
    watch,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: "",
    },
    resolver: zodResolver(schema),
  });

  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    "data-page-type": "payment",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const amount = watch("amount");

  return (
    <div className="h-screen w-screen flex justify-center">
      <Back />
      <div className="grid grid-cols-3 text-lg">
        <div></div>
        <div className="mt-36 col-span-1">
          {/* <div className="flex justify-end py-4">
            <Logo />
          </div> */}
          <div className="geist">
            <div className="font-semibold text-3xl ">Complete your payment</div>
            <div className="text-base">Review your order and pay.</div>
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
                <div className="min-w-28 ">Amount</div>
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
                  {errors.amount && (
                    <div className="error-msg">{errors.amount.message}</div>
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
                      (
                        profileDetail?.data?.value?.totalCredit -
                        profileDetail?.data?.value?.lockCredit
                      ).toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex justify-between border-t pt-4">
                <div className="mb-2">Balance after payment</div>
                <div className="font-bold text-4xl chivo flex items-center gap-2">
                  <div>
                    $
                    {profileDetail.isLoading ? (
                      <Skeleton.Input className="mx-1" active />
                    ) : (
                      (
                        profileDetail?.data?.value?.totalCredit -
                        profileDetail?.data?.value?.lockCredit +
                        Number(amount)
                      ).toLocaleString()
                    )}
                  </div>
                  <span className="text-zinc-500 text-sm">USD</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  onChange={() => setAgree((prev) => !prev)}
                />
                <label htmlFor="agree" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  className={`transition-all hover:scale-105 py-4 flex items-center justify-center w-full h-0 mt-4 ${
                    agree ? "" : "hidden"
                  }`}
                  style={{
                    shape: "rect",
                    layout: "horizontal",
                    color: "white",
                    label: "paypal",
                    disableMaxWidth: true,
                    tagline: false,
                  }}
                  //Tạo Tạo transaction, gửi giao dịch lên PayPal
                  createOrder={async (): Promise<string> => {
                    try {
                      console.log(
                        "Bắt đầu tạo transaction với số tiền: ",
                        amount
                      );
                      // Gửi yêu cầu tạo transaction lên backend
                      const transactionResponse = await POST(
                        "/api/Transaction",
                        {
                          accountId: useAuthStore.getState().accountId,
                          amount: amount,
                          status: 0,
                          type: 0,
                        }
                      );
                      console.log(
                        "transactionResponse: ",
                        transactionResponse.transactionId
                      );
                      if (!transactionResponse?.transactionId) {
                        throw new Error("Không lấy được transactionId");
                      }
                      transactionId = transactionResponse.transactionId;

                      // Gọi API của backend để tạo order trên PayPal
                      const orderResponse = await POST(
                        "/api/PayPal/create-order",
                        {
                          transactionId: transactionResponse.transactionId,
                        }
                      );
                      console.log("orderResponse: ", orderResponse);
                      if (!orderResponse?.id) {
                        throw new Error("Không lấy được orderID từ PayPal");
                      }
                      console.log("Order Response: ", orderResponse);
                      return orderResponse.id;
                    } catch (error) {
                      message.error(
                        `Sorry, your transaction could not be processed...`
                      );
                      throw error;
                    }
                  }}
                  //Tiep nhận phản hồi từ PayPal, gửi giao dịch lên backend
                  onApprove={async (data, actions) => {
                    try {
                      console.log(
                        "Thanh toán được chấp nhận, OrderID: ",
                        data.orderID
                      );
                      const orderID = data.orderID;

                      // Gọi PayPal để xác nhận thanh toán
                      const response = await POST("/api/PayPal/capture-order", {
                        orderID: orderID,
                      });
                      console.log("Ket qua tra ve: ", response);
                      const orderData = response?.data?.[0];
                      console.log("orderData: ", orderData);

                      // Three cases to handle:
                      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                      //   (2) Other non-recoverable errors -> Show a failure message
                      //   (3) Successful transaction -> Show confirmation or thank you message

                      const errorDetail = orderData?.details?.[0];

                      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                        return actions.restart();
                      } else if (errorDetail) {
                        // (2) Other non-recoverable errors -> Show a failure message
                        throw new Error(
                          `${errorDetail.description} (${orderData.debug_id})`
                        );
                      } else {
                        // (3) Successful transaction -> Show confirmation or thank you message
                        // Or go to another URL:  actions.redirect('thank_you.html');
                        if (response?.status == "COMPLETED") {
                          console.log("Ahihi");
                          const completePaymentTransactionResponse = await PUT(
                            "/api/PayPal/completePayment/" + transactionId,
                            {}
                          );

                          // console.log(
                          //   "completePaymentTransactionResponse: ",
                          //   completePaymentTransactionResponse
                          // );
                          // console.log(
                          //   "completePaymentOrderResponse: ",
                          //   completePaymentOrderResponse
                          // );

                          location.href = "/payment-success";
                        }
                        console.log("Thanh cong");
                      }
                    } catch (error) {
                      console.error(error);
                      message.error(
                        `Sorry, your transaction could not be processed...${error}`
                      );
                    }
                  }}
                />
              </PayPalScriptProvider>
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
