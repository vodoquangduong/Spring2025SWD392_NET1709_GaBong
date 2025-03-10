import { Result } from "antd";
import React from "react";

export default function NotifyGmailChecking() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Result
        status="success"
        title="Mail sent successfully!"
        subTitle="Please check your mail to verify your account."
      />
    </div>
  );
}
