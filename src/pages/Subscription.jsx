import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Subscription() {
  const navigate = useNavigate();

  const choosePlan = () => {
    localStorage.setItem("subscribed", "true");
    navigate(createPageUrl("Dashboard"));
  };

  return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-white">
      <Card className="max-w-md w-full shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-center">Choose a Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={choosePlan}>
            Select Free Plan
          </Button>
          <Button variant="outline" className="w-full" onClick={choosePlan}>
            Select Basic Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
