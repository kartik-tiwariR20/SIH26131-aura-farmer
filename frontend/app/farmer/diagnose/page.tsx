"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { AnimatedAnalysisState } from "@/components/agri/AnimatedAnalysisState";
import { DiagnosisResult } from "@/components/agri/DiagnosisResult";
import { DEMO_DIAGNOSIS_RESULT } from "@/lib/demo-data";
import { api } from "@/lib/api";
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export default function DiagnosisPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [crop, setCrop] = useState("Tomato");
  const [variety, setVariety] = useState("Abhinav Hybrid");
  const [growthStage, setGrowthStage] = useState("Flowering & Fruiting");
  const [soilType, setSoilType] = useState("Black Clay Loam");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleStartAnalysis = async () => {
    setStep(4); // Move to Animated Analysis step
    
    // Simulate/run analysis API call
    const formData = new FormData();
    formData.append("field_id", "field-1");
    formData.append("crop", crop);
    if (imageFile) formData.append("file", imageFile);

    const res = await api.submitDiagnosis(formData);
    setAnalysisResult(res);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Farmer: Rajesh Kumar" />

      <div className="flex-1 flex">
        <Sidebar role="FARMER" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t("ai_crop_health_scanner")}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              {t("crop_health_subtitle")}
            </p>
          </div>

          {/* 5-Step Wizard Indicator (Section 29) */}
          <div className="flex items-center justify-between max-w-2xl mx-auto px-4 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? "text-[#166534]" : "text-gray-400"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? "bg-[#166534] text-white" : "bg-gray-200"}`}>1</span>
              <span>{t("crop")}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
            
            <div className={`flex items-center gap-1.5 ${step >= 2 ? "text-[#166534]" : "text-gray-400"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? "bg-[#166534] text-white" : "bg-gray-200"}`}>2</span>
              <span>{t("image")}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300" />

            <div className={`flex items-center gap-1.5 ${step >= 3 ? "text-[#166534]" : "text-gray-400"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? "bg-[#166534] text-white" : "bg-gray-200"}`}>3</span>
              <span>{t("context")}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300" />

            <div className={`flex items-center gap-1.5 ${step >= 4 ? "text-[#166534]" : "text-gray-400"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 4 ? "bg-[#166534] text-white" : "bg-gray-200"}`}>4</span>
              <span>{t("analysis")}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300" />

            <div className={`flex items-center gap-1.5 ${step >= 5 ? "text-[#166534]" : "text-gray-400"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 5 ? "bg-[#166534] text-white" : "bg-gray-200"}`}>5</span>
              <span>{t("advisory")}</span>
            </div>
          </div>

          {/* STEP 1 & 2 & 3 FORM */}
          {step <= 3 && (
            <Card className="max-w-2xl mx-auto border-emerald-200 shadow-md bg-white p-6 space-y-6">
              
              {/* Crop Selection */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900">{t("select_crop_and_variety")}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {["Tomato", "Cotton", "Rice", "Sugarcane", "Wheat", "Potato", "Maize", "Apple"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCrop(c)}
                      className={`p-3 rounded-xl border text-center font-bold transition ${
                        crop === c ? "bg-[#166534] text-white border-[#166534]" : "bg-gray-50 text-gray-800 hover:bg-emerald-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload Area (Camera/Scanner UI) */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-gray-900">{t("upload_crop_symptom_photo")}</h3>
                
                <div className="relative border-2 border-dashed border-emerald-300/80 rounded-2xl p-6 text-center bg-emerald-50/40 hover:bg-emerald-50 transition cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  />

                  {imagePreview ? (
                    <div className="space-y-3">
                      <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden border border-emerald-400 shadow-md">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-emerald-800 font-semibold flex items-center justify-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600" />
                        {t("image_loaded")} ({imageFile?.name || "Sample Photo"})
                      </p>
                      <span className="text-[11px] text-gray-500 underline">{t("click_replace")}</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#166534] flex items-center justify-center mx-auto shadow-sm">
                        <Camera className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{t("take_photo_or_drag")}</p>
                        <p className="text-xs text-gray-500 mt-1">{t("supports_formats")}</p>
                      </div>
                      <span className="inline-block bg-[#166534] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm">
                        {t("choose_file")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Field Growth Context */}
              <div className="space-y-4 pt-4 border-t border-gray-100 text-xs">
                <h3 className="text-base font-bold text-gray-900">3. Field Context</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Growth Stage</Label>
                    <select
                      value={growthStage}
                      onChange={(e) => setGrowthStage(e.target.value)}
                      className="w-full mt-1.5 bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900"
                    >
                      <option value="Vegetative">Vegetative</option>
                      <option value="Flowering & Fruiting">Flowering & Fruiting</option>
                      <option value="Maturity">Maturity</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Soil Condition</Label>
                    <select
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value)}
                      className="w-full mt-1.5 bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900"
                    >
                      <option value="Black Clay Loam">Black Clay Loam</option>
                      <option value="Red Sandy Loam">Red Sandy Loam</option>
                      <option value="Alluvial Soil">Alluvial Soil</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                onClick={handleStartAnalysis}
                className="w-full bg-[#166534] hover:bg-emerald-800 text-white rounded-2xl py-6 font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-emerald-300" />
                Analyze Crop Health Now
              </Button>

            </Card>
          )}

          {/* STEP 4: Animated Analysis Loading State */}
          {step === 4 && (
            <AnimatedAnalysisState onComplete={() => setStep(5)} />
          )}

          {/* STEP 5: Diagnosis Result & Advisory */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                <Button 
                  onClick={() => setStep(1)} 
                  variant="outline"
                  className="text-xs font-semibold text-gray-700 border-gray-300 rounded-xl flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Scan Another Crop
                </Button>
              </div>

              <DiagnosisResult result={analysisResult || DEMO_DIAGNOSIS_RESULT} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
