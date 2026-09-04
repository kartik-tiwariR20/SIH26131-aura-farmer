"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/agri/Navbar";
import { Shield, Lock, Mail, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("farmer@example.com");
  const [password, setPassword] = useState("Farmer@123");
  const [role, setRole] = useState("FARMER");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (role === "AGRICULTURE_OFFICIAL") {
        router.push("/official");
      } else if (role === "EXPERT") {
        router.push("/expert");
      } else {
        router.push("/farmer");
      }
    }, 500);
  };

  const quickFillDemo = (demoRole: "FARMER" | "EXPERT" | "AGRICULTURE_OFFICIAL") => {
    setRole(demoRole);
    if (demoRole === "FARMER") {
      setEmail("farmer@example.com");
      setPassword("Farmer@123");
    } else if (demoRole === "EXPERT") {
      setEmail("expert@example.com");
      setPassword("Expert@123");
    } else {
      setEmail("official@example.com");
      setPassword("Official@123");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Guest" />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-emerald-200 shadow-xl overflow-hidden p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center mx-auto mb-3">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sign in to CropGuard</h2>
            <p className="text-xs text-gray-500">Access your role-protected agricultural portal</p>
          </div>

          {/* Quick Demo Credentials Switcher */}
          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs space-y-2">
            <span className="font-bold text-emerald-900 block">1-Click Quick Demo Login:</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => quickFillDemo("FARMER")}
                className={`p-1.5 rounded-lg border font-semibold text-[11px] transition ${
                  role === "FARMER" ? "bg-[#166534] text-white border-[#166534]" : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                🌱 Farmer
              </button>
              <button
                type="button"
                onClick={() => quickFillDemo("EXPERT")}
                className={`p-1.5 rounded-lg border font-semibold text-[11px] transition ${
                  role === "EXPERT" ? "bg-[#166534] text-white border-[#166534]" : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                🔬 Expert
              </button>
              <button
                type="button"
                onClick={() => quickFillDemo("AGRICULTURE_OFFICIAL")}
                className={`p-1.5 rounded-lg border font-semibold text-[11px] transition ${
                  role === "AGRICULTURE_OFFICIAL" ? "bg-[#166534] text-white border-[#166534]" : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                📊 Official
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-700">Email Address</Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 text-xs py-2 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 text-xs py-2 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#166534] hover:bg-emerald-800 text-white rounded-xl py-5 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Enter Portal"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

        </div>
      </main>
    </div>
  );
}
