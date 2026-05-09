const safe = (n) => (Number.isFinite(n) ? n : 0);

export function computePerformanceScore(match) {
  const kills = safe(match.kills);
  const deaths = Math.max(safe(match.deaths || match.losses || 1), 1);
  const kd = safe(match.kd || kills / deaths);
  const wins = safe(match.wins);
  const damage = safe(match.damage);
  const survival = safe(match.survivalTime);
  const accuracy = safe(match.accuracy || match.headshot);
  const score = safe(match.score);
  const rankBonus = match.rank ? Math.max(0, 30 - match.rank) : 0;
  const mvpBonus = safe(match.mvps) * 5;
  return Math.round(
    kd * 35 + wins * 12 + damage / 45 + survival * 1.8 + accuracy * 0.7 + score / 220 + rankBonus + mvpBonus
  );
}

export function getMatchKd(match) {
  const kills = safe(match.kills);
  const deaths = Math.max(safe(match.deaths || match.losses || 1), 1);
  const kd = match.kd || kills / deaths;
  return Number(kd.toFixed(2));
}

export function buildSummary(matches) {
  const totalMatches = matches.length;
  const wins = matches.reduce((acc, m) => acc + safe(m.wins), 0);
  const losses = Math.max(matches.reduce((acc, m) => acc + safe(m.deaths || m.losses), 0), 1);
  const kdPool = matches.map(getMatchKd);
  const averageKd = kdPool.length ? kdPool.reduce((a, b) => a + b, 0) / kdPool.length : 0;
  const winRate = totalMatches ? (wins / totalMatches) * 100 : 0;
  const performanceScore = totalMatches
    ? Math.round(matches.reduce((acc, m) => acc + computePerformanceScore(m), 0) / totalMatches)
    : 0;

  // Advanced metrics
  const avgDamage = totalMatches
    ? matches.reduce((a, m) => a + safe(m.damage), 0) / totalMatches
    : 0;
  const avgSurvival = totalMatches
    ? matches.reduce((a, m) => a + safe(m.survivalTime), 0) / totalMatches
    : 0;
  const avgHeadshot = totalMatches
    ? matches.reduce((a, m) => a + safe(m.headshot || m.accuracy), 0) / totalMatches
    : 0;
  const avgKills = totalMatches
    ? matches.reduce((a, m) => a + safe(m.kills), 0) / totalMatches
    : 0;

  // Derived advanced scores
  const consistencyScore = totalMatches < 2 ? 0 : (() => {
    const scores = matches.map(computePerformanceScore);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((a, b) => a + (b - mean) ** 2, 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, Math.round(100 - (stdDev / Math.max(mean, 1)) * 100));
  })();

  const aggressionIndex = Math.min(100, Math.round((avgKills * 10 + avgDamage / 50)));
  const survivalEfficiency = Math.min(100, Math.round(avgSurvival * 3.5));
  const headshotEfficiency = Math.min(100, Math.round(avgHeadshot));

  // Streak calculation
  let currentStreak = 0;
  let streakType = "none";
  for (const m of [...matches].reverse()) {
    if (currentStreak === 0) {
      streakType = safe(m.wins) > 0 ? "win" : "loss";
      currentStreak = 1;
    } else if (
      (streakType === "win" && safe(m.wins) > 0) ||
      (streakType === "loss" && safe(m.wins) === 0)
    ) {
      currentStreak++;
    } else break;
  }

  return {
    totalMatches,
    wins,
    losses,
    winRate: Number(winRate.toFixed(1)),
    averageKd: Number(averageKd.toFixed(2)),
    performanceScore,
    avgDamage: Number(avgDamage.toFixed(0)),
    avgSurvival: Number(avgSurvival.toFixed(1)),
    avgHeadshot: Number(avgHeadshot.toFixed(1)),
    avgKills: Number(avgKills.toFixed(1)),
    consistencyScore,
    aggressionIndex,
    survivalEfficiency,
    headshotEfficiency,
    currentStreak,
    streakType,
  };
}

export function buildTrend(matches) {
  return [...matches]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((m) => ({
      date: m.date.slice(5),
      score: computePerformanceScore(m),
      kd: getMatchKd(m),
      kills: safe(m.kills),
      damage: safe(m.damage),
      headshot: safe(m.headshot || m.accuracy),
    }));
}

