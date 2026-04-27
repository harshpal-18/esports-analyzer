"use client";

import Image from "next/image";
import { GAME_CONFIGS, GAME_LIST } from "@/games/gameConfig";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { buildSummary } from "@/utils/analytics";

export default function GamesView() {
  const { selectedGame, setSelectedGame, matches } = usePerformanceStore();
  const config = GAME_CONFIGS[selectedGame];

  return (
    <section className="space-y-4">
      <article className="glass-card neon-hover p-4">
        <h3 className="text-lg font-semibold">Supported Games Module</h3>
        <p className="mt-1 text-sm text-slate-400">Dynamic fields and image identity per game configuration.</p>
      </article>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {GAME_LIST.map((game) => {
          const gameConfig = GAME_CONFIGS[game];
          const gameSummary = buildSummary(matches.filter((m) => m.game === game));
          const isSelected = selectedGame === game;

          return (
            <button
              key={game}
              type="button"
              onClick={() => setSelectedGame(game)}
              className={`glass-card neon-hover group relative overflow-hidden p-4 text-left transition ${
                isSelected ? "ring-1 ring-white/35" : ""
              }`}
              style={{ boxShadow: `0 0 0 1px ${gameConfig.color}33, 0 0 30px ${gameConfig.color}22` }}
            >
              <Image src={gameConfig.banner} alt={`${gameConfig.name} banner`} fill className="object-cover opacity-15 transition-opacity duration-300 group-hover:opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <Image src={gameConfig.logo} alt={`${gameConfig.name} logo`} width={40} height={40} className="h-10 w-10 object-contain" />
                  <div>
                    <p className="font-semibold">{gameConfig.name}</p>
                    <p className="text-xs text-slate-300">{gameConfig.stats.length} tracked metrics</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded bg-black/35 p-2">Matches: {gameSummary.totalMatches}</div>
                  <div className="rounded bg-black/35 p-2">K/D: {gameSummary.averageKd}</div>
                  <div className="rounded bg-black/35 p-2">WR: {gameSummary.winRate}%</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <article className="glass-card neon-hover p-4">
        <h4 className="font-semibold">{config.name} Tracked Fields</h4>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {config.stats.map((stat) => (
            <div key={stat} className="rounded-lg bg-black/25 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Tracked Field</p>
              <p className="mt-1 font-semibold">{config.labels[stat]}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
