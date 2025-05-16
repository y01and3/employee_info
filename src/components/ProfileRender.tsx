import type { Profile } from "../profile.type";

import { Button, Chip, Divider, Link } from "@heroui/react";
import React from "react";

import Avatar from "./animations/Avatar";
import BlindList from "./animations/BlindList";
import Name from "./animations/Name";
import TextGenerateEffect from "./animations/TextGenerateEffect";

interface RenderBoxProps {
  className?: string;
  x: number;
  y: number;
  children?: React.ReactNode;
}

const RenderBox = ({ className, x, y, children }: RenderBoxProps) => {
  return (
    <div
      className={`render-box ${className ?? ""}`}
      style={{
        top: y,
        left: x,
      }}
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

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center relative">
      <div className="first-box">
        <RenderBox
          x={(profile.name.x * (vw >= 1280 ? 1280 : vw)) / 100}
          y={profile.name.y * percent}
        >
          <Name
            className="name"
            style={{
              fontSize: widthSize === "sm" ? "12vw" : 11 * percent,
              maxWidth: widthSize === "sm" ? "80vw" : 60 * percent,
              minWidth: widthSize === "sm" ? "15vw" : 7 * percent,
            }}
          >
            {profile.name.context}
          </Name>
        </RenderBox>

        <RenderBox
          x={(profile.avatar.x * (vw >= 1280 ? 1280 : vw)) / 100}
          y={profile.avatar.y * percent}
        >
          <Avatar className="avatar" src={profile.avatar.context} />
        </RenderBox>

        <RenderBox
          x={(profile.tag.x * (vw >= 1280 ? 1280 : vw)) / 100}
          y={profile.tag.y * percent}
        >
          <div
            className="tags"
            style={{
              maxWidth: widthSize === "sm" ? "20vw" : 10 * percent,
              minWidth: widthSize === "sm" ? "15vw" : 7 * percent,
            }}
          >
            {profile.tag.context.map((tag) => (
              <Chip
                key={tag.id}
                className="tag"
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
          x={(profile.introduction.x * (vw >= 1280 ? 1280 : vw)) / 100}
          y={profile.introduction.y * percent}
        >
          <TextGenerateEffect
            className="introduction"
            duration={0.5}
            filter={false}
            style={{
              maxWidth: widthSize === "sm" ? "60vw" : 55 * percent,
              minWidth: widthSize === "sm" ? "55vw" : 50 * percent,
            }}
            words={profile.introduction.context}
          />
        </RenderBox>

        <RenderBox
          x={(profile.social.x * (vw >= 1280 ? 1280 : vw)) / 100}
          y={profile.social.y * percent}
        >
          <div
            className="social"
            style={{
              maxWidth: widthSize === "sm" ? "15vw" : 13 * percent,
              minWidth: widthSize === "sm" ? "10vw" : 9 * percent,
            }}
          >
            {profile.social.context.map((social) => (
              <Button
                key={social.id}
                isIconOnly
                as={Link}
                className="social-button"
                href={social.link}
              >
                <span className="m-auto" role="img">
                  {social.emoji}
                </span>
              </Button>
            ))}
          </div>
        </RenderBox>
      </div>

      <BlindList
        className="resume"
        items={profile.resume.map((experience) => ({
          id: experience.id.toString(),
          content: (
            <div key={experience.id}>
              <h2 className="resume-title">{experience.title}</h2>
              <p className="resume-date">
                {new Date(experience.start).toLocaleDateString()} -{" "}
                {new Date(experience.end).toLocaleDateString()}
              </p>

              {experience.description && (
                <>
                  <Divider className="my-5" />
                  <p className="resume-description">{experience.description}</p>
                </>
              )}
            </div>
          ),
        }))}
        speed={widthSize === "xl" ? 2 : 1.5}
      />
      <div className="p-[15vh]" />
    </div>
  );
};

export default ProfileRender;
