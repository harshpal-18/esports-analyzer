"use client";

import { useEffect } from "react";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";
import { hasFirebaseConfig } from "@/services/firebase";
import {
  createMatch,
  saveUserPreferences,
  subscribeLeaderboard,
  subscribeMatches,
  subscribeUserPreferences,
  upsertLeaderboardProfile,
} from "@/services/firestore";
import { buildSummary } from "@/utils/analytics";

// 🔥 MAIN HOOK
export function usePlatformSync() {
  const setUser = usePerformanceStore((s) => s.setUser);
  const setMatches = usePerformanceStore((s) => s.setMatches);
  const setLoadingMatches = usePerformanceStore((s) => s.setLoadingMatches);
  const setPreferences = usePerformanceStore((s) => s.setPreferences);
  const setLeaderboard = usePerformanceStore((s) => s.setLeaderboard);

  useEffect(() => {
    if (!hasFirebaseConfig) {
      setLoadingMatches(false);
      return;
    }

    const user = { uid: "local-user" }; // fake user
    setUser(user);

    setLoadingMatches(true);

    const unsubMatches = subscribeMatches(user.uid, (rows) => {
      setMatches(rows);

      const summary = buildSummary(rows);

      upsertLeaderboardProfile(user.uid, {
        username: `Player-${user.uid.slice(0, 5)}`,
        score: summary.performanceScore,
        winRate: summary.winRate,
        averageKd: summary.averageKd,
      }).catch(() => {});
    });

    const unsubPrefs = subscribeUserPreferences(user.uid, (prefs) => {
      if (prefs) setPreferences(prefs);
    });

    const unsubLeaderboard = subscribeLeaderboard((rows) => {
      setLeaderboard(rows);
    });

    return () => {
      unsubMatches && unsubMatches();
      unsubPrefs && unsubPrefs();
      unsubLeaderboard && unsubLeaderboard();
    };
  }, [
    setLeaderboard,
    setLoadingMatches,
    setMatches,
    setPreferences,
    setUser,
  ]);
}

//////////////////////////////////////////////////////////////////
// 🔥 FIXED SUBMIT MATCH (NO STUCK "Saving...")
//////////////////////////////////////////////////////////////////

export async function submitMatch(payload) {
  const store = usePerformanceStore.getState();

  if (!store.user) {
    store.setMatchSubmitMessage("Login required.");
    return false;
  }

  store.setSubmittingMatch(true);
  store.setMatchSubmitMessage("");

  try {
    console.log("Saving match...", payload);

    // 🔥 Timeout protection
    await Promise.race([
      createMatch(store.user.uid, payload),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      ),
    ]);

    store.setMatchSubmitMessage("Match saved successfully.");
    return true;

  } catch (err) {
    console.error("Error saving match:", err);
    store.setMatchSubmitMessage("Failed to save match.");
    return false;

  } finally {
    store.setSubmittingMatch(false); // ✅ ALWAYS RESET
  }
}

//////////////////////////////////////////////////////////////////
// 🔥 SAVE PREFERENCES
//////////////////////////////////////////////////////////////////

export async function savePreferences(payload) {
  const store = usePerformanceStore.getState();

  if (!store.user) {
    store.setPrefsSaveMessage("Login required.");
    return false;
  }

  try {
    await saveUserPreferences(store.user.uid, payload);
    store.setPrefsSaveMessage("Preferences saved.");
    return true;

  } catch {
    store.setPrefsSaveMessage("Failed to save preferences.");
    return false;
  }
}