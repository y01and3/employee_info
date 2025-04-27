import type { DragEndEvent } from "@dnd-kit/core";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Map } from "immutable";
import React from "react";

import DraggableBox from "./components/DraggableBox";
import DroppableArea from "./components/DroppableArea";

type position = {
  x: number;
  y: number;
};

const EditApp = () => {
  const [itemPositions, setPositions] = React.useState(
    Map<string, position>({ "item-1": { x: 0, y: 0 } }),
  );
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      distance: 3,
      tolerance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      distance: 3,
      tolerance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const handleDragEnd = (event: DragEndEvent) => {
    const id = event.active.id as string;

    setPositions(
      itemPositions.set(id, {
        x: itemPositions.get(id)!.x + event.delta.x,
        y: itemPositions.get(id)!.y + event.delta.y,
      }),
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <DroppableArea
        className="w-100vw h-100vh bg-gray-200 overflow-hidden"
        id="droppable-1"
      >
        <DraggableBox
          id="item-1"
          left={itemPositions.get("item-1")!.x}
          top={itemPositions.get("item-1")!.y}
        >
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-lg font-bold">Item 1</h2>
            <p>Drag me around!</p>
          </div>
        </DraggableBox>
      </DroppableArea>
    </DndContext>
  );
};

export default EditApp;
