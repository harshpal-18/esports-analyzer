"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { GAME_CONFIGS } from "@/games/gameConfig";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { useMounted } from "@/hooks/useMounted";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const colors = ["#ef4444", "#a855f7", "#f97316", "#22d3ee", "#f43f5e"];

export default function AnalyticsView() {
  const { scoped } = useGameMetrics();
  const { selectedGame } = usePerformanceStore();
  const mounted = useMounted();
  const config = GAME_CONFIGS[selectedGame];
  const exportRef = useRef(null);

  const pieData = config.stats.map((stat, idx) => ({
    name: config.labels[stat],
    value:
      scoped.reduce((acc, m) => acc + Number(m[stat] || 0), 0) ||
      idx + 1,
  }));

  const exportPdf = async () => {
    if (!exportRef.current) return;

    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = 190;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, width, height);
    pdf.save(
      `analytics-${selectedGame.toLowerCase().replace(/\s+/g, "-")}.pdf`
    );
  };

  return (
    <section
      className="grid gap-4 xl:grid-cols-2"
      ref={exportRef}
    >
      {/* CHART CARD */}
      <article className="glass-card neon-hover relative overflow-hidden p-4">
        <Image
          src={config.banner}
          alt={`${config.name} banner`}
          fill
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">
              Game-Specific Analytics
            </h3>
            <button
              type="button"
              className="rounded-lg bg-purple-500/80 px-3 py-1.5 text-xs font-semibold"
              onClick={exportPdf}
            >
              Export PDF
            </button>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Strength vs weakness by stat contribution for {selectedGame}.
          </p>

          {/* ✅ FIXED CHART CONTAINER */}
          <div className="mt-4 w-full h-[300px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-xl bg-white/5" />
            )}
          </div>
        </div>
      </article>

      {/* BREAKDOWN CARD */}
      <article className="glass-card neon-hover p-4">
        <h3 className="text-lg font-semibold">
          Strength / Weakness Breakdown
        </h3>

        <div className="mt-3 space-y-2 text-sm">
          {config.stats.map((stat) => {
            const avg = scoped.length
              ? scoped.reduce(
                  (a, m) => a + Number(m[stat] || 0),
                  0
                ) / scoped.length
              : 0;

            const status =
              avg >= 60 || avg >= 2
                ? "Strong"
                : avg >= 1
                ? "Stable"
                : "Needs Improvement";

            return (
              <div
                key={stat}
                className="rounded-lg bg-black/25 p-3"
              >
                <p className="font-medium">
                  {config.labels[stat]}
                </p>
                <p className="text-slate-400">
                  Average: {avg.toFixed(2)} | Recommendation:{" "}
                  {status}
                </p>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}