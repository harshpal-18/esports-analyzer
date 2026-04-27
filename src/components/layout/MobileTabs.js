"use client";

import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const tabs = ["Dashboard", "Games", "Matches", "Analytics", "Compare", "AI Insights", "Settings"];

export default function MobileTabs() {
  const { selectedTab, setSelectedTab } = usePerformanceStore();
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto border-b border-white/10 bg-black/30 px-4 py-3 lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setSelectedTab(tab)}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
            selectedTab === tab ? "bg-purple-500/80 text-white" : "bg-white/8 text-slate-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
