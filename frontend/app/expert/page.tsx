"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { RiskBadge } from "@/components/agri/RiskBadge";
import { DEMO_DIAGNOSIS_RESULT } from "@/lib/demo-data";
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  FlaskConical, 
  FileEdit, 
  Info, 
  CloudSun, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/lib/i18n";

export default function ExpertPortal() {
  const { t } = useTranslation();
  const [selectedCase, setSelectedCase] = useState("1042");
  const [actionDone, setActionDone] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleDecision = (decision: string) => {
    setActionDone(decision);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Agronomist: Dr. V. Sharma" />

      <div className="flex-1 flex">
        <Sidebar role="EXPERT" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{t("expert_review_queue")}</h1>
              <p className="text-xs sm:text-sm text-gray-600">{t("expert_review_subtitle")}</p>
            </div>

            <div className="flex items-center gap-2 bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300 text-xs font-semibold text-emerald-900">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>17 {t("pending_submissions")}</span>
            </div>
          </div>

          {/* Side-by-side Review Workspace (Section 13) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Queue List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">{t("pending_farmer_cases")}</h3>
              
              <div 
                onClick={() => { setSelectedCase("1042"); setActionDone(null); }}
                className={`p-4 rounded-2xl border transition cursor-pointer bg-white ${
                  selectedCase === "1042" ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md" : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-xs text-emerald-800">Case #1042</span>
                  <RiskBadge level="HIGH" size="sm" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">Tomato • Early Blight</h4>
                <p className="text-xs text-gray-500 mt-1">Farmer: Rajesh Kumar • Niphad Block A</p>
                <div className="mt-2 text-[11px] text-emerald-700 font-semibold">AI Match Confidence: 94%</div>
              </div>

              <div 
                onClick={() => { setSelectedCase("1043"); setActionDone(null); }}
                className={`p-4 rounded-2xl border transition cursor-pointer bg-white ${
                  selectedCase === "1043" ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md" : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-xs text-emerald-800">Case #1043</span>
                  <RiskBadge level="CRITICAL" size="sm" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">Cotton • Bacterial Blight</h4>
                <p className="text-xs text-gray-500 mt-1">Farmer: Anil Deshmukh • Sinnar Block</p>
                <div className="mt-2 text-[11px] text-amber-700 font-semibold">AI Match Confidence: 71% (Review Needed)</div>
              </div>
            </div>

            {/* Main Review Workspace Details */}
            <div className="lg:col-span-2 space-y-6">
              
              {actionDone ? (
                <Card className="border-emerald-300 bg-emerald-50 p-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-emerald-950">{t("decision_saved")}</h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                    Decision: <strong>{actionDone}</strong> recorded for Case #{selectedCase}. 
                    Farmer notified and feedback example saved to dataset for future model improvement (Section 50).
                  </p>
                  <Button onClick={() => setActionDone(null)} className="bg-[#166534] text-white text-xs font-bold rounded-xl mt-2">
                    {t("review_next_case")}
                  </Button>
                </Card>
              ) : (
                <Card className="border-emerald-200 shadow-md bg-white p-6 space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
                    <div>
                      <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Reviewing Case #{selectedCase}</span>
                      <h2 className="text-2xl font-extrabold text-gray-900">Tomato Early Blight Assessment</h2>
                    </div>
                    <RiskBadge level="HIGH" size="md" />
                  </div>

                  {/* Left (Image & Field) vs Right (AI Diagnosis & Context) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Left: Image & Farmer Info */}
                    <div className="space-y-4">
                      <div className="h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                        <img src="https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=800&q=80" alt="Sample" className="w-full h-full object-cover" />
                      </div>

                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs space-y-1.5">
                          <h5 className="font-bold text-gray-800 uppercase">{t("field_metadata")}</h5>
                          <p><strong>{t("farmer")}:</strong> Rajesh Kumar</p>
                          <p><strong>{t("field_label")}:</strong> Green Valley Farm (Block A)</p>
                          <p><strong>{t("growth_stage_label")}:</strong> Flowering & Early Fruiting</p>
                          <p><strong>{t("symptoms_reported")}:</strong> Dark brown concentric leaf spots</p>
                      </div>
                    </div>

                    {/* Right: AI Prediction & Context */}
                    <div className="space-y-4 text-xs">
                      
                      <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 space-y-1">
                        <span className="font-bold text-emerald-900 uppercase">{t("ai_diagnosis_result")}</span>
                        <h4 className="text-base font-bold text-emerald-950">Tomato Early Blight</h4>
                        <p className="text-emerald-800">Confidence Match: <strong>94%</strong> (MobileNetV2)</p>
                      </div>

                      <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 space-y-1">
                        <span className="font-bold text-blue-900 uppercase">{t("weather_nearby_vector")}</span>
                        <p className="text-blue-950">84% Humidity • 27.5°C Temp • Fungal Conducive</p>
                        <p className="text-blue-900 font-medium">4 nearby cases within 10 km in Niphad</p>
                      </div>

                    </div>

                  </div>

                  {/* Expert Notes & Action Buttons (Section 13 & 14) */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div>
                      <label className="text-xs font-bold text-gray-800">{t("expert_notes_guidance")}</label>
                      <Textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add specific cultural advice or fungicide dose approval..."
                        className="mt-1 text-xs rounded-xl"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <Button 
                        onClick={() => handleDecision("CONFIRM")}
                        className="bg-[#166534] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold py-2.5 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {t("confirm_ai")}
                      </Button>

                      <Button 
                        onClick={() => handleDecision("REJECT")}
                        variant="outline" 
                        className="border-red-300 text-red-700 hover:bg-red-50 rounded-xl text-xs font-bold py-2.5 flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        {t("reject_ai")}
                      </Button>

                      <Button 
                        onClick={() => handleDecision("LAB_REQUIRED")}
                        className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold py-2.5 flex items-center justify-center gap-1.5"
                      >
                        <FlaskConical className="w-4 h-4" />
                        {t("refer_to_lab_button")}
                      </Button>

                      <Button 
                        onClick={() => handleDecision("RE_DIAGNOSE")}
                        variant="outline"
                        className="border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl text-xs font-bold py-2.5 flex items-center justify-center gap-1.5"
                      >
                        <FileEdit className="w-4 h-4" />
                        {t("change_class")}
                      </Button>
                    </div>
                  </div>

                </Card>
              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
