import type { Profile } from "../profile.type";
import type { DragEndEvent } from "@dnd-kit/core";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
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
  const [vw, setVw] = React.useState(window.innerWidth);
  const { widthSize, percent } = React.useMemo(() => {
    const widthSize = vw >= 1280 ? "xl" : vw >= 768 ? "md" : "sm";
    const percent =
      widthSize === "sm" ? vw / 50 : widthSize === "md" ? vw / 100 : 1280 / 100;

    return { widthSize, percent };
  }, [vw]);

  React.useEffect(() => {
    const handleResize = () => {
      const newVw = window.innerWidth;

      setVw(newVw);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        x: Math.ceil((event.delta.x / vw) * 100),
        y: Math.ceil(event.delta.y / percent),
      },
    });
  };

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <DroppableArea
        className="first-box border-b-1 border-x-1 border-dashed"
        id="droppable"
      >
        <DraggableBox
          id="name"
          x={((vw >= 1280 ? 1280 : vw) * profile.name.x) / 100}
          y={profile.name.y * percent}
        >
          <InPlaceEditor
            className="name"
            fontSize={widthSize === "sm" ? "12vw" : 11 * percent}
            maxWidth={widthSize === "sm" ? "80vw" : 60 * percent}
            minWidth={widthSize === "sm" ? "15vw" : 7 * percent}
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
          id="avatar"
          x={((vw >= 1280 ? 1280 : vw) * profile.avatar.x) / 100}
          y={profile.avatar.y * percent}
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
          id="tag"
          x={((vw >= 1280 ? 1280 : vw) * profile.tag.x) / 100}
          y={profile.tag.y * percent}
        >
          <TagsEditor
            maxWidth={widthSize === "sm" ? "20vw" : 15 * percent}
            minWidth={widthSize === "sm" ? "15vw" : 13 * percent}
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
          x={((vw >= 1280 ? 1280 : vw) * profile.introduction.x) / 100}
          y={profile.introduction.y * percent}
        >
          <InPlaceEditor
            className="introduction"
            maxWidth={widthSize === "sm" ? "60vw" : 40 * percent}
            minWidth={widthSize === "sm" ? "55vw" : 35 * percent}
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
          x={((vw >= 1280 ? 1280 : vw) * profile.social.x) / 100}
          y={profile.social.y * percent}
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
      </DroppableArea>
      <ExperienceEditor
        experiences={profile.resume}
        onChange={(experiences) =>
          dispatchProfile({
            type: "DATA",
            payload: { key: "resume", data: experiences },
          })
        }
      />
    </DndContext>
  );
};

export default ProfileEditor;
