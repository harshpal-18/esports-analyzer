const safe = (n) => (Number.isFinite(n) ? n : 0);

export function computePerformanceScore(match) {
  const kd = safe(match.kd || (match.kills ?? 0) / Math.max((match.losses ?? 1), 1));
  const wins = safe(match.wins);
  const damage = safe(match.damage);
  const survival = safe(match.survivalTime);
  const accuracy = safe(match.accuracy || match.headshot);
  const score = safe(match.score);
  const rankBonus = match.rank ? Math.max(0, 30 - match.rank) : 0;
  return Math.round(kd * 35 + wins * 12 + damage / 45 + survival * 1.8 + accuracy * 0.7 + score / 220 + rankBonus);
}

export function getMatchKd(match) {
  return Number((match.kd || (match.kills ?? 0) / Math.max((match.losses ?? 1), 1)).toFixed(2));
}

export function buildSummary(matches) {
  const totalMatches = matches.length;
  const wins = matches.reduce((acc, item) => acc + safe(item.wins), 0);
  const losses = Math.max(matches.reduce((acc, item) => acc + safe(item.losses), 0), 1);
  const kdPool = matches.map((m) => getMatchKd(m));
  const averageKd = kdPool.length ? kdPool.reduce((a, b) => a + b, 0) / kdPool.length : 0;
  const winRate = totalMatches ? (wins / totalMatches) * 100 : 0;
  const performanceScore = totalMatches
    ? Math.round(matches.reduce((acc, m) => acc + computePerformanceScore(m), 0) / totalMatches)
    : 0;

  return {
    totalMatches,
    wins,
    winRate: Number(winRate.toFixed(1)),
    averageKd: Number(averageKd.toFixed(2)),
    performanceScore,
  };
}

export function buildTrend(matches) {
  return [...matches]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((m) => ({
      date: m.date.slice(5),
      score: computePerformanceScore(m),
      kd: getMatchKd(m),
    }));
}

export function buildInsights(summary) {
  const tips = [];
  if (summary.averageKd < 1.2) tips.push("Low K/D detected - prioritize aim drills and crosshair placement training.");
  if (summary.winRate < 45) tips.push("Win rate trails behind - improve late-round decision making and macro strategy.");
  if (summary.performanceScore < 70) tips.push("Performance score is unstable - reduce role switching and focus on one playstyle.");
  if (!tips.length) tips.push("Strong all-around profile - shift focus to team synergy and high-pressure clutch scenarios.");
  return tips;
}

export function buildWeeklySummary(matches) {
  const now = new Date();
  const boundary = new Date();
  boundary.setDate(now.getDate() - 7);
  const weekly = matches.filter((m) => new Date(m.date) >= boundary);
  const summary = buildSummary(weekly);
  return `Weekly Summary: ${summary.totalMatches} matches, ${summary.winRate}% win rate, average K/D ${summary.averageKd}.`;
}
