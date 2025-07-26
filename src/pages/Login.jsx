import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);

  return (
    <div className="p-8 text-center">Redirecting to login...</div>
  );
}
