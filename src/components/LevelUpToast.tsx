import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/useStore";

interface LevelUpToastProps {
  level: number;
}

const LevelUpToast: React.FC<LevelUpToastProps> = ({ level }) => {
  const dismissLevelUp = useStore((state) => state.dismissLevelUp);

  useEffect(() => {
    const timer = setTimeout(() => {
      dismissLevelUp();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [dismissLevelUp]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.95,
          transition: { duration: 0.2, ease: "easeIn" },
        }}
        className="fixed top-6 left-1/2 -translate-x-1/2 max-w-sm w-full mx-auto backdrop-blur-xl
                   bg-gradient-to-r from-zinc-900/90 to-zinc-800/90 
                   text-white px-4 py-3 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.25)] 
                   border border-zinc-700/50 z-50 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 blur-2xl rounded-full" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-2xl rounded-full" />
        </div>

        {/* Content */}
        <div className="relative flex items-center gap-4">
          <div className="flex-shrink-0 relative">
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 
                        flex items-center justify-center shadow-lg"
              initial={{ rotate: -20, scale: 0.5 }}
              animate={{
                rotate: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { delay: 0.2, type: "spring", stiffness: 200 },
              }}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full 
                         bg-gradient-to-br from-yellow-400 to-orange-400 
                         flex items-center justify-center text-sm font-bold text-white
                         shadow-lg border-2 border-white/20"
            >
              {level}
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.1, duration: 0.3 },
              }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-br from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
                Level Up!
              </h3>
              <p className="text-zinc-400 text-sm mt-0.5">
                Congratulations! You&apos;ve reached level {level}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: {
                        delay: 0.2 + i * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LevelUpToast;
