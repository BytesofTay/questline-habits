import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NativeRuntime } from "./native-runtime";

export const metadata: Metadata = {
  title: "Questline — Turn habits into a game",
  description: "Complete daily quests, earn coins, upgrade your champion, join a squad, and climb the leaderboard.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Questline",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#071b36",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased"><NativeRuntime />{children}</body>
    </html>
  );
}
