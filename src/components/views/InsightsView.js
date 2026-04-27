"use client";

import { useGameMetrics } from "@/hooks/useGameMetrics";

export default function InsightsView() {
  const { insights, weeklySummary, trendDirection } = useGameMetrics();

  return (
    <section className="glass-card neon-hover p-4">
      <h3 className="text-lg font-semibold">AI Insights</h3>
      <p className="mt-1 text-sm text-slate-400">Trend-based recommendations generated from your current game profile.</p>
      <div className="mt-4 rounded-lg border border-purple-400/30 bg-purple-500/10 p-3 text-sm text-purple-100">
        {weeklySummary}
      </div>
      <div className="mt-2 rounded-lg border border-white/10 bg-black/25 p-3 text-sm">
        Trend status: <span className="font-semibold capitalize">{trendDirection}</span>
      </div>
      <div className="mt-4 space-y-2">
        {insights.map((tip) => (
          <div key={tip} className="rounded-lg border border-white/10 bg-black/25 p-3 text-sm">
            {tip}
          </div>
        ))}
      </div>
    </section>
  );
}
