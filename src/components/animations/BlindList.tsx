import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";

import { useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { BlindItem } from "./BlindItem";
import "./BlindList.css";

interface BlindItemData {
  id: string;
  content: ReactNode;
}

interface GetScrollAnimationRangesFn {
  (
    index: number,
    totalItems: number,
    speed: number,
  ): { fromRange: number[]; toRange: number[] };
}

interface BlindListProps {
  className?: string;
  items: BlindItemData[];
  speed?: number;
  getScrollAnimationRanges?: GetScrollAnimationRangesFn;
}

export const BlindList: React.FC<BlindListProps> = ({
  className,
  items,
  speed = 1,
  getScrollAnimationRanges = defaultGetScrollAnimationRanges,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center start"],
  });

  const itemRevealProgresses: MotionValue<number>[] = items.map((_, index) => {
    const { fromRange, toRange } = getScrollAnimationRanges(
      index,
      items.length,
      speed,
    );

    const revealProgress = useTransform(scrollYProgress, fromRange, toRange, {
      clamp: true,
    });

    return revealProgress;
  });

  return (
    <div
      ref={containerRef}
      className={`blind-list-container ${className ?? ""}`}
    >
      <div className="blind-list">
        {items.map((item, index) => (
          <BlindItem
            key={item.id}
            content={item.content}
            revealProgress={itemRevealProgresses[index]}
          />
        ))}
      </div>
      <div className="blind-list-spacer-bottom" />
    </div>
  );
};

const defaultGetScrollAnimationRanges: GetScrollAnimationRangesFn = (
  index,
  totalItems,
  speed = 1,
) => {
  const totalRevealRange = 1;
  const baseStaggerAmount = totalRevealRange / totalItems;
  const staggerAmount = baseStaggerAmount / speed;
  const itemDuration = staggerAmount * 2;

  const itemStartProgress = index * staggerAmount;
  const itemEndProgress = itemStartProgress + itemDuration;

  return {
    fromRange: [itemStartProgress, itemEndProgress],
    toRange: [0, 1],
  };
};
