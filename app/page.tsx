"use client";

import Image from "next/image";
import { Check, ChevronRight, Flame, Home, Plus, Shield, Sparkles, Swords, Trophy, Users, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type Quest = { id: number; icon: string; title: string; detail: string; reward: number; color: string; complete: boolean };

const initialQuests: Quest[] = [
  { id: 1, icon: "🏃", title: "Move for 30 minutes", detail: "Fitness · Epic", reward: 90, color: "#33d6ff", complete: false },
  { id: 2, icon: "📚", title: "Read 20 pages", detail: "Learning · Rare", reward: 60, color: "#a783ff", complete: false },
  { id: 3, icon: "💧", title: "Drink 8 glasses", detail: "Wellness · Common", reward: 35, color: "#b9ff46", complete: true },
];

const leaderboard = [
  { rank: 1, name: "NovaKai", score: 8420, streak: 23, avatar: "N" },
  { rank: 2, name: "PixelPace", score: 7990, streak: 18, avatar: "P" },
  { rank: 3, name: "You", score: 7640, streak: 12, avatar: "Y", you: true },
  { rank: 4, name: "MiraMoves", score: 7310, streak: 16, avatar: "M" },
  { rank: 5, name: "Zenith", score: 7025, streak: 9, avatar: "Z" },
];

export default function Home() {
  const [quests, setQuests] = useState(initialQuests);
  const [coins, setCoins] = useState(1280);
  const [xp, setXp] = useState(68);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuest, setNewQuest] = useState("");
  const [matched, setMatched] = useState(false);
  const [battleEnergy, setBattleEnergy] = useState(3);
  const [battleState, setBattleState] = useState<"lobby" | "fighting" | "won">("lobby");
  const [opponentHp, setOpponentHp] = useState(100);
  const done = useMemo(() => quests.filter((quest) => quest.complete).length, [quests]);
  const completionPercent = Math.round((done / quests.length) * 100);

  function completeQuest(id: number) {
    setQuests((current) => current.map((quest) => {
      if (quest.id !== id || quest.complete) return quest;
      setCoins((value) => value + quest.reward);
      setXp((value) => Math.min(100, value + Math.round(quest.reward / 6)));
      return { ...quest, complete: true };
    }));
  }

  function addQuest() {
    const title = newQuest.trim();
    if (!title) return;
    setQuests((current) => [...current, { id: Date.now(), icon: "⚡", title, detail: "Custom · Common", reward: 40, color: "#ffca3a", complete: false }]);
    setNewQuest("");
    setDialogOpen(false);
  }

  function startBattle() {
    if (battleEnergy < 1 || battleState !== "lobby") return;
    setBattleEnergy((value) => value - 1);
    setOpponentHp(100);
    setBattleState("fighting");
  }

  function useEnergyStrike() {
    if (battleState !== "fighting") return;
    const nextHp = Math.max(0, opponentHp - 34);
    setOpponentHp(nextHp);
    if (nextHp === 0) {
      setBattleState("won");
      setCoins((value) => value + 120);
      setXp((value) => Math.min(100, value + 10));
    }
  }

  function resetBattle() {
    setBattleState("lobby");
    setOpponentHp(100);
  }

  useEffect(() => {
    const context = (document as Document & {
      modelContext?: {
        registerTool: (tool: {
          name: string;
          title: string;
          description: string;
          inputSchema: object;
          annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
          execute: (input: unknown) => unknown;
        }, options?: { signal?: AbortSignal }) => void | Promise<void>;
      };
    }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    void Promise.resolve(context.registerTool({
      name: "complete_quest",
      title: "Complete a daily quest",
      description: "Mark one visible Questline daily quest complete and award its coins and XP.",
      inputSchema: { type: "object", properties: { questId: { type: "number" } }, required: ["questId"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const questId = Number((input as { questId?: unknown })?.questId);
        const quest = quests.find((item) => item.id === questId);
        if (!Number.isFinite(questId) || !quest) throw new Error("Quest not found.");
        if (quest.complete) return { questId, status: "already_complete", coinsAwarded: 0 };
        completeQuest(questId);
        return { questId, status: "completed", coinsAwarded: quest.reward };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);

    void Promise.resolve(context.registerTool({
      name: "create_daily_quest",
      title: "Create a daily quest",
      description: "Add one clearly named quest to the visible daily quest list.",
      inputSchema: { type: "object", properties: { title: { type: "string", minLength: 2, maxLength: 80 } }, required: ["title"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const title = String((input as { title?: unknown })?.title ?? "").trim();
        if (title.length < 2 || title.length > 80) throw new Error("Quest title must be 2 to 80 characters.");
        const quest = { id: Date.now(), icon: "⚡", title, detail: "Custom · Common", reward: 40, color: "#ffca3a", complete: false };
        setQuests((current) => [...current, quest]);
        return { questId: quest.id, title: quest.title, status: "created" };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);

    return () => lifecycle.abort();
  }, [quests]);

  return (
    <main className="battle-royale-ui min-h-screen overflow-x-hidden bg-[#071b36] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080918]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-amber-300 text-slate-950 shadow-[0_0_28px_rgba(255,216,79,.4)]"><Zap className="size-5 fill-current" /></span><div><p className="font-black tracking-tight">QUESTLINE</p><p className="text-xs font-bold uppercase tracking-[.16em] text-white/45">Season 01 · Run 12</p></div></div>
          <nav className="hidden items-center gap-7 text-sm font-bold text-white/55 md:flex" aria-label="Primary navigation"><a className="text-white" href="#quests">Play</a><a href="#battle">Battle</a><a href="#squad">Squad</a><a href="#leaderboard">Ranks</a></nav>
          <div className="flex items-center gap-2"><span className="hidden rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-2 text-xs font-black uppercase tracking-[.15em] text-lime-200 sm:inline-flex">Ready · Bracket 6–10</span><span className="flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 font-black text-amber-200"><span>◈</span><span>{coins.toLocaleString()}</span></span></div>
        </div>
        <div className="mx-auto max-w-[1500px] px-4 pb-3 sm:px-6 lg:px-8">
          <section id="leaderboard" aria-label="Weekly leaderboard" className="leaderboard-glow flex h-[66px] w-full items-center overflow-hidden rounded-full border border-amber-300/25 bg-[#11142b]/95 shadow-[0_14px_35px_rgba(0,0,0,.38)]">
            <div className="flex h-full shrink-0 items-center gap-2 border-r border-white/10 bg-gradient-to-r from-amber-300/15 to-transparent px-4 sm:px-5">
              <span className="grid size-9 place-items-center rounded-full bg-amber-300/15 text-amber-300"><Trophy className="size-4" /></span>
              <span className="hidden sm:block"><span className="block text-[11px] font-black uppercase tracking-[.18em] text-amber-300">Weekly league</span><span className="block text-sm font-black">Top players</span></span>
            </div>
            <ol className="scrollbar-none flex min-w-0 flex-1 items-center overflow-x-auto px-2 sm:justify-between sm:px-3">
              {leaderboard.map((player) => <li key={player.rank} className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 sm:min-w-[148px] sm:flex-1 sm:justify-center ${player.you ? "border border-lime-300/30 bg-lime-300/10" : ""}`}><span className="text-xs font-black text-white/35">#{player.rank}</span><span className={`grid size-8 place-items-center rounded-full text-xs font-black ${player.you ? "bg-lime-300 text-slate-950" : "bg-white/10"}`}>{player.avatar}</span><span className="min-w-0"><span className="block max-w-[90px] truncate text-sm font-extrabold">{player.name}</span><span className="block text-[11px] font-bold text-white/40">{player.score.toLocaleString()} XP</span></span></li>)}
            </ol>
          </section>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <section className="grid min-w-0 gap-5">
          <div className="game-panel arena-grid relative min-h-[390px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0c2345] p-5 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(117,75,255,.34),transparent_34%),radial-gradient(circle_at_20%_90%,rgba(45,212,255,.18),transparent_30%)]" />
            <div className="relative z-10 grid h-full items-center gap-6 md:grid-cols-[1fr_340px]">
              <div className="max-w-xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.18em] text-lime-200"><Flame className="size-4" /> 12 day streak</div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[.22em] text-cyan-300">Daily campaign</p>
                <h1 className="text-4xl font-black uppercase leading-[.95] tracking-[-.04em] sm:text-6xl">Ready up.<br/><span className="text-amber-300">Level up.</span></h1>
                <p className="mt-5 max-w-md text-base leading-7 text-white/60">Queue your real-life quests, charge your champion, and climb the arena with players who share your goals.</p>
                <div className="mt-7 flex flex-wrap gap-3"><Button className="h-12 rounded-xl bg-amber-300 px-6 font-black text-slate-950 hover:bg-amber-200" onClick={() => document.getElementById("quests")?.scrollIntoView({ behavior: "smooth" })}>View today’s quests <ChevronRight /></Button><Button variant="outline" className="h-12 rounded-xl border-white/15 bg-white/5 px-5 font-bold text-white hover:bg-white/10" onClick={() => document.getElementById("squad")?.scrollIntoView({ behavior: "smooth" })}><Users /> Find a squad</Button></div>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-white/45"><span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(185,255,70,.8)]" /> Live season</span><span>·</span><span>12 day streak</span><span>·</span><span>{completionPercent}% run ready</span></div>
              </div>
              <div className="relative mx-auto h-[320px] w-full max-w-[310px] self-end"><div className="absolute inset-x-10 bottom-3 h-14 rounded-full bg-cyan-300/25 blur-2xl" /><Image src="/assets/questline-champion.png" alt="Your futuristic Questline champion avatar" fill priority className="object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,.5)]" /><div className="absolute bottom-4 left-0 rounded-2xl border border-white/15 bg-slate-950/75 p-3 backdrop-blur"><p className="text-xs font-bold text-white/45">CHAMPION</p><p className="font-black">Rookie Volt · Lv. 7</p></div></div>
            </div>
          </div>

          <section id="battle" className="game-panel rounded-[24px] border border-violet-300/20 bg-gradient-to-br from-violet-500/15 via-white/[.045] to-cyan-300/[.06] p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs font-black uppercase tracking-[.2em] text-violet-300">Battle hub</p><h2 className="mt-1 text-2xl font-black">Put your progress to the test</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/55">Fictional avatar duels use level brackets and capped rewards, so consistency and strategy matter more than grinding.</p></div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm font-black"><span className="text-violet-300">⚡</span> {battleEnergy}/3 energy</div>
            </div>
            {battleState === "lobby" ? <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center"><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><div className="grid size-12 place-items-center rounded-xl bg-cyan-300/15 text-xl">🛡️</div><div><p className="text-xs font-black uppercase tracking-[.16em] text-cyan-300">Matched opponent</p><p className="font-black">PixelPace · Level 7</p><p className="text-sm text-white/45">Battle rating 1,230 · Friendly competitive</p></div></div><div className="flex items-center gap-4 md:justify-end"><div><p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">Win reward</p><p className="font-black text-amber-200">◈ 120 coins + 10 XP</p></div><Button onClick={startBattle} disabled={battleEnergy < 1} className="h-12 rounded-xl bg-violet-400 px-5 font-black text-slate-950 hover:bg-violet-300 disabled:bg-white/10 disabled:text-white/35"><Swords /> Start duel</Button></div></div> : <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5"><div className="mb-4 flex items-center justify-between text-sm font-black"><span className="text-cyan-200">You · Lv. 7</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[.16em] text-white/45">{battleState === "won" ? "Victory" : "Round 1"}</span><span className="text-violet-200">PixelPace · Lv. 7</span></div><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div><div className="mb-2 flex justify-between text-xs font-bold text-white/50"><span>Champion energy</span><span>100%</span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full rounded-full bg-gradient-to-r from-lime-300 to-cyan-300" /></div></div><span className="text-lg font-black text-white/35">VS</span><div><div className="mb-2 flex justify-between text-xs font-bold text-white/50"><span>Opponent energy</span><span>{opponentHp}%</span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-300 to-fuchsia-400 transition-all" style={{ width: `${opponentHp}%` }} /></div></div></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-white/55">{battleState === "won" ? "Victory secured. Your reward has been added." : "Use an energy strike to deal 34 damage."}</p>{battleState === "won" ? <Button onClick={resetBattle} variant="outline" className="rounded-xl border-white/15 bg-white/5 font-bold text-white hover:bg-white/10">Back to battle hub</Button> : <Button onClick={useEnergyStrike} className="rounded-xl bg-lime-300 font-black text-slate-950 hover:bg-lime-200"><Zap /> Energy strike</Button>}</div></div>}
          </section>

          <section id="quests" className="game-panel rounded-[24px] border border-white/10 bg-white/[.045] p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.2em] text-violet-300">Today’s run</p><h2 className="mt-1 text-2xl font-black">Daily quests <span className="text-white/35">{done}/{quests.length}</span></h2><div className="mt-3 flex items-center gap-3"><div className="h-2 w-40 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-lime-300 transition-all" style={{ width: `${completionPercent}%` }} /></div><span className="text-xs font-black uppercase tracking-[.14em] text-white/40">{completionPercent}% ready</span></div></div><Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogTrigger asChild><Button className="rounded-xl bg-violet-500 font-black hover:bg-violet-400"><Plus /> Add quest</Button></DialogTrigger><DialogContent className="border-white/15 bg-[#11142b] text-white"><DialogHeader><DialogTitle>Create a quest</DialogTitle><DialogDescription className="text-white/55">Choose one action you can clearly finish today.</DialogDescription></DialogHeader><label className="text-sm font-bold" htmlFor="quest-title">Quest name</label><input id="quest-title" value={newQuest} onChange={(event) => setNewQuest(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addQuest()} placeholder="Example: Meditate for 10 minutes" className="h-12 rounded-xl border border-white/15 bg-black/25 px-4 outline-none focus:border-cyan-300"/><DialogFooter><Button className="bg-lime-300 font-black text-slate-950 hover:bg-lime-200" onClick={addQuest}>Add for +40 coins</Button></DialogFooter></DialogContent></Dialog></div>
            <div className="grid gap-3">{quests.map((quest) => <article key={quest.id} className={`group flex items-center gap-4 rounded-2xl border p-3.5 transition ${quest.complete ? "border-lime-300/20 bg-lime-300/[.06]" : "border-white/10 bg-black/15 hover:border-white/20"}`}><div className="grid size-12 shrink-0 place-items-center rounded-xl text-xl" style={{ backgroundColor: `${quest.color}1a`, boxShadow: `inset 0 0 0 1px ${quest.color}33` }}>{quest.icon}</div><div className="min-w-0 flex-1"><h3 className={`truncate font-extrabold ${quest.complete ? "text-white/45 line-through" : ""}`}>{quest.title}</h3><p className="mt-1 text-sm text-white/40">{quest.detail}</p></div><div className="hidden items-center gap-1 font-black text-amber-200 sm:flex">◈ {quest.reward}</div><button onClick={() => completeQuest(quest.id)} disabled={quest.complete} aria-label={quest.complete ? `${quest.title} completed` : `Complete ${quest.title}`} className={`grid size-11 shrink-0 place-items-center rounded-xl border transition ${quest.complete ? "border-lime-300 bg-lime-300 text-slate-950" : "border-white/15 bg-white/5 text-white/50 hover:border-lime-300 hover:text-lime-300"}`}>{quest.complete ? <Check /> : <ChevronRight />}</button></article>)}</div>
          </section>
        </section>

        <aside className="grid content-start gap-5">
          <section className="game-panel rounded-[24px] border border-white/10 bg-gradient-to-b from-violet-500/15 to-white/[.04] p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-violet-300">Avatar progress</p><h2 className="mt-1 text-xl font-black">Level 7</h2></div><span className="grid size-11 place-items-center rounded-xl bg-violet-400/15 text-violet-300"><Shield /></span></div><div className="mt-5 flex justify-between text-sm"><span className="font-bold text-white/60">Power XP</span><span className="font-black">{xp}/100</span></div><Progress value={xp} className="mt-2 h-3 bg-white/10 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-violet-400 [&_[data-slot=progress-indicator]]:to-cyan-300"/><p className="mt-4 text-sm leading-6 text-white/50">Level 8 unlocks the <strong className="text-cyan-200">Ion Trail</strong> and a 5% squad coin boost.</p><Button variant="outline" className="mt-4 w-full rounded-xl border-white/15 bg-white/5 font-bold text-white hover:bg-white/10"><Sparkles /> Customize champion</Button></section>
          <section id="squad" className="game-panel rounded-[24px] border border-cyan-300/15 bg-cyan-300/[.055] p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300">Matchmaking</p><h2 className="mt-1 text-xl font-black">{matched ? "Squad found" : "Find your people"}</h2></div><Swords className="text-cyan-300" /></div><p className="mt-3 text-sm leading-6 text-white/55">Matched by shared goals, weekly activity, schedule, and competition style—not sensitive personal traits.</p>{matched ? <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-black/20 p-4"><p className="font-black">Momentum Crew</p><p className="mt-1 text-sm text-white/50">4 players · Fitness + Learning · Friendly competitive</p></div> : null}<Button className="mt-4 w-full rounded-xl bg-cyan-300 font-black text-slate-950 hover:bg-cyan-200" onClick={() => setMatched(true)}><Users /> {matched ? "View Momentum Crew" : "Match me"}</Button></section>
        </aside>
      </div>
      <nav className="mobile-nav fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border border-white/15 bg-[#08152b]/95 p-2 shadow-[0_18px_50px_rgba(0,0,0,.45)] backdrop-blur-xl sm:hidden" aria-label="Mobile navigation"><a href="#quests" className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-black uppercase tracking-[.12em] text-amber-200"><Home className="size-4" /> Play</a><a href="#battle" className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-black uppercase tracking-[.12em] text-white/55"><Swords className="size-4" /> Battle</a><a href="#squad" className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-black uppercase tracking-[.12em] text-white/55"><Users className="size-4" /> Squad</a><a href="#leaderboard" className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-black uppercase tracking-[.12em] text-white/55"><Trophy className="size-4" /> Ranks</a></nav>
    </main>
  );
}
