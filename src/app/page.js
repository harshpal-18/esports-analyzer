"use client";

import AnalyticsView from "@/components/views/AnalyticsView";
import CompareView from "@/components/views/CompareView";
import DashboardView from "@/components/views/DashboardView";
import GamesView from "@/components/views/GamesView";
import InsightsView from "@/components/views/InsightsView";
import MatchHistoryView from "@/components/views/MatchHistoryView";
import SettingsView from "@/components/views/SettingsView";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileTabs from "@/components/layout/MobileTabs";
import DynamicMatchForm from "@/components/matches/DynamicMatchForm";
import { getGameConfig } from "@/games/gameConfig";
import { usePlatformSync } from "@/hooks/usePlatformSync";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const viewMap = {
  Dashboard: <DashboardView />,
  Games: <GamesView />,
  Matches: <MatchHistoryView />,
  Analytics: <AnalyticsView />,
  Compare: <CompareView />,
  "AI Insights": <InsightsView />,
  Settings: <SettingsView />,
};

export default function Home() {
  const { selectedTab, selectedGame } = usePerformanceStore();
  usePlatformSync();
  const gameConfig = getGameConfig(selectedGame);

  return (
    <div className="min-h-screen" style={{ "--game-color": gameConfig.color }}>
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <MobileTabs />
          <main className="space-y-4 p-4 md:p-6">
            <DynamicMatchForm />
            {viewMap[selectedTab]}
          </main>
        </div>
      </div>
    </div>
  );
}
