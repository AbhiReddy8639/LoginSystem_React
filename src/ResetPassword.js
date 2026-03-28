import { useState } from "react";
import { resetPassword } from "./api";

export default function ResetPassword({ onBack }) {
  const [form, setForm] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  const submit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword({
        token: form.token,
        newPassword: form.newPassword,
      });

      alert(res);

      if (res.toLowerCase().includes("success")) {
        onBack();
      }

    } catch {
      alert("❌ Reset Failed");
    }
  };

  return (
    <>
      <h3>Reset Password</h3>

      <input placeholder="Token"
        onChange={(e) => setForm({ ...form, token: e.target.value })} />

      <input type="password" placeholder="New Password"
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />

      <input type="password" placeholder="Confirm Password"
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />

      <button type="button" onClick={submit}>Reset Password</button>
      <button type="button" onClick={onBack}>Back</button>
    </>
  );
}