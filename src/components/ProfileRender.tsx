import type { Profile } from "../profile.type";

import { Button, Chip, Link } from "@heroui/react";
import React from "react";

import Avatar from "./animations/Avatar";
import BlindList from "./animations/BlindList";

interface RenderBoxProps {
  className?: string;
  gridX: number;
  gridY: number;
  children?: React.ReactNode;
}

const RenderBox = ({ className, gridX, gridY, children }: RenderBoxProps) => {
  return (
    <div
      className={`render-box ${className ?? ""}`}
      style={{ gridColumnStart: gridX, gridRowStart: gridY }}
    >
      <div className="w-fit h-fit">{children}</div>
    </div>
  );
};

interface ProfileRenderProps {
  profile: Profile;
}

const ProfileRender = ({ profile }: ProfileRenderProps) => {
  const [vw, setVw] = React.useState(window.innerWidth);
  const widthSize = React.useMemo(
    () => (vw >= 1280 ? "xl" : vw >= 768 ? "md" : "sm"),
    [vw],
  );
  const gridSize = React.useMemo(() => (vw >= 1280 ? vw / 20 : vw / 10), [vw]);

  React.useEffect(() => {
    const handleResize = () => {
      const newVw = window.innerWidth;

      setVw(newVw);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center relative bg-gray-200">
      <div className="grid-box">
        <RenderBox gridX={profile.name.gridX} gridY={profile.name.gridY}>
          <h1
            className="name"
            style={{
              maxWidth: gridSize * (widthSize === "sm" ? 5 : 10),
              minWidth: gridSize * 3,
              whiteSpace: widthSize === "sm" ? "normal" : "nowrap",
            }}
          >
            {profile.name.context}
          </h1>
        </RenderBox>

        <RenderBox gridX={profile.avatar.gridX} gridY={profile.avatar.gridY}>
          <Avatar className="avatar" src={profile.avatar.context} />
        </RenderBox>

        <RenderBox gridX={profile.tag.gridX} gridY={profile.tag.gridY}>
          <div
            className="tags"
            style={{
              maxWidth:
                gridSize *
                (widthSize === "sm" ? 3 : widthSize === "md" ? 7 : 15),
              minWidth:
                gridSize *
                (widthSize === "sm" ? 2 : widthSize === "md" ? 5 : 13),
            }}
          >
            {profile.tag.context.map((tag) => (
              <Chip
                key={tag.id}
                color="secondary"
                startContent={
                  <span className="ml-1 my-auto" role="img">
                    {tag.emoji}
                  </span>
                }
                variant="shadow"
              >
                {tag.text}
              </Chip>
            ))}
          </div>
        </RenderBox>

        <RenderBox
          gridX={profile.introduction.gridX}
          gridY={profile.introduction.gridY}
        >
          <p
            className="introduction"
            style={{
              maxWidth:
                gridSize *
                (widthSize === "sm" ? 3 : widthSize === "md" ? 7 : 15),
              minWidth:
                gridSize *
                (widthSize === "sm" ? 2 : widthSize === "md" ? 5 : 13),
            }}
          >
            {profile.introduction.context}
          </p>
        </RenderBox>

        <RenderBox
          className="social"
          gridX={profile.social.gridX}
          gridY={profile.social.gridY}
        >
          {profile.social.context.map((social) => (
            <Button key={social.id} isIconOnly as={Link} href={social.link}>
              <span className="m-auto" role="img">
                {social.emoji}
              </span>
            </Button>
          ))}
        </RenderBox>
      </div>

      <BlindList
        className="resume"
        items={profile.resume.context.map((experience) => ({
          id: experience.id.toString(),
          content: (
            <div key={experience.id}>
              <h2 className="resume-title">{experience.title}</h2>
              <p className="resume-date">
                {new Date(experience.start).toLocaleDateString()} -{" "}
                {new Date(experience.end).toLocaleDateString()}
              </p>
            </div>
          ),
        }))}
        speed={1.5}
      />
    </div>
  );
};

export default ProfileRender;
