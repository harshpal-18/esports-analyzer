"use client";

import Image from "next/image";
import { GAME_LIST, getGameConfig } from "@/games/gameConfig";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { hasFirebaseConfig } from "@/services/firebase";

export default function Topbar() {
  const { selectedGame, setSelectedGame, range, setRange, user } = usePerformanceStore();
  const gameConfig = getGameConfig(selectedGame);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/45 px-4 py-4 backdrop-blur-xl md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">Unified analytics for competitive gamers</p>
          <h2 className="text-xl font-semibold [font-family:var(--font-heading)] md:text-2xl">{gameConfig.name} Command Dashboard</h2>
          <p className="mt-1 text-xs text-purple-200">
            {hasFirebaseConfig ? `Cloud Sync: ${user ? "Connected" : "Signing in..."}` : "Cloud Sync: Configure Firebase env"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/35 px-2">
            <Image src={gameConfig.logo} alt={`${gameConfig.name} logo`} width={20} height={20} className="h-5 w-5 object-contain" />
          <select
            className="rounded-lg bg-transparent px-2 py-2 text-sm outline-none"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            {GAME_LIST.map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
          </div>
          <select className="rounded-lg border border-white/20 bg-black/35 px-3 py-2 text-sm" value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>
    </header>
  );
}
