"use client";

import { BarChart3, Brain, Gamepad2, GitCompare, History, LayoutDashboard, Settings } from "lucide-react";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const tabs = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Games", icon: Gamepad2 },
  { name: "Matches", icon: History },
  { name: "Analytics", icon: BarChart3 },
  { name: "Compare", icon: GitCompare },
  { name: "AI Insights", icon: Brain },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { selectedTab, setSelectedTab } = usePerformanceStore();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-black/35 p-4 lg:block">
      <p className="text-xs uppercase tracking-[0.2em] text-purple-300">Esports Suite</p>
      <h1 className="mt-2 text-2xl font-bold [font-family:var(--font-heading)]">Performance Analyzer</h1>
      <nav className="mt-8 space-y-2">
        {tabs.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setSelectedTab(name)}
            className={`neon-hover flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm ${
              selectedTab === name ? "glass-card text-white" : "text-slate-300 hover:bg-white/10"
            }`}
            type="button"
          >
            <Icon size={16} />
            {name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
