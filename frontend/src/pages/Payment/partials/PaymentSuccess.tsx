import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Result
        status="success"
        title="Successfully Purchased!"
        subTitle="Your payment order has successfully been completed."
        extra={[
          <Button type="primary" key="console" onClick={() => navigate("/profile")}>
            Go back
          </Button>,
        ]}
      />
    </div>
  );
}
