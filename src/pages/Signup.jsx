import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    window.location.href = "/signup";
  }, []);

  return (
    <div className="p-8 text-center">Redirecting to sign up...</div>
  );
}
