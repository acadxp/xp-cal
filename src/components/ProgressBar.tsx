import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "@/store/useStore";

function ProgressBar() {
  const player = useStore((state) => state.player);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [prevXP, setPrevXP] = useState(player.xp);

  useEffect(() => {
    if (player.xp < prevXP) {
      // XP decreased (level up occurred)
      setIsLevelingUp(true);
      // First animate to 100%
      setTimeout(() => {
        setIsLevelingUp(false); // Then reset and animate to new XP
      }, 800); // Match the animation duration
    }
    setPrevXP(player.xp);
  }, [player.xp, prevXP]);

  return (
    <div className="w-full h-4 bg-gray-300 border border-bloack rounded-full overflow-hidden mb-6">
      <motion.div
        className="h-4 bg-green-500"
        initial={{ width: 0 }}
        animate={{
          width: isLevelingUp
            ? "100%"
            : `${(player.xp / player.xpNeeded) * 100}%`,
        }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}

export default ProgressBar;
