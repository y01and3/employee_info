import type { Profile } from "../profile.type";
import type { DragEndEvent } from "@dnd-kit/core";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createSnapModifier, restrictToWindowEdges } from "@dnd-kit/modifiers";
import React from "react";

import { ProfileContext } from "../hooks/profileContext";

import DraggableBox from "./DraggableBox";
import DroppableArea from "./DroppableArea";
import AvatarEditor from "./editor/AvatarEditor";
import ExperienceEditor from "./editor/ExperienceEditor";
import InPlaceEditor from "./editor/InPlaceEditor";
import SocialEditor from "./editor/SocialEditor";
import TagsEditor from "./editor/TagsEditor";

const ProfileEditor = () => {
  const { profile, dispatchProfile } = React.useContext(ProfileContext);
  const vw = window.innerWidth;
  const gridSize = vw >= 1280 ? vw / 20 : vw >= 768 ? vw / 10 : vw / 5;
  const snapToGrid = React.useMemo(() => {
    return createSnapModifier(gridSize);
  }, [gridSize]);

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
  const sensors = useSensors(mouseSensor, touchSensor);
  const handleDragEnd = (event: DragEndEvent) => {
    const id = event.active.id as keyof Profile;

    if (!id || !profile[id]) {
      return;
    }
    dispatchProfile({
      type: "POSITION",
      payload: {
        key: id,
        gridX: Math.ceil(event.delta.x / gridSize),
        gridY: Math.ceil(event.delta.y / gridSize),
      },
    });
  };

  return (
    <DndContext
      modifiers={[snapToGrid, restrictToWindowEdges]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <DroppableArea className="grid-box" id="droppable">
        <DraggableBox
          gridX={profile.name.gridX}
          gridY={profile.name.gridY}
          id="name"
        >
          <InPlaceEditor
            className="name"
            maxWidth={gridSize * 10}
            minWidth={gridSize * 3}
            type="text"
            value={profile.name.context}
            onSave={(value) =>
              dispatchProfile({
                type: "DATA",
                payload: { key: "name", data: value },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          gridX={profile.avatar.gridX}
          gridY={profile.avatar.gridY}
          id="avatar"
        >
          <AvatarEditor
            avatar={profile.avatar.context}
            onChange={(src) =>
              dispatchProfile({
                type: "DATA",
                payload: { key: "avatar", data: src },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          gridX={profile.tag.gridX}
          gridY={profile.tag.gridY}
          id="tag"
        >
          <TagsEditor
            maxWidth={gridSize * 15}
            minWidth={gridSize * 5}
            tags={profile.tag.context}
            onChange={(tags) =>
              dispatchProfile({
                type: "DATA",
                payload: { key: "tag", data: tags },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          gridX={profile.introduction.gridX}
          gridY={profile.introduction.gridY}
          id="introduction"
        >
          <InPlaceEditor
            className="introduction"
            maxWidth={gridSize * 15}
            minWidth={gridSize * 5}
            type="textarea"
            value={profile.introduction.context}
            onSave={(value) =>
              dispatchProfile({
                type: "DATA",
                payload: { key: "introduction", data: value },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          gridX={profile.social.gridX}
          gridY={profile.social.gridY}
          id="social"
        >
          <SocialEditor
            socials={profile.social.context}
            onChange={(socials) =>
              dispatchProfile({
                type: "DATA",
                payload: { key: "social", data: socials },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          gridX={profile.resume.gridX}
          gridY={profile.resume.gridY}
          id="resume"
        >
          <ExperienceEditor
            experiences={profile.resume.context}
            onChange={(experiences) =>
              dispatchProfile({
                type: "DATA",
                payload: { key: "resume", data: experiences },
              })
            }
          />
        </DraggableBox>
      </DroppableArea>
    </DndContext>
  );
};

export default ProfileEditor;
