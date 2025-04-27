import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface DroppableAreaProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
}

const DroppableArea = ({ id, children, className }: DroppableAreaProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default DroppableArea;
