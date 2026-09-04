"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { WeatherCard } from "@/components/agri/WeatherCard";
import { RiskBadge } from "@/components/agri/RiskBadge";
import { DEMO_FIELDS, DEMO_WEATHER, DEMO_ALERTS } from "@/lib/demo-data";
import { 
  Scan, 
  Bug, 
  Sprout, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  Clock, 
  Activity,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FarmerDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Farmer: Rajesh Kumar" onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex">
        <Sidebar role="FARMER" isCollapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* Top Greeting Header (Section 17) */}
          <div className="bg-gradient-to-r from-[#166534] via-emerald-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                Good Evening, Rajesh 👋
              </h1>
              <p className="text-emerald-100 text-sm mt-1">
                Your farm health overview: <span className="font-bold text-white">1 field healthy</span> • <span className="font-bold text-amber-300">1 field needs attention</span>
              </p>
            </div>

            {/* Primary & Secondary CTAs (Section 17 & Section 27 Mobile Navigation) */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/farmer/diagnose">
                <Button className="bg-[#22C55E] hover:bg-emerald-500 text-gray-950 font-bold px-6 py-6 rounded-2xl text-sm shadow-md flex items-center gap-2 transition-all">
                  <Scan className="w-5 h-5" />
                  Check Crop Health
                </Button>
              </Link>
              <Link href="/farmer/pests">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-5 py-6 rounded-2xl text-sm backdrop-blur">
                  <Bug className="w-4 h-4 mr-1.5" />
                  Report Pest
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Card className="border-emerald-200/70 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">🌱 Farm Health</span>
                <span className="text-lg font-bold text-gray-900">82% Good</span>
              </div>
            </Card>

            <Card className="border-amber-200/80 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">⚠️ Active Alerts</span>
                <span className="text-lg font-bold text-amber-900">2 Alerts</span>
              </div>
            </Card>

            <Card className="border-blue-200/80 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">🔬 Recent Diagnosis</span>
                <span className="text-sm font-bold text-gray-900 line-clamp-1">Tomato Early Blight</span>
              </div>
            </Card>

            <Card className="border-emerald-200/70 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">🌦 Weather Risk</span>
                <span className="text-sm font-bold text-orange-600">Moderate/High</span>
              </div>
            </Card>

          </div>

          {/* Microclimate Weather & My Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Weather Module */}
            <div className="lg:col-span-1">
              <WeatherCard weather={DEMO_WEATHER} />
            </div>

            {/* My Fields List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">My Monitored Fields</h3>
                <Link href="/farmer/fields" className="text-xs font-semibold text-emerald-700 hover:underline">
                  View All Fields
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_FIELDS.map((field) => (
                  <Card key={field.id} className="border-gray-200 shadow-sm bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-gray-900">{field.crop} ({field.variety})</h4>
                        <RiskBadge level={field.risk_level || "LOW"} size="sm" />
                      </div>
                      <p className="text-xs text-gray-500">
                        {field.area} Acres • {field.soil_type} • Stage: <span className="text-gray-800 font-medium">{field.growth_stage}</span>
                      </p>
                    </div>

                    <Link href={`/farmer/diagnose?field=${field.id}`}>
                      <Button variant="outline" className="border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs font-semibold rounded-xl">
                        Scan This Field
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* Activity Timeline (Section 17) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              Recent Field Activity Timeline
            </h3>

            <div className="space-y-4 text-xs sm:text-sm pl-4 border-l-2 border-emerald-200">
              <div className="relative pl-4">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                <span className="text-xs text-gray-400 font-semibold block">Today</span>
                <p className="font-semibold text-gray-800">Tomato field image analyzed by AI (Tomato Early Blight, 94% match)</p>
              </div>

              <div className="relative pl-4">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white" />
                <span className="text-xs text-gray-400 font-semibold block">Yesterday</span>
                <p className="font-semibold text-gray-800">Yellow sticky trap observation recorded (18 Aphids count)</p>
              </div>

              <div className="relative pl-4">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white" />
                <span className="text-xs text-gray-400 font-semibold block">3 days ago</span>
                <p className="font-semibold text-gray-800">Weather risk alert triggered (Humidity reached 84%)</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
