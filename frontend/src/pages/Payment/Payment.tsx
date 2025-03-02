import Back from "@/components/Back";
import Logo from "@/components/Logo";
import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { POST, PUT } from "@/modules/request";
import useAuthStore from "@/stores/authStore";

async function createOrder(amount: number) {
  const response = await fetch('/api/paypal/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });
  const data = await response.json();
  window.location.href = data.approvalUrl;
}
async function captureOrder(orderId: number, accountId: number, amount: number) {
  const response = await fetch('/api/paypal/capture-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, accountId, amount })
  });
  const data = await response.text();
  alert(data);
}

export default function Payment() {
  const [message, setMessage] = useState<string>("");

  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    "data-page-type": "payment",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };
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
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  className="hover:scale-105 py-4 flex items-center justify-center w-full h-0 mt-4"
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

                      console.log("Bắt đầu tạo transaction với số tiền: ", amount);
                      // Gửi yêu cầu tạo transaction lên backend
                      const transactionResponse = await POST("/api/Transaction", {
                        accountId: useAuthStore.getState().accountId,
                        amount: amount,
                        status: 0,
                        type: 0,
                      });
                      console.log("transactionResponse: ", transactionResponse.transactionId);
                      if (!transactionResponse?.transactionId) {
                        throw new Error("Không lấy được transactionId");
                      }

                      // Gọi API của backend để tạo order trên PayPal
                      const orderResponse = await POST("/api/PayPal/create-order", {
                        transactionId: transactionResponse.transactionId,
                      });
                      console.log("orderResponse: ", orderResponse);
                      if (!orderResponse?.id) {
                        throw new Error("Không lấy được orderID từ PayPal");
                      }
                      console.log("Order Response: ", orderResponse);
                      return orderResponse.id;
                    } catch (error) {
                      console.error("Lỗi tạo order PayPal:", error);
                      setMessage(`Không thể khởi tạo thanh toán PayPal: ${error}`);
                      throw error;
                    }
                  }}

                  //Tiep nhận phản hồi từ PayPal, gửi giao dịch lên backend
                  onApprove={async (data, actions) => {
                    try {
                      console.log("Thanh toán được chấp nhận, OrderID: ", data.orderID);
                      const orderID = data.orderID;

                      // Gọi PayPal để xác nhận thanh toán
                      const response = await POST(
                        "/api/PayPal/capture-order",
                        {
                          orderID: orderID,
                        }
                      );
                      console.log("Ket qua tra ve: ", response);
                      const orderData = response ?.data ?.[0];
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
                          // const completePaymentTransactionResponse =
                          //   await PUT(
                          //     "/api/PayPal/completePayment/" +
                          //     // transactionResponse.transactionId,
                          //     {}
                          //   );

                          // console.log(
                          //   "completePaymentTransactionResponse: ",
                          //   completePaymentTransactionResponse
                          // );
                          // console.log(
                          //   "completePaymentOrderResponse: ",
                          //   completePaymentOrderResponse
                          // );
                          // location.href = "/account/order-history";
                        }
                        console.log("Thanh cong");
                      }
                    } catch (error) {
                      console.error(error);
                      setMessage(
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
