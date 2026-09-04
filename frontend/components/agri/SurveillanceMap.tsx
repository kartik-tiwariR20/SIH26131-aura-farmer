"use client";

import React, { useState, useEffect } from "react";
import { Hotspot } from "@/types";
import { RiskBadge } from "./RiskBadge";
import { MapPin, Filter, Layers, AlertTriangle, ShieldCheck, ChevronRight, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SurveillanceMapProps {
  hotspots: Hotspot[];
  onSelectHotspot?: (hotspot: Hotspot) => void;
}

export const SurveillanceMap: React.FC<SurveillanceMapProps> = ({ hotspots, onSelectHotspot }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(hotspots[0] || null);
  const [districtFilter, setDistrictFilter] = useState<string>("All");
  const [cropFilter, setCropFilter] = useState<string>("All");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredHotspots = hotspots.filter((h) => {
    if (districtFilter !== "All" && h.district !== districtFilter) return false;
    if (cropFilter !== "All" && h.crop !== cropFilter) return false;
    if (riskFilter !== "All" && h.risk_level !== riskFilter) return false;
    return true;
  });

  const getMarkerColor = (level: string) => {
    switch (level.toUpperCase()) {
      case "CRITICAL": return "bg-red-500 text-white border-red-700 shadow-red-300 animate-pulse";
      case "HIGH": return "bg-orange-500 text-white border-orange-700 shadow-orange-200";
      case "MODERATE": return "bg-amber-400 text-gray-900 border-amber-600";
      case "LOW":
      default: return "bg-emerald-500 text-white border-emerald-700";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[650px] w-full rounded-2xl overflow-hidden border border-emerald-200 shadow-lg bg-white">
      
      {/* Map Section */}
      <div className="relative flex-1 bg-emerald-950/90 h-full overflow-hidden flex flex-col">
        
        {/* Top Floating Filter Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur p-3 rounded-xl shadow-md border border-gray-200 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-gray-700 mr-2">
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>Filters:</span>
          </div>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:outline-none"
          >
            <option value="All">District: All</option>
            <option value="Nashik">Nashik</option>
            <option value="Pune">Pune</option>
            <option value="Satara">Satara</option>
          </select>

          <select
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:outline-none"
          >
            <option value="All">Crop: All</option>
            <option value="Tomato">Tomato</option>
            <option value="Cotton">Cotton</option>
            <option value="Rice">Rice</option>
            <option value="Sugarcane">Sugarcane</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:outline-none"
          >
            <option value="All">Risk: All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High Risk</option>
            <option value="MODERATE">Moderate</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>

        {/* Interactive Map Visualizer */}
        <div className="relative flex-1 w-full h-full bg-[#1b2a1e] flex items-center justify-center p-6 text-white overflow-hidden">
          {/* Simulated Satellite Grid Layout */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Interactive Pins Representation */}
          <div className="relative z-10 w-full h-full max-w-2xl max-h-[500px] border border-emerald-500/30 rounded-2xl bg-emerald-900/20 backdrop-blur p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span className="font-mono">GEOSPATIAL SURVEILLANCE LAYER (NASHIK DISTRICT)</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live PostGIS Stream
              </span>
            </div>

            {/* Hotspot Markers Grid */}
            <div className="grid grid-cols-2 gap-6 my-auto">
              {filteredHotspots.map((hs) => {
                const isSelected = selectedHotspot?.id === hs.id;
                const markerBg = getMarkerColor(hs.risk_level);

                return (
                  <button
                    key={hs.id}
                    onClick={() => {
                      setSelectedHotspot(hs);
                      if (onSelectHotspot) onSelectHotspot(hs);
                    }}
                    className={`text-left p-4 rounded-xl transition-all border ${
                      isSelected 
                        ? "bg-emerald-800/90 border-emerald-400 ring-2 ring-emerald-400 scale-[1.02]" 
                        : "bg-emerald-950/80 border-emerald-800/60 hover:border-emerald-500"
                    } backdrop-blur shadow-lg`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${markerBg}`}>
                        {hs.risk_level}
                      </span>
                      <span className="text-[11px] text-emerald-300 font-mono">{hs.case_count} cases</span>
                    </div>
                    <h5 className="font-bold text-sm text-white line-clamp-1">{hs.area_name}</h5>
                    <p className="text-xs text-emerald-200 mt-0.5">{hs.crop} • {hs.disease}</p>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="flex items-center justify-between text-[11px] text-emerald-300 bg-emerald-950/90 p-2.5 rounded-xl border border-emerald-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Low</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /> Moderate</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500" /> High</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" /> Critical</span>
              </div>
              <span className="hidden sm:inline font-mono">SRID: 4326</span>
            </div>
          </div>
        </div>

      </div>

      {/* Side Area Details Drawer (Section 12 & 20) */}
      <div className="w-full lg:w-96 bg-gray-50 border-l border-gray-200 p-6 flex flex-col justify-between overflow-y-auto">
        {selectedHotspot ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  {selectedHotspot.district} • {selectedHotspot.block}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 mt-0.5">{selectedHotspot.area_name}</h3>
              </div>
              <RiskBadge level={selectedHotspot.risk_level} size="sm" />
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Affected Crop:</span>
                <span className="font-bold text-gray-900">{selectedHotspot.crop}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Primary Disease:</span>
                <span className="font-bold text-emerald-800">{selectedHotspot.disease}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Pest Vector:</span>
                <span className="font-bold text-gray-900">{selectedHotspot.pest_type}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Reported Cases:</span>
                <span className="font-bold text-gray-900">{selectedHotspot.case_count} ({selectedHotspot.confirmed_cases} Confirmed)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">7-Day Trend:</span>
                <span className="font-bold text-orange-600">{selectedHotspot.recent_trend}</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
              <h5 className="font-bold uppercase tracking-wider text-emerald-900">Local Weather & Extension Status</h5>
              <p>🌤 Weather: {selectedHotspot.weather_summary}</p>
              <p>👨‍🌾 Extension Officer: {selectedHotspot.extension_worker || "Assigned"}</p>
            </div>

            <Button className="w-full bg-[#166534] hover:bg-emerald-800 text-white rounded-xl py-2.5 font-semibold text-xs">
              View Detailed Block Surveillance Report
            </Button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 text-xs">
            <MapPin className="w-8 h-8 text-gray-300 mb-2" />
            Select a hotspot on the map to view detailed block surveillance.
          </div>
        )}
      </div>

    </div>
  );
};
