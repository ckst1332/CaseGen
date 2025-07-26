import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ArrowLeft, Shield, Zap } from "lucide-react";
import { User } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Auth() {
  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.origin + createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to={createPageUrl("Landing")} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Welcome to Cagen</CardTitle>
            <p className="text-slate-600 mt-2">
              Sign in to start practicing financial modeling with AI-generated cases
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Secure Google Sign-In</p>
                  <p className="text-xs text-green-700">We never store your password</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">3 Free Cases</p>
                  <p className="text-xs text-blue-700">No credit card required to start</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base"
              size="lg"
            >
              Continue with Google
            </Button>
            
            <p className="text-xs text-center text-slate-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <p className="text-sm text-slate-600">
            New to financial modeling?{" "}
            <Link to={createPageUrl("Landing")} className="text-blue-600 hover:underline font-medium">
              Learn more about Cagen
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}