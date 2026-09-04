import React from "react";
import { WeatherData } from "@/types";
import { Thermometer, Droplets, CloudRain, Wind, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <Card className="border-emerald-200/80 shadow-sm bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-800 to-[#166534] p-4 text-white flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Live Microclimate</span>
          <h4 className="text-base font-bold text-white">{weather.location || "Niphad, Nashik"}</h4>
        </div>
        {weather.disease_conducive && (
          <span className="bg-amber-400/20 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-300/40 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            Disease Conducive
          </span>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <Thermometer className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <span className="text-[11px] text-gray-500 uppercase block font-medium">Temperature</span>
            <span className="text-base font-bold text-gray-900">{weather.temperature}°C</span>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
            <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="text-[11px] text-blue-700 uppercase block font-medium">Humidity</span>
            <span className="text-base font-bold text-blue-950">{weather.humidity}%</span>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
            <CloudRain className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
            <span className="text-[11px] text-indigo-700 uppercase block font-medium">Rainfall</span>
            <span className="text-base font-bold text-indigo-950">{weather.rainfall} mm</span>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <Wind className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <span className="text-[11px] text-gray-500 uppercase block font-medium">Wind Speed</span>
            <span className="text-base font-bold text-gray-900">{weather.wind_speed} km/h</span>
          </div>

        </div>

        {/* Microclimate Warning & Trend */}
        {weather.disease_conducive && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>Risk increased by {weather.risk_change_percent || 17.5}% over last 24 hours</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              {weather.explanation || "Conditions favorable for fungal disease incubation due to high humidity and warm temperatures."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
