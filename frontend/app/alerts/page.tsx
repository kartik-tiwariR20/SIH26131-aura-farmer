"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { DEMO_ALERTS } from "@/lib/demo-data";
import { Bell, AlertTriangle, ShieldAlert, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(DEMO_ALERTS);
  const { t } = useTranslation();

  const markAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="User Notifications" />

      <div className="flex-1 flex">
        <Sidebar role="FARMER" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{t("alerts_notification_center")}</h1>
              <p className="text-xs sm:text-sm text-gray-600">{t("alerts_subtitle")}</p>
            </div>

            <Button onClick={markAllRead} variant="outline" className="text-xs font-semibold rounded-xl border-gray-300">
              {t("mark_all_read")}
            </Button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card 
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all ${
                  alert.read ? "bg-white border-gray-200" : "bg-emerald-50/50 border-emerald-300 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-gray-900">{alert.title}</h4>
                      <span className="text-[11px] text-gray-400 font-medium">{alert.created_at}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{alert.message}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
