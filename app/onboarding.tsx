"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Shield, Sparkles, Swords, Target, Users, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export type QuestlineProfile = {
  championName: string;
  championClass: string;
  goal: string;
  habits: string[];
  playStyle: string;
};

const missions = [
  { id: "Fitness", icon: "🏃", detail: "Move, train, and build energy" },
  { id: "Focus", icon: "🎯", detail: "Protect time and finish deep work" },
  { id: "Learning", icon: "📚", detail: "Read, study, and grow skills" },
  { id: "Wellness", icon: "🌱", detail: "Care for your mind and body" },
  { id: "Sleep", icon: "🌙", detail: "Build a stronger recovery routine" },
  { id: "Creativity", icon: "🎨", detail: "Make and share something often" },
];

const habitOptions = [
  "Move for 30 minutes", "Read 20 pages", "Drink 8 glasses", "Focus for 25 minutes",
  "Practice a skill", "Sleep before midnight", "Meditate for 10 minutes", "Create for 20 minutes",
];

const styles = [
  { id: "Solo", icon: Target, detail: "Personal quests with low-pressure progress" },
  { id: "Friendly", icon: Users, detail: "Supportive squads and light competition" },
  { id: "Ranked", icon: Swords, detail: "Leaderboards, brackets, and bigger stakes" },
];

const classes = ["Volt Runner", "Focus Mage", "Iron Guardian"];

