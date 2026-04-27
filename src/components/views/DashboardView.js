"use client";

import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getGameConfig } from "@/games/gameConfig";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { useMounted } from "@/hooks/useMounted";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const tile = "glass-card neon-hover rounded-2xl p-4";

export default function DashboardView() {
  const { summary, trend, recentMatches } = useGameMetrics();
  const { loadingMatches, selectedGame } = usePerformanceStore();
  const mounted = useMounted();
  const gameConfig = getGameConfig(selectedGame);

  return (
    <section className="space-y-4">
      {/* HEADER */}
      <article className="glass-card neon-hover relative overflow-hidden rounded-2xl p-5">
        <Image
          src={gameConfig.banner}
          alt={`${gameConfig.name} banner`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="relative z-10 flex items-center gap-3">
          <Image
            src={gameConfig.logo}
            alt={`${gameConfig.name} logo`}
            width={42}
            height={42}
            className="h-10 w-10 object-contain"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Selected Game
            </p>
            <h3 className="text-xl font-semibold">
              {gameConfig.name}
            </h3>
          </div>
        </div>
      </article>

      {/* STATS */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className={tile}>
          <p className="text-xs text-slate-400">Total Matches</p>
          <p className="text-3xl font-bold">{summary.totalMatches}</p>
        </div>

        <div className={tile}>
          <p className="text-xs text-slate-400">Average K/D</p>
          <p className="text-3xl font-bold">{summary.averageKd}</p>
        </div>

        <div className={tile}>
          <p className="text-xs text-slate-400">Win Rate</p>
          <p className="text-3xl font-bold">{summary.winRate}%</p>
        </div>

        <div className={tile}>
          <p className="text-xs text-slate-400">
            Performance Score
          </p>
          <p className="text-3xl font-bold text-purple-300">
            {summary.performanceScore}
          </p>
        </div>
      </div>

      {loadingMatches && (
        <p className="text-xs text-slate-400">
          Syncing realtime match data...
        </p>
      )}

      {/* CHARTS */}
      <div className="grid gap-4 xl:grid-cols-2">

        {/* LINE CHART */}
        <article className={tile}>
          <h4 className="font-semibold">
            Performance Over Time
          </h4>

          <div className="mt-3 w-full h-[300px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#33415566" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#ef4444"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-xl bg-white/5" />
            )}
          </div>
        </article>

        {/* BAR CHART */}
        <article className={tile}>
          <h4 className="font-semibold">K/D Trend</h4>

          <div className="mt-3 w-full h-[300px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#33415566" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar
                    dataKey="kd"
                    fill="#a855f7"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-xl bg-white/5" />
            )}
          </div>
        </article>
      </div>

      {/* RECENT MATCHES */}
      <article className={tile}>
        <h4 className="font-semibold">Recent Matches</h4>

        <div className="mt-3 space-y-2 text-sm">
          {recentMatches.length === 0 ? (
            <p className="text-slate-400">
              No matches in selected range.
            </p>
          ) : (
            recentMatches.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg bg-black/25 px-3 py-2"
              >
                <span>{m.date}</span>
                <span>
                  Score {m.score || m.damage || m.kd || m.kills}
                </span>
                <span className="text-slate-400">
                  {m.game}
                </span>
              </div>
            ))
          )}
        </div>
      </article>
    </section>
  );
}