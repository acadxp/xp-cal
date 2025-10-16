import { Code, Calculator, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-b from-gray-900 via-slate-900 to-zinc-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start relative">
        <div className="relative">
          <small className="inline-block px-3 py-1 text-sm text-zinc-400 tracking-widest bg-gradient-to-r from-zinc-800/50 to-slate-800/50 rounded-full border border-white/5 backdrop-blur-sm">
            AcadXP Project
          </small>
        </div>

        <div className="space-y-6 relative">
          <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            XP Simulation
          </h1>
          <p className="max-w-xl text-center sm:text-left text-lg text-zinc-400">
            Calculate your experience points (XP) easily with our XP Calculator
            tool. Simulation for our AcadXP platform.
          </p>
          <Link
            href="/calculator"
            className="inline-flex px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-lg font-medium 
                     hover:opacity-90 transition shadow-[0_0_20px_rgba(168,85,247,0.5)] items-center gap-2 group"
          >
            <span>Go to XP Calculator</span>
            <Calculator className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center relative">
        <a
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          href="https://github.com/acadxp/xp-cal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Code size={16} />
          Github Repo
        </a>
        <Link
          href="/calculator"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          rel="noopener noreferrer"
        >
          <Calculator size={16} />
          XP Calculator
        </Link>
        <Link
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Globe size={16} />
          AcadXP →
        </Link>
      </footer>
    </div>
  );
}
