"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { 
  LayoutDashboard, 
  Sprout, 
  Scan, 
  Bug, 
  CloudSun, 
  FileText, 
  UserCheck, 
  Map, 
  Bell, 
  Settings, 
  BarChart3,
  FlaskConical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  role?: "FARMER" | "EXPERT" | "AGRICULTURE_OFFICIAL";
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  role = "FARMER", 
  isCollapsed = false,
  onToggleCollapse
}) => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const farmerNav = [
    { name: t("overview"), href: "/farmer", icon: LayoutDashboard },
    { name: t("my_fields"), href: "/farmer/fields", icon: Sprout },
    { name: t("scan_crop"), href: "/farmer/diagnose", icon: Scan },
    { name: t("pest_reports"), href: "/farmer/pests", icon: Bug },
    { name: t("weather_risk_label"), href: "/farmer/weather", icon: CloudSun },
    { name: t("advisories"), href: "/farmer/advisories", icon: FileText },
    { name: t("alerts"), href: "/alerts", icon: Bell },
  ];

  const expertNav = [
    { name: t("review_queue"), href: "/expert", icon: UserCheck },
    { name: t("lab_referrals"), href: "/expert/labs", icon: FlaskConical },
    { name: t("field_health_map"), href: "/official/map", icon: Map },
    { name: t("alerts"), href: "/alerts", icon: Bell },
  ];

  const officialNav = [
    { name: t("surveillance_overview"), href: "/official", icon: BarChart3 },
    { name: t("hotspot_map_label"), href: "/official/map", icon: Map },
    { name: t("disease_analytics_label"), href: "/official/analytics", icon: BarChart3 },
    { name: t("pest_analytics"), href: "/official/pests", icon: Bug },
    { name: t("expert_reviews"), href: "/expert", icon: UserCheck },
    { name: t("alerts_center"), href: "/alerts", icon: Bell },
  ];

  const navItems = role === "AGRICULTURE_OFFICIAL" ? officialNav : role === "EXPERT" ? expertNav : farmerNav;

  return (
    <aside 
      className={`relative flex flex-col border-r border-emerald-900/10 bg-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } min-h-[calc(100vh-4rem)] shadow-sm hidden md:flex`}
    >
      {/* Toggle collapse button */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md text-gray-500 hover:text-emerald-700"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Role tag header */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-100 bg-emerald-50/50">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
           {role === "AGRICULTURE_OFFICIAL" ? t("government_official_portal") : role === "EXPERT" ? t("agronomist_portal") : t("farmer_field_portal")}
          </span>
        </div>
      )}

      {/* Navigation items */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href) && item.href !== "/farmer");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#166534] text-white shadow-sm font-semibold"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
              } ${isCollapsed ? "justify-center px-0" : ""}`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-emerald-700"}`} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer settings link */}
      <div className="p-3 border-t border-gray-100">
        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-800 ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          <Settings className="h-5 w-5 text-gray-400" />
          {!isCollapsed && <span>{t("settings_label")}</span>}
        </Link>
      </div>
    </aside>
  );
};
