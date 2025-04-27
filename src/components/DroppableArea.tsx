import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface DroppableAreaProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
}

const DroppableArea = ({ id, children, className }: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
};

export default DroppableArea;
