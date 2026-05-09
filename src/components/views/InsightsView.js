"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info, Zap, Target, Shield, Activity } from "lucide-react";
import { useGameMetrics } from "@/hooks/useGameMetrics";

const insightConfig = {
  success: { icon: CheckCircle, bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400", glow: "#4ade80" },
  warning: { icon: AlertTriangle, bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400", glow: "#fbbf24" },
  danger:  { icon: AlertTriangle, bg: "bg-red-500/10",    border: "border-red-500/20",    text: "text-red-400",    glow: "#f87171" },
  info:    { icon: Info,          bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   text: "text-cyan-400",   glow: "#22d3ee" },
};

const statCards = [
  { key: "consistencyScore",     label: "Consistency",        icon: Activity, unit: "%", color: "#22d3ee", desc: "Performance stability" },
  { key: "aggressionIndex",      label: "Aggression",         icon: Zap,      unit: "%", color: "#f97316", desc: "Offensive play style" },
  { key: "survivalEfficiency",   label: "Survival",           icon: Shield,   unit: "%", color: "#4ade80", desc: "Time alive per match" },
  { key: "headshotEfficiency",   label: "Headshot Acc.",      icon: Target,   unit: "%", color: "#ef4444", desc: "Precision shots" },
];

export default function InsightsView() {
  const { insights, weeklySummary, trendDirection, summary, radarData, badges, tier } = useGameMetrics();

  const TrendIcon = trendDirection === "improving" ? TrendingUp : trendDirection === "declining" ? TrendingDown : Activity;
  const trendColor = trendDirection === "improving" ? "#4ade80" : trendDirection === "declining" ? "#f87171" : "#94a3b8";

  return (
    <section className="space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
        style={{ borderColor: "rgba(168,85,247,0.2)" }}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-500/30 glow-purple">
            <Brain size={22} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white [font-family:var(--font-poppins)]">
              AI Performance Coach
            </h3>
            <p className="mt-0.5 text-sm text-slate-400">
              Rule-based intelligence analyzing your gameplay patterns and generating personalized recommendations.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold" style={{ color: trendColor }}>
            <TrendIcon size={14} />
            {trendDirection}
          </div>
        </div>

        {/* Weekly summary */}
        <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm text-purple-200">
          📊 {weeklySummary}
        </div>
      </motion.div>

      {/* Advanced stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, unit, color, desc }, i) => {
          const value = summary[key] ?? 0;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `${color}18`, border: `1px solid ${color}33` }}
                >
                  <Icon size={15} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{label}</p>
                  <p className="text-[10px] text-slate-500">{desc}</p>
                </div>
              </div>
              <p className="text-2xl font-bold [font-family:var(--font-poppins)]" style={{ color }}>
                {value}{unit}
              </p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(value, 100)}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}60` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Brain size={16} className="text-purple-400" />
          Smart Recommendations
        </h4>
        <div className="space-y-2.5">
          <AnimatePresence>
            {insights.map((insight, i) => {
              const cfg = insightConfig[insight.type] || insightConfig.info;
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${cfg.bg} ${cfg.border}`}
                >
                  <span className="text-xl shrink-0">{insight.icon}</span>
                  <p className="text-sm text-slate-200">{insight.text}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Badges & Tier */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-4">Your Achievements</h4>
        {badges.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 py-6 text-center">
            <p className="text-2xl">🎯</p>
            <p className="mt-2 text-sm text-slate-400">Play more matches to unlock badges!</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {badges.map((b) => (
              <motion.div
                key={b.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                style={{ background: `${b.color}15`, border: `1px solid ${b.color}30`, color: b.color }}
              >
                <span className="text-xl">{b.emoji}</span>
                {b.label}
              </motion.div>
            ))}
          </div>
        )}

        {tier && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border p-4" style={{ borderColor: `${tier.color}30`, background: `${tier.color}10` }}>
            <span className="text-3xl">{tier.emoji}</span>
            <div>
              <p className="font-bold text-white" style={{ color: tier.color }}>{tier.label} Tier</p>
              <p className="text-xs text-slate-400">Performance score: {summary.performanceScore}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Improvement tips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />
          Daily Improvement Plan
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { title: "🎯 Aim Training", tip: "10 minutes on aim trainer before each session. Focus on flick shots and tracking." },
            { title: "📍 Map Awareness", tip: "Study top 3 maps for your game. Learn rotation timings and power positions." },
            { title: "🧠 VOD Review", tip: "Watch 1 replay per day. Identify 3 mistakes and how to avoid them next time." },
            { title: "💪 Mental Game", tip: "Set a 3-game limit per session. Take breaks to maintain peak cognitive performance." },
          ].map((tip) => (
            <div key={tip.title} className="rounded-xl bg-white/3 p-4">
              <p className="font-semibold text-sm text-white">{tip.title}</p>
              <p className="mt-1 text-xs text-slate-400">{tip.tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
