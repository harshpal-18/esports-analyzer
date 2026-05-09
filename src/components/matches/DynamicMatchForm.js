"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { GAME_CONFIGS } from "@/games/gameConfig";
import { submitMatch } from "@/hooks/usePlatformSync";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const defaultByField = {
  kills: 0, deaths: 0, damage: 0, survivalTime: 20, rank: 1,
  kd: 1, headshot: 0, agents: 1, accuracy: 0, mvps: 0,
  score: 0, wins: 0, losses: 0,
};

export default function DynamicMatchForm() {
  const { selectedGame, matchSubmitMessage, user } = usePerformanceStore();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const config = GAME_CONFIGS[selectedGame];
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const validate = (payload) => {
    const issues = [];
    if (!payload.date) issues.push("Date is required.");
    config.stats.forEach((field) => {
      if (!Number.isFinite(payload[field])) issues.push(`${config.labels[field]} must be a number.`);
      if (payload[field] < 0) issues.push(`${config.labels[field]} cannot be negative.`);
    });
    if ((payload.headshot || 0) > 100) issues.push("Headshot % max is 100.");
    if ((payload.accuracy || 0) > 100) issues.push("Accuracy % max is 100.");
    return issues;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const payload = { game: selectedGame, date: form.get("date") };
    config.stats.forEach((field) => { payload[field] = Number(form.get(field)); });

    const issues = validate(payload);
    if (issues.length > 0) { setErrors(issues); return; }
    setErrors([]);

    setSubmitting(true);
    try {
      const ok = await submitMatch(payload);
      if (ok) { formElement.reset(); setOpen(false); }
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="glass-card p-4 text-center">
        <p className="text-sm text-slate-400">🔒 Sign in to log matches to the cloud</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/3"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: config.color + "20", border: `1px solid ${config.color}40` }}
          >
            <Plus size={14} style={{ color: config.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Log Match</p>
            <p className="text-xs text-slate-500">{config.name} · {config.stats.length} stats</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-slate-400" />
        </motion.div>
      </button>

      {/* Form */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mx-4 mb-4 rounded-xl border p-4"
              style={{ borderColor: config.color + "22", background: config.color + "08" }}
            >
              <form onSubmit={onSubmit}>
                <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {/* Date */}
                  <div>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">Date</p>
                    <input
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-purple-500/40 transition-colors"
                      type="date"
                      name="date"
                      required
                      defaultValue={today}
                      style={{ colorScheme: "dark" }}
                    />
                  </div>

                  {/* Dynamic inputs */}
                  {config.stats.map((field) => (
                    <div key={field}>
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        {config.labels[field]}
                      </p>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-purple-500/40 transition-colors"
                        type="number"
                        step="any"
                        name={field}
                        placeholder="0"
                        defaultValue={config.defaults?.[field] ?? defaultByField[field] ?? 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Errors */}
                <AnimatePresence>
                  {errors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300 space-y-0.5"
                    >
                      {errors.map((e) => <p key={e}>⚠ {e}</p>)}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-game flex items-center gap-2 disabled:opacity-50"
                    style={{ "--game-color": config.color }}
                  >
                    {submitting ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-current/30 border-t-current animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        Save Match
                      </>
                    )}
                  </button>
                  {matchSubmitMessage && (
                    <p className="text-xs text-purple-300">{matchSubmitMessage}</p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}