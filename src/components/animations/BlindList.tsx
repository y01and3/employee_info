import type { ReactNode } from "react";

import { useScroll } from "framer-motion";
import React from "react";

import BlindItem from "./BlindItem";
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

interface BlindListProps {
  className?: string;
  items: BlindItemData[];
  speed?: number;
  getScrollAnimationRanges?: GetScrollAnimationRangesFn;
}

const BlindList = ({
  className,
  items,
  speed = 1,
  getScrollAnimationRanges = defaultGetScrollAnimationRanges,
}: BlindListProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  return (
    <div
      ref={containerRef}
      className={`blind-list-container ${className ?? ""}`}
    >
      <div className="blind-list">
        {items.map((item, index) => {
          const { fromRange, toRange } = getScrollAnimationRanges(
            index,
            items.length,
            speed,
          );

          return (
            <BlindItem
              key={item.id}
              content={item.content}
              fromRange={fromRange}
              scrollYProgress={scrollYProgress}
              toRange={toRange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlindList;
