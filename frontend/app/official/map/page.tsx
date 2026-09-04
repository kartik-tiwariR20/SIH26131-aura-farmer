"use client";

import React from "react";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { SurveillanceMap } from "@/components/agri/SurveillanceMap";
import { DEMO_HOTSPOTS } from "@/lib/demo-data";

export default function OfficialMapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Official: Agriculture Director" />

      <div className="flex-1 flex">
        <Sidebar role="AGRICULTURE_OFFICIAL" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Geospatial Surveillance & Hotspot Mapping</h1>
            <p className="text-xs sm:text-sm text-gray-600">PostGIS GIS Layer • District & Block Outbreak Heatmap</p>
          </div>

          <SurveillanceMap hotspots={DEMO_HOTSPOTS} />
        </main>
      </div>
    </div>
  );
}
