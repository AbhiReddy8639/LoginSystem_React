const API = "https://localhost:7097/api/Auth";   // ⭐ MUST MATCH SWAGGER PORT

/* ================= REGISTER ================= */
export const registerUser = async (data) => {
  console.log("SENDING DATA:", data);   // debug

  const res = await fetch(`${API}/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  console.log("REGISTER RESPONSE:", text);  // debug
  return text;
};
/* ================= LOGIN ================= */
export const loginUser = async (data) => {
  const res = await fetch(`${API}/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("LOGIN RESPONSE:", text);

  return text;
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (email) => {
  const res = await fetch(`${API}/ForgotPassword?email=${email}`, {
    method: "POST",
  });

  const text = await res.text();
  console.log("FORGOT RESPONSE:", text);

  return text;
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (data) => {
  const res = await fetch(`${API}/ResetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("RESET RESPONSE:", text);

  return text;
};

/* ================= GET ALL USERS ================= */
export const getAllUsers = async () => {
  const res = await fetch(`${API}/GetAllUsers`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  console.log("USERS RESPONSE:", data);

  return data;
};

/* ================= DELETE USER ================= */
export const deleteUser = async (id) => {
  const res = await fetch(`${API}/DeleteUser?id=${id}`, {
    method: "DELETE",
  });

  const text = await res.text();
  console.log("DELETE RESPONSE:", text);

  return text;
};

/* ================= UPDATE USER ================= */
export const updateUser = async (userId, data) => {
  const res = await fetch(`${API}/UpdateUser?userId=${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("UPDATE RESPONSE:", text);

  return text;
};
/* ================= VERIFY RESET TOKEN (OTP) ================= */
export const verifyResetToken = async (data) => {
  const res = await fetch(`${API}/VerifyResetToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("VERIFY TOKEN RESPONSE:", text);

  return text;
};