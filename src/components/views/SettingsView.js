"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { savePreferences } from "@/hooks/usePlatformSync";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { logoutUser } from "@/services/firebase";
import { User, Shield, Bell, Palette, LogOut, Save } from "lucide-react";

export default function SettingsView() {
  const { preferences, setPreferences, prefsSaveMessage, user } = usePerformanceStore();
  const [darkMode, setDarkMode] = useState(preferences.darkMode ?? true);
  const [notifications, setNotifications] = useState(preferences.notifications ?? true);
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    const payload = { ...preferences, darkMode, notifications };
    setPreferences(payload);
    setSaving(true);
    await savePreferences(payload);
    setSaving(false);
    if (darkMode) document.body.classList.remove("light");
    else document.body.classList.add("light");
  };

  const Section = ({ title, icon: Icon, color, children }) => (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ background: `${color}18`, border: `1px solid ${color}33` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      {children}
    </motion.article>
  );

  return (
    <section className="space-y-4 max-w-2xl">
      {/* Profile */}
      <Section title="Profile" icon={User} color="#a855f7">
        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="h-16 w-16 rounded-2xl object-cover border border-white/10" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-red-500 text-2xl font-bold">
                {(user.displayName || user.email || "P")[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-white">{user.displayName || "Player"}</p>
              <p className="text-sm text-slate-400">{user.email}</p>
              <p className="mt-1 text-xs text-purple-400">Firebase UID: {user.uid?.slice(0, 16)}...</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Not signed in</p>
        )}
      </Section>

      {/* Competitive preferences */}
      <Section title="Competitive Preferences" icon={Shield} color="#22d3ee">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1.5">
            <p className="text-xs font-medium text-slate-400">Player Role</p>
            <select
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none cursor-pointer"
              value={preferences.role}
              onChange={(e) => setPreferences({ ...preferences, role: e.target.value })}
              style={{ color: "#e2e8f0", background: "rgba(255,255,255,0.04)" }}
            >
              {["IGL", "Fragger", "Support", "Sniper", "Scout", "Entry Fragger"].map((r) => (
                <option key={r} value={r} style={{ background: "#100e1a" }}>{r}</option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <p className="text-xs font-medium text-slate-400">Training Focus</p>
            <select
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none cursor-pointer"
              value={preferences.trainingFocus}
              onChange={(e) => setPreferences({ ...preferences, trainingFocus: e.target.value })}
              style={{ color: "#e2e8f0", background: "rgba(255,255,255,0.04)" }}
            >
              {["Aim Mechanics", "Positioning", "Endgame Strategy", "Utility Usage", "Communication", "Mental Fortitude"].map((t) => (
                <option key={t} value={t} style={{ background: "#100e1a" }}>{t}</option>
              ))}
            </select>
          </label>
        </div>
      </Section>

      {/* Appearance */}
      <Section title="Appearance & Notifications" icon={Palette} color="#f97316">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-white/4 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">Dark Mode</p>
              <p className="text-xs text-slate-500">Enable neon dark theme</p>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`relative h-6 w-11 rounded-full transition-colors ${darkMode ? "bg-purple-600" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-5.5" : "translate-x-0.5"}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-white/4 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">Notifications</p>
              <p className="text-xs text-slate-500">Match save confirmations</p>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 rounded-full transition-colors ${notifications ? "bg-purple-600" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notifications ? "translate-x-5.5" : "translate-x-0.5"}`}
              />
            </button>
          </div>
        </div>
      </Section>

      {/* Save + Logout */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={15} />
              Save Preferences
            </>
          )}
        </button>

        {prefsSaveMessage && (
          <p className="flex items-center text-sm text-purple-300">{prefsSaveMessage}</p>
        )}

        <button
          type="button"
          onClick={logoutUser}
          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 ml-auto"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>

      {/* About */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-3">About StatForge</h4>
        <div className="space-y-2 text-sm text-slate-400">
          <p>• Multi-game analytics platform: BGMI, Valorant, CS2, COD, Fortnite, Apex Legends</p>
          <p>• Real-time Firestore sync with protected per-user data</p>
          <p>• AI rule-based coach with strength/weakness detection</p>
          <p>• Global leaderboard with tier system and badges</p>
          <p>• Built with Next.js 16 · Firebase 12 · Recharts 3 · Framer Motion</p>
        </div>
      </motion.article>
    </section>
  );
}
