"use client";

import { create } from "zustand";
import { DEFAULT_COMPETITIVE_PREFERENCES, GAME_LIST } from "@/games/gameConfig";

export const usePerformanceStore = create((set) => ({
  // Auth
  user: null,
  authLoading: true,

  // Game & navigation
  selectedGame: GAME_LIST[0],
  selectedTab: "Dashboard",
  range: "30d",

  // Data
  matches: [],
  leaderboard: [],
  loadingMatches: true,

  // Match submission
  submittingMatch: false,
  matchSubmitMessage: "",

  // Preferences
  preferences: DEFAULT_COMPETITIVE_PREFERENCES,
  prefsSaveMessage: "",

  // UI state
  sidebarOpen: false,
  notifications: [],

  // Setters
  setUser: (user) => set({ user }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  setSelectedGame: (selectedGame) => set({ selectedGame }),
  setSelectedTab: (selectedTab) => set({ selectedTab, sidebarOpen: false }),
  setRange: (range) => set({ range }),
  setMatches: (matches) => set({ matches, loadingMatches: false }),
  setLoadingMatches: (loadingMatches) => set({ loadingMatches }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  setSubmittingMatch: (submittingMatch) => set({ submittingMatch }),
  setMatchSubmitMessage: (matchSubmitMessage) => set({ matchSubmitMessage }),
  setPreferences: (preferences) =>
    set({ preferences: { ...DEFAULT_COMPETITIVE_PREFERENCES, ...preferences } }),
  setPrefsSaveMessage: (prefsSaveMessage) => set({ prefsSaveMessage }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { id: Date.now(), ...notification },
        ...state.notifications.slice(0, 4),
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
