/**
 * Demo mode — mock user + pre-seeded match data so the full app is explorable
 * without any Firebase configuration.
 */

export const DEMO_USER = {
  uid: "demo-user-001",
  displayName: "DemoPlayer",
  email: "demo@statforge.gg",
  photoURL: null,
  isDemo: true,
};

const today = new Date();
const daysAgo = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

export const DEMO_MATCHES = [
  // ── BGMI ───────────────────────────────────────────────────────────────────
  { id: "d1",  game: "BGMI", date: daysAgo(1),  kills: 8,  damage: 1420, survivalTime: 26, rank: 1,  headshot: 45, wins: 1 },
  { id: "d2",  game: "BGMI", date: daysAgo(3),  kills: 5,  damage: 870,  survivalTime: 18, rank: 4,  headshot: 32, wins: 0 },
  { id: "d3",  game: "BGMI", date: daysAgo(5),  kills: 12, damage: 2100, survivalTime: 29, rank: 1,  headshot: 58, wins: 1 },
  { id: "d4",  game: "BGMI", date: daysAgo(7),  kills: 3,  damage: 540,  survivalTime: 12, rank: 9,  headshot: 20, wins: 0 },
  { id: "d5",  game: "BGMI", date: daysAgo(9),  kills: 7,  damage: 1100, survivalTime: 22, rank: 3,  headshot: 38, wins: 0 },
  { id: "d6",  game: "BGMI", date: daysAgo(11), kills: 10, damage: 1750, survivalTime: 25, rank: 2,  headshot: 50, wins: 1 },
  { id: "d7",  game: "BGMI", date: daysAgo(14), kills: 6,  damage: 990,  survivalTime: 20, rank: 5,  headshot: 29, wins: 0 },
  { id: "d8",  game: "BGMI", date: daysAgo(17), kills: 9,  damage: 1600, survivalTime: 24, rank: 1,  headshot: 42, wins: 1 },

  // ── Valorant ───────────────────────────────────────────────────────────────
  { id: "d9",  game: "Valorant", date: daysAgo(2),  kills: 22, deaths: 14, headshot: 42, wins: 1, losses: 0 },
  { id: "d10", game: "Valorant", date: daysAgo(4),  kills: 15, deaths: 18, headshot: 28, wins: 0, losses: 1 },
  { id: "d11", game: "Valorant", date: daysAgo(6),  kills: 28, deaths: 10, headshot: 55, wins: 1, losses: 0 },
  { id: "d12", game: "Valorant", date: daysAgo(8),  kills: 18, deaths: 16, headshot: 36, wins: 1, losses: 0 },
  { id: "d13", game: "Valorant", date: daysAgo(12), kills: 11, deaths: 20, headshot: 22, wins: 0, losses: 1 },
  { id: "d14", game: "Valorant", date: daysAgo(16), kills: 24, deaths: 12, headshot: 48, wins: 1, losses: 0 },

  // ── CS2 ───────────────────────────────────────────────────────────────────
  { id: "d15", game: "CS2", date: daysAgo(2),  kills: 20, deaths: 13, accuracy: 52, mvps: 3, wins: 1 },
  { id: "d16", game: "CS2", date: daysAgo(5),  kills: 14, deaths: 17, accuracy: 41, mvps: 1, wins: 0 },
  { id: "d17", game: "CS2", date: daysAgo(8),  kills: 25, deaths: 9,  accuracy: 60, mvps: 5, wins: 1 },
  { id: "d18", game: "CS2", date: daysAgo(11), kills: 17, deaths: 15, accuracy: 48, mvps: 2, wins: 1 },
  { id: "d19", game: "CS2", date: daysAgo(15), kills: 10, deaths: 19, accuracy: 37, mvps: 0, wins: 0 },

  // ── Call of Duty ──────────────────────────────────────────────────────────
  { id: "d20", game: "Call of Duty", date: daysAgo(3),  kills: 18, deaths: 10, headshot: 40, accuracy: 46, score: 3800 },
  { id: "d21", game: "Call of Duty", date: daysAgo(6),  kills: 12, deaths: 14, headshot: 28, accuracy: 38, score: 2400 },
  { id: "d22", game: "Call of Duty", date: daysAgo(10), kills: 24, deaths: 8,  headshot: 52, accuracy: 55, score: 5200 },
  { id: "d23", game: "Call of Duty", date: daysAgo(13), kills: 9,  deaths: 16, headshot: 22, accuracy: 33, score: 1800 },

  // ── Fortnite ──────────────────────────────────────────────────────────────
  { id: "d24", game: "Fortnite", date: daysAgo(4),  kills: 7,  damage: 1050, survivalTime: 21, rank: 2,  accuracy: 38 },
  { id: "d25", game: "Fortnite", date: daysAgo(7),  kills: 4,  damage: 620,  survivalTime: 14, rank: 7,  accuracy: 29 },
  { id: "d26", game: "Fortnite", date: daysAgo(10), kills: 11, damage: 1680, survivalTime: 25, rank: 1,  accuracy: 47 },
  { id: "d27", game: "Fortnite", date: daysAgo(14), kills: 6,  damage: 880,  survivalTime: 18, rank: 4,  accuracy: 33 },

  // ── Apex Legends ─────────────────────────────────────────────────────────
  { id: "d28", game: "Apex Legends", date: daysAgo(1),  kills: 9,  damage: 1320, survivalTime: 18, headshot: 38, wins: 1 },
  { id: "d29", game: "Apex Legends", date: daysAgo(5),  kills: 5,  damage: 740,  survivalTime: 11, headshot: 24, wins: 0 },
  { id: "d30", game: "Apex Legends", date: daysAgo(9),  kills: 13, damage: 1900, survivalTime: 22, headshot: 46, wins: 1 },
];

export const DEMO_LEADERBOARD = [
  { uid: "lb1",  username: "NightHawk_X",  score: 218, winRate: 68, averageKd: 2.9, totalMatches: 87 },
  { uid: "lb2",  username: "Phantom_IGL",  score: 204, winRate: 62, averageKd: 2.6, totalMatches: 74 },
  { uid: "lb3",  username: "StormBreaker", score: 191, winRate: 58, averageKd: 2.4, totalMatches: 65 },
  { uid: "demo-user-001", username: "DemoPlayer", score: 176, winRate: 54, averageKd: 2.1, totalMatches: 30 },
  { uid: "lb4",  username: "BlitzKrieg99", score: 165, winRate: 52, averageKd: 1.9, totalMatches: 58 },
  { uid: "lb5",  username: "ViperStrike",  score: 152, winRate: 48, averageKd: 1.8, totalMatches: 49 },
  { uid: "lb6",  username: "ShadowGhost",  score: 141, winRate: 45, averageKd: 1.7, totalMatches: 43 },
  { uid: "lb7",  username: "ArcticFox_42", score: 128, winRate: 43, averageKd: 1.5, totalMatches: 38 },
  { uid: "lb8",  username: "CryptoAimer",  score: 114, winRate: 40, averageKd: 1.4, totalMatches: 31 },
  { uid: "lb9",  username: "NovaStar_GG",  score: 98,  winRate: 37, averageKd: 1.2, totalMatches: 25 },
];
