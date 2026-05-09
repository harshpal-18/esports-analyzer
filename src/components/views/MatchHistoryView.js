"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { GAME_CONFIGS, GAME_LIST } from "@/games/gameConfig";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { getMatchKd } from "@/utils/analytics";
import { deleteMatch } from "@/services/firestore";
import { getTier } from "@/utils/analytics";

export default function MatchHistoryView() {
  const { keyStat } = useGameMetrics();
  const { selectedGame, matches, range, user } = usePerformanceStore();
  const [gameFilter, setGameFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const rows = useMemo(() => {
    const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
    const boundary = new Date();
    boundary.setDate(boundary.getDate() - days);

    let list = matches.filter((m) => new Date(m.date) >= boundary);
    if (gameFilter === "Selected") list = list.filter((m) => m.game === selectedGame);
    else if (gameFilter !== "All") list = list.filter((m) => m.game === gameFilter);
    if (search) list = list.filter((m) => m.game.toLowerCase().includes(search.toLowerCase()) || m.date.includes(search));
    return list;
  }, [gameFilter, matches, range, selectedGame, search]);

  const activeMatch = rows.find((r) => r.id === activeId);

  const handleDelete = async (matchId) => {
    if (!user?.uid) return;
    setDeletingId(matchId);
    try {
      await deleteMatch(user.uid, matchId);
      setActiveId(null);
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-4">
      {/* Header + controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white [font-family:var(--font-poppins)]">Match History</h3>
            <p className="text-sm text-slate-400 mt-0.5">{rows.length} matches in range</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Search */}
          <div className="flex flex-1 min-w-44 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Search size={13} className="text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Search by game or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600"
            />
          </div>
          {/* Game filter */}
          <select
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none cursor-pointer"
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
            style={{ color: "#94a3b8", background: "rgba(255,255,255,0.04)" }}
          >
            <option value="All" style={{ background: "#100e1a" }}>All Games</option>
            <option value="Selected" style={{ background: "#100e1a" }}>Selected Game</option>
            {GAME_LIST.map((g) => (
              <option key={g} value={g} style={{ background: "#100e1a" }}>{g}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {["Date", "Game", "K/D", "Wins", "Key Stat", "Result", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <span className="text-2xl block mb-2">🎮</span>
                    No matches found. Try adjusting filters or add a new match.
                  </td>
                </tr>
              ) : (
                rows.map((m, i) => {
                  const gc = GAME_CONFIGS[m.game];
                  const kd = getMatchKd(m);
                  const won = (m.wins ?? 0) > 0;
                  const tier = getTier(kd * 40);
                  return (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={`transition-colors hover:bg-white/3 ${activeId === m.id ? "bg-purple-500/8" : ""}`}
                    >
                      <td className="px-4 py-3 text-slate-400 text-xs">{m.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {gc?.logo && (
                            <Image
                              src={gc.logo}
                              alt={m.game}
                              width={16}
                              height={16}
                              className="h-4 w-4 object-contain"
                            />
                          )}
                          <span
                            className="text-xs font-semibold"
                            style={{ color: gc?.color }}
                          >
                            {m.game}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="font-bold"
                          style={{ color: kd >= 2 ? "#4ade80" : kd >= 1 ? "#fbbf24" : "#f87171" }}
                        >
                          {kd}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{m.wins ?? 0}</td>
                      <td className="px-4 py-3 text-slate-300">
                        {m[gc?.keyStat ?? keyStat] ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            won ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {won ? "Win" : "Loss"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="rounded-lg p-1.5 text-slate-500 transition-all hover:bg-purple-500/15 hover:text-purple-400"
                            onClick={() => setActiveId(activeId === m.id ? null : m.id)}
                          >
                            <Star size={13} />
                          </button>
                          <button
                            type="button"
                            disabled={deletingId === m.id}
                            className="rounded-lg p-1.5 text-slate-500 transition-all hover:bg-red-500/15 hover:text-red-400 disabled:opacity-40"
                            onClick={() => handleDelete(m.id)}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Match detail drawer */}
        {activeMatch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-purple-500/20 bg-purple-500/5 px-5 py-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-white">Match Details — {activeMatch.date}</p>
              <button
                type="button"
                className="text-xs text-slate-400 hover:text-white"
                onClick={() => setActiveId(null)}
              >
                Close ✕
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {Object.entries(activeMatch)
                .filter(([k]) => !["id", "createdAt", "updatedAt", "game"].includes(k))
                .map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">{k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{String(v)}</p>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
