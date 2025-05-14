import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";

import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import React from "react";
import "./BlindList.css";

interface BlindItemProps {
  content: ReactNode;
  scrollYProgress: MotionValue<number>;
  fromRange: number[];
  toRange: number[];
}

const BlindItem = ({
  content,
  scrollYProgress,
  fromRange,
  toRange,
}: BlindItemProps) => {
  const revealProgress = useTransform(scrollYProgress, fromRange, toRange, {
    clamp: true,
  });

  const scaleY = useTransform(revealProgress, [0, 1], [0, 1]);
  const translateY = useTransform(revealProgress, [0, 1], [-50, 0]);
  const opacity = useTransform(revealProgress, [0, 1], [0, 1]);

  const [isFullyRevealed, setIsFullyRevealed] = React.useState(false);

  useMotionValueEvent(revealProgress, "change", (latestValue) => {
    const threshold = 0.999;

    if (latestValue > threshold && !isFullyRevealed) {
      setIsFullyRevealed(true);
    } else if (latestValue < threshold && isFullyRevealed) {
      setIsFullyRevealed(false);
    }
  });

  return (
    <div className="blind-item-wrapper">
      <motion.div
        {...(isFullyRevealed
          ? { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }
          : {})}
        className="blind-item-clipper"
        style={{
          scaleY: scaleY,
          translateY: translateY,
          opacity: opacity,
        }}
      >
        <div className="blind-item-content">{content}</div>
      </motion.div>
    </div>
  );
};

export default BlindItem;
