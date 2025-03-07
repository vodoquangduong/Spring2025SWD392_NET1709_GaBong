import { LoadingOutlined } from "@ant-design/icons";
import { App, Spin } from "antd";
import { useEffect } from "react";
import { POST } from "@/modules/request";
import { getCookie, setCookie } from "@/modules/cookie";

export default function VerifyGmail() {
  const { message } = App.useApp();
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.searchParams);
  useEffect(() => {
    (async () => {
      //   if (getCookie("accessToken") != "") {
      //     location.href = "/account";
      //     return;
      //   }
      try {
        setCookie("accessToken", params.get("token") || "", 7);
        const data = await POST("/api/Authentication/verify-gmail", {}, false);
        // console.log(params.get("token"));
        if (data?.token) {
          // console.log(data.token);
          setCookie("accessToken", data?.token, 7);
          location.href = "/profile/edit";
        } else {
          location.href = "/";
        }
      } catch (error) {
        message.error("Something went wrong, please try again later");
        location.href = "/";
      }
    })();
  }, []);
  return (
    <div className="h-screen w-full -translate-y-20 flex flex-col justify-center items-center">
      <Spin
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
      />
      <div className="mt-10 text-emerald-600 font-semibold text-xl">
        We are in processing your account
      </div>
    </div>
  );
}
