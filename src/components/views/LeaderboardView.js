"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Trophy, Search, Medal, Star } from "lucide-react";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { getTier, getBadges } from "@/utils/analytics";

const rankColors = ["#fbbf24", "#94a3b8", "#f97316", "#22d3ee", "#a855f7"];
const rankEmojis = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

function PlayerRow({ entry, rank, currentUid }) {
  const tier = getTier(entry.score);
  const isMe = entry.id === currentUid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.04 }}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
        isMe
          ? "border border-purple-500/30 bg-purple-500/10"
          : "border border-transparent hover:bg-white/4"
      }`}
    >
      {/* Rank */}
      <div className="w-8 shrink-0 text-center">
        {rank <= 3 ? (
          <span className="text-lg">{rankEmojis[rank - 1]}</span>
        ) : (
          <span className="text-sm font-bold text-slate-500">#{rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative shrink-0">
        {entry.avatar ? (
          <img src={entry.avatar} alt={entry.username} className="h-9 w-9 rounded-xl object-cover" />
        ) : (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
            style={{ background: `${tier.color}22`, border: `1px solid ${tier.color}44`, color: tier.color }}
          >
            {(entry.username || "P")[0].toUpperCase()}
          </div>
        )}
        <span
          className="absolute -bottom-1 -right-1 rounded-full text-[10px] leading-none px-1 py-0.5"
          style={{ background: tier.color + "33", color: tier.color, border: `1px solid ${tier.color}50` }}
        >
          {tier.emoji}
        </span>
      </div>

      {/* Name */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-semibold text-white">
            {entry.username || `Player-${entry.id?.slice(0, 5)}`}
          </p>
          {isMe && (
            <span className="rounded-full bg-purple-500/25 px-2 py-0.5 text-[10px] font-bold text-purple-400">
              YOU
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500">{tier.label} · {entry.totalMatches ?? 0} matches</p>
      </div>

      {/* Stats */}
      <div className="hidden items-center gap-6 sm:flex">
        <div className="text-center">
          <p className="text-xs font-bold text-white">{entry.averageKd?.toFixed(2) ?? "0.00"}</p>
          <p className="text-[10px] text-slate-500">K/D</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-white">{entry.winRate?.toFixed(1) ?? "0"}%</p>
          <p className="text-[10px] text-slate-500">Win%</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold [font-family:var(--font-poppins)]" style={{ color: tier.color }}>
            {entry.score ?? 0}
          </p>
          <p className="text-[10px] text-slate-500">Score</p>
        </div>
      </div>

      {/* Mobile score */}
      <div className="sm:hidden text-right shrink-0">
        <p className="text-sm font-bold" style={{ color: tier.color }}>{entry.score ?? 0}</p>
        <p className="text-[10px] text-slate-500">{entry.winRate?.toFixed(0)}% wr</p>
      </div>
    </motion.div>
  );
}

export default function LeaderboardView() {
  const { leaderboard, user } = usePerformanceStore();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");

  const filtered = useMemo(() => {
    let list = [...leaderboard];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((e) => (e.username || "").toLowerCase().includes(q));
    }
    list.sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));
    return list;
  }, [leaderboard, search, sortBy]);

  const myRank = filtered.findIndex((e) => e.id === user?.uid) + 1;

  return (
    <section className="space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
        style={{ borderColor: "rgba(251,191,36,0.2)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/20 border border-yellow-500/30">
              <Trophy size={22} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white [font-family:var(--font-poppins)]">
                Global Leaderboard
              </h3>
              <p className="text-sm text-slate-400">{leaderboard.length} ranked players</p>
            </div>
          </div>

          {myRank > 0 && (
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm">
              <p className="text-xs text-slate-400">Your Rank</p>
              <p className="text-lg font-bold text-gradient-purple">#{myRank}</p>
            </div>
          )}
        </div>

        {/* Top 3 summary */}
        {filtered.length >= 3 && (
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[filtered[1], filtered[0], filtered[2]].map((entry, idx) => {
              if (!entry) return null;
              const positions = [1, 0, 2]; // silver, gold, bronze
              const realPos = positions[idx];
              const tier = getTier(entry.score);
              const heights = ["h-20", "h-28", "h-16"];
              return (
                <div key={entry.id} className={`flex flex-col items-center justify-end rounded-xl bg-white/3 p-3 text-center ${heights[idx]}`}>
                  <span className="text-2xl">{rankEmojis[realPos]}</span>
                  <p className="mt-1 max-w-full truncate text-xs font-semibold text-white">
                    {entry.username?.slice(0, 10) || "Player"}
                  </p>
                  <p className="text-[10px] font-bold" style={{ color: tier.color }}>{entry.score}</p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <div className="flex flex-1 min-w-48 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <Search size={14} className="shrink-0 text-slate-500" />
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none cursor-pointer"
          style={{ color: "#94a3b8", background: "rgba(255,255,255,0.04)" }}
        >
          <option value="score" style={{ background: "#100e1a" }}>Sort: Score</option>
          <option value="winRate" style={{ background: "#100e1a" }}>Sort: Win Rate</option>
          <option value="averageKd" style={{ background: "#100e1a" }}>Sort: K/D</option>
          <option value="totalMatches" style={{ background: "#100e1a" }}>Sort: Matches</option>
        </select>
      </motion.div>

      {/* Leaderboard list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="glass-card divide-y divide-white/4 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <div className="w-8">Rank</div>
          <div className="w-9" />
          <div className="flex-1">Player</div>
          <div className="hidden gap-6 sm:flex">
            <span className="w-12 text-center">K/D</span>
            <span className="w-12 text-center">Win%</span>
            <span className="w-12 text-center">Score</span>
          </div>
          <div className="w-16 text-right sm:hidden">Score</div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Trophy size={32} className="mx-auto text-slate-600" />
            <p className="mt-2 text-sm text-slate-400">
              {search ? "No players found." : "No players on the leaderboard yet. Play more matches!"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/4 p-2 space-y-0">
            {filtered.map((entry, i) => (
              <PlayerRow key={entry.id} entry={entry} rank={i + 1} currentUid={user?.uid} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Tier legend */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h4 className="mb-3 font-semibold text-white text-sm">Performance Tiers</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Bronze", emoji: "🥉", color: "#f97316", range: "0–59" },
            { label: "Silver", emoji: "🥈", color: "#94a3b8", range: "60–99" },
            { label: "Gold",   emoji: "🥇", color: "#fbbf24", range: "100–149" },
            { label: "Platinum", emoji: "🔮", color: "#a78bfa", range: "150–199" },
            { label: "Diamond", emoji: "💎", color: "#60a5fa", range: "200+" },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold"
              style={{ background: `${t.color}15`, border: `1px solid ${t.color}30`, color: t.color }}
            >
              <span>{t.emoji}</span>
              {t.label}
              <span className="text-[10px] opacity-60">{t.range}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
