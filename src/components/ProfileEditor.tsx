import type { Profile } from "../profile.type";
import type { DragEndEvent } from "@dnd-kit/core";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import React from "react";

import { ProfileContext } from "../hooks/profileContext";

import DraggableBox from "./DraggableBox";
import DroppableArea from "./DroppableArea";
import ExperienceEditor from "./editor/ExperienceEditor";
import InPlaceEditor from "./editor/InPlaceEditor";
import SocialEditor from "./editor/SocialEditor";
import TagsEditor from "./editor/TagsEditor";

const ProfileEditor = () => {
  const { profile, dispatchProfile } = React.useContext(ProfileContext);

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
        top: event.delta.y,
        left: event.delta.x,
      },
    });
  };

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <DroppableArea id="droppable">
        <DraggableBox id="name" left={profile.name.left} top={profile.name.top}>
          <InPlaceEditor
            className="name"
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

        <DraggableBox id="tag" left={profile.tag.left} top={profile.tag.top}>
          <TagsEditor
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
          id="introduction"
          left={profile.introduction.left}
          top={profile.introduction.top}
        >
          <InPlaceEditor
            className="introduction"
            maxWidth={"70vw"}
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
          id="social"
          left={profile.social.left}
          top={profile.social.top}
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
          id="resume"
          left={profile.resume.left}
          top={profile.resume.top}
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
