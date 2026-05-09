"use client";

import { useMemo } from "react";
import {
  buildInsights,
  buildRadarData,
  buildSummary,
  buildTrend,
  buildWeeklySummary,
  getBadges,
  getTier,
} from "@/utils/analytics";
import { GAME_CONFIGS } from "@/games/gameConfig";
import { usePerformanceStore } from "./usePerformanceStore";

export function useGameMetrics() {
  const { matches, selectedGame, range } = usePerformanceStore();

  return useMemo(() => {
    const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
    const boundary = new Date();
    boundary.setDate(boundary.getDate() - days);

    const scoped = matches.filter(
      (m) => m.game === selectedGame && new Date(m.date) >= boundary
    );

    const allGameMatches = matches.filter((m) => new Date(m.date) >= boundary);

    const summary = buildSummary(scoped);
    const trend = buildTrend(scoped);
    const recentMatches = scoped.slice(0, 10);
    const insights = buildInsights(summary, scoped);
    const weeklySummary = buildWeeklySummary(scoped);
    const radarData = buildRadarData(summary);
    const tier = getTier(summary.performanceScore);
    const badges = getBadges(summary);

    const trendDirection =
      trend.length >= 2
        ? trend[trend.length - 1].score >= trend[0].score
          ? "improving"
          : "declining"
        : "stable";

    const gameScores = [...new Set(matches.map((m) => m.game))].map((game) => {
      const gm = matches.filter((m) => m.game === game && new Date(m.date) >= boundary);
      const s = buildSummary(gm);
      return { game, score: s.performanceScore, winRate: s.winRate, totalMatches: gm.length };
    });

    const keyStat = GAME_CONFIGS[selectedGame]?.keyStat;

    // Monthly aggregation for trend
    const monthlyTrend = (() => {
      const map = {};
      [...matches]
        .filter((m) => m.game === selectedGame)
        .forEach((m) => {
          const month = m.date?.slice(0, 7);
          if (!month) return;
          if (!map[month]) map[month] = [];
          map[month].push(m);
        });
      return Object.entries(map)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, ms]) => {
          const s = buildSummary(ms);
          return { month, score: s.performanceScore, winRate: s.winRate, kd: s.averageKd };
        });
    })();

    return {
      scoped,
      summary,
      trend,
      monthlyTrend,
      recentMatches,
      insights,
      gameScores,
      keyStat,
      weeklySummary,
      trendDirection,
      radarData,
      tier,
      badges,
    };
  }, [matches, selectedGame, range]);
}
