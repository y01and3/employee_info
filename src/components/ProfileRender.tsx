import type { Profile } from "../profile.type";
import type { JSX } from "react";

import { Button, Chip, Divider, Link } from "@heroui/react";

import Avatar from "./animations/Avatar";

interface ProfileRenderProps {
  profile: Profile;
}

const ProfileRender = ({ profile }: ProfileRenderProps) => {
  return (
    <div className="bg-gray-200 grid-box">
      <div
        className="render-box"
        style={{
          gridColumnStart: profile.name.gridX,
          gridRowStart: profile.name.gridY,
        }}
      >
        <h1 className="name">{profile.name.context}</h1>
      </div>

      <div
        className="render-box"
        style={{
          gridColumnStart: profile.avatar.gridX,
          gridRowStart: profile.avatar.gridY,
        }}
      >
        <Avatar className="avatar" src={profile.avatar.context} />
      </div>

      <div
        className="render-box tags"
        style={{
          gridColumnStart: profile.tag.gridX,
          gridRowStart: profile.tag.gridY,
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

      <div
        className="render-box"
        style={{
          gridColumnStart: profile.introduction.gridX,
          gridRowStart: profile.introduction.gridY,
        }}
      >
        <p className="introduction">{profile.introduction.context}</p>
      </div>

      <div
        className="render-box social"
        style={{
          gridColumnStart: profile.social.gridX,
          gridRowStart: profile.social.gridY,
        }}
      >
        {profile.social.context.map((social) => (
          <Button key={social.id} isIconOnly as={Link} href={social.link}>
            <span className="m-auto" role="img">
              {social.emoji}
            </span>
          </Button>
        ))}
      </div>

      <div
        className="render-box resume"
        style={{
          gridColumnStart: profile.resume.gridX,
          gridRowStart: profile.resume.gridY,
        }}
      >
        {profile.resume.context
          .map((experience) => (
            <div key={experience.id}>
              <h2 className="resume-title">{experience.title}</h2>
              <p className="resume-date">
                {new Date(experience.start).toLocaleDateString()} -{" "}
                {new Date(experience.end).toLocaleDateString()}
              </p>
            </div>
          ))
          .reduce(
            (prev, curr, index) =>
              prev.length > 0
                ? [...prev, <Divider key={index} />, curr]
                : [curr],
            [] as JSX.Element[],
          )}
      </div>
    </div>
  );
};

export default ProfileRender;
