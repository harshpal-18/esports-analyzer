"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Brain,
  Gamepad2,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Trophy,
  Zap,
  User,
  X,
} from "lucide-react";
import { logoutUser } from "@/services/firebase";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { useGameMetrics } from "@/hooks/useGameMetrics";

const tabs = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Games", icon: Gamepad2 },
  { name: "Matches", icon: History },
  { name: "Analytics", icon: BarChart3 },
  { name: "AI Insights", icon: Brain },
  { name: "Leaderboard", icon: Trophy },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { selectedTab, setSelectedTab, user, sidebarOpen, setSidebarOpen } = usePerformanceStore();
  const { tier, summary } = useGameMetrics();

  const handleLogout = async () => {
    await logoutUser();
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="mb-6 flex items-center gap-3 px-2">
        <img
          src="/logo.png"
          alt="StatForge"
          className="h-16 w-16 rounded-2xl"
        />
        <div>
          <h1 className="text-lg font-bold [font-family:var(--font-poppins)] text-gradient-purple">
            StatForge
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Analytics Suite</p>
        </div>
      </div>

      {/* User card */}
      {user && (
        <div className="mb-5 rounded-xl border border-white/8 bg-white/4 p-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="h-9 w-9 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-red-500 text-sm font-bold">
                  {(user.displayName || user.email || "P")[0].toUpperCase()}
                </div>
              )}
              <span
                className="absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                style={{ background: tier?.color + "33", color: tier?.color, border: `1px solid ${tier?.color}66` }}
              >
                {tier?.emoji}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user.displayName || user.email?.split("@")[0] || "Player"}
              </p>
              <p className="text-xs text-slate-500" style={{ color: tier?.color }}>
                {tier?.label} Tier
              </p>
            </div>
          </div>
          {/* Mini stats */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs font-bold text-white">{summary?.totalMatches ?? 0}</p>
              <p className="text-[10px] text-slate-500">Matches</p>
            </div>
            <div>
              <p className="text-xs font-bold text-white">{summary?.averageKd ?? "0.00"}</p>
              <p className="text-[10px] text-slate-500">K/D</p>
            </div>
            <div>
              <p className="text-xs font-bold text-white">{summary?.winRate ?? 0}%</p>
              <p className="text-[10px] text-slate-500">Win%</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {tabs.map(({ name, icon: Icon }) => {
          const isActive = selectedTab === name;
          return (
            <button
              key={name}
              onClick={() => setSelectedTab(name)}
              type="button"
              className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/8 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(239,68,68,0.08))",
                    border: "1px solid rgba(168,85,247,0.2)",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon size={16} className={`relative z-10 shrink-0 ${isActive ? "text-purple-400" : ""}`} />
              <span className="relative z-10">{name}</span>
              {isActive && (
                <div className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      {user && (
        <div className="mt-4 border-t border-white/8 pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] shrink-0 border-r border-white/6 bg-black/30 p-4 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed left-0 top-0 z-50 h-full w-[260px] border-r border-white/8 bg-e-panel p-4 lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-white/10"
              >
                <X size={16} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
