import type { Profile } from "../profile.type";
import type { JSX } from "react";

import { Button, Chip, Divider } from "@heroui/react";

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
        <h1>{profile.name.context}</h1>
      </div>

      <div
        className="absolute flex flex-row gap-3 max-w-[50vw] p-[24px]"
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
        <p className="w-max-[70vw]">{profile.introduction.context}</p>
      </div>

      <div
        className="absolute p-[24px] flex flex-row gap-3"
        style={{ top: profile.social.top, left: profile.social.left }}
      >
        {profile.social.context.map((social) => (
          <Button key={social.id} isIconOnly href={social.link}>
            <span className="m-auto" role="img">
              {social.emoji}
            </span>
          </Button>
        ))}
      </div>

      <div
        className="absolute w-[50vw] p-[24px] flex flex-col gap-3"
        style={{ top: profile.resume.top, left: profile.resume.left }}
      >
        {profile.resume.context
          .map((experience) => (
            <div key={experience.id}>
              <h2>{experience.title}</h2>
              <p>
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
