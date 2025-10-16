"use client";

import React from "react";
import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";
import useStore from "@/store/useStore";
import QuestsTable from "@/components/QuestsTable";
import ProgressBar from "@/components/ProgressBar";
import PlusXP from "@/components/PlusXP";
import LevelUpToast from "@/components/LevelUpToast";

function Page() {
  const player = useStore((state) => state.player);
  const showLevelUp = useStore((state) => state.showLevelUp);

  return (
    <div className="font-sans min-h-screen flex flex-col px-4 sm:px-8 md:px-20 py-8 pb-20 gap-8 bg-gradient-to-b from-gray-900 via-slate-900 to-zinc-900 text-white">
      <main className="flex-1 flex flex-col gap-8 w-full max-w-4xl mx-auto items-center sm:items-start">
        <section className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
              XP Calculator
            </h1>
            <div className="bg-gradient-to-br from-gray-800/50 to-zinc-900/50 backdrop-blur-lg border border-white/5 rounded-lg p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  {player.name[0]}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-white/90">
                    {player.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 rounded text-sm font-medium border border-amber-500/10">
                      Level {player.level}
                    </span>
                    <span className="text-sm text-zinc-400 inline-flex items-center">
                      {typeof player.xp === "number"
                        ? player.xp.toLocaleString()
                        : "0"}{" "}
                      /{" "}
                      {typeof player.xpNeeded === "number"
                        ? player.xpNeeded.toLocaleString()
                        : "1,000"}{" "}
                      XP
                      <PlusXP
                        xpAmount={useStore((state) => state.lastXPGain)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProgressBar />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => useStore.getState().resetXP()}
              className="px-3 py-1.5 text-sm font-medium text-red-300 bg-gradient-to-r from-red-500/10 to-rose-500/10 
                        hover:from-red-500/20 hover:to-rose-500/20 rounded-lg border border-red-500/20 
                        transition-all duration-200 flex items-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
              Reset All Progress
            </button>
          </div>
        </section>
        <section className="w-full">
          <h3 className="max-w-xl text-center sm:text-left text-lg text-zinc-400 mb-2">
            Lists of available Quests
          </h3>
          <div className="mt-2 w-full overflow-x-auto">
            <QuestsTable />
          </div>
        </section>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center w-full max-w-4xl mx-auto mt-8">
        <Link
          href="/"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          rel="noopener noreferrer"
        >
          <CircleArrowLeft size={16} />
          Home
        </Link>
      </footer>
      {showLevelUp && <LevelUpToast level={player.level} />}
    </div>
  );
}

export default Page;
