import React from "react";
import { RiskLevel } from "@/types";
import { ShieldAlert, ShieldCheck, AlertTriangle, AlertOctagon } from "lucide-react";

interface RiskBadgeProps {
  level: RiskLevel | string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = "md", showIcon = true }) => {
  const normLevel = (level || "LOW").toUpperCase() as RiskLevel;

  let bgClass = "bg-emerald-50 text-emerald-800 border-emerald-300";
  let Icon = ShieldCheck;
  let label = "Low Risk";

  switch (normLevel) {
    case "CRITICAL":
      bgClass = "bg-red-100 text-red-800 border-red-400 font-bold animate-pulse";
      Icon = AlertOctagon;
      label = "Critical Risk";
      break;
    case "HIGH":
      bgClass = "bg-orange-100 text-orange-800 border-orange-400 font-semibold";
      Icon = ShieldAlert;
      label = "High Risk";
      break;
    case "MODERATE":
      bgClass = "bg-amber-100 text-amber-800 border-amber-400";
      Icon = AlertTriangle;
      label = "Moderate Risk";
      break;
    case "LOW":
    default:
      bgClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
      Icon = ShieldCheck;
      label = "Low Risk";
      break;
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs rounded-md",
    md: "px-3 py-1 text-sm rounded-lg",
    lg: "px-4 py-1.5 text-base rounded-xl font-semibold",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 border ${bgClass} ${sizeClasses[size]}`}>
      {showIcon && <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{label}</span>
    </span>
  );
};
