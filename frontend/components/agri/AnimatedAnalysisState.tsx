"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Step {
  id: number;
  label: string;
}

const STEPS: Step[] = [
  { id: 1, label: "Image quality & focus verified" },
  { id: 2, label: "Crop type & plant canopy identified" },
  { id: 3, label: "Detecting foliar symptoms & leaf lesions" },
  { id: 4, label: "Checking microclimate & weather risk factors" },
  { id: 5, label: "Fusing geospatial & pest vector observations" },
  { id: 6, label: "Generating safe IPDM advisory & recommendations" }
];

interface AnimatedAnalysisStateProps {
  onComplete?: () => void;
}

export const AnimatedAnalysisState: React.FC<AnimatedAnalysisStateProps> = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= STEPS.length) {
          clearInterval(timer);
          if (onComplete) setTimeout(onComplete, 600);
          return STEPS.length;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <Card className="max-w-xl mx-auto border-emerald-200/80 shadow-lg bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-[#166534] to-emerald-700 p-6 text-white text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 backdrop-blur border border-white/20 animate-pulse">
          <Sparkles className="w-6 h-6 text-emerald-300" />
        </div>
        <h3 className="text-xl font-bold">Analyzing Crop Health...</h3>
        <p className="text-emerald-100 text-xs mt-1">Fusing AI Image Diagnostics + Weather + Microclimate Data</p>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {STEPS.map((step) => {
            const isCompleted = activeStep > step.id;
            const isCurrent = activeStep === step.id;
            const isPending = activeStep < step.id;

            return (
              <div 
                key={step.id} 
                className={`flex items-center gap-3.5 p-3 rounded-xl transition-all border ${
                  isCurrent 
                    ? "bg-emerald-50 border-emerald-300 shadow-sm" 
                    : isCompleted 
                    ? "bg-gray-50/80 border-gray-100 opacity-90" 
                    : "border-transparent opacity-40"
                }`}
              >
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-emerald-700 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  isCurrent ? "text-emerald-900 font-semibold" : isCompleted ? "text-gray-700" : "text-gray-400"
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-xs text-gray-500 bg-amber-50 p-3 rounded-lg border border-amber-200/60 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Generating context-aware risk scores & safe IPDM recommendations...</span>
        </div>
      </CardContent>
    </Card>
  );
};
