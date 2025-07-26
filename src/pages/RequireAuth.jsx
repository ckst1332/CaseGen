import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const subscribed = localStorage.getItem("subscribed") === "true";

  if (!isLoggedIn) {
    return (
      <Navigate
        to={createPageUrl("Login")}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!subscribed && location.pathname !== createPageUrl("Subscription")) {
    return <Navigate to={createPageUrl("Subscription") } replace />;
  }

  return children;
}
