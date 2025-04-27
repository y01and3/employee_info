import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface DraggableBoxProps {
  id: string;
  top: number;
  left: number;
  className?: string;
  children?: React.ReactNode;
}

const DraggableBox = ({
  id,
  top,
  left,
  children,
  className,
}: DraggableBoxProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    top,
    left,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      className={`absolute p-5` + " " + className}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default DraggableBox;
