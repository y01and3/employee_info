import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";

import { motion, useTransform } from "framer-motion";
import React from "react";
import "./BlindList.css";

interface BlindItemProps {
  content: ReactNode;
  revealProgress: MotionValue<number>;
}

export const BlindItem: React.FC<BlindItemProps> = ({
  content,
  revealProgress,
}) => {
  const scaleY = useTransform(revealProgress, [0, 1], [0, 1]);

  return (
    <div className="blind-item-wrapper">
      <motion.div
        className="blind-item-clipper"
        style={{
          scaleY: scaleY,
          transformOrigin: "top center",
          overflow: "hidden",
          background: "#ffffff",
          border: "1px solid #cccccc",
          boxSizing: "border-box",
          height: "auto",
          minHeight: 1,
        }}
      >
        <div className="blind-item-content">{content}</div>
      </motion.div>
    </div>
  );
};
