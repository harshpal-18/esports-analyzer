import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "StatForge — Premium Esports Analytics Platform",
  description:
    "Advanced multi-game esports analytics dashboard. Track K/D, win rates, consistency scores, and dominate the leaderboard.",
  keywords: ["esports", "analytics", "gaming", "BGMI", "Valorant", "CS2", "performance"],
  openGraph: {
    title: "StatForge — Premium Esports Analytics",
    description: "Track, analyze, and improve your competitive gaming performance.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full text-slate-100">{children}</body>
    </html>
  );
}
