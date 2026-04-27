"use client";

import { useMemo, useState } from "react";
import { GAME_CONFIGS } from "@/games/gameConfig";
import { submitMatch } from "@/hooks/usePlatformSync"; // ✅ IMPORTANT
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const defaultByField = {
  kills: 0,
  damage: 0,
  survivalTime: 0,
  rank: 1,
  kd: 1,
  headshot: 0,
  agents: 1,
  accuracy: 0,
  mvps: 0,
  score: 0,
  wins: 1,
  losses: 0,
};

export default function DynamicMatchForm() {
  const { selectedGame, matchSubmitMessage } = usePerformanceStore();

  const [submittingMatch, setSubmittingMatch] = useState(false);
  const [errors, setErrors] = useState([]);

  const config = GAME_CONFIGS[selectedGame];
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // ✅ VALIDATION
  const validate = (payload) => {
    const issues = [];

    if (!payload.date) issues.push("Date is required.");

    config.stats.forEach((field) => {
      if (!Number.isFinite(payload[field])) {
        issues.push(`${config.labels[field]} must be a number.`);
      }
      if (payload[field] < 0) {
        issues.push(`${config.labels[field]} cannot be negative.`);
      }
    });

    if (payload.kd > 10) issues.push("K/D looks unrealistic.");
    if (payload.headshot > 100) issues.push("Headshot % max is 100.");
    if (payload.accuracy > 100) issues.push("Accuracy % max is 100.");

    return issues;
  };

  // ✅ SUBMIT HANDLER
  const onSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget; // ✅ fix reset bug
    const form = new FormData(formElement);

    const payload = {
      game: selectedGame,
      date: form.get("date"),
    };

    config.stats.forEach((field) => {
      payload[field] = Number(form.get(field));
    });

    // ✅ Validate
    const issues = validate(payload);
    if (issues.length > 0) {
      setErrors(issues);
      return;
    }

    setErrors([]);

    try {
      setSubmittingMatch(true);

      console.log("Submitting:", payload);

      const ok = await submitMatch(payload); // ✅ IMPORTANT FIX

      console.log("Saved:", ok);

      if (ok) {
        formElement.reset(); // ✅ safe reset
      }

    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setSubmittingMatch(false);
    }
  };

  return (
    <section className="glass-card neon-hover p-4">
      <h3 className="text-lg font-semibold">
        Add Match ({selectedGame})
      </h3>

      <form
        className="mt-3 grid gap-2 md:grid-cols-3 lg:grid-cols-5"
        onSubmit={onSubmit}
      >
        {/* DATE */}
        <input
          className="rounded-lg bg-black/30 px-3 py-2 text-sm"
          type="date"
          name="date"
          required
          defaultValue={today}
        />

        {/* DYNAMIC INPUTS */}
        {config.stats.map((field) => (
          <input
            key={field}
            className="rounded-lg bg-black/30 px-3 py-2 text-sm"
            type="number"
            step="any"
            name={field}
            placeholder={config.labels[field]}
            defaultValue={defaultByField[field]}
          />
        ))}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={submittingMatch}
          className="rounded-lg bg-e-accent px-3 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {submittingMatch ? "Saving..." : "Save Match"}
        </button>
      </form>

      {/* ERRORS */}
      {errors.length > 0 && (
        <div className="mt-3 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-xs text-red-200">
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}

      {/* STATUS MESSAGE */}
      {matchSubmitMessage && (
        <p className="mt-3 text-xs text-purple-200">
          {matchSubmitMessage}
        </p>
      )}
    </section>
  );
}