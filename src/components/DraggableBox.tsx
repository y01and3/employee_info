import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface DraggableBoxProps {
  id: string;
  gridX?: number;
  gridY?: number;
  className?: string;
  children?: React.ReactNode;
}

const DraggableBox = ({
  id,
  gridX,
  gridY,
  children,
  className,
}: DraggableBoxProps) => {
  const { attributes, listeners, isDragging, setNodeRef, transform } =
    useDraggable({
      id,
    });
  const style = {
    gridColumnStart: gridX,
    gridRowStart: gridY,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      className={
        `draggable` +
        " " +
        (isDragging ? "cursor-grabbing" : "cursor-grab") +
        " " +
        (className ? className : "")
      }
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="w-fit h-fit">{children}</div>
    </div>
  );
};

export default React.memo(DraggableBox);
