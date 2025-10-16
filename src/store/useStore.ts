import { create } from "zustand";
import { Quest, Player } from "../types/types";
import { quests as seedQuests } from "../data";

type StoreState = {
  quests: Quest[];
  player: Player;
  lastXPGain: number;
  showLevelUp: boolean;
  setPlayer: (p: Player) => void;
  addXP: (xp: number) => void;
  resetXP: () => void;
  dismissLevelUp: () => void;
};

// Calculate XP required for a specific level (1000 × n^1.5)
const getXPForLevel = (level: number): number => {
  return Math.floor(1000 * Math.pow(level, 1.5));
};

// Calculate total XP required up to a level
const getTotalXPForLevel = (level: number): number => {
  return getXPForLevel(level);
};

// Find the level based on total XP
const getLevelFromTotalXP = (totalXP: number): number => {
  let level = 1;
  while (getTotalXPForLevel(level + 1) <= totalXP) {
    level++;
  }
  return level;
};

// Get XP progress within current level
// const getXPProgress = (totalXP: number): number => {
//   const currentLevel = getLevelFromTotalXP(totalXP);
//   const currentLevelXP = getTotalXPForLevel(currentLevel);
//   const nextLevelXP = getTotalXPForLevel(currentLevel + 1);
//   return totalXP - currentLevelXP;
// };

// // Get XP needed for next level
// const getXPNeededForNextLevel = (totalXP: number): number => {
//   const currentLevel = getLevelFromTotalXP(totalXP);
//   const nextLevelXP = getTotalXPForLevel(currentLevel + 1);
//   return nextLevelXP - totalXP;
// };

// Load initial state from localStorage or use default values
const getInitialState = () => {
  const initialPlayer = {
    id: "player-1",
    name: "You",
    level: 1,
    xp: 0,
    xpNeeded: 1000, // Initial XP needed for level 1 to 2
    totalXP: 0,
  };

  if (typeof window === "undefined") return initialPlayer;

  try {
    const savedPlayer = localStorage.getItem("player");
    if (!savedPlayer) return initialPlayer;

    const parsed = JSON.parse(savedPlayer);
    // Ensure all required properties exist
    return {
      id: parsed.id || initialPlayer.id,
      name: parsed.name || initialPlayer.name,
      level: parsed.level || 1,
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      xpNeeded: typeof parsed.xpNeeded === "number" ? parsed.xpNeeded : 1000,
      totalXP: typeof parsed.totalXP === "number" ? parsed.totalXP : 0,
    };
  } catch (error) {
    console.error("Error loading player state:", error);
    return initialPlayer;
  }
};

const useStore = create<StoreState>((set) => ({
  quests: seedQuests,
  player: getInitialState(),
  lastXPGain: 0,
  showLevelUp: false,
  setPlayer: (p) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("player", JSON.stringify(p));
    }
    set({ player: p });
  },
  addXP: (xp) =>
    set((state) => {
      const newTotalXP = Math.max(0, state.player.totalXP + xp);
      const currentLevel = getLevelFromTotalXP(newTotalXP);
      const nextLevelXP = getTotalXPForLevel(currentLevel + 1);
      const currentLevelXP = getTotalXPForLevel(currentLevel);
      const xpInCurrentLevel = Math.max(0, newTotalXP - currentLevelXP);
      const xpNeededForNextLevel = nextLevelXP - currentLevelXP;

      const updatedPlayer = {
        ...state.player,
        totalXP: newTotalXP,
        level: currentLevel,
        xp: xpInCurrentLevel,
        xpNeeded: xpNeededForNextLevel,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("player", JSON.stringify(updatedPlayer));
      }

      return {
        player: updatedPlayer,
        lastXPGain: xp,
        showLevelUp: currentLevel > state.player.level,
      };
    }),
  dismissLevelUp: () => set({ showLevelUp: false }),
  resetXP: () => {
    const resetPlayer = {
      ...getInitialState(),
      xp: 0,
      level: 1,
      totalXP: 0,
      xpNeeded: 1000,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("player", JSON.stringify(resetPlayer));
    }
    set({ player: resetPlayer });
  },
}));

export default useStore;
