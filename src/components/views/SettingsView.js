"use client";

import { useState } from "react";
import { savePreferences } from "@/hooks/usePlatformSync";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { hasFirebaseConfig } from "@/services/firebase";

export default function SettingsView() {
  const { preferences, setPreferences, prefsSaveMessage } = usePerformanceStore();
  const [darkMode, setDarkMode] = useState(preferences.darkMode ?? true);

  const onSave = async () => {
    const payload = { ...preferences, darkMode };
    setPreferences(payload);
    await savePreferences(payload);
    if (darkMode) document.body.classList.remove("light");
    else document.body.classList.add("light");
  };

  return (
    <section className="space-y-4">
      <article className="glass-card neon-hover p-4">
        <h3 className="text-lg font-semibold">Settings & Cloud Sync</h3>
        <p className="mt-1 text-sm text-slate-400">
          {hasFirebaseConfig
            ? "Firebase connected - cloud sync and auth can be enabled."
            : "Demo mode active - set NEXT_PUBLIC_FIREBASE_* variables for Firestore/Auth."}
        </p>
      </article>
      <article className="glass-card neon-hover p-4">
        <h4 className="font-semibold">Portfolio Enhancements</h4>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          <li>Leaderboard system scaffolded via unified performance score.</li>
          <li>Player ranking ready for Firestore collection integration.</li>
          <li>Game modules are config-driven for easy future expansion.</li>
        </ul>
      </article>
      <article className="glass-card neon-hover p-4">
        <h4 className="font-semibold">Competitive Preferences</h4>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Role
            <select
              className="mt-1 w-full rounded-lg bg-black/30 px-3 py-2"
              value={preferences.role}
              onChange={(e) => setPreferences({ ...preferences, role: e.target.value })}
            >
              <option>IGL</option>
              <option>Fragger</option>
              <option>Support</option>
              <option>Sniper</option>
            </select>
          </label>
          <label className="text-sm">
            Training Focus
            <select
              className="mt-1 w-full rounded-lg bg-black/30 px-3 py-2"
              value={preferences.trainingFocus}
              onChange={(e) => setPreferences({ ...preferences, trainingFocus: e.target.value })}
            >
              <option>Aim Mechanics</option>
              <option>Positioning</option>
              <option>Endgame Strategy</option>
              <option>Utility Usage</option>
            </select>
          </label>
          <label className="text-sm md:col-span-2">
            Theme Mode
            <select className="mt-1 w-full rounded-lg bg-black/30 px-3 py-2" value={darkMode ? "dark" : "light"} onChange={(e) => setDarkMode(e.target.value === "dark")}>
              <option value="dark">Dark Neon</option>
              <option value="light">Light Mode</option>
            </select>
          </label>
        </div>
        <button type="button" className="mt-4 rounded-lg bg-e-accent px-4 py-2 text-sm font-semibold" onClick={onSave}>
          Save Preferences
        </button>
        {prefsSaveMessage && <p className="mt-2 text-xs text-purple-200">{prefsSaveMessage}</p>}
      </article>
    </section>
  );
}