export function buildInsights(summary, matches = []) {
  const tips = [];

  if (summary.averageKd < 1.0)
    tips.push({ type: "warning", icon: "🎯", text: "Your K/D is below 1.0 — focus on crosshair placement and pre-aiming corners." });
  else if (summary.averageKd < 1.5)
    tips.push({ type: "info", icon: "📈", text: "K/D is improving — try to pre-aim at head level to boost it further." });
  else
    tips.push({ type: "success", icon: "🔥", text: `Strong K/D of ${summary.averageKd} — you're outperforming most players!` });

  if (summary.winRate < 40)
    tips.push({ type: "warning", icon: "🏆", text: "Win rate is low — improve late-game decision making and macro strategy." });
  else if (summary.winRate >= 60)
    tips.push({ type: "success", icon: "👑", text: `${summary.winRate}% win rate is excellent — you're dominating the competition!` });

  if (summary.consistencyScore < 50)
    tips.push({ type: "warning", icon: "⚡", text: "Your performance is inconsistent — build a consistent warm-up routine before each session." });
  else if (summary.consistencyScore > 75)
    tips.push({ type: "success", icon: "💎", text: `Consistency score of ${summary.consistencyScore} — rock-solid performances!` });

  if (summary.avgHeadshot < 20)
    tips.push({ type: "warning", icon: "🎯", text: "Headshot accuracy below 20% — spend 10 mins daily on headshot-only aim trainers." });
  else if (summary.avgHeadshot > 50)
    tips.push({ type: "success", icon: "💥", text: `${summary.avgHeadshot}% headshot rate — sniper-level precision!` });

  if (summary.aggressionIndex > 80)
    tips.push({ type: "info", icon: "🗡️", text: "High aggression detected — consider positioning over pure aggression in late game." });

  if (summary.survivalEfficiency < 30)
    tips.push({ type: "warning", icon: "🛡️", text: "Early elimination pattern detected — play safer in the opening phase." });

  if (summary.streakType === "loss" && summary.currentStreak >= 3)
    tips.push({ type: "danger", icon: "😰", text: `${summary.currentStreak}-game losing streak — take a break and reset mentally.` });

  if (summary.streakType === "win" && summary.currentStreak >= 3)
    tips.push({ type: "success", icon: "🚀", text: `${summary.currentStreak}-game win streak — you're in the zone, keep it going!` });

  if (tips.length === 0)
    tips.push({ type: "success", icon: "⚔️", text: "Well-rounded profile — focus on team synergy and high-pressure clutch situations." });

  return tips;
}

export function buildWeeklySummary(matches) {
  const boundary = new Date();
  boundary.setDate(boundary.getDate() - 7);
  const weekly = matches.filter((m) => new Date(m.date) >= boundary);
  const summary = buildSummary(weekly);
  if (summary.totalMatches === 0) return "No matches this week — get back in the game!";
  return `This week: ${summary.totalMatches} matches · ${summary.winRate}% win rate · Avg K/D ${summary.averageKd} · Score ${summary.performanceScore}`;
}

export function buildRadarData(summary) {
  return [
    { stat: "K/D", value: Math.min(100, Math.round(summary.averageKd * 30)) },
    { stat: "Win Rate", value: Math.round(summary.winRate) },
    { stat: "Consistency", value: summary.consistencyScore },
    { stat: "Aggression", value: summary.aggressionIndex },
    { stat: "Survival", value: summary.survivalEfficiency },
    { stat: "Headshot", value: summary.headshotEfficiency },
  ];
}

export function getTier(score) {
  if (score >= 200) return { label: "Diamond", color: "#60a5fa", emoji: "💎" };
  if (score >= 150) return { label: "Platinum", color: "#a78bfa", emoji: "🔮" };
  if (score >= 100) return { label: "Gold", color: "#fbbf24", emoji: "🥇" };
  if (score >= 60)  return { label: "Silver", color: "#94a3b8", emoji: "🥈" };
  return { label: "Bronze", color: "#f97316", emoji: "🥉" };
}

export function getBadges(summary) {
  const badges = [];
  if (summary.averageKd >= 3) badges.push({ label: "Elite Sniper", emoji: "🎯", color: "#ef4444" });
  if (summary.winRate >= 60)  badges.push({ label: "MVP Player", emoji: "👑", color: "#fbbf24" });
  if (summary.consistencyScore >= 80) badges.push({ label: "Consistent", emoji: "⚡", color: "#22d3ee" });
  if (summary.totalMatches >= 50) badges.push({ label: "Veteran", emoji: "🏆", color: "#a855f7" });
  if (summary.headshotEfficiency >= 50) badges.push({ label: "Headhunter", emoji: "💥", color: "#f43f5e" });
  if (summary.streakType === "win" && summary.currentStreak >= 5)
    badges.push({ label: "On Fire", emoji: "🔥", color: "#f97316" });
  return badges;
}
