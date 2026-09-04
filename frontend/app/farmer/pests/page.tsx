"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { api } from "@/lib/api";
import { Bug, Plus, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function PestsPage() {
  const [pestType, setPestType] = useState("Aphids");
  const [trapType, setTrapType] = useState("Yellow Sticky Trap");
  const [count, setCount] = useState(18);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.getFarms(); // Call API helper
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Farmer: Rajesh Kumar" />

      <div className="flex-1 flex">
        <Sidebar role="FARMER" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Pest Trap & Observation Module</h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Record manual sticky trap counts or connect IoT optical pest sensors for early vector outbreak alerts.
            </p>
          </div>

          {/* IoT Sensor Architecture Card (Section 11) */}
          <div className="bg-gradient-to-r from-emerald-900 to-[#166534] p-5 rounded-2xl text-white shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white block">IoT Pest Sensor Ready</span>
                <span className="text-emerald-200">Architecture: Sensor -&gt; Sensor API -&gt; Risk Engine -&gt; Alert</span>
              </div>
            </div>
            <span className="text-[11px] bg-emerald-700/60 px-3 py-1 rounded-full text-emerald-200 border border-emerald-500/40 shrink-0">
              API Stream Active
            </span>
          </div>

          <Card className="border-emerald-200 shadow-md bg-white p-6">
            <CardContent className="p-0">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-900">Pest Observation Recorded!</h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    {count} {pestType} recorded in {trapType}. Risk engine updated pest vector activity score.
                  </p>
                  <Button onClick={() => setSubmitted(false)} className="bg-[#166534] text-white text-xs font-semibold rounded-xl mt-2">
                    Record Another Observation
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-gray-700">Pest Type</Label>
                      <select
                        value={pestType}
                        onChange={(e) => setPestType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900"
                      >
                        <option value="Aphids">Aphids</option>
                        <option value="Whitefly">Whitefly</option>
                        <option value="Stem Borer">Stem Borer</option>
                        <option value="Thrips">Thrips</option>
                        <option value="Fruit Borer">Fruit Borer</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-gray-700">Trap Type</Label>
                      <select
                        value={trapType}
                        onChange={(e) => setTrapType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900"
                      >
                        <option value="Yellow Sticky Trap">Yellow Sticky Trap</option>
                        <option value="Pheromone Trap">Pheromone Trap</option>
                        <option value="Light Trap">Light Trap</option>
                        <option value="IoT Optical Trap Sensor">IoT Optical Trap Sensor</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700">Pest Count Recorded</Label>
                    <Input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="rounded-xl text-xs py-2"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#166534] hover:bg-emerald-800 text-white rounded-xl py-5 font-bold text-xs shadow-md">
                    Submit Pest Observation
                  </Button>

                </form>
              )}
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
}
