"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { useMounted } from "@/hooks/useMounted";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

export default function CompareView() {
  const { gameScores } = useGameMetrics();
  const { leaderboard } = usePerformanceStore();
  const mounted = useMounted();

  return (
    <section className="space-y-4">
      <article className="glass-card neon-hover p-4">
        <h3 className="text-lg font-semibold">Compare Mode</h3>
        <p className="mt-1 text-sm text-slate-400">Cross-game comparison for performance score and win rate.</p>
        <div className="mt-4 h-80">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gameScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#33415566" />
                <XAxis dataKey="game" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="score" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="winRate" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full animate-pulse rounded-xl bg-white/5" />
          )}
        </div>
      </article>

      <article className="glass-card neon-hover p-4">
        <h4 className="font-semibold">Leaderboard (Realtime)</h4>
        <div className="mt-3 space-y-2 text-sm">
          {leaderboard.slice(0, 8).map((row, index) => (
            <div key={row.id} className="flex items-center justify-between rounded-lg bg-black/25 px-3 py-2">
              <span>#{index + 1} {row.username || "Anonymous"}</span>
              <span className="text-red-300">Score {row.score ?? 0}</span>
              <span className="text-slate-400">WR {row.winRate ?? 0}%</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
