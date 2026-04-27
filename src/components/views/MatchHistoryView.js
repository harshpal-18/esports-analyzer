"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GAME_CONFIGS, GAME_LIST } from "@/games/gameConfig";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { getMatchKd } from "@/utils/analytics";

export default function MatchHistoryView() {
  const { keyStat } = useGameMetrics();
  const { selectedGame, matches, range } = usePerformanceStore();
  const [gameFilter, setGameFilter] = useState("All");
  const [activeId, setActiveId] = useState(null);

  const rows = useMemo(() => {
    const days = range === "7d" ? 7 : 30;
    const boundary = new Date();
    boundary.setDate(boundary.getDate() - days);
    const byDate = matches.filter((m) => new Date(m.date) >= boundary);
    if (gameFilter === "All") return byDate;
    if (gameFilter === "Selected") return byDate.filter((m) => m.game === selectedGame);
    return byDate.filter((m) => m.game === gameFilter);
  }, [gameFilter, matches, range, selectedGame]);

  const activeMatch = rows.find((r) => r.id === activeId);
  const keyLabel = GAME_CONFIGS[selectedGame]?.labels[keyStat];

  return (
    <section className="glass-card neon-hover p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Match History</h3>
          <p className="mt-1 text-sm text-slate-400">Realtime matches from Firestore filtered by date range.</p>
        </div>
        <select className="rounded-lg bg-black/30 px-3 py-2 text-sm" value={gameFilter} onChange={(e) => setGameFilter(e.target.value)}>
          <option value="All">All Games</option>
          <option value="Selected">Selected Game</option>
          {GAME_LIST.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-2">Date</th>
              <th className="pb-2">Game</th>
              <th className="pb-2">K/D</th>
              <th className="pb-2">Wins</th>
              <th className="pb-2">Key Stat</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((m) => (
              <tr key={m.id}>
                <td className="py-2">{m.date}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={GAME_CONFIGS[m.game]?.logo}
                      alt={`${m.game} logo`}
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                    />
                    <span>{m.game}</span>
                  </div>
                </td>
                <td className="py-2">{getMatchKd(m)}</td>
                <td className="py-2">{m.wins ?? 0}</td>
                <td className="py-2">{m[GAME_CONFIGS[m.game]?.keyStat ?? keyStat] ?? "-"}</td>
                <td className="py-2">
                  <button type="button" className="text-purple-300 hover:text-purple-100" onClick={() => setActiveId(m.id)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activeMatch && (
        <div className="mt-3 rounded-lg border border-purple-400/30 bg-black/30 p-3 text-sm">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Match Details - {activeMatch.date}</p>
            <button type="button" className="text-xs text-slate-300 hover:text-white" onClick={() => setActiveId(null)}>
              Close
            </button>
          </div>
          <p className="mt-2 text-slate-300">
            {activeMatch.game} | K/D {getMatchKd(activeMatch)} | Wins {activeMatch.wins ?? 0}
          </p>
          <p className="text-slate-400">
            {GAME_CONFIGS[activeMatch.game]?.labels[GAME_CONFIGS[activeMatch.game]?.keyStat] ?? keyLabel}:{" "}
            {activeMatch[GAME_CONFIGS[activeMatch.game]?.keyStat ?? keyStat] ?? "-"}
          </p>
        </div>
      )}
    </section>
  );
}
