"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/agri/Navbar";
import {
  ShieldCheck,
  Scan,
  CloudSun,
  MapPin,
  UserCheck,
  Globe,
  ChevronRight,
  ArrowRight,
  Sprout,
  Activity,
  Award,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Guest" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#166534] via-emerald-900 to-emerald-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-200 border border-white/20 text-xs font-semibold backdrop-blur">
            <Award className="w-4 h-4 text-emerald-300" />
            Government & AgriTech Precision Advisory Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl mx-auto">
            Protect Your Crop <br />
            <span className="text-emerald-400">
              Before the Problem Spreads.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            AI-assisted crop health monitoring, multi-factor risk forecasting,
            and certified agronomist guidance for smarter farming.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/farmer/diagnose">
              <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-emerald-500 text-gray-950 font-bold px-8 py-6 rounded-2xl text-base shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2">
                <Scan className="w-5 h-5" />
                Check Crop Health Now
              </Button>
            </Link>

            <Link href="/official">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-emerald-300/40 text-emerald-300 hover:bg-emerald-400/10 hover:text-emerald-200 font-semibold px-8 py-6 rounded-2xl text-base backdrop-blur"
              >
                Explore Government Surveillance
              </Button>
            </Link>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="pt-10 border-t border-emerald-800/60 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/farmer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-emerald-200 flex items-center justify-center gap-2"
            >
              <span>🌱 Farmer Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/expert"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-emerald-200 flex items-center justify-center gap-2"
            >
              <span>🔬 Agronomist Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/official"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-emerald-200 flex items-center justify-center gap-2"
            >
              <span>📊 Official Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Intelligence Pipeline Section (Section 49) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
            End-to-End Intelligence Pipeline
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Transforming crop images, microclimate weather, and pest data into
            field-level actionable advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Scan className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">
              1. Image Diagnostic
            </h4>
            <p className="text-xs text-gray-500">
              Mobile photo scan with MobileNet ML detection
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mx-auto">
              <CloudSun className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">
              2. Weather Fusion
            </h4>
            <p className="text-xs text-gray-500">
              Humidity, temp & microclimate risk modeling
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center mx-auto">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">3. Risk Engine</h4>
            <p className="text-xs text-gray-500">
              Composite score based on crop stage & pest trap
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto">
              <Sprout className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">
              4. IPDM Advisory
            </h4>
            <p className="text-xs text-gray-500">
              Cultural & biological controls + safe input guidance
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">
              5. Expert Verification
            </h4>
            <p className="text-xs text-gray-500">
              Agronomist validation & feedback learning loop
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-emerald-50/50 border-y border-emerald-900/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Platform Core Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <Globe className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-lg text-gray-900">
                Multilingual Farmer Interface
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Full native UI support for English, Hindi, and Marathi with
                simple mobile-first workflows designed for low-bandwidth
                environments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <MapPin className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-lg text-gray-900">
                PostGIS Hotspot Mapping
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Geospatial surveillance for district and block officials to
                track outbreak clusters, pest trap sensors, and regional
                infection trends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-lg text-gray-900">
                Responsible AI Disclosures
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every AI assessment transparently highlights confidence scores
                and routes uncertain cases to extension officers for laboratory
                referral.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-emerald-950 text-emerald-200 text-xs py-8 px-4 border-t border-emerald-900 text-center">
        <p className="font-semibold text-white">CropGuard Platform MVP</p>
        <p className="mt-1 text-emerald-400">
          Detect early. Act wisely. Protect every crop.
        </p>
      </footer>
    </div>
  );
}