export function QuestlineOnboarding({ onComplete, onSkip }: { onComplete: (profile: QuestlineProfile) => void; onSkip: () => void }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("Fitness");
  const [habits, setHabits] = useState<string[]>(["Move for 30 minutes", "Drink 8 glasses"]);
  const [playStyle, setPlayStyle] = useState("Friendly");
  const [championName, setChampionName] = useState("Rookie Volt");
  const [championClass, setChampionClass] = useState("Volt Runner");
  const canContinue = step !== 1 || habits.length > 0;
  const selectedMission = useMemo(() => missions.find((mission) => mission.id === goal), [goal]);

  function toggleHabit(habit: string) {
    setHabits((current) => current.includes(habit) ? current.filter((item) => item !== habit) : current.length < 3 ? [...current, habit] : current);
  }

  function finish() {
    onComplete({ championName: championName.trim() || "Rookie Volt", championClass, goal, habits, playStyle });
  }

  return (
    <main className="battle-royale-ui onboarding-shell min-h-screen bg-[#071b36] text-white">
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-amber-300 text-slate-950 shadow-[0_0_28px_rgba(255,216,79,.4)]"><Zap className="size-5 fill-current" /></span><div><p className="font-black tracking-tight">QUESTLINE</p><p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/45">Create your champion</p></div></div>
        <button onClick={onSkip} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[.15em] text-white/55 hover:text-white">Explore demo</button>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-[1280px] items-center gap-8 px-5 pb-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_390px]">
        <section className="onboarding-card game-panel border border-white/10 bg-[#0a1831]/90 p-5 backdrop-blur-xl sm:p-8">
          <div className="mb-8 flex items-center gap-3" aria-label={`Onboarding step ${step + 1} of 4`}>
            {[0, 1, 2, 3].map((item) => <div key={item} className={`h-1.5 flex-1 rounded-full transition-colors ${item <= step ? "bg-amber-300" : "bg-white/10"}`} />)}
            <span className="text-xs font-black text-white/40">{step + 1}/4</span>
          </div>

          {step === 0 && <div><p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Choose your campaign</p><h1 className="mt-2 text-4xl font-black uppercase leading-none sm:text-5xl">What do you want to <span className="text-amber-300">power up?</span></h1><p className="mt-4 text-white/55">Your mission tunes your starter quests and helps us find compatible squads.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{missions.map((mission) => <button key={mission.id} onClick={() => setGoal(mission.id)} aria-pressed={goal === mission.id} className={`flex items-center gap-4 rounded-2xl border p-4 text-left ${goal === mission.id ? "border-cyan-300 bg-cyan-300/10 shadow-[0_0_24px_rgba(51,214,255,.1)]" : "border-white/10 bg-white/[.035]"}`}><span className="text-2xl">{mission.icon}</span><span><strong className="block font-black">{mission.id}</strong><span className="text-sm text-white/45">{mission.detail}</span></span>{goal === mission.id && <Check className="ml-auto size-5 text-cyan-300" />}</button>)}</div></div>}

          {step === 1 && <div><p className="text-xs font-black uppercase tracking-[.2em] text-lime-300">Load your quest deck</p><h1 className="mt-2 text-4xl font-black uppercase leading-none sm:text-5xl">Pick up to <span className="text-amber-300">3 habits.</span></h1><p className="mt-4 text-white/55">Start small. You can create more daily quests once you enter the arena.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{habitOptions.map((habit) => <button key={habit} onClick={() => toggleHabit(habit)} aria-pressed={habits.includes(habit)} className={`flex min-h-16 items-center gap-3 rounded-2xl border p-4 text-left font-extrabold ${habits.includes(habit) ? "border-lime-300 bg-lime-300/10 text-lime-100" : "border-white/10 bg-white/[.035] text-white/70"}`}><span className={`grid size-7 shrink-0 place-items-center rounded-lg border ${habits.includes(habit) ? "border-lime-300 bg-lime-300 text-slate-950" : "border-white/15"}`}>{habits.includes(habit) && <Check className="size-4" />}</span>{habit}</button>)}</div><p className="mt-3 text-right text-xs font-black uppercase tracking-[.15em] text-white/35">{habits.length}/3 equipped</p></div>}

          {step === 2 && <div><p className="text-xs font-black uppercase tracking-[.2em] text-violet-300">Set your play style</p><h1 className="mt-2 text-4xl font-black uppercase leading-none sm:text-5xl">How do you want to <span className="text-amber-300">compete?</span></h1><p className="mt-4 text-white/55">This controls matchmaking—not who you are, just how you like to play.</p><div className="mt-7 grid gap-3">{styles.map((style) => { const Icon = style.icon; return <button key={style.id} onClick={() => setPlayStyle(style.id)} aria-pressed={playStyle === style.id} className={`flex items-center gap-4 rounded-2xl border p-5 text-left ${playStyle === style.id ? "border-violet-300 bg-violet-300/10" : "border-white/10 bg-white/[.035]"}`}><span className="grid size-12 place-items-center rounded-xl bg-violet-300/10 text-violet-200"><Icon /></span><span><strong className="block text-lg font-black">{style.id}</strong><span className="text-sm text-white/45">{style.detail}</span></span>{playStyle === style.id && <Check className="ml-auto text-violet-300" />}</button> })}</div></div>}

          {step === 3 && <div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-300">Champion setup</p><h1 className="mt-2 text-4xl font-black uppercase leading-none sm:text-5xl">Name your <span className="text-amber-300">contender.</span></h1><p className="mt-4 text-white/55">This is your public game name. You can change it later.</p><label className="mt-7 block text-xs font-black uppercase tracking-[.16em] text-white/45" htmlFor="champion-name">Champion name</label><input id="champion-name" maxLength={24} value={championName} onChange={(event) => setChampionName(event.target.value)} className="mt-2 h-14 w-full rounded-2xl border border-white/15 bg-black/25 px-4 text-lg font-black outline-none focus:border-amber-300"/><p className="mt-6 text-xs font-black uppercase tracking-[.16em] text-white/45">Champion class</p><div className="mt-2 grid gap-2 sm:grid-cols-3">{classes.map((item) => <button key={item} onClick={() => setChampionClass(item)} aria-pressed={championClass === item} className={`rounded-xl border px-3 py-3 text-sm font-black ${championClass === item ? "border-amber-300 bg-amber-300 text-slate-950" : "border-white/10 bg-white/5 text-white/60"}`}>{item}</button>)}</div><div className="mt-6 rounded-2xl border border-lime-300/20 bg-lime-300/[.06] p-4 text-sm text-white/55"><strong className="text-lime-200">Your first run is ready.</strong> {habits.length} daily quests · {goal} campaign · {playStyle} play</div></div>}

          <div className="mt-8 flex items-center justify-between gap-3"><Button variant="outline" disabled={step === 0} onClick={() => setStep((value) => value - 1)} className="h-12 rounded-xl border-white/15 bg-white/5 px-5 font-black text-white hover:bg-white/10 disabled:opacity-0"><ArrowLeft /> Back</Button>{step < 3 ? <Button disabled={!canContinue} onClick={() => setStep((value) => value + 1)} className="h-12 rounded-xl bg-amber-300 px-6 font-black text-slate-950 hover:bg-amber-200">Continue <ArrowRight /></Button> : <Button onClick={finish} className="h-12 rounded-xl bg-lime-300 px-6 font-black text-slate-950 hover:bg-lime-200"><Sparkles /> Enter the arena</Button>}</div>
        </section>

        <aside className="relative hidden min-h-[640px] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-violet-500/20 to-cyan-300/10 lg:block"><div className="absolute inset-0 arena-grid opacity-60"/><div className="absolute inset-x-0 top-8 z-10 text-center"><p className="text-xs font-black uppercase tracking-[.22em] text-cyan-300">Live champion preview</p><h2 className="mt-2 text-3xl font-black uppercase">{championName || "Your champion"}</h2><p className="mt-1 text-sm font-bold text-white/45">{championClass} · Level 1</p></div><div className="absolute inset-x-5 bottom-5 z-10 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur"><div className="flex items-center justify-between"><span className="text-sm font-black">{selectedMission?.icon} {goal} campaign</span><span className="rounded-full bg-lime-300/10 px-3 py-1 text-xs font-black text-lime-200">{playStyle}</span></div><div className="mt-3 flex items-center gap-2 text-xs text-white/45"><Shield className="size-4 text-violet-300" /> Beginner bracket · Protected rewards</div></div><Image src="/assets/questline-champion.png" alt="Questline champion preview" fill priority className="object-contain object-bottom px-8 pb-28 pt-24 drop-shadow-[0_30px_45px_rgba(0,0,0,.65)]" /></aside>
      </div>
    </main>
  );
}
