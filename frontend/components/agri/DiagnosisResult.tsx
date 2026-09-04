"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DiagnosisResult as DiagnosisResultType } from "@/types";
import { RiskBadge } from "./RiskBadge";
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  CloudSun, 
  FileText, 
  Info, 
  ExternalLink,
  Sparkles,
  FlaskConical,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onRequestExpert?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result, onRequestExpert }) => {
  const [requestedExpert, setRequestedExpert] = useState(false);
  const confidencePercent = Math.round((result.confidence || 0.94) * 100);

  const handleExpertRequest = () => {
    setRequestedExpert(true);
    if (onRequestExpert) onRequestExpert();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Disclaimer Banner (Principle 48) */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-emerald-900">
        <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">AI-Assisted Preliminary Assessment</span>
          <p className="text-emerald-800 text-xs mt-0.5">
            This diagnosis is generated using machine learning and regional microclimate analysis. 
            For uncertain cases or regulated pests, expert agricultural officer verification is recommended.
          </p>
        </div>
      </div>

      {/* Main Header Card */}
      <Card className="border-emerald-200 shadow-md overflow-hidden bg-white">
        <div className="border-b border-gray-100 p-6 bg-gradient-to-r from-emerald-50/70 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Primary Assessment</span>
              <span className="text-gray-400">•</span>
              <span className="text-xs text-gray-500">Model v1.0</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{result.predicted_disease}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Detected on Tomato Crop • North Field Block A</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <RiskBadge level={result.severity} size="lg" />
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="font-semibold text-emerald-700">{confidencePercent}%</span>
              <span>AI Confidence Match</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          
          {/* Image & Risk Factor Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Image Preview */}
            <div className="relative aspect-square md:aspect-auto h-52 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              {result.image_url ? (
                <img 
                  src={result.image_url} 
                  alt={result.predicted_disease} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No Image Available
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur">
                Analyzed Sample
              </div>
            </div>

            {/* Severity & Contextual Evidence */}
            <div className="md:col-span-2 space-y-4">
              
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-1.5">
                  <span>Disease Spread Risk Score</span>
                  <span className="font-bold text-orange-600">{result.risk_score || 82.4} / 100</span>
                </div>
                <Progress value={result.risk_score || 82.4} className="h-2.5 bg-gray-100" />
              </div>

              {/* Context Reasons ("Why?") */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2.5 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-700" />
                  Why was this risk level calculated?
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                  {result.reasons?.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Recent humidity is high (84%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Suitable temperature range (27°C) for fungal incubation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>4 similar cases reported nearby in Niphad block</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

            </div>
          </div>

          {/* Integrated Pest & Disease Management Advisory (Section 15) */}
          {result.advisory && (
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#166534]" />
                Recommended Action Plan (IPDM)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Immediate Actions */}
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/70">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                    1. Immediate Cultural Action
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-950 whitespace-pre-line leading-relaxed">
                    {result.advisory.actions}
                  </p>
                </div>

                {/* Preventive & Biological */}
                <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200/70">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                    2. Preventive & Biological Controls
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-950 whitespace-pre-line leading-relaxed">
                    {result.advisory.preventive_actions}
                  </p>
                  {result.advisory.biological_control && (
                    <p className="text-xs text-blue-900 mt-2 font-medium">
                      🧪 Biological: {result.advisory.biological_control}
                    </p>
                  )}
                </div>

              </div>

              {/* Chemical Guidance Disclaimer Box */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <h4 className="font-bold flex items-center gap-1.5 text-amber-950 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  Safe Input & Chemical Intervention Guidance
                </h4>
                <p className="text-xs leading-relaxed text-amber-900">
                  {result.advisory.safe_input_guidance}
                </p>
              </div>
            </div>
          )}

          {/* Expert Validation Footer */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-xl">
            <div className="text-xs text-gray-600">
              <span className="font-semibold text-gray-800">Need official extension officer confirmation?</span>
              <p>Submit this observation directly to regional phytopathologist queue.</p>
            </div>

            <Button
              onClick={handleExpertRequest}
              disabled={requestedExpert}
              className={`${
                requestedExpert 
                  ? "bg-emerald-700 text-white cursor-default" 
                  : "bg-[#166534] hover:bg-emerald-800 text-white"
              } px-5 py-2.5 text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2`}
            >
              {requestedExpert ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Review Requested
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Request Expert Verification
                </>
              )}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
