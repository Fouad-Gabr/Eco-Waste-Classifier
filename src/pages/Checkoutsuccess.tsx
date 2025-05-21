// src/pages/CheckoutSuccess.tsx
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useUser } from "../UserContext";

export default function CheckoutSuccess() {
  const { user } = useUser();
  const userName = user?.name || "Customer";
  const userEmail = user?.email || "mohmedhesham569@yahoo.com";
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (userEmail) {
      setEmailStatus("sending");

      emailjs
        .send(
          "service_hpugmsi",
          "template_b3dxncb",
          {
            to_name: userName,
            download_link: "https://example.com/download-model.zip",
          },
          "FtCp-E9itLJIzOQFZ"
        )
        .then(() => {
          console.log("Email sent!");
          setEmailStatus("success");
        })
        .catch((err) => {
          console.error("Failed to send email:", err);
          setEmailStatus("error");
        });
    }
  }, [userEmail, userName]);

  if (!userEmail) {
    return (
      <div className="container text-center py-5">
        <h1>⚠️ User data not found</h1>
        <p>Please login again to proceed.</p>
      </div>
    );
  }

  return (
    <div className="container text-center py-5">
      <h1>🎉 Thank you for your purchase!</h1>
      <p>
        We’ve sent your download link to <strong>{userEmail}</strong>.
      </p>

      {emailStatus === "sending" && <p>Sending email...</p>}
      {emailStatus === "success" && (
        <p>Email sent successfully! Please check your inbox.</p>
      )}
      {emailStatus === "error" && (
        <p style={{ color: "red" }}>
          Failed to send email. Please contact support.
        </p>
      )}
    </div>
  );
}
