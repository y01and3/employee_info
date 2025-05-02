import type { Profile } from "../profile.type";
import type { JSX } from "react";

import { Button, Chip, Divider, Link } from "@heroui/react";

interface ProfileRenderProps {
  profile: Profile;
}

const ProfileRender = ({ profile }: ProfileRenderProps) => {
  return (
    <div className="bg-gray-200">
      <div
        className="absolute p-[24px]"
        style={{ top: profile.name.top, left: profile.name.left }}
      >
        <h1 className="name">{profile.name.context}</h1>
      </div>

      <div
        className="absolute p-[24px] tags"
        style={{ top: profile.tag.top, left: profile.tag.left }}
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
        className="absolute p-[24px]"
        style={{
          top: profile.introduction.top,
          left: profile.introduction.left,
        }}
      >
        <p className="introduction">{profile.introduction.context}</p>
      </div>

      <div
        className="absolute p-[24px] social"
        style={{ top: profile.social.top, left: profile.social.left }}
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
        className="absolute p-[24px] resume"
        style={{ top: profile.resume.top, left: profile.resume.left }}
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
