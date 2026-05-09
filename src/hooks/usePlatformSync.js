"use client";

import { useEffect } from "react";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { subscribeAuth } from "@/services/firebase";
import {
  createMatch,
  saveUserPreferences,
  subscribeLeaderboard,
  subscribeMatches,
  subscribeUserPreferences,
  upsertLeaderboardProfile,
} from "@/services/firestore";
import { buildSummary } from "@/utils/analytics";
import { DEMO_MATCHES, DEMO_LEADERBOARD } from "@/utils/demoData";

export function usePlatformSync() {
  const setUser = usePerformanceStore((s) => s.setUser);
  const setAuthLoading = usePerformanceStore((s) => s.setAuthLoading);
  const setMatches = usePerformanceStore((s) => s.setMatches);
  const setLoadingMatches = usePerformanceStore((s) => s.setLoadingMatches);
  const setPreferences = usePerformanceStore((s) => s.setPreferences);
  const setLeaderboard = usePerformanceStore((s) => s.setLeaderboard);
  const addNotification = usePerformanceStore((s) => s.addNotification);

  useEffect(() => {
    let unsubMatches = null;
    let unsubPrefs = null;

    // ── Demo mode shortcut ────────────────────────────────────────────────
    const storedDemo = typeof window !== "undefined" && sessionStorage.getItem("statforge_demo");
    if (storedDemo) {
      const demoUser = JSON.parse(storedDemo);
      setUser(demoUser);
      setAuthLoading(false);
      setMatches(DEMO_MATCHES);
      setLeaderboard(DEMO_LEADERBOARD);
      return;
    }
    // ─────────────────────────────────────────────────────────────────────

    const unsubLeaderboard = subscribeLeaderboard((rows) => setLeaderboard(rows));

    const unsubAuth = subscribeAuth((user) => {
      setUser(user);
      setAuthLoading(false);

      // Clean up previous subscriptions when user changes
      if (unsubMatches) { unsubMatches(); unsubMatches = null; }
      if (unsubPrefs) { unsubPrefs(); unsubPrefs = null; }

      if (!user) {
        setMatches([]);
        return;
      }

      setLoadingMatches(true);

      unsubMatches = subscribeMatches(user.uid, (rows) => {
        setMatches(rows);
        const summary = buildSummary(rows);
        upsertLeaderboardProfile(user.uid, {
          username: user.displayName || user.email?.split("@")[0] || `Player-${user.uid.slice(0, 5)}`,
          avatar: user.photoURL || null,
          email: user.email,
          score: summary.performanceScore,
          winRate: summary.winRate,
          averageKd: summary.averageKd,
          totalMatches: summary.totalMatches,
        }).catch(() => {});
      });

      unsubPrefs = subscribeUserPreferences(user.uid, (prefs) => {
        if (prefs) setPreferences(prefs);
      });
    });

    return () => {
      unsubAuth && unsubAuth();
      unsubMatches && unsubMatches();
      unsubPrefs && unsubPrefs();
      unsubLeaderboard && unsubLeaderboard();
    };
  }, [
    setUser,
    setAuthLoading,
    setMatches,
    setLoadingMatches,
    setPreferences,
    setLeaderboard,
    addNotification,
  ]);
}

export async function submitMatch(payload) {
  const store = usePerformanceStore.getState();

  if (!store.user) {
    store.setMatchSubmitMessage("Please sign in to save matches.");
    return false;
  }

  store.setSubmittingMatch(true);
  store.setMatchSubmitMessage("");

  // ── Demo mode: save locally ──────────────────────────────────────────────
  if (store.user.isDemo) {
    await new Promise((r) => setTimeout(r, 600)); // simulate latency
    const newMatch = { id: `demo-${Date.now()}`, ...payload };
    const current = store.matches;
    store.setMatches([newMatch, ...current]);
    store.setMatchSubmitMessage("✅ Match saved (Demo Mode)!");
    store.addNotification({ type: "success", title: "Match Saved", message: `${payload.game} match recorded in demo.` });
    store.setSubmittingMatch(false);
    return true;
  }
  // ─────────────────────────────────────────────────────────────────────────

  try {
    await Promise.race([
      createMatch(store.user.uid, payload),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 8000)
      ),
    ]);

    store.setMatchSubmitMessage("✅ Match saved successfully!");
    store.addNotification({ type: "success", title: "Match Saved", message: `${payload.game} match recorded.` });
    return true;
  } catch (err) {
    store.setMatchSubmitMessage("❌ Failed to save match. Try again.");
    return false;
  } finally {
    store.setSubmittingMatch(false);
  }
}

export async function savePreferences(payload) {
  const store = usePerformanceStore.getState();
  if (!store.user) {
    store.setPrefsSaveMessage("Please sign in to save preferences.");
    return false;
  }
  // ── Demo mode: save locally ──────────────────────────────────────────────
  if (store.user.isDemo) {
    await new Promise((r) => setTimeout(r, 400));
    store.setPreferences(payload);
    store.setPrefsSaveMessage("✅ Preferences saved (Demo Mode)!");
    return true;
  }
  // ─────────────────────────────────────────────────────────────────────────
  try {
    await saveUserPreferences(store.user.uid, payload);
    store.setPrefsSaveMessage("✅ Preferences saved!");
    return true;
  } catch {
    store.setPrefsSaveMessage("❌ Failed to save preferences.");
    return false;
  }
}