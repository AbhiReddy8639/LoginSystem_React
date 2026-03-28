import { useState } from "react";
import { forgotPassword, verifyResetToken, resetPassword } from "./api";

export default function ForgotPassword({ onBack }) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /* ✅ STEP 1 → SEND OTP */
  const sendOtp = async () => {
    const res = await forgotPassword(email);
    alert(res);
    setStep(2);
  };

  /* ✅ STEP 2 → VERIFY OTP */
  const verifyOtp = async () => {
    const res = await verifyResetToken({ token: otp });

    if (res.toLowerCase().includes("valid")) {
      alert("✅ OTP Verified");
      setStep(3);
    } else {
      alert("❌ Invalid OTP");
    }
  };

  /* ✅ STEP 3 → RESET PASSWORD */
  const savePassword = async () => {
    const res = await resetPassword({
      token: otp,
      newPassword: newPassword,
    });

    alert(res);
    onBack();
  };

  return (
    <>
      {step === 1 && (
        <>
          <input
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={savePassword}>Save Password</button>
        </>
      )}

      <button onClick={onBack}>Back</button>
    </>
  );
}