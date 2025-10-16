import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PlusXPProps {
  xpAmount: number;
}

const PlusXP: React.FC<PlusXPProps> = ({ xpAmount }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [xpAmount]);

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 10,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="inline-block text-green-500 font-bold ml-1"
        >
          +{xpAmount}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default PlusXP;
