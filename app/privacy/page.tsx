import Link from "next/link";

export const metadata = { title: "Privacy — Questline" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#071b36] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-[#0a1831] p-6 shadow-2xl sm:p-10">
        <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Questline</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-amber-300">Privacy policy</h1>
        <p className="mt-3 text-sm text-white/45">Last updated October 21, 2026</p>
        <div className="mt-8 space-y-7 leading-7 text-white/65">
          <section><h2 className="text-xl font-black text-white">Current prototype</h2><p className="mt-2">Questline currently works without an account. Your champion profile, habits, quest completion, coins, and XP are stored locally on your device or in your browser. This prototype does not upload that information to a Questline server.</p></section>
          <section><h2 className="text-xl font-black text-white">Notifications</h2><p className="mt-2">The iPhone app can schedule a daily quest reminder after you choose to allow notifications. The reminder is scheduled on your device. You can disable it in iOS Settings.</p></section>
          <section><h2 className="text-xl font-black text-white">Leaderboard and matchmaking</h2><p className="mt-2">The players, opponent, leaderboard, and squad shown in the current prototype are demonstration content. They do not represent real people or public user records.</p></section>
          <section><h2 className="text-xl font-black text-white">Future online features</h2><p className="mt-2">Before real accounts, friends, multiplayer battles, or online leaderboards are introduced, this policy will be updated to explain what data is collected, why it is needed, how long it is retained, and how it can be deleted.</p></section>
          <section><h2 className="text-xl font-black text-white">Questions and deletion</h2><p className="mt-2">Because the current prototype stores progress locally, you can delete it by clearing the website’s storage or deleting the iPhone app. For questions, use the project’s public support page.</p></section>
        </div>
        <div className="mt-10 flex flex-wrap gap-3"><Link className="rounded-xl bg-amber-300 px-5 py-3 font-black text-slate-950" href="/">Back to Questline</Link><Link className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-black" href="/support/">Support</Link></div>
      </article>
    </main>
  );
}
