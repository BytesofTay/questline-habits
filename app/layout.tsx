import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Questline — Turn habits into a game",
  description: "Complete daily quests, earn coins, upgrade your champion, join a squad, and climb the leaderboard.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
