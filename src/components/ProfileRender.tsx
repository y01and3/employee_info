import type { Profile } from "../profile.type";
import type { JSX } from "react";

import { Button, Chip, Divider } from "@heroui/react";

interface ProfileRenderProps {
  profile: Profile;
}

const ProfileRender = ({ profile }: ProfileRenderProps) => {
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-200">
      <div
        className="absolute"
        style={{ top: profile.name.top, left: profile.name.left }}
      >
        <h1>{profile.name.context}</h1>
      </div>

      <div
        className="absolute flex flex-row gap-3 max-w-[50vw]"
        style={{ top: profile.tag.top, left: profile.tag.left }}
      >
        {profile.tag.context.map((tag) => (
          <Chip
            key={tag.text}
            color="secondary"
            startContent={
              tag.icon.mod === "image" ? (
                <img
                  alt={tag.text}
                  className="w-[16px] h-[16px]"
                  src={tag.icon.src}
                />
              ) : (
                <span className="ml-1 my-auto" role="img">
                  {tag.icon.src}
                </span>
              )
            }
            variant="shadow"
          >
            {tag.text}
          </Chip>
        ))}
      </div>

      <div
        className="absolute"
        style={{
          top: profile.introduction.top,
          left: profile.introduction.left,
        }}
      >
        <p>{profile.introduction.context}</p>
      </div>

      <div
        className="absolute"
        style={{ top: profile.social.top, left: profile.social.left }}
      >
        {profile.social.context.map((social) => (
          <Button key={social.link} isIconOnly href={social.link}>
            {social.icon.mod === "image" && (
              <img
                alt={social.link}
                className="mr-2 w-[24px] h-[24px]"
                src={social.icon.src}
              />
            )}
            {social.icon.mod === "emoji" && (
              <span className="m-auto" role="img">
                {social.icon.src}
              </span>
            )}
          </Button>
        ))}
      </div>

      {profile.post && (
        <div
          className="absolute w-[50vw]"
          style={{ top: profile.post.top, left: profile.post.left }}
        >
          {profile.post.context
            .map((post) => (
              <div key={post.title} className="mb-2">
                <h2>{post.title}</h2>
                <p>{post.date.toLocaleDateString()}</p>
                <Divider />
                <p>{post.description}</p>
                <a href={post.link}>Read more</a>
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
      )}

      {profile.resume && (
        <div
          className="absolute w-[50vw]"
          style={{ top: profile.resume.top, left: profile.resume.left }}
        >
          {profile.resume.context
            .map((experience) => (
              <div key={experience.title} className="mb-2">
                <h2>{experience.title}</h2>
                <p>
                  {experience.start.toLocaleDateString()} -{" "}
                  {experience.end.toLocaleDateString()}
                </p>
                <Divider />
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
      )}
    </div>
  );
};

export default ProfileRender;
