import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";

import { motion, useTransform } from "framer-motion";
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

  return (
    <div className="blind-item-wrapper">
      <motion.div
        className="blind-item-clipper"
        style={{
          scaleY: scaleY,
        }}
      >
        <div className="blind-item-content">{content}</div>
      </motion.div>
    </div>
  );
};

export default BlindItem;
