"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { RiskBadge } from "@/components/agri/RiskBadge";
import { DEMO_FIELDS } from "@/lib/demo-data";
import { Sprout, Plus, MapPin, Calendar, Activity, ChevronRight, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FieldsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Farmer: Rajesh Kumar" />

      <div className="flex-1 flex">
        <Sidebar role="FARMER" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">My Registered Fields</h1>
              <p className="text-xs sm:text-sm text-gray-600">Green Valley Farm • Nashik District</p>
            </div>

            <Button className="bg-[#166534] hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold px-4 py-2.5 flex items-center gap-1.5 shadow-sm">
              <Plus className="w-4 h-4" />
              Add New Field
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMO_FIELDS.map((field) => (
              <Card key={field.id} className="border-emerald-200 shadow-md bg-white overflow-hidden">
                
                <div className="bg-gradient-to-r from-emerald-800 to-[#166534] p-5 text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">{field.crop} Field</span>
                    <h3 className="text-xl font-bold text-white">{field.crop} - {field.variety}</h3>
                  </div>
                  <RiskBadge level={field.risk_level || "LOW"} size="md" />
                </div>

                <CardContent className="p-6 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 block text-[11px]">Area Size</span>
                      <span className="font-bold text-gray-900">{field.area} Acres</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">Soil Type</span>
                      <span className="font-bold text-gray-900">{field.soil_type}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">Growth Stage</span>
                      <span className="font-bold text-emerald-800">{field.growth_stage}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">Risk Score</span>
                      <span className="font-bold text-orange-600">{field.risk_score} / 100</span>
                    </div>
                  </div>

                  {/* Field Timeline */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-gray-800">Visual Health Timeline</h5>
                    <div className="flex items-center justify-between text-xs text-gray-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-700" />
                        <span>Last scan: <strong>Tomato Early Blight</strong> (Moderate)</span>
                      </div>
                      <span className="text-[11px] text-gray-400">2 days ago</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link href={`/farmer/diagnose?field=${field.id}`} className="w-full">
                      <Button className="w-full bg-[#166534] hover:bg-emerald-800 text-white rounded-xl py-2.5 font-semibold text-xs flex items-center justify-center gap-2">
                        <Scan className="w-4 h-4" />
                        Scan Field Crop Health
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
