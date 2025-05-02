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

import editProfileReducer from "../hooks/editProfileReducer";

import DraggableBox from "./DraggableBox";
import DroppableArea from "./DroppableArea";
import ExperienceEditor from "./editor/ExperienceEditor";
import InPlaceEditor from "./editor/InPlaceEditor";
import SocialEditor from "./editor/SocialEditor";
import TagsEditor from "./editor/TagsEditor";

interface ProfileEditorProps {
  profile: Profile;
}

const ProfileEditor = ({ profile }: ProfileEditorProps) => {
  const [profileState, profileDispatch] = React.useReducer(
    editProfileReducer,
    profile,
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
  const sensors = useSensors(mouseSensor, touchSensor);
  const handleDragEnd = (event: DragEndEvent) => {
    const id = event.active.id as keyof Profile;

    if (!id || !profile[id]) {
      return;
    }
    profileDispatch({
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
        <DraggableBox
          className="border-4 rounded border-dotted border-blue-500"
          id="name"
          left={profileState.name.left}
          top={profileState.name.top}
        >
          <InPlaceEditor
            className="text-xl"
            type="text"
            value={profileState.name.context}
            onSave={(value) =>
              profileDispatch({
                type: "DATA",
                payload: { key: "name", data: value },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          className="border-4 rounded border-dotted border-blue-500 w-fit h-fit"
          id="tag"
          left={profileState.tag.left}
          top={profileState.tag.top}
        >
          <TagsEditor
            tags={profileState.tag.context}
            onChange={(tags) =>
              profileDispatch({
                type: "DATA",
                payload: { key: "tag", data: tags },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          className="border-4 rounded border-dotted border-blue-500"
          id="introduction"
          left={profileState.introduction.left}
          top={profileState.introduction.top}
        >
          <InPlaceEditor
            maxWidth={"70vw"}
            type="textarea"
            value={profileState.introduction.context}
            onSave={(value) =>
              profileDispatch({
                type: "DATA",
                payload: { key: "introduction", data: value },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          className="border-4 rounded border-dotted border-blue-500"
          id="social"
          left={profileState.social.left}
          top={profileState.social.top}
        >
          <SocialEditor
            socials={profileState.social.context}
            onChange={(socials) =>
              profileDispatch({
                type: "DATA",
                payload: { key: "social", data: socials },
              })
            }
          />
        </DraggableBox>

        <DraggableBox
          className="border-4 rounded border-dotted border-blue-500"
          id="resume"
          left={profileState.resume.left}
          top={profileState.resume.top}
        >
          <ExperienceEditor
            experiences={profileState.resume.context}
            onChange={(experiences) =>
              profileDispatch({
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
