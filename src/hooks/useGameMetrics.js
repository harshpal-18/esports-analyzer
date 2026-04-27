"use client";

import { useMemo } from "react";
import { buildInsights, buildSummary, buildTrend, buildWeeklySummary } from "@/utils/analytics";
import { GAME_CONFIGS } from "@/games/gameConfig";
import { usePerformanceStore } from "./usePerformanceStore";

export function useGameMetrics() {
  const { matches, selectedGame, range } = usePerformanceStore();

  return useMemo(() => {
    const days = range === "7d" ? 7 : 30;
    const boundary = new Date();
    boundary.setDate(boundary.getDate() - days);

    const scoped = matches.filter((m) => m.game === selectedGame && new Date(m.date) >= boundary);
    const summary = buildSummary(scoped);
    const trend = buildTrend(scoped);
    const recentMatches = scoped.slice(0, 5);
    const insights = buildInsights(summary);
    const weeklySummary = buildWeeklySummary(scoped);
    const trendDirection =
      trend.length >= 2 ? (trend[trend.length - 1].score >= trend[0].score ? "improving" : "declining") : "stable";

    const gameScores = [...new Set(matches.map((m) => m.game))].map((game) => {
      const gameMatches = matches.filter((m) => m.game === game && new Date(m.date) >= boundary);
      const s = buildSummary(gameMatches);
      return { game, score: s.performanceScore, winRate: s.winRate };
    });

    const keyStat = GAME_CONFIGS[selectedGame]?.keyStat;

    return { scoped, summary, trend, recentMatches, insights, gameScores, keyStat, weeklySummary, trendDirection };
  }, [matches, selectedGame, range]);
}
