export const GAME_CONFIGS = {
  BGMI: {
    id: "bgmi",
    name: "BGMI",
    logo: "/images/bgmi-logo.svg",
    banner: "/images/bgmi-banner.svg",
    color: "#f97316",
    stats: ["kills", "damage", "survivalTime", "rank"],
    labels: { kills: "Kills", damage: "Damage", survivalTime: "Survival (min)", rank: "Rank" },
    keyStat: "damage",
  },
  "PUBG PC": {
    id: "pubg-pc",
    name: "PUBG PC",
    logo: "/images/pubg-logo.svg",
    banner: "/images/pubg-banner.svg",
    color: "#eab308",
    stats: ["kills", "damage", "survivalTime", "rank"],
    labels: { kills: "Kills", damage: "Damage", survivalTime: "Survival (min)", rank: "Rank" },
    keyStat: "damage",
  },
  Valorant: {
    id: "valorant",
    name: "Valorant",
    logo: "/images/valorant-logo.svg",
    banner: "/images/valorant-banner.svg",
    color: "#ef4444",
    stats: ["kd", "headshot", "agents", "wins", "losses"],
    labels: { kd: "K/D", headshot: "Headshot %", agents: "Agents Used", wins: "Wins", losses: "Losses" },
    keyStat: "headshot",
  },
  CS2: {
    id: "cs2",
    name: "CS2",
    logo: "/images/cs2-logo.svg",
    banner: "/images/cs2-banner.svg",
    color: "#3b82f6",
    stats: ["kd", "accuracy", "mvps", "wins", "losses"],
    labels: { kd: "K/D", accuracy: "Accuracy %", mvps: "MVPs", wins: "Wins", losses: "Losses" },
    keyStat: "accuracy",
  },
  COD: {
    id: "cod",
    name: "Call of Duty",
    logo: "/images/cod-logo.svg",
    banner: "/images/cod-banner.svg",
    color: "#22c55e",
    stats: ["kd", "score", "wins", "losses"],
    labels: { kd: "K/D", score: "Score", wins: "Wins", losses: "Losses" },
    keyStat: "score",
  },
};

export const GAME_LIST = Object.keys(GAME_CONFIGS);

export function getGameConfig(gameName) {
  return GAME_CONFIGS[gameName] || GAME_CONFIGS.BGMI;
}

export const DEFAULT_COMPETITIVE_PREFERENCES = {
  role: "IGL",
  trainingFocus: "Aim Mechanics",
  darkMode: true,
};
