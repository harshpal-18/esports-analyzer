"use client";

import { create } from "zustand";
import { DEFAULT_COMPETITIVE_PREFERENCES, GAME_LIST } from "@/games/gameConfig";

export const usePerformanceStore = create((set) => ({
  selectedGame: GAME_LIST[0],
  selectedTab: "Dashboard",
  range: "30d",
  matches: [],
  leaderboard: [],
  user: null,
  loadingMatches: true,
  submittingMatch: false,
  matchSubmitMessage: "",
  preferences: DEFAULT_COMPETITIVE_PREFERENCES,
  prefsSaveMessage: "",
  setSelectedGame: (selectedGame) => set({ selectedGame }),
  setSelectedTab: (selectedTab) => set({ selectedTab }),
  setRange: (range) => set({ range }),
  setUser: (user) => set({ user }),
  setMatches: (matches) => set({ matches, loadingMatches: false }),
  setLoadingMatches: (loadingMatches) => set({ loadingMatches }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  setSubmittingMatch: (submittingMatch) => set({ submittingMatch }),
  setMatchSubmitMessage: (matchSubmitMessage) => set({ matchSubmitMessage }),
  setPreferences: (preferences) => set({ preferences: { ...DEFAULT_COMPETITIVE_PREFERENCES, ...preferences } }),
  setPrefsSaveMessage: (prefsSaveMessage) => set({ prefsSaveMessage }),
}));
