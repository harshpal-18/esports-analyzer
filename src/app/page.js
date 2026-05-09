"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnalyticsView from "@/components/views/AnalyticsView";
import CompareView from "@/components/views/CompareView";
import DashboardView from "@/components/views/DashboardView";
import GamesView from "@/components/views/GamesView";
import InsightsView from "@/components/views/InsightsView";
import LeaderboardView from "@/components/views/LeaderboardView";
import MatchHistoryView from "@/components/views/MatchHistoryView";
import SettingsView from "@/components/views/SettingsView";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileTabs from "@/components/layout/MobileTabs";
import DynamicMatchForm from "@/components/matches/DynamicMatchForm";
import AuthPage from "@/components/auth/AuthPage";
import LandingPage from "@/components/landing/LandingPage";
import { getGameConfig } from "@/games/gameConfig";
import { usePlatformSync } from "@/hooks/usePlatformSync";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const viewMap = {
  Dashboard: DashboardView,
  Games: GamesView,
  Matches: MatchHistoryView,
  Analytics: AnalyticsView,
  Compare: CompareView,
  "AI Insights": InsightsView,
  Leaderboard: LeaderboardView,
  Settings: SettingsView,
};

export default function Home() {
  const { selectedTab, selectedGame, user, authLoading } = usePerformanceStore();
  const [showAuth, setShowAuth] = useState(false);
  usePlatformSync();

  const exitDemo = () => {
    sessionStorage.removeItem("statforge_demo");
    window.location.reload();
  };

  const gameConfig = getGameConfig(selectedGame);
  const ActiveView = viewMap[selectedTab] || DashboardView;

  // ── Loading ──────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-e-bg">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="StatForge"
            className="h-20 w-20 rounded-2xl mx-auto"
          />
          <p className="text-gradient-purple text-xl font-bold [font-family:var(--font-poppins)]">StatForge</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                className="h-2.5 w-2.5 rounded-full bg-purple-500"
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Initializing your analytics suite...</p>
        </div>
      </div>
    );
  }

  // ── Auth screen ───────────────────────────────────────────────────────────
  if (!user && showAuth) {
    return <AuthPage />;
  }

  // ── Landing ───────────────────────────────────────────────────────────────
  if (!user) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  // ── Main App ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ "--game-color": gameConfig.color }}>
      {/* Demo mode banner */}
      {user?.isDemo && (
        <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-gradient-to-r from-cyan-900/90 to-purple-900/90 px-4 py-2 text-xs text-cyan-200 backdrop-blur border-b border-cyan-500/20">
          <span>⚡ <strong>Demo Mode</strong> — 30 pre-seeded matches loaded. Data is local only and resets on refresh.</span>
          <button
            onClick={exitDemo}
            className="rounded-lg border border-cyan-500/40 px-3 py-1 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
          >
            Exit Demo
          </button>
        </div>
      )}
      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <MobileTabs />
          <main className="flex-1 space-y-4 p-4 md:p-6">
            <DynamicMatchForm />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <ActiveView />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
