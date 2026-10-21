import Link from "next/link";

export const metadata = { title: "Support — Questline" };

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#071b36] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-[#0a1831] p-6 shadow-2xl sm:p-10">
        <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Questline</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-amber-300">Player support</h1>
        <p className="mt-4 leading-7 text-white/60">Questline is currently an early prototype. Progress is stored on your device and there are no public player accounts yet.</p>
        <div className="mt-8 grid gap-4">
          <section className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><h2 className="font-black">Reset your run</h2><p className="mt-2 text-sm leading-6 text-white/50">On the website, clear site data for Questline. On iPhone, delete and reinstall the app. This permanently removes locally stored progress.</p></section>
          <section className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><h2 className="font-black">Notifications</h2><p className="mt-2 text-sm leading-6 text-white/50">Open iOS Settings → Notifications → Questline to change or disable reminder permissions.</p></section>
          <section className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><h2 className="font-black">Report a problem</h2><p className="mt-2 text-sm leading-6 text-white/50">Open a support issue in the public Questline repository. Do not include passwords, private health information, or other sensitive data.</p><a className="mt-4 inline-flex rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 font-black text-cyan-100" href="https://github.com/BytesofTay/questline-habits/issues" rel="noreferrer" target="_blank">Open GitHub support</a></section>
        </div>
        <div className="mt-10 flex flex-wrap gap-3"><Link className="rounded-xl bg-amber-300 px-5 py-3 font-black text-slate-950" href="/">Back to Questline</Link><Link className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-black" href="/privacy/">Privacy</Link></div>
      </article>
    </main>
  );
}
