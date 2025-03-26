import { useState } from "react";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";
import ResetStep from "./ResetStep";
import SendSuccessStep from "./SendSuccessStep";

const ForgotPasswordForm = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="w-full max-w-md">
      <div className="relative z-0 flex flex-col break-words border-0">
        {step === 1 && <EmailStep onNext={() => setStep(2)} />}
        {step === 2 && (
          <SendSuccessStep
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
