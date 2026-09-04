"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const farmerNav = [
    { name: "Overview", href: "/farmer", icon: LayoutDashboard },
    { name: "My Fields", href: "/farmer/fields", icon: Sprout },
    { name: "Scan Crop", href: "/farmer/diagnose", icon: Scan },
    { name: "Pest Reports", href: "/farmer/pests", icon: Bug },
    { name: "Weather Risk", href: "/farmer/weather", icon: CloudSun },
    { name: "Advisories", href: "/farmer/advisories", icon: FileText },
    { name: "Alerts", href: "/alerts", icon: Bell },
  ];

  const expertNav = [
    { name: "Review Queue", href: "/expert", icon: UserCheck },
    { name: "Lab Referrals", href: "/expert/labs", icon: FlaskConical },
    { name: "Field Health Map", href: "/official/map", icon: Map },
    { name: "Alerts", href: "/alerts", icon: Bell },
  ];

  const officialNav = [
    { name: "Surveillance Overview", href: "/official", icon: BarChart3 },
    { name: "Hotspot Map", href: "/official/map", icon: Map },
    { name: "Disease Analytics", href: "/official/analytics", icon: BarChart3 },
    { name: "Pest Analytics", href: "/official/pests", icon: Bug },
    { name: "Expert Reviews", href: "/expert", icon: UserCheck },
    { name: "Alerts Center", href: "/alerts", icon: Bell },
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
            {role === "AGRICULTURE_OFFICIAL" ? "Government Official Portal" : role === "EXPERT" ? "Agronomist Portal" : "Farmer Field Portal"}
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
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
};
