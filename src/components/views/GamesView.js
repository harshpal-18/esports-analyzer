"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GAME_CONFIGS, GAME_LIST, getGameConfig } from "@/games/gameConfig";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { buildSummary } from "@/utils/analytics";
import { useMemo } from "react";
import { getTier } from "@/utils/analytics";

export default function GamesView() {
  const { selectedGame, setSelectedGame, matches } = usePerformanceStore();

  const gameSummaries = useMemo(() => {
    return GAME_LIST.map((game) => {
      const gm = matches.filter((m) => m.game === game);
      const s = buildSummary(gm);
      const tier = getTier(s.performanceScore);
      return { game, config: GAME_CONFIGS[game], summary: s, tier };
    });
  }, [matches]);

  return (
    <section className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold text-white [font-family:var(--font-poppins)]">Game Profiles</h3>
        <p className="text-sm text-slate-400 mt-0.5">Select a game to view and track its specific analytics</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gameSummaries.map(({ game, config, summary, tier }, i) => {
          const isSelected = selectedGame === game;
          return (
            <motion.button
              key={game}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGame(game)}
              className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-opacity-60 shadow-lg"
                  : "border-white/8 hover:border-white/16"
              }`}
              style={
                isSelected
                  ? {
                      borderColor: config.color + "88",
                      boxShadow: `0 0 30px ${config.color}25, 0 8px 32px rgba(0,0,0,0.4)`,
                      background: `linear-gradient(135deg, ${config.color}10, rgba(255,255,255,0.03))`,
                    }
                  : { background: "rgba(255,255,255,0.03)" }
              }
            >
              {/* Banner background */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <Image src={config.banner} alt="" fill className="object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/85" />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${config.color}22`, border: `1.5px solid ${config.color}44` }}
                    >
                      <Image
                        src={config.logo}
                        alt={game}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">{config.name}</p>
                      <p className="text-xs text-slate-400">{config.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: config.color + "30", color: config.color, border: `1px solid ${config.color}50` }}
                    >
                      Active
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-black/30 p-2 text-center">
                    <p className="text-xs font-bold text-white">{summary.totalMatches}</p>
                    <p className="text-[10px] text-slate-500">Matches</p>
                  </div>
                  <div className="rounded-lg bg-black/30 p-2 text-center">
                    <p className="text-xs font-bold" style={{ color: config.color }}>{summary.averageKd}</p>
                    <p className="text-[10px] text-slate-500">K/D</p>
                  </div>
                  <div className="rounded-lg bg-black/30 p-2 text-center">
                    <p className="text-xs font-bold text-white">{summary.winRate}%</p>
                    <p className="text-[10px] text-slate-500">Win%</p>
                  </div>
                </div>

                {/* Tier */}
                {summary.totalMatches > 0 && (
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: tier.color + "20", color: tier.color, border: `1px solid ${tier.color}30` }}
                    >
                      {tier.emoji} {tier.label}
                    </span>
                    <span className="text-xs text-slate-500">Score: {summary.performanceScore}</span>
                  </div>
                )}

                {/* Tracked stats */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {config.stats.map((s) => (
                    <span
                      key={s}
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: `${config.color}12`, color: config.color }}
                    >
                      {config.labels[s]}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
