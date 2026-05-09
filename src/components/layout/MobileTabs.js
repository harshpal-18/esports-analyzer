"use client";

import { BarChart3, Brain, Gamepad2, History, LayoutDashboard, Settings, Trophy } from "lucide-react";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const tabs = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Games", icon: Gamepad2 },
  { name: "Matches", icon: History },
  { name: "Analytics", icon: BarChart3 },
  { name: "AI Insights", icon: Brain },
  { name: "Leaderboard", icon: Trophy },
  { name: "Settings", icon: Settings },
];

export default function MobileTabs() {
  const { selectedTab, setSelectedTab } = usePerformanceStore();

  return (
    <nav className="sticky top-[57px] z-20 flex gap-1 overflow-x-auto border-b border-white/6 bg-black/40 px-3 py-2 backdrop-blur-xl no-scrollbar lg:hidden">
      {tabs.map(({ name, icon: Icon }) => {
        const isActive = selectedTab === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => setSelectedTab(name)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "bg-purple-600/25 text-purple-300 border border-purple-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Icon size={13} />
            {name}
          </button>
        );
      })}
    </nav>
  );
}
