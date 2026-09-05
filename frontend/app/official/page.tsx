"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { SurveillanceMap } from "@/components/agri/SurveillanceMap";
import { DEMO_HOTSPOTS } from "@/lib/demo-data";
import { 
  BarChart3, 
  ShieldAlert, 
  CheckCircle2, 
  Map, 
  Activity, 
  UserCheck, 
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from "recharts";

const diseaseTrendData = [
  { date: "Mon", "Early Blight": 12, "Bacterial Blight": 8, "Stripe Rust": 4 },
  { date: "Tue", "Early Blight": 18, "Bacterial Blight": 10, "Stripe Rust": 6 },
  { date: "Wed", "Early Blight": 24, "Bacterial Blight": 14, "Stripe Rust": 9 },
  { date: "Thu", "Early Blight": 31, "Bacterial Blight": 19, "Stripe Rust": 11 },
  { date: "Fri", "Early Blight": 28, "Bacterial Blight": 16, "Stripe Rust": 8 },
  { date: "Sat", "Early Blight": 36, "Bacterial Blight": 22, "Stripe Rust": 14 },
  { date: "Sun", "Early Blight": 42, "Bacterial Blight": 25, "Stripe Rust": 17 },
];

const cropDistributionData = [
  { crop: "Tomato", count: 480 },
  { crop: "Cotton", count: 360 },
  { crop: "Rice", count: 290 },
  { crop: "Sugarcane", count: 170 },
  { crop: "Wheat", count: 120 },
];

const riskDistributionData = [
  { name: "Low Risk", value: 820, color: "#22C55E" },
  { name: "Moderate", value: 488, color: "#EAB308" },
  { name: "High Risk", value: 88, color: "#F97316" },
  { name: "Critical", value: 24, color: "#EF4444" },
];

const weeklyCasesData = [
  { week: "Week 1", total: 84, confirmed: 68 },
  { week: "Week 2", total: 112, confirmed: 95 },
  { week: "Week 3", total: 156, confirmed: 130 },
  { week: "Week 4", total: 198, confirmed: 172 },
];

export default function OfficialDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Official: Agriculture Director" onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex">
        <Sidebar role="AGRICULTURE_OFFICIAL" isCollapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* Header Bar (Section 19) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
                <span>{t("district_all_nashik")}</span>
                <span>•</span>
                <span>{t("last_updated_5_minutes")}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{t("field_health_intelligence")}</h1>
            </div>

            <Button className="bg-[#166534] hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold px-4 py-2.5 flex items-center gap-1.5 shadow-sm">
              <FileSpreadsheet className="w-4 h-4" />
              {t("export_district_outbreak_report")}
            </Button>
          </div>

          {/* 5 KPI Cards (Section 19) */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            
            <Card className="border-emerald-200 bg-white p-4 shadow-sm">
              <span className="text-xs text-gray-500 font-semibold block">Total Fields</span>
              <span className="text-2xl font-extrabold text-gray-900 mt-1 block">1,420</span>
              <span className="text-[11px] text-emerald-700 font-medium">Monitored</span>
            </Card>

            <Card className="border-amber-200 bg-white p-4 shadow-sm">
              <span className="text-xs text-gray-500 font-semibold block">Active Alerts</span>
              <span className="text-2xl font-extrabold text-amber-700 mt-1 block">38</span>
              <span className="text-[11px] text-amber-600 font-medium">High / Critical</span>
            </Card>

            <Card className="border-orange-200 bg-white p-4 shadow-sm">
              <span className="text-xs text-gray-500 font-semibold block">High Risk Fields</span>
              <span className="text-2xl font-extrabold text-orange-600 mt-1 block">112</span>
              <span className="text-[11px] text-orange-700 font-medium">+14% this week</span>
            </Card>

            <Card className="border-emerald-200 bg-white p-4 shadow-sm">
              <span className="text-xs text-gray-500 font-semibold block">Confirmed Cases</span>
              <span className="text-2xl font-extrabold text-[#166534] mt-1 block">284</span>
              <span className="text-[11px] text-emerald-700 font-medium">Expert Verified</span>
            </Card>

            <Card className="border-blue-200 bg-white p-4 shadow-sm">
              <span className="text-xs text-gray-500 font-semibold block">Pending Reviews</span>
              <span className="text-2xl font-extrabold text-blue-800 mt-1 block">17</span>
              <span className="text-[11px] text-blue-600 font-medium">Agronomist Queue</span>
            </Card>

          </div>

          {/* Map Centerpiece (Section 20) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Map className="w-5 h-5 text-[#166534]" />
                Geospatial Hotspot Map Centerpiece
              </h2>
              <span className="text-xs text-emerald-800 font-semibold">PostGIS Clustering Active</span>
            </div>

            <SurveillanceMap hotspots={DEMO_HOTSPOTS} />
          </div>

          {/* Recharts Analytical Visualizations Grid (Section 19 & 31) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Disease Trend Line Chart */}
            <Card className="border-gray-200 shadow-sm bg-white p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">7-Day Outbreak Disease Trend</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={diseaseTrendData}>
                    <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Line type="monotone" dataKey="Early Blight" stroke="#EF4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="Bacterial Blight" stroke="#F97316" strokeWidth={2} />
                    <Line type="monotone" dataKey="Stripe Rust" stroke="#EAB308" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Crop Distribution Bar Chart */}
            <Card className="border-gray-200 shadow-sm bg-white p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">Crop Distribution Under Monitoring</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cropDistributionData}>
                    <XAxis dataKey="crop" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#166534" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Risk Distribution Donut Chart */}
            <Card className="border-gray-200 shadow-sm bg-white p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">District Risk Category Distribution</h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={riskDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4}>
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Weekly Confirmed Cases Area Chart */}
            <Card className="border-gray-200 shadow-sm bg-white p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">Weekly Reported vs Confirmed Cases</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyCasesData}>
                    <XAxis dataKey="week" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#2563EB" fill="#DBEAFE" />
                    <Area type="monotone" dataKey="confirmed" stroke="#166534" fill="#DCFCE7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

          </div>

        </main>
      </div>
    </div>
  );
}
