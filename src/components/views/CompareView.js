"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GAME_CONFIGS } from "@/games/gameConfig";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { buildSummary } from "@/utils/analytics";
import {
  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useMounted } from "@/hooks/useMounted";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-purple-500/20 bg-e-panel/95 p-3 text-xs backdrop-blur-xl">
      <p className="mb-1 font-semibold text-slate-300">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

export default function CompareView() {
  const { matches } = usePerformanceStore();
  const mounted = useMounted();
  const [gameA, setGameA] = useState("BGMI");
  const [gameB, setGameB] = useState("Valorant");

  const games = Object.keys(GAME_CONFIGS);

  const { summaryA, summaryB, compareData } = useMemo(() => {
    const summaryA = buildSummary(matches.filter((m) => m.game === gameA));
    const summaryB = buildSummary(matches.filter((m) => m.game === gameB));
    const compareData = [
      { metric: "K/D ×10", [gameA]: +(summaryA.averageKd * 10).toFixed(1), [gameB]: +(summaryB.averageKd * 10).toFixed(1) },
      { metric: "Win Rate", [gameA]: summaryA.winRate, [gameB]: summaryB.winRate },
      { metric: "Score", [gameA]: summaryA.performanceScore, [gameB]: summaryB.performanceScore },
      { metric: "Consistency", [gameA]: summaryA.consistencyScore, [gameB]: summaryB.consistencyScore },
      { metric: "Aggression", [gameA]: summaryA.aggressionIndex, [gameB]: summaryB.aggressionIndex },
    ];
    return { summaryA, summaryB, compareData };
  }, [matches, gameA, gameB]);

  const colorA = GAME_CONFIGS[gameA]?.color || "#a855f7";
  const colorB = GAME_CONFIGS[gameB]?.color || "#22d3ee";

  const metrics = [
    { label: "Matches", a: summaryA.totalMatches, b: summaryB.totalMatches },
    { label: "Avg K/D", a: summaryA.averageKd, b: summaryB.averageKd },
    { label: "Win Rate", a: `${summaryA.winRate}%`, b: `${summaryB.winRate}%` },
    { label: "Performance Score", a: summaryA.performanceScore, b: summaryB.performanceScore },
    { label: "Consistency", a: `${summaryA.consistencyScore}%`, b: `${summaryB.consistencyScore}%` },
  ];

  return (
    <section className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold text-white [font-family:var(--font-poppins)]">Game Comparison</h3>
        <p className="text-sm text-slate-400 mt-0.5">Compare your performance across different games</p>
      </motion.div>

      {/* Game selectors */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Game A", value: gameA, setter: setGameA, color: colorA },
            { label: "Game B", value: gameB, setter: setGameB, color: colorB },
          ].map(({ label, value, setter, color }) => (
            <div key={label}>
              <p className="mb-1.5 text-xs font-medium text-slate-400">{label}</p>
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full rounded-xl border px-3 py-2.5 text-sm font-semibold outline-none cursor-pointer"
                style={{ borderColor: color + "44", background: color + "10", color }}
              >
                {games.map((g) => (
                  <option key={g} value={g} style={{ background: "#100e1a", color: "white" }}>{g}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Comparison bars chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-4">Head-to-Head</h4>
        <div className="h-[280px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="metric" stroke="#475569" tick={{ fontSize: 10 }} />
                <YAxis stroke="#475569" tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey={gameA} fill={colorA} radius={[5, 5, 0, 0]} />
                <Bar dataKey={gameB} fill={colorB} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="skeleton h-full rounded-xl" />
          )}
        </div>
      </motion.div>

      {/* Side-by-side metrics */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-4">Metric Comparison</h4>
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-3 text-center mb-3">
            <p className="text-sm font-bold truncate" style={{ color: colorA }}>{gameA}</p>
            <p className="text-xs text-slate-500">Metric</p>
            <p className="text-sm font-bold truncate" style={{ color: colorB }}>{gameB}</p>
          </div>
          {metrics.map(({ label, a, b }) => {
            const numA = parseFloat(String(a)) || 0;
            const numB = parseFloat(String(b)) || 0;
            const winner = numA > numB ? "a" : numB > numA ? "b" : "tie";
            return (
              <div key={label} className="grid grid-cols-3 items-center gap-2 rounded-xl bg-white/3 px-4 py-2.5 text-sm">
                <p className={`font-bold text-center ${winner === "a" ? "" : "opacity-60"}`} style={{ color: colorA }}>
                  {a} {winner === "a" && "✓"}
                </p>
                <p className="text-center text-xs text-slate-500">{label}</p>
                <p className={`font-bold text-center ${winner === "b" ? "" : "opacity-60"}`} style={{ color: colorB }}>
                  {b} {winner === "b" && "✓"}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
