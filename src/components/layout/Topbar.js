"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, Menu, X, Wifi, WifiOff } from "lucide-react";
import { GAME_LIST, getGameConfig } from "@/games/gameConfig";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

export default function Topbar() {
  const {
    selectedGame,
    setSelectedGame,
    range,
    setRange,
    user,
    authLoading,
    notifications,
    removeNotification,
    setSidebarOpen,
    sidebarOpen,
  } = usePerformanceStore();
  const gameConfig = getGameConfig(selectedGame);

  // Auto-dismiss notifications after 5s
  useEffect(() => {
    if (!notifications.length) return;
    const newest = notifications[0];
    const timer = setTimeout(() => removeNotification(newest.id), 5000);
    return () => clearTimeout(timer);
  }, [notifications, removeNotification]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/6 bg-black/40 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="flex items-center justify-between gap-3">

        {/* Left: Mobile menu + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div
                className="h-5 w-1.5 rounded-full shrink-0"
                style={{ background: gameConfig.color, boxShadow: `0 0 8px ${gameConfig.color}` }}
              />
              <h2
                className="truncate text-base font-bold [font-family:var(--font-poppins)] md:text-lg"
                style={{ color: "white" }}
              >
                {gameConfig.name} Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {user ? (
                <>
                  <Wifi size={11} className="text-green-400" />
                  <p className="text-[11px] text-green-400">Live Sync · {user.displayName || user.email?.split("@")[0]}</p>
                </>
              ) : authLoading ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-yellow-400 pulse-ring" />
                  <p className="text-[11px] text-yellow-400">Authenticating...</p>
                </>
              ) : (
                <>
                  <WifiOff size={11} className="text-slate-500" />
                  <p className="text-[11px] text-slate-500">Sign in to sync data</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Game selector */}
          <div className="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 sm:flex">
            <Image
              src={gameConfig.logo}
              alt={`${gameConfig.name} logo`}
              width={18}
              height={18}
              className="h-[18px] w-[18px] object-contain"
            />
            <select
              className="bg-transparent text-sm font-medium outline-none cursor-pointer"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              style={{ color: gameConfig.color }}
            >
              {GAME_LIST.map((game) => (
                <option key={game} value={game} style={{ background: "#100e1a", color: "white" }}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          {/* Range selector */}
          <select
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium outline-none cursor-pointer hidden sm:block"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8" }}
          >
            <option value="7d" style={{ background: "#100e1a" }}>7 Days</option>
            <option value="30d" style={{ background: "#100e1a" }}>30 Days</option>
            <option value="90d" style={{ background: "#100e1a" }}>90 Days</option>
          </select>

          {/* Notification bell */}
          <div className="relative">
            <button
              type="button"
              className="relative rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notification toasts */}
      <div className="fixed right-4 top-16 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border bg-e-panel px-4 py-3 shadow-2xl max-w-xs"
              style={{
                borderColor: n.type === "success" ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)",
              }}
            >
              <span className="shrink-0 text-lg">{n.type === "success" ? "✅" : "❌"}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{n.title}</p>
                <p className="text-xs text-slate-400">{n.message}</p>
              </div>
              <button
                onClick={() => removeNotification(n.id)}
                className="shrink-0 text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </header>
  );
}
