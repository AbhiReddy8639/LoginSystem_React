import { useState } from "react";
import { verifyEmail } from "./api";

export default function VerifyEmail() {
  const [token, setToken] = useState("");

  const submit = async () => {
    try {
      const res = await verifyEmail(token);
      alert(res);
    } catch {
      alert("❌ Verification Failed");
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>

      <input
        placeholder="Enter Verification Token"
        onChange={(e) => setToken(e.target.value)}
      />

      <button type="button" onClick={submit}>
        Verify Email
      </button>
    </div>
  );
}